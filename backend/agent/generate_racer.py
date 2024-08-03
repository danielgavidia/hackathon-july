from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_openai import ChatOpenAI
import dotenv
import os


dotenv.load_dotenv()
LLM_MODEL= os.getenv("LLM_MODEL")


class Racer(BaseModel):
    species: str = Field(description="The species the racer is")
    emoji: str = Field(description="The emoji to represnt them")
    speed: float = Field(description="a scalar value the represents their speed")
    speed: float = Field(description="a scalar value the represents their speed")
    strength: float = Field(description="strength")
    endurance: float = Field(description="endurance")
    agility: float = Field(description="agility")
    acceleration: float = Field(description="acceleration")
    reaction_time: float = Field(description="reaction_time")
    stamina: float = Field(description="stamina")
    recovery: float = Field(description="recovery")
    focus: float = Field(description="focus")
    consistency: float = Field(description="consistency")
    experience: float = Field(description="experience")

model = ChatOpenAI(model=LLM_MODEL, temperature=0)
generate_racer_chain = model.with_structured_output(Racer)


if __name__ == '__main__':
    # example usage
    
    
    ouput_structured_llm_racer = generate_racer_chain.invoke("generate a racer")
    x = 0