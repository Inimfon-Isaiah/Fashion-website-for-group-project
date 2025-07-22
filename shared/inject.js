// inject.js
fetch('/shared/navbar.html')
  .then(res => res.text())
  .then(data => document.getElementById('navbar').innerHTML = data);

fetch('/shared/footer.html')
  .then(res => res.text())
  .then(data => {
    const footer = document.createElement('div');
    footer.innerHTML = data;
    document.body.appendChild(footer);
  });
