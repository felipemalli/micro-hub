import { createRoot } from 'react-dom/client';
import { createMemoryHistory, createBrowserHistory } from 'history';
import RickMortyApp from './RickMortyApp';
import './index.css';

const mount = (el: HTMLElement, { onNavigate, defaultHistory, initialPath }: any = {}) => {
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath || '/'],
  });

  if (onNavigate) {
    history.listen((update: any) => {
      onNavigate({ pathname: update.location.pathname });
    });
  }

  const root = createRoot(el);
  root.render(
    // @ts-ignore
      <RickMortyApp history={history} />
  );

  return {
    onParentNavigate({ pathname: nextPathname }: { pathname: string }) {
      const { pathname } = history.location;

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_rickmorty-dev-root');

  console.log('Em desenvolvimento!');

  if (devRoot) {
    mount(devRoot as HTMLElement, { defaultHistory: createBrowserHistory() });
  }
}

// We are running through container
// and we should export the mount function
export { mount };