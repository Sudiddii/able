(() => {
  const endpoint = 'https://formsubmit.co/ajax/' + ['didisu0322', 'gmail.com'].join('@');

  function context() {
    const params = new URLSearchParams(location.search);
    return {
      source_page: `${location.pathname || '/'}${location.search || ''}`,
      source_url: location.href,
      submitted_at: new Date().toISOString(),
      utm_source: params.get('utm_source') || 'Not supplied',
      utm_medium: params.get('utm_medium') || 'Not supplied',
      utm_campaign: params.get('utm_campaign') || 'Not supplied'
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

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.success === false || result.success === 'false') {
      throw new Error(result.message || 'The enquiry service did not accept this request.');
    }
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
