# create a base app 
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import openai
import os
import json
import dotenv
from model.Animal import Animal
from model.OddsCalculator import run_race_and_calculate_odds

dotenv.load_dotenv(r"C:\Users\yannick.gibson\projects\others\_challenges\ai_infinity_hackathon\github\backend\.env")
dotenv.load_dotenv()

MODEL_VERSION = "gpt-3.5-turbo"
SYSTEM_PROMPT_MESSAGE = "You are an all-knowing race betting assistant. Based on the data below, you will interact with a player who will ask you questions about the animals. You will give them helpful and specific answers. Use percentages and odds while answering, but never communicate the exact attributes directly. However, you must make references to the name of the animal in each answer. Be as helpful as possible for the player. Always answer concisely and never use bullet points."
GENERATE_PROMPT = """
Generate 4 animals and fill in their attributes realistically. Just give me the example JSON output
For example:
[
    {
        "name": "Cheetah",
        "emoji": "🐆",
        "speed": 95.23,
        "strength": 78.56,
        "endurance": 45.82,
        "agility": 92.14,
        "acceleration": 89.34,
        "reaction_time": 22.47,
        "stamina": 43.71,
        "recovery": 77.12,
        "focus": 84.22,
        "consistency": 76.58,
        "experience": 63.45
    },
    {
        "name": "Elephant",
        "emoji": "🐘",
        "speed": 30.75,
        "strength": 92.43,
        "endurance": 75.96,
        "agility": 55.30,
        "acceleration": 18.92,
        "reaction_time": 60.14,
        "stamina": 82.45,
        "recovery": 64.37,
        "focus": 70.22,
        "consistency": 68.14,
        "experience": 80.55
    }
]

Just output this kind of JSON data
"""

app = FastAPI()
# allow cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# create an openai client
messages = []
OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]
client = None

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/generate")
def generate():
    global client
    client = openai.Client(api_key=OPENAI_API_KEY)
    global messages
    messages.apppend({"role": "system", "content": SYSTEM_PROMPT_MESSAGE})
    messages.append({"role": "user", "content": GENERATE_PROMPT})
    response = client.chat.completions.create(
    model=MODEL_VERSION,
    messages=messages
    )
    json_string = response.choices[0].message.content
    json_data = json.loads(json_string)

    # Prepare data
    animals = []
    performance_scores: dict[Animal, float] = {}
    for json_animal in json_data:
        animal = Animal(**json_animal)
        animals.append(animal)
        performance_scores[animal] = animal.calculate_performance_score()

    odds = run_race_and_calculate_odds(animals, performance_scores)
    # Format data
    for i, json_animal in enumerate(json_data):
        json_animal["performance_score"] = performance_scores[animals[i]]
        json_animal["odds"] = odds[animals[i]]

    messages.append({"role": "assistant", "content": json_string})

    return json_data

@app.get("/prompt/{prompt}")
def prompt_gpt(prompt: str):
    if client is None:
        return "Client not initialized"
    else:
        global messages
        messages.append({"role": "system", "content": ""})
        messages.append({"role": "user", "content": prompt})
        response = client.chat.completions.create(
            model=MODEL_VERSION,
            messages=messages
        )
        gpt_response = response.choices[0].message

        messages.append({"role": "assistant", "content": gpt_response})
        return gpt_response 