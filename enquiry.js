(() => {
  const endpoint = 'https://formsubmit.co/ajax/' + ['didisu0322', 'gmail.com'].join('@');

  function context() {
    let attribution = {};
    try {
      attribution = window.AbleAnalytics?.getFormAttribution?.() || {};
      if (!Object.keys(attribution).length) {
        const record = JSON.parse(sessionStorage.getItem('able_attribution_v1') || 'null');
        attribution = record?.last || record?.first || {};
      }
    } catch {}
    return {
      source_page: `${location.pathname || '/'}${location.search || ''}`,
      source_url: location.href,
      submitted_at: new Date().toISOString(),
      utm_source: attribution.utm_source || 'Not supplied',
      utm_medium: attribution.utm_medium || 'Not supplied',
      utm_campaign: attribution.utm_campaign || 'Not supplied',
      utm_content: attribution.utm_content || 'Not supplied',
      utm_term: attribution.utm_term || 'Not supplied',
      gclid: attribution.gclid || 'Not supplied',
      ...attribution
    };
  }

  async function send({ form, stream, subject, extra = {} }) {
    const fields = Object.fromEntries(new FormData(form));
    if (fields.website_confirm) return { discarded: true };
    delete fields.website_confirm;

    const payload = {
      _subject: subject,
      _template: 'table',
      _replyto: fields.email || '',
      enquiry_stream: stream,
      ...fields,
      ...extra,
      ...context()
    };

    window.AbleAnalytics?.trackForm?.('form_submit_attempt', form, stream);
    let response;
    try {
      response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      window.AbleAnalytics?.trackForm?.('form_submit_error', form, stream, { error_type: 'network' });
      throw error;
    }
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.success === false || result.success === 'false') {
      window.AbleAnalytics?.trackForm?.('form_submit_error', form, stream, { error_type: 'endpoint' });
      throw new Error(result.message || 'The enquiry service did not accept this request.');
    }
    window.AbleAnalytics?.trackForm?.('form_submit_success', form, stream);
    return result;
  }

  function setPending(button, pending, pendingText = 'Sending…') {
    if (!button) return;
    if (pending) {
      button.dataset.label = button.textContent;
      button.textContent = pendingText;
      button.disabled = true;
      button.setAttribute('aria-busy', 'true');
    } else {
      button.textContent = button.dataset.label || button.textContent;
      button.disabled = false;
      button.removeAttribute('aria-busy');
    }
  }

  window.AbleEnquiry = { send, setPending, context };
})();
