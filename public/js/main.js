// Auto-dismiss flash messages after 4 seconds
document.querySelectorAll('.flash').forEach(el => {
  setTimeout(() => el.remove(), 4000);
});

// Confirm before delete (extra safety besides inline onsubmit)
document.querySelectorAll('form[action*="DELETE"]').forEach(form => {
  if (!form.hasAttribute('onsubmit')) {
    form.addEventListener('submit', e => {
      if (!confirm('Are you sure?')) e.preventDefault();
    });
  }
});
