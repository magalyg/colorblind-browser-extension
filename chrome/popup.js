const buttons = document.querySelectorAll('.mode-btn');

function setActive(mode) {
  buttons.forEach(btn => btn.classList.toggle('active', btn.dataset.mode === mode));
}

chrome.storage.sync.get(['mode'], ({ mode }) => {
  setActive(mode || 'none');
});

buttons.forEach(btn => {
  btn.addEventListener('click', async () => {
    const mode = btn.dataset.mode;
    setActive(mode);
    chrome.storage.sync.set({ mode });

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.url || tab.url.startsWith('chrome://') || tab.url.startsWith('about:')) return;
    try {
      await chrome.tabs.sendMessage(tab.id, { action: 'setMode', mode });
    } catch {
      // Content script not yet injected (tab was open before extension loaded)
      await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['content.js'] });
      chrome.tabs.sendMessage(tab.id, { action: 'setMode', mode });
    }
  });
});
