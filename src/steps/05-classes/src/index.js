const Counter = require('./Counter');

const root = document.getElementById('root');

const c = new Counter();
c.increment();
c.increment();
c.decrement();
root.textContent = c.toString();
