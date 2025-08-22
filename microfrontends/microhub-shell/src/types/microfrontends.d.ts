interface BaseMicrofrontendOptions {
	initialPath?: string;
	onNavigate?: (location: { pathname: string }) => void;
	defaultHistory?: any;
	sharedHistory?: any;
	[key: string]: any;
}

interface MicrofrontendMountResult {
	onParentNavigate?: (location: { pathname: string }) => void;
	unmount?: () => void;
	[key: string]: any;
}

interface GenericMountFunction {
	(
		el: HTMLElement,
		options?: BaseMicrofrontendOptions
	): MicrofrontendMountResult | Promise<MicrofrontendMountResult>;
}

declare module "*" {
	export const mount: GenericMountFunction;
}

declare global {
	namespace Microfrontends {
		interface AuthOptions extends BaseMicrofrontendOptions {
			onAuthChange?: (isAuthenticated: boolean) => void;
		}

		interface RickMortyOptions extends BaseMicrofrontendOptions {
			isAuthenticated?: boolean;
		}
	}
}
