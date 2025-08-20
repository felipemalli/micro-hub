import React from "react";
import MicrofrontendWrapper from "./MicrofrontendWrapper";

interface AuthAppProps {
	onAuthChange?: (isAuthenticated: boolean) => void;
}

const AuthApp: React.FC<AuthAppProps> = ({ onAuthChange }) => {
	const mountAuth = async (el: HTMLElement, options: any) => {
		const { mount } = await import("auth/AuthApp");
		return mount(el, options);
	};

	return <MicrofrontendWrapper mount={mountAuth} onAuthChange={onAuthChange} />;
};

export default AuthApp;
