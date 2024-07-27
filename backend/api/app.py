# create a base app 
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import openai
import os


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

@app.get("generate_race")
def generate_race():
    client = openai.Client(api_key=OPENAI_API_KEY)
    messages = [
        {"role": "system", "content": "You are a robot to describe a 5 horses, for each one say what is the its speed"},
        {"role": "user", "content": "Get the speed in JSON format."}
        ]
    response = client.chat.completions.create(
    model="gpt-3.5",
    messages=messages
    )
    return response.choices[0].message

@app.get("prompt_gpt")
def prompt_gpt(prompt: str):
    response = client.chat.completions.create(
        model="gpt-3.5",
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": "Get the speed in JSON format."}
        ]
    )
    return response.choices[0].message