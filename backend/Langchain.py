import os
from dotenv import load_dotenv
from langchain_huggingface import HuggingFaceEndpoint
from langchain.prompts import PromptTemplate
import torch

# Load environment variables from .env file
load_dotenv()

# Get the Hugging Face API token from environment variables
api_token = os.getenv("HUGGINGFACEHUB_API_TOKEN")

# Define the Hugging Face model
model_name = "mistralai/Mistral-7B-Instruct-v0.3"
ConversationModel = HuggingFaceEndpoint(huggingface_api_token=api_token, repo_id=model_name , model_type="text-generation")

prompt_template = PromptTemplate(
    template="User says: {input}. Respond appropriately:",
    input_variables=["input"]
)

# Define a simple function to process user input and get a response
def process_user_input(input_text):
    prompt = prompt_template.format(input=input_text)
    response = ConversationModel(prompt)
    return response

# Test the chatbot
user_input = "What is langchain is used for?"
# response = process_user_input(user_input)
# print(response)
