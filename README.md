# DexAI MVP — Quick Start


## Prereqs
- Python 3.10+
- Chrome (or Chromium)


## Backend
1. cd backend
2. python -m venv venv && source venv/bin/activate (or venv\Scripts\activate on Windows)
3. pip install -r requirements.txt
4. Copy `.env.example` to `.env` and optionally paste OPENAI API key
5. uvicorn main:app --reload --host 0.0.0.0 --port 8000


## Chrome extension
1. Open Chrome → Extensions → Load unpacked
2. Select the `extension/` folder from repo
3. Open any page, select text, click the extension icon, and click Summarize or Make Simple Plan


## Demo flow (recommended for professor demo)
1. Start backend
2. Load extension
3. Open a job listing or article page
4. Select a paragraph and click Summarize → show backend response
5. Click Plan → show the produced JSON plan


Good luck with the demo — this simple but complete flow proves core ideas: *context capture*, *backend orchestration*, and *planning/automation stubs*.