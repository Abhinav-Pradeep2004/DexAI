chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "autofillForm") {
    chrome.scripting.executeScript(
      {
        target: { tabId: sender.tab.id },
        func: autofillForm
      },
      () => sendResponse({ success: true })
    );
    return true; // keep channel open
  }
});

function autofillForm() {
  const fields = document.querySelectorAll("input, textarea");
  let filled = 0;
  fields.forEach((el) => {
    if (el.type === "hidden" || el.disabled) return;
    if (el.placeholder?.toLowerCase().includes("name")) {
      el.value = "John Doe";
      filled++;
    } else if (el.placeholder?.toLowerCase().includes("email")) {
      el.value = "john.doe@example.com";
      filled++;
    } else if (el.placeholder?.toLowerCase().includes("phone")) {
      el.value = "9876543210";
      filled++;
    } else if (el.placeholder?.toLowerCase().includes("address")) {
      el.value = "123 MG Road, Bengaluru";
      filled++;
    }
  });
  alert(filled > 0 ? `✅ Filled ${filled} field(s)!` : "⚠️ No matching fields found.");
}
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "autofillForm") {
    chrome.scripting.executeScript(
      {
        target: { tabId: sender.tab.id },
        func: autofillForm
      },
      () => sendResponse({ success: true })
    );
    return true; // keep channel open
  }
});

function autofillForm() {
  const fields = document.querySelectorAll("input, textarea");
  let filled = 0;
  fields.forEach((el) => {
    if (el.type === "hidden" || el.disabled) return;
    if (el.placeholder?.toLowerCase().includes("name")) {
      el.value = "John Doe";
      filled++;
    } else if (el.placeholder?.toLowerCase().includes("email")) {
      el.value = "john.doe@example.com";
      filled++;
    } else if (el.placeholder?.toLowerCase().includes("phone")) {
      el.value = "9876543210";
      filled++;
    } else if (el.placeholder?.toLowerCase().includes("address")) {
      el.value = "123 MG Road, Bengaluru";
      filled++;
    }
  });
  alert(filled > 0 ? `✅ Filled ${filled} field(s)!` : "⚠️ No matching fields found.");
}
