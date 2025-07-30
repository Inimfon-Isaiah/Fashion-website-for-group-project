// Newsletter Form
document.addEventListener('DOMContentLoaded', function () {
  var form = document.querySelector('.newsletter-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var emailInput = form.querySelector('.newsletter-input');
      var email = emailInput.value;

      if (email) {
        alert('Thank you for subscribing! Check your email for your 10% discount code.');
        emailInput.value = '';
      }
    });
  }
});
