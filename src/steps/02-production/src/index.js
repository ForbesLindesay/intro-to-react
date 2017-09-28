const root = document.getElementById('root');

setInterval(() => {
  root.innerHTML = `
    <p>
      Mode:
      <span className=${process.env.NODE_ENV === 'production' ? 'green' : 'red'}>
        ${process.env.NODE_ENV}
      </span>
    </p>
    <p>${new Date().toString()}</p>
    <input placeholder="type something" />
  `;
}, 100);
