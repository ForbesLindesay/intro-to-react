const root = document.getElementById('root');

setInterval(() => {
  root.innerHTML = `
    <p>${new Date().toString()}</p>
    <input placeholder="type something" />
  `;
}, 100);
