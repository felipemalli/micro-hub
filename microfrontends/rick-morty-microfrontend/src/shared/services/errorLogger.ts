interface ErrorContext {
	context: string;
	componentStack?: string;
	timestamp: string;
	userAgent: string;
	url: string;
	userId?: string;
}

interface ErrorService {
	captureError(error: Error, context: ErrorContext): void;
}

class ConsoleErrorService implements ErrorService {
	captureError(error: Error, context: ErrorContext): void {
		console.group("🚨 Error Boundary Capture");
		console.error("Error:", error.message);
		console.error("Stack:", error.stack);
		console.table(context);
		console.groupEnd();
	}
}

// TODO: Integração com Sentry
class SentryErrorService implements ErrorService {
	captureError(error: Error, context: ErrorContext): void {
		console.warn("Sentry integration not implemented yet");
		new ConsoleErrorService().captureError(error, context);
	}
}

export const errorLogger: ErrorService =
	process.env.NODE_ENV === "production"
		? new SentryErrorService()
		: new ConsoleErrorService();
