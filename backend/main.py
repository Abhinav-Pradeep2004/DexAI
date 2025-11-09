from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline

# ✅ Load a local or cached summarization model
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextData(BaseModel):
    text: str

@app.post("/summarize")
async def summarize(data: TextData):
    try:
        result = summarizer(data.text, max_length=80, min_length=20, do_sample=False)
        summary = result[0]['summary_text']
        return {"summary": summary}
    except Exception as e:
        return {"summary": f"Error: {str(e)}"}
