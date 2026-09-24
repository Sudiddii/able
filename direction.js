document.querySelectorAll('[data-direction]').forEach(button => {
  button.addEventListener('click', () => {
    const direction = document.getElementById('product-direction');
    const section = document.getElementById('brief');
    if (!direction || !section) return;
    direction.value = button.dataset.direction;
    section.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    direction.focus({preventScroll:true});
  });
});

const directionForm = document.getElementById('direction-form');
if (directionForm) directionForm.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const params = new URLSearchParams(location.search);
  const context = {
    enquiry_type: 'Product development and manufacturing',
    source_page: location.pathname || '/',
    utm_source: params.get('utm_source') || 'Not supplied',
    utm_medium: params.get('utm_medium') || 'Not supplied',
    utm_campaign: params.get('utm_campaign') || 'Not supplied',
    prepared_at: new Date().toISOString()
  };
  const brief = ['ABLE TRADING / PRODUCT BRIEF', '', ...[...data.entries()].map(([key,value]) => `${key.toUpperCase()}: ${value || 'Not supplied'}`), ...Object.entries(context).map(([key,value]) => `${key.toUpperCase()}: ${value}`), '', 'Prepared locally. This brief has not been sent to Able.'].join('\n');
  const url = URL.createObjectURL(new Blob([brief], {type:'text/plain;charset=utf-8'}));
  const link = document.createElement('a');
  link.href = url; link.download = 'able-product-brief.txt';
  document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.getElementById('brief-status').textContent = 'Your brief is ready for download. It has not been sent to Able.';
});
