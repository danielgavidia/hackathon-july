from typing import List
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_openai import ChatOpenAI
import dotenv
import os


dotenv.load_dotenv()

LLM_MODEL= os.getenv("LLM_MODEL")
model = ChatOpenAI(model=LLM_MODEL, temperature=0)


class AnimalGenerator(BaseModel):
    animal_list: List[str] = Field(description="List of strings")

animal_generator_chain = model.with_structured_output(AnimalGenerator)



if __name__ == '__main__':
    # example usage
    result = animal_generator_chain.invoke("Provide a list of animals")
    alt_result = animal_generator_chain.invoke(f"Provide a list of animals that are not in {str(result.animal_list)}")
    x = 0