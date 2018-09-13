import Counter from './Counter';

const root = document.getElementById('root');

const c = new Counter();
const i = c.increment;
const d = c.decrement;
i();
i();
d();
root.textContent = c.toString();
