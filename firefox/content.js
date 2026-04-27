const FILTER_ID = 'colorblind-filter';
const SVG_ID = 'colorblind-svg';

const IDENTITY = [1,0,0,0,0, 0,1,0,0,0, 0,0,1,0,0, 0,0,0,1,0];

const FULL_MATRICES = {
  deuteranopia:  [0.625,0.375,0,0,0, 0.700,0.300,0,0,0, 0,0.300,0.700,0,0, 0,0,0,1,0],
  protanopia:    [0.567,0.433,0,0,0, 0.558,0.442,0,0,0, 0,0.242,0.758,0,0, 0,0,0,1,0],
  tritanopia:    [0.950,0.050,0,0,0, 0,0.433,0.567,0,0, 0,0.475,0.525,0,0, 0,0,0,1,0],
  achromatopsia: [0.299,0.587,0.114,0,0, 0.299,0.587,0.114,0,0, 0.299,0.587,0.114,0,0, 0,0,0,1,0],
};

function buildMatrix(mode, severity) {
  const t = (severity ?? 100) / 100;
  const full = FULL_MATRICES[mode];
  return IDENTITY.map((v, i) => +(v * (1 - t) + full[i] * t).toFixed(5)).join(' ');
}

function applyFilter(mode, severity) {
  removeFilter();
  if (!FULL_MATRICES[mode]) return;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.id = SVG_ID;
  svg.setAttribute('style', 'position:absolute;width:0;height:0;overflow:hidden');
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
  filter.id = FILTER_ID;
  const feColorMatrix = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
  feColorMatrix.setAttribute('type', 'matrix');
  feColorMatrix.setAttribute('values', buildMatrix(mode, severity));
  filter.appendChild(feColorMatrix);
  defs.appendChild(filter);
  svg.appendChild(defs);
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
    applyFilter(message.mode, message.severity);
  }
});

chrome.storage.sync.get(['mode', 'severities'], ({ mode, severities = {} }) => {
  if (mode && mode !== 'none') applyFilter(mode, severities[mode] ?? 100);
});
