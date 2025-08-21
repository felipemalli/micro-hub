import { createRoot } from "react-dom/client";
import { createMemoryHistory, createBrowserHistory } from "history";
import RickMortyApp from "./RickMortyApp";

const mount = (el: HTMLElement, options: any = {}) => {
	const { sharedHistory, initialPath, defaultHistory, isAuthenticated } =
		options;

	const history =
		sharedHistory ||
		defaultHistory ||
		createMemoryHistory({
			initialEntries: [initialPath || "/"],
		});

	const root = createRoot(el);
	root.render(
		<RickMortyApp history={history} isAuthenticated={isAuthenticated} />
	);

	return {};
};

if (process.env.NODE_ENV === "development") {
	const devRoot = document.querySelector("#_rickmorty-dev-root");
	if (devRoot) {
		mount(devRoot as HTMLElement, {
			defaultHistory: createBrowserHistory(),
			initialPath: window.location.pathname || "/rickmorty",
		});
	}
}

export { mount };
