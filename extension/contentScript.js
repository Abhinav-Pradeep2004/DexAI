chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "autofillForm") {
    try {
      autofillForm();
      sendResponse({ success: true });
    } catch (e) {
      console.error("Autofill error", e);
      sendResponse({ success: false });
    }
  }
});

function autofillForm() {
  const demoData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "9876543210",
    address: "123 MG Road, Bengaluru"
  };

  const inputs = document.querySelectorAll("input, textarea");
  let filled = 0;

  inputs.forEach((el) => {
    if (el.type === "hidden" || el.disabled) return;
    const nameAttr = (el.name || el.id || el.placeholder || "").toLowerCase();

    if (nameAttr.includes("name")) {
      el.value = demoData.name;
      filled++;
    } else if (nameAttr.includes("mail")) {
      el.value = demoData.email;
      filled++;
    } else if (nameAttr.includes("phone") || nameAttr.includes("mobile")) {
      el.value = demoData.phone;
      filled++;
    } else if (nameAttr.includes("address")) {
      el.value = demoData.address;
      filled++;
    }
  });

  alert(filled > 0 ? `✅ DexAI filled ${filled} fields!` : "⚠️ No matching fields found.");
}
  