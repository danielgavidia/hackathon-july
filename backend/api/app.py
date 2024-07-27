# create a base app 
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import openai
import os
import json
import dotenv

dotenv.load_dotenv(r"C:\Users\yannick.gibson\projects\others\_challenges\ai_infinity_hackathon\github\backend\api\.env")

MODEL_VERSION = "gpt-3.5-turbo"
GENERATE_PROMPT = """class Animal:
    def init(self, name, speed, strength, endurance, agility, acceleration, reaction_time, stamina, recovery, focus, consistency, experience):
        self.name = str(name)
        self.speed = float(speed)
        self.strength = float(strength)
        self.endurance = float(endurance)
        self.agility = float(agility)
        self.acceleration = float(acceleration)
        self.reaction_time = float(reaction_time)
        self.stamina = float(stamina)
        self.recovery = float(recovery)
        self.focus = float(focus)
        self.consistency = float(consistency)
        self.experience = float(experience)

Generate 4 animals and fill in their attributes realistically. Just give me the example JSON output
For example:
[
    {
        "name": "Cheetah",
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
    },
    {
        "name": "Falcon",
        "speed": 120.56,
        "strength": 65.72,
        "endurance": 60.24,
        "agility": 98.75,
        "acceleration": 95.11,
        "reaction_time": 18.95,
        "stamina": 58.21,
        "recovery": 71.48,
        "focus": 90.88,
        "consistency": 82.43,
        "experience": 70.89
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
client = None
messages = []
OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/generate")
def generate_race():
    global client
    client = openai.Client(api_key=OPENAI_API_KEY)
    messages = [
        {"role": "system", "content": ""},
        {"role": "user", "content": GENERATE_PROMPT}
        ]
    response = client.chat.completions.create(
    model=MODEL_VERSION,
    messages=messages
    )
    json_data = json.loads(response.choices[0].message.content)
    return json_data

@app.get("/prompt/{prompt}")
def prompt_gpt(prompt: str):
    if client is None:
        return "Client not initialized"
    else:
        global messages
        messages.append({"role": "user", "content": prompt})
        response = client.chat.completions.create(
            model=MODEL_VERSION,
            messages=messages
        )
        return response.choices[0].message
