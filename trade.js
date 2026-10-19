(() => {
  'use strict';

  const categoryNames = {
    home: 'Home décor & collectibles',
    kitchen: 'Kitchen & tabletop',
    lighting: 'Lighting & ambience',
    wall: 'Wall décor & mirrors',
    bath: 'Bath & organisation',
    garden: 'Garden & planters',
    habitat: 'Aquarium & reptile',
    seasonal: 'Seasonal & gifting'
  };
  const storageKey = 'able_quote_categories_v1';

  function readList() {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
      return [...new Set(stored)].filter(key => categoryNames[key]);
    } catch {
      return [];
    }
  }

  function writeList(list) {
    try { localStorage.setItem(storageKey, JSON.stringify(list)); } catch {}
  }

  function originalImagePath(src) {
    const url = new URL(src, location.href);
    if (!url.pathname.includes('/assets/optimized/')) return '';
    return url.pathname
      .replace('/assets/optimized/', '/assets/')
      .replace(/-(?:320|480|560|640|800|1200)\.webp$/, '.jpg')
      .replace(/\.webp$/, '.jpg');
  }

  document.querySelectorAll('img').forEach(image => {
    const handleImageError = () => {
      if (!image.dataset.originalFallback) {
        const fallback = originalImagePath(image.currentSrc || image.src);
        if (fallback) {
          image.dataset.originalFallback = 'true';
          image.removeAttribute('srcset');
          image.src = fallback;
          return;
        }
      }
      image.closest('figure, .category-art, .work-image')?.classList.add('image-unavailable');
    };
    image.addEventListener('error', handleImageError);
    if (image.complete && image.naturalWidth === 0) handleImageError();
  });

  const productPage = document.body.classList.contains('products-page');
  let list = readList();
  let tray;

  function requestUrl() {
    const base = location.protocol === 'file:' ? './index.html' : '/';
    return `${base}?quote=${encodeURIComponent(list.join(','))}#brief`;
  }

  function renderQuoteState() {
    document.querySelectorAll('[data-quote-category]').forEach(button => {
      const added = list.includes(button.dataset.quoteCategory);
      button.classList.toggle('is-added', added);
      button.setAttribute('aria-pressed', String(added));
      button.textContent = added ? 'Added to enquiry ✓' : 'Add to enquiry';
    });
    if (!tray) return;
    const count = tray.querySelector('[data-quote-count]');
    count.textContent = `${list.length} ${list.length === 1 ? 'direction' : 'directions'} selected`;
    tray.hidden = list.length === 0;
    document.body.classList.toggle('has-quote-tray', list.length > 0);
    tray.querySelector('[data-quote-request]').href = requestUrl();
  }

  function toggleCategory(key) {
    list = list.includes(key) ? list.filter(item => item !== key) : [...list, key];
    writeList(list);
    renderQuoteState();
  }

  if (productPage) {
    const heroCopy = document.querySelector('.product-hero-copy');
    if (heroCopy) {
      heroCopy.querySelector('.eyebrow').textContent = 'Wholesale collections · OEM · ODM · private label';
      heroCopy.querySelector('h1').innerHTML = 'Products selected<br><span>for real retail.</span>';
      heroCopy.querySelector('.hero-lead').textContent = 'Explore resin, ceramic and mixed-material product directions. Select the categories that fit your market and send them together in one quotation request.';
      const primary = heroCopy.querySelector('.button');
      if (primary) primary.textContent = 'Build your enquiry list ↗';
    }

    const collections = document.querySelector('#collections');
    if (collections) {
      const buyingStrip = document.createElement('section');
      buyingStrip.className = 'trade-buying-strip';
      buyingStrip.innerHTML = '<div class="shell"><div><strong>Choose a direction</strong><span>Select one or more categories for your market.</span></div><div><strong>Share the buying brief</strong><span>Quantity, target price, finish, packaging and timing.</span></div><div><strong>Confirm the route</strong><span>Review MOQ, sampling, production and export requirements.</span></div></div>';
      collections.before(buyingStrip);
    }

    document.querySelectorAll('.product-capability[data-category]').forEach(card => {
      const key = card.dataset.category;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'quote-add';
      button.dataset.quoteCategory = key;
      button.setAttribute('aria-label', `Add ${categoryNames[key]} to enquiry`);
      button.addEventListener('click', () => toggleCategory(key));
      card.append(button);
    });

    const directionControls = document.querySelector('.direction-controls');
    if (directionControls) {
      const addCurrent = document.createElement('button');
      addCurrent.type = 'button';
      addCurrent.className = 'quote-add quote-add-current';
      addCurrent.dataset.quoteCategory = document.querySelector('#guide-category')?.value || 'home';
      addCurrent.addEventListener('click', () => toggleCategory(addCurrent.dataset.quoteCategory));
      document.querySelector('#guide-category')?.addEventListener('change', event => {
        addCurrent.dataset.quoteCategory = event.target.value;
        renderQuoteState();
      });
      directionControls.querySelector('#guide-cta')?.before(addCurrent);
    }

    tray = document.createElement('aside');
    tray.className = 'quote-tray';
    tray.hidden = true;
    tray.setAttribute('aria-label', 'Quotation enquiry list');
    tray.innerHTML = '<div><strong data-quote-count>0 directions selected</strong><button type="button" data-quote-clear>Clear</button></div><a class="button" data-quote-request href="/#brief">Request quotation ↗</a>';
    tray.querySelector('[data-quote-clear]').addEventListener('click', () => {
      list = [];
      writeList(list);
      renderQuoteState();
    });
    document.body.append(tray);
    renderQuoteState();
  }

  const form = document.querySelector('#direction-form');
  if (form) {
    const queryList = (new URLSearchParams(location.search).get('quote') || '')
      .split(',')
      .filter(key => categoryNames[key]);
    if (queryList.length) {
      list = [...new Set(queryList)];
      writeList(list);
    }
    if (list.length) {
      const field = form.elements.namedItem('selected_products');
      if (field) {
        field.value = list.map(key => categoryNames[key]).join('\n');
        field.closest('label').hidden = false;
      }
      const primary = form.elements.namedItem('direction');
      if (primary && categoryNames[list[0]]) primary.value = categoryNames[list[0]];
    }
  }

  if (document.body.classList.contains('manufacturing-page')) {
    document.querySelector('.commerce-crosslink')?.remove();
    const cta = document.querySelector('.manufacturing-cta');
    if (cta) {
      const buyerEvidence = document.createElement('section');
      buyerEvidence.className = 'section buyer-evidence';
      buyerEvidence.innerHTML = '<div class="shell"><div class="section-heading compact-heading"><p class="eyebrow">Supplier review support</p><h2>Ask for the evidence relevant to your order.</h2><p>Product, destination and buyer requirements determine which documents and checks apply. We scope them before sampling and production.</p></div><div class="buyer-fact-grid"><article><span>01</span><h3>Sample & specification</h3><p>Review dimensions, materials, finishes, function and approved references.</p></article><article><span>02</span><h3>Quality checkpoints</h3><p>Define first-piece, in-process, pre-shipment and packing checks.</p></article><article><span>03</span><h3>Testing requirements</h3><p>Confirm market-specific material or product testing before quotation.</p></article><article><span>04</span><h3>Inspection access</h3><p>Discuss buyer-appointed inspection and production review requirements.</p></article></div></div>';
      cta.before(buyerEvidence);
    }
  }
})();
