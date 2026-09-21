document.querySelectorAll('[data-direction]').forEach(button => {
  button.addEventListener('click', () => {
    document.getElementById('product-direction').value = button.dataset.direction;
    document.getElementById('brief').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    document.getElementById('product-direction').focus({preventScroll:true});
  });
});
document.getElementById('direction-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const brief = ['ABLE TRADING / PRODUCT BRIEF', '', ...[...data.entries()].map(([key,value]) => `${key.toUpperCase()}: ${value}`)].join('\n');
  const url = URL.createObjectURL(new Blob([brief], {type:'text/plain;charset=utf-8'}));
  const link = document.createElement('a');
  link.href = url; link.download = 'able-product-brief.txt';
  document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.getElementById('brief-status').textContent = 'Your brief has been prepared for download. It has not been sent to Able.';
});
