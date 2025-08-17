import { createRoot } from 'react-dom/client';
import { createMemoryHistory, createBrowserHistory } from 'history';
import RickMortyApp from './RickMortyApp';
import './index.css';

const mount = (el: HTMLElement, options: any = {}) => {
  const { onNavigate, defaultHistory, initialPath } = options;
  
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath || '/'],
  });

  if (onNavigate) {
    history.listen(({ location }) => onNavigate({ pathname: location.pathname }));
  }

  const root = createRoot(el);
  root.render(<RickMortyApp history={history} />);

  return {
    onParentNavigate: ({ pathname }) => {
      if (history.location.pathname !== pathname) {
        history.push(pathname);
      }
    },
  };
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_rickmorty-dev-root');
  if (devRoot) {
    mount(devRoot as HTMLElement, { defaultHistory: createBrowserHistory() });
  }
}

export { mount };