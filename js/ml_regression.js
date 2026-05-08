let appData = null;

fetch('../data/ml_regression.json')
  .then(res => {
    if (!res.ok) throw new Error('Failed to load ml_regression.json');
    return res.json();
  })
  .then(data => {
    appData = data;
    // prepare UI but show Home by default
    renderDrawerItems();
    showHome();
    attachSidebarToggle();
    attachHomeCardHandlers();
  })
  .catch(err => {
    console.error('ml_regression: failed to load data', err);
  });

    function attachSidebarToggle() {
      const toggle = document.getElementById('drawer-toggle');
      const drawer = document.getElementById('left-drawer');
      if (!toggle || !drawer) return;
      toggle.addEventListener('click', () => {
        drawer.classList.toggle('collapsed');
        // update toggle symbol
            // when drawer is collapsed (closed) show '<', when open show '>'
            toggle.innerText = drawer.classList.contains('collapsed') ? '<' : '>';
      });
          // set initial symbol based on current state
          toggle.innerText = drawer.classList.contains('collapsed') ? '<' : '>';
    }

function renderDrawerItems() {
  const container = document.getElementById('drawer-items');
  if (!container) return;
  container.innerHTML = '';

  const homeBtn = document.createElement('button');
  homeBtn.className = 'drawer-item';
  homeBtn.innerText = 'Home';
  homeBtn.onclick = () => { showHome(); };
  container.appendChild(homeBtn);

  const regBtn = document.createElement('button');
  regBtn.className = 'drawer-item';
  regBtn.innerText = 'ML Regression';
  regBtn.onclick = () => { showRegression(); };
  container.appendChild(regBtn);
}

function showHome() {
  // hide model tabs and clear content (guard elements)
  const tabs = document.getElementById('model-tabs');
  if (tabs) tabs.innerHTML = '';
  const titleEl = document.getElementById('model-title'); if (titleEl) titleEl.textContent = '';
  const descEl = document.getElementById('model-desc'); if (descEl) descEl.textContent = '';
  const formulaEl = document.getElementById('model-formula'); if (formulaEl) formulaEl.textContent = '';
  const contentEl = document.getElementById('model-content'); if (contentEl) contentEl.textContent = '';
  const visual = document.getElementById('model-visual'); if (visual) visual.innerHTML = '';
  const two = document.querySelector('.two-column'); if (two) two.style.display = 'none';
  const section = document.querySelector('.section-title'); if (section) section.textContent = '';
  const homeCards = document.getElementById('home-cards'); if (homeCards) homeCards.style.display = 'flex';
}

function showRegression() {
  if (!appData || !appData.models) return;
  renderModelTabs(appData.models);
  if (appData.models.length) selectModel(appData.models[0].id);
  const two = document.querySelector('.two-column'); if (two) two.style.display = '';
  const section = document.querySelector('.section-title'); if (section) section.innerText = 'ML Regression';
  const homeCards = document.getElementById('home-cards'); if (homeCards) homeCards.style.display = 'none';
}

function attachHomeCardHandlers() {
  const card = document.getElementById('card-ml-regression');
  if (!card) return;
  card.addEventListener('click', (e) => {
    e.preventDefault();
    showRegression();
  });
}


function renderModelTabs(models) {
  const tabs = document.getElementById('model-tabs');
  if (!tabs) return;
  tabs.innerHTML = '';
  models.forEach(m => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-outline';
    btn.textContent = m.title;
    btn.addEventListener('click', () => selectModel(m.id));
    tabs.appendChild(btn);
  });
}

function selectModel(modelId) {
  const model = appData.models.find(m => m.id === modelId);
  if (!model) return;
  const titleEl = document.getElementById('model-title'); if (titleEl) titleEl.textContent = model.title;
  const descEl = document.getElementById('model-desc'); if (descEl) descEl.textContent = model.description || '';
  const formulaEl = document.getElementById('model-formula'); if (formulaEl) formulaEl.textContent = model.formula || '';
  const section = document.querySelector('.section-title'); if (section) section.textContent = model.title;

  // Populate the left column content directly (no topic clicks)
  const contentEl = document.getElementById('model-content');
  let mainContent = model.content || model.summary || '';
  if (!mainContent && model.topics && model.topics.length) {
    // join topic contents for a single scrollable content block
    mainContent = model.topics.map(t => t.content || t.summary || '').join('\n\n');
  }
  if (contentEl) contentEl.textContent = mainContent || 'No additional details available.';

  setModelImage(model);
}

// Topic list, detail view, and chart functionality removed — content is shown directly in the left column and images on the right.

// show model image in content header when selecting model
function setModelImage(model) {
  const mediaImage = document.getElementById('model-visual');
  if (!mediaImage) return;
  mediaImage.innerHTML = '';
  const modelImageMap = {
    linear: '../img/ml_regression/Linear_Regression.webp',
    multiple: '../img/ml_regression/Multiple_Linear_Regression.webp',
    tree: '../img/ml_regression/Decision_Tree.webp',
    rf: '../img/ml_regression/Random_Forest.webp',
    grid: '../img/ml_regression/Grid_Search.webp'
  };
  const src = modelImageMap[model.id];
  if (src) {
    const img = document.createElement('img');
    img.id = 'model-image';
    img.src = src;
    img.alt = model.title;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    mediaImage.appendChild(img);
    mediaImage.setAttribute('aria-hidden','false');
  } else {
    mediaImage.setAttribute('aria-hidden','true');
  }
}