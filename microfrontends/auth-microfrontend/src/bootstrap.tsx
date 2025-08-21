import { createRoot } from "react-dom/client";
import { createMemoryHistory, createBrowserHistory } from "history";
import AuthApp from "./AuthApp";

const mount = (el: HTMLElement, options: any = {}) => {
	const { sharedHistory, initialPath, defaultHistory, onAuthChange } = options;

	const history =
		sharedHistory ||
		defaultHistory ||
		createMemoryHistory({
			initialEntries: [initialPath || "/"],
		});

	const root = createRoot(el);
	root.render(<AuthApp history={history} onAuthChange={onAuthChange} />);

	return {};
};

if (process.env.NODE_ENV === "development") {
	const devRoot = document.querySelector("#_auth-dev-root");
	if (devRoot) {
		mount(devRoot as HTMLElement, {
			defaultHistory: createBrowserHistory(),
			initialPath: window.location.pathname || "/auth",
		});
	}
}

export { mount };
