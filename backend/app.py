from fastapi import FastAPI
from Langchain import process_user_input
from Rag import process_user_inputRag
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InputText(BaseModel):
    input_text: str

@app.get("/")
async def root():
    return {"message": "Hello World"}




@app.post("/chatbot/")
async def chatbot(input_text : InputText):
    response = process_user_input(input_text)
    return {"response": response}

@app.post("/Ragchatbot/")
async def Ragchatbot(input_text : InputText):
    response = process_user_inputRag(input_text.input_text)
    return {"response" : response}