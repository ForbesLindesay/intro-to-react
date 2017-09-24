import React from 'react';
import { render } from 'react-dom';

import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import Presentation from './presentation';
import registerServiceWorker from './registerServiceWorker';

window.Prism = Prism;
const root = document.getElementById('root');

render(<Presentation />, root);

if (module.hot) {
  if (module.hot) {
    module.hot.accept();
  }
}

registerServiceWorker();
