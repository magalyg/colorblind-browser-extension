const FILTER_ID = 'colorblind-filter';
const SVG_ID = 'colorblind-svg';

const MATRICES = {
  deuteranopia:   '0.625 0.375 0 0 0  0.700 0.300 0 0 0  0 0.300 0.700 0 0  0 0 0 1 0',
  protanopia:     '0.567 0.433 0 0 0  0.558 0.442 0 0 0  0 0.242 0.758 0 0  0 0 0 1 0',
  tritanopia:     '0.950 0.050 0 0 0  0 0.433 0.567 0 0  0 0.475 0.525 0 0  0 0 0 1 0',
  achromatopsia:  '0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0 0 0 1 0',
};

function applyFilter(mode) {
  removeFilter();
  if (!MATRICES[mode]) return;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.id = SVG_ID;
  svg.setAttribute('style', 'position:absolute;width:0;height:0;overflow:hidden');
  svg.innerHTML = `
    <defs>
      <filter id="${FILTER_ID}">
        <feColorMatrix type="matrix" values="${MATRICES[mode]}"/>
      </filter>
    </defs>`;
  document.body.prepend(svg);
  document.documentElement.style.filter = `url(#${FILTER_ID})`;
}

function removeFilter() {
  document.getElementById(SVG_ID)?.remove();
  document.documentElement.style.filter = '';
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action !== 'setMode') return;
  if (message.mode === 'none') {
    removeFilter();
  } else {
    applyFilter(message.mode);
  }
});

chrome.storage.sync.get(['mode'], ({ mode }) => {
  if (mode && mode !== 'none') applyFilter(mode);
});
