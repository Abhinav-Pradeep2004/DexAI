const API_URL = "http://127.0.0.1:8000/summarize"; // your FastAPI endpoint

// Summarize Button
document.getElementById("summarize").addEventListener("click", async () => {
  const textarea = document.getElementById("inputText");
  const resultDiv = document.getElementById("result");

  // Get selected text from active tab if textarea is empty
  let selectedText = textarea.value.trim();
  if (!selectedText) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => window.getSelection().toString()
    });
    selectedText = result.trim();
  }

  if (!selectedText) {
    alert("❌ No text selected or entered!");
    return;
  }

  resultDiv.textContent = "⏳ Summarizing...";
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: selectedText })
    });
    const data = await response.json();
    resultDiv.textContent = "✅ Summary:\n" + (data.summary || data.result || "No output");
  } catch (err) {
    console.error(err);
    resultDiv.textContent = "⚠️ Error connecting to backend.";
  }
});

// Autofill Button
document.getElementById("autofill").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab?.id) {
    alert("Could not find an active tab!");
    return;
  }

  chrome.tabs.sendMessage(
    tab.id,
    { action: "autofillForm" },
    (response) => {
      if (chrome.runtime.lastError) {
        alert("❌ Could not reach page. Make sure the page is open and content scripts are allowed.");
      } else {
        alert("✅ Autofill triggered successfully!");
      }
    }
  );
});
