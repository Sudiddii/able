(() => {
  'use strict';
  if (window.__ABLE_ANALYTICS_INITIALIZED__) return;
  window.__ABLE_ANALYTICS_INITIALIZED__ = true;

  const config = window.ABLE_ANALYTICS_CONFIG || {};
  const query = new URLSearchParams(location.search);
  const debug = Boolean(config.debug || ((location.hostname === '127.0.0.1' || location.hostname === 'localhost') && query.get('analytics_debug') === '1'));
  const debugEvents = window.__ABLE_ANALYTICS_DEBUG_EVENTS__ = window.__ABLE_ANALYTICS_DEBUG_EVENTS__ || [];
  const validGtm = /^GTM-[A-Z0-9]+$/.test(config.gtmContainerId || '');
  const validGa4 = /^G-[A-Z0-9]+$/.test(config.ga4MeasurementId || '');
  const provider = validGtm ? 'gtm' : validGa4 ? 'ga4' : '';
  const consentKey = 'able_analytics_consent_v1';
  const attributionKey = 'able_attribution_v1';
  const attributionFields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid'];
  let providerStarted = false;
  let pageViewSent = false;

  const pagePath = location.pathname.endsWith('/index.html') ? '/' : (location.pathname || '/');
  const pageType = pagePath === '/' ? 'home' : pagePath.endsWith('/products.html') ? 'products' : pagePath.endsWith('/manufacturing.html') ? 'manufacturing' : pagePath.endsWith('/commerce-ai.html') ? 'commerce_ai' : pagePath.endsWith('/privacy.html') ? 'privacy' : 'other';
  const businessStream = {home:'trade', products:'trade', manufacturing:'manufacturing', commerce_ai:'tech', privacy:'legal'}[pageType] || 'trade';
  const categoryMap = {
    home:['decorative_collectibles','Home décor & collectibles'],
    kitchen:['kitchen_tabletop_entertaining','Kitchen & tabletop'],
    lighting:['lighting_candles_ambience','Lighting & ambience'],
    wall:['wall_decor_mirrors_display','Wall décor & mirrors'],
    bath:['bath_storage_organisation','Bath & organisation'],
    garden:['garden_decor_planters','Garden & planters'],
    habitat:['aquarium_reptile_decor','Aquarium & reptile'],
    seasonal:['seasonal_gifting_celebrations','Seasonal & gifting']
  };
  const serviceMap = {
    'AI product development':'ai_product_development',
    'Factory & trade automation':'factory_trade_automation',
    'Video marketing & automation':'product_video_marketing',
    'Marketplace operations':'marketplace_operations',
    'AI engineering workstation':'ai_engineering_workstation',
    'Website development':'website_development',
    'SKU visibility & benchmarking':'sku_visibility_benchmarking',
    'Enterprise AI development':'enterprise_ai_control_layer',
    'AIGC platform development':'aigc_platform_development'
  };
  const allowed = {
    page_view:['page_type','page_path','page_title','business_stream'],
    navigation_click:['link_text','destination_path','nav_location','page_type'],
    cta_click:['cta_id','cta_text','cta_location','destination_path','destination_anchor','business_stream','page_type'],
    product_category_view:['category_id','category_name','page_type'],
    product_direction_cta_click:['category_id','cta_id','business_stream','page_type'],
    manufacturing_stage_view:['stage_id','stage_name','stage_index','page_type'],
    commerce_service_view:['service_id','service_name','content_type','page_type','business_stream'],
    contact_click:['contact_type','contact_location','page_type'],
    form_view:['form_id','form_type','page_type','business_stream','form_location'],
    form_start:['form_id','form_type','page_type','business_stream','form_location'],
    form_submit_attempt:['form_id','form_type','page_type','business_stream','form_location'],
    form_submit_success:['form_id','form_type','page_type','business_stream','form_location'],
    form_submit_error:['form_id','form_type','page_type','business_stream','form_location','error_type']
  };

  function readAttributionRecord() {
    try { return JSON.parse(sessionStorage.getItem(attributionKey) || 'null') || {first:{},last:{}}; }
    catch { return {first:{},last:{}}; }
  }
  function captureAttribution() {
    const current = {};
    attributionFields.forEach(key => { const value = query.get(key); if (value) current[key] = value.slice(0, 160); });
    const record = readAttributionRecord();
    if (Object.keys(current).length) {
      if (!Object.keys(record.first || {}).length) record.first = current;
      record.last = current;
      try { sessionStorage.setItem(attributionKey, JSON.stringify(record)); } catch {}
    }
    return record;
  }
  let attributionRecord = captureAttribution();
  function getAttribution() { return {...(attributionRecord.last || attributionRecord.first || {})}; }
  function getFormAttribution() {
    const first = attributionRecord.first || {}, last = attributionRecord.last || first;
    const values = {...last};
    attributionFields.forEach(key => { if (first[key]) values[`first_${key}`] = first[key]; });
    return values;
  }

  function clean(eventName, params = {}) {
    const keys = allowed[eventName];
    if (!keys) return null;
    const output = {};
    keys.forEach(key => {
      const value = params[key];
      if (value === undefined || value === null || value === '') return;
      output[key] = typeof value === 'string' ? value.slice(0, 160) : value;
    });
    attributionFields.forEach(key => { const value = getAttribution()[key]; if (value) output[key] = value; });
    return output;
  }
  function track(eventName, params = {}) {
    const payload = clean(eventName, params);
    if (!payload) return false;
    if (debug) debugEvents.push({event:eventName, ...payload});
    if (!providerStarted) return debug;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({event:eventName, ...payload});
    return true;
  }
  function trackPageView() {
    if (pageViewSent) return;
    pageViewSent = true;
    track('page_view', {page_type:pageType, page_path:pagePath, page_title:document.title, business_stream:businessStream});
  }
  function loadProvider() {
    if (providerStarted || !provider || location.protocol === 'file:') { if (debug) trackPageView(); return; }
    providerStarted = true;
    window.dataLayer = window.dataLayer || [];
    if (provider === 'gtm') {
      window.dataLayer.push({'gtm.start':Date.now(), event:'gtm.js'});
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(config.gtmContainerId)}`;
      document.head.append(script);
    } else {
      window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
      window.gtag('consent', 'default', {analytics_storage:'denied', ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied'});
      window.gtag('js', new Date());
      window.gtag('consent', 'update', {analytics_storage:'granted'});
      window.gtag('config', config.ga4MeasurementId, {send_page_view:false, allow_google_signals:false, allow_ad_personalization_signals:false});
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.ga4MeasurementId)}`;
      document.head.append(script);
    }
    trackPageView();
    emitVisibleFormViews();
  }
  function consentValue() { try { return localStorage.getItem(consentKey) || ''; } catch { return ''; } }
  function setConsent(value) { try { localStorage.setItem(consentKey, value); } catch {} }
  function showConsent() {
    if (!provider || document.querySelector('.analytics-consent')) return;
    const banner = document.createElement('section');
    banner.className = 'analytics-consent';
    banner.setAttribute('role','dialog');
    banner.setAttribute('aria-label','Analytics choices');
    banner.innerHTML = '<p><strong>Analytics choices</strong><span>Allow privacy-conscious analytics to help us improve the site. Core features work without it. <a href="privacy.html#analytics">Privacy Policy</a></span></p><div><button type="button" data-consent="reject">Reject non-essential</button><button type="button" class="button" data-consent="accept">Accept analytics</button></div>';
    banner.addEventListener('click', event => {
      const action = event.target.closest('[data-consent]')?.dataset.consent;
      if (!action) return;
      if (action === 'accept') { setConsent('granted'); banner.remove(); loadProvider(); }
      else { setConsent('denied'); banner.remove(); }
    });
    document.body.append(banner);
  }
  function resetConsent() {
    try { localStorage.removeItem(consentKey); } catch {}
    showConsent();
  }

  function destination(anchor) {
    try { const url = new URL(anchor.href, location.href); return url.origin === location.origin ? `${url.pathname}${url.hash}` : `${url.origin}${url.pathname}`; }
    catch { return ''; }
  }
  function locationName(element) {
    if (element.closest('footer')) return 'footer';
    if (element.closest('.site-header')) return document.querySelector('.site-header')?.classList.contains('menu-open') ? 'mobile_menu' : 'header';
    if (element.closest('.ask-able-panel')) return 'sticky';
    return element.closest('section[id]')?.id || 'inline';
  }
  function trackCategory(key) {
    const entry = categoryMap[key]; if (!entry) return;
    track('product_category_view', {category_id:entry[0], category_name:entry[1], page_type:pageType});
  }
  function serviceId(name) { return serviceMap[name] || String(name || '').toLowerCase().replace(/&amp;|&/g,'and').replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,''); }

  document.addEventListener('click', event => {
    const target = event.target.closest('a,button,summary');
    if (!target) return;
    const href = target.closest('a')?.getAttribute('href') || '';
    if (/^mailto:/i.test(href) || /^tel:/i.test(href)) {
      const contactLocation = target.closest('footer') ? 'footer' : pageType === 'privacy' ? 'privacy' : 'form_support';
      track('contact_click', {contact_type:href.startsWith('mailto:')?'email':'phone', contact_location:contactLocation, page_type:pageType});
      return;
    }
    const category = target.closest('[data-select-category],[data-analytics-category]');
    if (category) { trackCategory(category.dataset.selectCategory || category.dataset.analyticsCategory); return; }
    const workflow = target.closest('[data-workflow]');
    if (workflow && pageType === 'commerce_ai') {
      const name = workflow.dataset.workflow;
      track('commerce_service_view', {service_id:serviceId(name), service_name:name, content_type:workflow.closest('.work-card')?'case_study':'service', page_type:'commerce_ai', business_stream:'tech'});
      return;
    }
    const directionCta = target.closest('[data-product-direction-cta]');
    if (directionCta) {
      const key = document.querySelector('#guide-category')?.value || query.get('category') || '';
      track('product_direction_cta_click', {category_id:categoryMap[key]?.[0] || 'unspecified', cta_id:directionCta.dataset.analyticsId || 'product_direction_brief', business_stream:'trade', page_type:pageType});
      return;
    }
    const cta = target.closest('[data-analytics-id]');
    if (cta) {
      const url = cta.closest('a');
      const raw = url?.getAttribute('href') || '';
      track('cta_click', {cta_id:cta.dataset.analyticsId, cta_text:cta.textContent.trim(), cta_location:locationName(cta), destination_path:url?destination(url):undefined, destination_anchor:raw.startsWith('#')?raw:undefined, business_stream:cta.dataset.analyticsStream || businessStream, page_type:pageType});
      return;
    }
    const anchor = target.closest('a[href]');
    if (anchor && !anchor.closest('.privacy-layout nav')) {
      track('navigation_click', {link_text:anchor.textContent.trim(), destination_path:destination(anchor), nav_location:locationName(anchor), page_type:pageType});
    }
  });

  document.addEventListener('toggle', event => {
    const details = event.target;
    if (!(details instanceof HTMLDetailsElement) || !details.open || pageType !== 'commerce_ai') return;
    const card = details.closest('.work-card');
    if (card) {
      const name = card.querySelector('[data-workflow]')?.dataset.workflow || card.querySelector('h3')?.textContent || 'Case study';
      track('commerce_service_view', {service_id:serviceId(name), service_name:name, content_type:'case_study', page_type:'commerce_ai', business_stream:'tech'});
    } else if (details.id === 'diagnostic') {
      track('commerce_service_view', {service_id:'workflow_diagnostic', service_name:'Workflow diagnostic', content_type:'system', page_type:'commerce_ai', business_stream:'tech'});
    }
  }, true);

  const rail = document.querySelector('.production-rail');
  if (rail) {
    let userActivated = false, timer;
    const seen = new Set();
    const mark = () => { userActivated = true; };
    ['pointerdown','wheel','keydown'].forEach(type => rail.addEventListener(type, mark, {passive:type!=='keydown'}));
    document.querySelector('.rail-controls')?.addEventListener('click', () => { userActivated = true; clearTimeout(timer); timer = setTimeout(reportStage, 450); });
    function reportStage() {
      if (!userActivated) return;
      const center = rail.getBoundingClientRect().left + rail.clientWidth / 2;
      const stages = [...rail.querySelectorAll('[data-stage-id]')];
      const stage = stages.sort((a,b) => Math.abs((a.getBoundingClientRect().left+a.getBoundingClientRect().right)/2-center) - Math.abs((b.getBoundingClientRect().left+b.getBoundingClientRect().right)/2-center))[0];
      if (!stage || seen.has(stage.dataset.stageId)) return;
      seen.add(stage.dataset.stageId);
      track('manufacturing_stage_view', {stage_id:stage.dataset.stageId, stage_name:stage.dataset.stageName, stage_index:Number(stage.dataset.stageIndex), page_type:'manufacturing'});
    }
    rail.addEventListener('scroll', () => { clearTimeout(timer); timer = setTimeout(reportStage, 180); }, {passive:true});
  }

  const viewedForms = new WeakSet(), startedForms = new WeakSet();
  function formMeta(form, stream) {
    const type = String(stream || form.dataset.analyticsFormType || (form.id === 'workflow-form' || (form.id === 'ask-able-form' && pageType === 'commerce_ai') ? 'TECH' : 'TRADE')).toLowerCase();
    return {form_id:form.id || 'unnamed_form', form_type:type, page_type:pageType, business_stream:type, form_location:form.closest('.ask-able-panel')?'sticky':(form.closest('section[id]')?.id || 'inline')};
  }
  function trackForm(eventName, form, stream, extra = {}) { return track(eventName, {...formMeta(form,stream), ...extra}); }
  function emitVisibleFormViews() {
    document.querySelectorAll('form').forEach(form => {
      const rect = form.getBoundingClientRect();
      if (!viewedForms.has(form) && rect.bottom > 0 && rect.top < innerHeight && trackForm('form_view', form)) viewedForms.add(form);
    });
  }
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('focusin', event => {
      if (event.target.name === 'website_confirm' || event.target.matches('button,[type="submit"]') || startedForms.has(form)) return;
      startedForms.add(form); trackForm('form_start', form);
    });
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting && !viewedForms.has(form) && trackForm('form_view', form)) { viewedForms.add(form); observer.disconnect(); }
      }), {threshold:0.2});
      observer.observe(form);
    }
  });

  const analyticsChoices = document.querySelector('#analytics-choices');
  if (analyticsChoices && provider) { analyticsChoices.hidden = false; analyticsChoices.addEventListener('click', resetConsent); }
  window.AbleAnalytics = Object.freeze({track, trackForm, trackProductCategory:trackCategory, getAttribution, getAttributionRecord:() => JSON.parse(JSON.stringify(attributionRecord)), getFormAttribution, getDebugEvents:() => debugEvents.slice(), pageType, businessStream, provider:provider || 'none'});

  if (!provider) { if (debug) trackPageView(); return; }
  if (!config.consentRequired || consentValue() === 'granted') loadProvider();
  else if (consentValue() !== 'denied') showConsent();
})();
