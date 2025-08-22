declare module "auth/AuthApp" {
	interface MountFunction {
		(
			el: HTMLElement,
			options?: {
				initialPath?: string;
				onNavigate?: (location: { pathname: string }) => void;
				onAuthChange?: (isAuthenticated: boolean) => void;
				defaultHistory?: any;
			}
		): {
			onParentNavigate?: (location: { pathname: string }) => void;
		};
	}

	export const mount: MountFunction;
}

declare module "rickmorty/RickMortyApp" {
	interface MountFunction {
		(
			el: HTMLElement,
			options?: {
				initialPath?: string;
				onNavigate?: (location: { pathname: string }) => void;
				isAuthenticated?: boolean;
				defaultHistory?: any;
			}
		): {
			onParentNavigate?: (location: { pathname: string }) => void;
		};
	}

	export const mount: MountFunction;
}
