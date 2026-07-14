import { hydrateRoot } from 'react-dom/client';
import { App } from './App.jsx';
import '@omniship-labs/design-beacon/styles.css';
import './styles/site.less';

hydrateRoot(document.getElementById('root'), <App data={window.__DATA__} />);
