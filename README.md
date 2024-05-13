# Intellyse Code Solver

## How does it work?

1. The code solver takes a code description.

Example: 

> Write a function that counts how many different ways you can make change for an amount of money, given an array of coin denominations. For example, there are 3 ways to give change for 4 if you have coins with denomination 1 and 2:
> 
> 1+1+1+1, 1+1+2, 2+2.
> The order of coins does not matter:
> 
> 1+1+2 == 2+1+1
> Also, assume that you have an infinite amount of coins.
> 
> Your function should take an amount to change and an array of unique denominations for the coins:
> 
> count_change(4, [1,2]) # => 3
> count_change(10, [5,2,3]) # => 4
> count_change(11, [5,7]) # => 0

![image](https://hackmd.io/_uploads/BJ7qwD1QC.png)


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
6. When the solution is found, it is displayed. Otherwise, some failed solutions are displayed.

Example solution:
```
def count_change(amount, coins):
    if amount == 0:
        return 1
    if amount < 0 or len(coins) == 0:
        return 0
    return count_change(amount - coins[0], coins) + count_change(amount, coins[1:])
```
![image](https://hackmd.io/_uploads/r1cevO170.png)


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

Create `.env` file following `.env.example`.

If you are using a Linux environment, build and run the app using:
```
./run.sh dstart  
```

By default, it is configured for production environment. For development environment and other configuration options see `.env` file.


f you are running an environment other than Linux:

#### Option 1
You need to map `/tmp` to your temporary folder (this is used to save python codes to be runned) and `/var/run/docker.sock` to your docker socket (this is used to create isolated python executions) in the `docker-compose.yml` file`volumes` section.

#### Option 2
You can just run `pip3 install -r requirements.txt` and `flask run -h localhost -p 8080`.


You can now visit `http://localhost:3000`.



## How to improve?

### Logic Improvement

Intellyse code solver elaborates on [this article](https://microsoft.github.io/autogen/blog/2023/05/18/GPT-adaptive-humaneval/) to adaptively select between GPT-3.5-turbo and GPT-4-turbo. To improve this approach, [EcoAssistant](https://arxiv.org/abs/2310.03046) can be used. For the sake of simplicity and lack of time, I didn't implement EcoAssistant.


### Production Improvements

* User Authentication
* UI
* Tests
* ...