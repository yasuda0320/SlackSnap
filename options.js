document.getElementById('save').addEventListener('click', () => {
  const webhookUrl = document.getElementById('webhookUrl').value;
  chrome.storage.sync.set({ slackWebhookUrl: webhookUrl }, () => {
    document.getElementById('status').textContent = "Saved!";
    setTimeout(() => { document.getElementById('status').textContent = ""; }, 2000);
  });
});

// 現在の設定を表示
chrome.storage.sync.get(['slackWebhookUrl'], (data) => {
  if (data.slackWebhookUrl) {
    document.getElementById('webhookUrl').value = data.slackWebhookUrl;
  }
});
