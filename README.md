# Intellyse Code Solver

## How does it work?

1. The code solver takes a code description.

Example: 

```
Write a function that counts how many different ways you can make change for an amount of money, given an array of coin denominations. For example, there are 3 ways to give change for 4 if you have coins with denomination 1 and 2:

1+1+1+1, 1+1+2, 2+2.
The order of coins does not matter:

1+1+2 == 2+1+1
Also, assume that you have an infinite amount of coins.

Your function should take an amount to change and an array of unique denominations for the coins:

count_change(4, [1,2]) # => 3
count_change(10, [5,2,3]) # => 4
count_change(11, [5,7]) # => 0
```

<img width="600" alt="upload_5ceb737b74af7d877b4ce4a020ddcd7e" src="https://github.com/utgoer/intellyse-code-solver/assets/26162975/2ef8c263-5334-407d-911c-bb13d9124ad2">

2. It generates Python assertions using GPT-3.5-turbo.
3. It generates Python code solutions using GPT-3.5-turbo and GPT-4-turbo using the following configuration (from cheap solutions to expensive).
```
configs = [
    {"model": "gpt-35-turbo", "temperature": 0, "seed": 0},
    {"model": "gpt-35-turbo", "n": 7, "seed": 0},
    {"model": "gpt-4-turbo", "temperature": 0, "seed": 1},
    {"model": "gpt-4-turbo", "n": 2, "seed": 2},
]
```
5. For each solution, a Docker environment is created, and the code solution with assertion is run.
6. When the solution is found(python code execution is successful), it is displayed. Otherwise, some failed solutions are displayed.

Example solution:
```
def count_change(amount, coins):
    if amount == 0:
        return 1
    if amount < 0 or len(coins) == 0:
        return 0
    return count_change(amount - coins[0], coins) + count_change(amount, coins[1:])
```
<img width="600" alt="upload_87fbec95f4aa333b8dcbb6a4dbb61756" src="https://github.com/utgoer/intellyse-code-solver/assets/26162975/bd5d205a-89a1-48f0-9812-6368380f5f0c">


## How to setup?
Docker is used for both frontend and backend, so you need to first install Docker.

### Frontend
Go to frontend folder.

Create `.env` file following `.env.example`.

Build and run the app using:
```
./run.sh dstart  
```
By default, it is configured for production environment. For development environment and other configuration options see `.env` file.

### Backend
Go to backend folder.

Create `.env` file following `.env.example`. Edit `AZURE_OPEN_AI_API_KEY` and `AZURE_OPEN_AI_ENDPOINT`.

If you are using a Unix environment, build and run the app using:
```
./run.sh dstart  
```

By default, it is configured for production environment. For development environment and other configuration options see `.env` file.

You can now visit `http://localhost:3000`.

If you are running an environment other than Unix:

#### Option 1
You need to map `/tmp` to your temporary folder (this is used to save python codes to be runned) and `/var/run/docker.sock` to your docker socket (this is used to create isolated python executions) in the `docker-compose.yml` file`volumes` section.

#### Option 2
You can just run `pip3 install -r requirements.txt` and `flask run -h localhost -p 8080`.




## How to improve?

### Logic Improvement

Intellyse code solver elaborates on [this article](https://microsoft.github.io/autogen/blog/2023/05/18/GPT-adaptive-humaneval/) to adaptively select between GPT-3.5-turbo and GPT-4-turbo. To improve this approach, [EcoAssistant](https://arxiv.org/abs/2310.03046) can be used. For the sake of simplicity and lack of time, I didn't implement EcoAssistant.


### Production Improvements

* User Authentication
* UI
* Tests
* ...
