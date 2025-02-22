chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => window.getSelection().toString()  // Get selected text
  }, (results) => {
    const selectedText = results[0].result;
    console.log("Selected text:", selectedText);
    if (selectedText) {
      chrome.storage.sync.get(['slackWebhookUrl'], (data) => {
        const webhookUrl = data.slackWebhookUrl;
        console.log("Webhook URL:", webhookUrl);
        if (webhookUrl) {
          fetch(webhookUrl, {
            method: "POST",
            body: JSON.stringify({ text: selectedText }),
            headers: { "Content-Type": "application/json" }
          })
              .then(response => {
                console.log("Response status:", response.status);
                if (!response.ok) throw new Error("Failed to send");
                return response.text();
              })
              .then(() => console.log("Sent to Slack successfully"))
              .catch(error => console.error("Fetch error:", error));
        } else {
          console.log("Webhook URL not set. Opening options...");
          chrome.runtime.openOptionsPage();
        }
      });
    } else {
      console.log("No text selected on the page.");
    }
  });
});