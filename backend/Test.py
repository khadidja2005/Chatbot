from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

# Example using GPT-J or GPT-NeoX
model_name = "EleutherAI/gpt-j-6B"  # Or another model from Hugging Face
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

inputs = tokenizer("Hello, how can I assist you?", return_tensors="pt")
outputs = model.generate(**inputs)
response = tokenizer.decode(outputs[0], skip_special_tokens=True)
