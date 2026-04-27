const SLIDER_MODES = ['deuteranopia', 'protanopia', 'tritanopia', 'achromatopsia'];

let currentMode = 'none';

function updateSliderFill(slider) {
  slider.style.setProperty('--fill', `${slider.value}%`);
}

function showPanel(mode) {
  document.querySelector('[data-mode="none"]').classList.toggle('active', mode === 'none');
  SLIDER_MODES.forEach(m => {
    const btn = document.querySelector(`[data-mode="${m}"]`);
    const panel = document.getElementById(`panel-${m}`);
    const active = m === mode;
    btn.classList.toggle('active', active);
    panel.classList.toggle('visible', active);
  });
}

async function sendModeToTab(mode, severity) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !tab.url || tab.url.startsWith('chrome://') || tab.url.startsWith('about:')) return;
  try {
    await chrome.tabs.sendMessage(tab.id, { action: 'setMode', mode, severity });
  } catch {
    await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['content.js'] });
    chrome.tabs.sendMessage(tab.id, { action: 'setMode', mode, severity });
  }
}

// Load saved state on open
chrome.storage.sync.get(['mode', 'severities'], ({ mode, severities = {} }) => {
  currentMode = mode || 'none';
  showPanel(currentMode);
  SLIDER_MODES.forEach(m => {
    const slider = document.getElementById(`slider-${m}`);
    const valEl = document.getElementById(`val-${m}`);
    const saved = severities[m] ?? 100;
    slider.value = saved;
    valEl.textContent = `${saved}%`;
    updateSliderFill(slider);
  });
});

// Mode button clicks
document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const mode = btn.dataset.mode;
    currentMode = mode;
    showPanel(mode);
    chrome.storage.sync.set({ mode });

    const slider = document.getElementById(`slider-${mode}`);
    const severity = slider ? parseInt(slider.value) : 100;
    sendModeToTab(mode, severity);
  });
});

// Severity slider interactions
SLIDER_MODES.forEach(mode => {
  const slider = document.getElementById(`slider-${mode}`);
  const valEl = document.getElementById(`val-${mode}`);

  slider.addEventListener('input', () => {
    const severity = parseInt(slider.value);
    valEl.textContent = `${severity}%`;
    updateSliderFill(slider);
    if (currentMode === mode) {
      sendModeToTab(mode, severity);
    }
  });

  slider.addEventListener('change', () => {
    chrome.storage.sync.get(['severities'], ({ severities = {} }) => {
      severities[mode] = parseInt(slider.value);
      chrome.storage.sync.set({ severities });
    });
  });
});
