import os
import tempfile
import time
from typing import Dict
from typing import List
from typing import Tuple

from autogen.code_utils import extract_code
from autogen.coding import CodeBlock
from autogen.coding import DockerCommandLineCodeExecutor
from openai import AzureOpenAI

client = AzureOpenAI(
    api_key=os.getenv("AZURE_OPEN_AI_API_KEY"),
    api_version="2024-04-01-preview",
    azure_endpoint=os.getenv("AZURE_OPEN_AI_ENDPOINT"),
)

configs = [
    {"model": "gpt-35-turbo", "temperature": 0, "seed": 0},
    {"model": "gpt-35-turbo", "n": 7, "seed": 0},
    {"model": "gpt-4-turbo", "temperature": 0, "seed": 1},
    {"model": "gpt-4-turbo", "n": 2, "seed": 2},
]


def generate_assertions(
    client: AzureOpenAI, definition: str, model: str = "gpt-35-turbo"
) -> str:
    """Generate assertions from a code description.

    Args:
        definition (str): The code description.
        model (str): The model used for generation.

    Returns:
        str: The generated assertions.
    """
    prompt = f"""
    #Python
    Given the description, write the exactly same number of assertion(s) for the provided example(s) in the description, without assertion messages.
    
    description:
    {definition}
    assertions:"""
    response = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        stop="\n\n",
    )
    return response.choices[0].message.content


def execute_code(code: str, max_exec_time: int = 10) -> bool:
    """Execute python code in isolated docker environment.

    Args:
        code (str): The python code string.
        max_exec_time (int): Max execution time.

    Returns:
        bool: If python code execution is successfull or not.
    """
    # Create a temporary directory to store the code files.
    temp_dir = tempfile.TemporaryDirectory()

    # Create a Docker command line code executor.
    executor = DockerCommandLineCodeExecutor(
        image="python:3.12-slim",  # Execute code using the given docker image name.
        timeout=max_exec_time,  # Timeout for each code execution in seconds.
        work_dir=temp_dir.name,  # Use the temporary directory to store the code files.
    )
    exec_result = executor.execute_code_blocks(
        code_blocks=[CodeBlock(language="python", code=code)]
    )
    temp_dir.cleanup()
    return exec_result.exit_code == 0


def implement(
    client: AzureOpenAI, description: str, configs: List[Dict]
) -> Tuple[bool, List[Dict]]:
    """Implement code desctiption as python code.

    Args:
        client (AzureOpenAI): The AzureOpenAI client.
        description (str): The code description.
        configs (List[Dict]): The configuration array.

    Returns:
        Tuple[bool, List[Dict]]: If execution is successful or not and execution details.
    """
    # Assertion generation
    assertions = generate_assertions(client, description)
    results = []
    # For each config, n(choice) code blocks are generated and tested with generated assertions
    for config in configs:
        responses = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": "#Python\n#As an answer just give the implementation code as string.\n#Follow the same method definition as the following assertion(s): "
                    + assertions
                    + "\n"
                    + description,
                }
            ],
            **config,
        )

        for i, choice in enumerate(responses.choices):
            # Extract the code part of the model response
            implementation = extract_code(choice.message.content)[0][1]
            # Test if the generated code works
            exec_result = execute_code(implementation + "\n" + assertions)
            results.append(
                {
                    "success": exec_result,
                    "implementation": implementation,
                    "assertions": assertions,
                    "choice": i,
                    **config,
                }
            )
            if exec_result:
                return (True, results)
    return (False, results)


def implement_and_create_response_dict(description: str) -> Dict:
    """Implementation response wrapper.

    Args:
        description (str): The code description.

    Returns:
        Dict: Execution results.
    """
    success, results = implement(client, description, configs)
    if success:
        successful_result = results[-1]
        return {"success_found": True, "results": [successful_result]}
    else:
        return {"success_found": False, "results": [results[0], results[-1]]}


def devResponse() -> Dict:
    """Successfull mock response for development purposes.

    Returns:
        Dict: Successfull mock response.
    """
    time.sleep(2)
    mockResponse = {
        "results": [
            {
                "assertions": "assert count_change(4, [1,2]) == 3\nassert count_change(10, [5,2,3]) == 4\nassert count_change(11, [5,7]) == 0",
                "choice": 0,
                "implementation": "def count_change(amount, coins):\n    if amount == 0:\n        return 1\n    if amount < 0 or len(coins) == 0:\n        return 0\n    return count_change(amount - coins[0], coins) + count_change(amount, coins[1:])",
                "model": "gpt-35-turbo",
                "seed": 0,
                "success": True,
                "temperature": 0,
            }
        ],
        "success_found": True,
    }
    return mockResponse
