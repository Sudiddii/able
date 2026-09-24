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
if (directionForm) directionForm.addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const button = form.querySelector('[type="submit"]');
  const status = document.getElementById('brief-status');
  status.textContent = '';
  AbleEnquiry.setPending(button, true);
  try {
    const result = await AbleEnquiry.send({
      form,
      stream: 'TRADE',
      subject: '[ABLE TRADE] New product / manufacturing enquiry',
      extra: { enquiry_type: 'Product development and manufacturing' }
    });
    if (!result.discarded) {
      status.textContent = 'Thank you. Your trade enquiry has been sent to Able.';
      form.reset();
    }
  } catch (error) {
    status.textContent = 'We could not send your enquiry. Please check your connection and try again.';
    console.error('Able trade enquiry failed:', error);
  } finally {
    AbleEnquiry.setPending(button, false);
  }
});
