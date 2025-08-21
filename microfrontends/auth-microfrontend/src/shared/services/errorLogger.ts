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

// Implementação básica - pode ser substituída por Sentry, LogRocket, etc.
class ConsoleErrorService implements ErrorService {
	captureError(error: Error, context: ErrorContext): void {
		console.group("🚨 Error Boundary Capture");
		console.error("Error:", error.message);
		console.error("Stack:", error.stack);
		console.table(context);
		console.groupEnd();

		// Em produção, enviar para serviço de monitoramento
		if (process.env.NODE_ENV === "production") {
			// Example: Sentry.captureException(error, { contexts: { errorBoundary: context } });
			// Example: LogRocket.captureException(error);
		}
	}
}

class SentryErrorService implements ErrorService {
	captureError(error: Error, context: ErrorContext): void {
		// TODO: Implementar integração com Sentry
		console.warn("Sentry integration not implemented yet");
		new ConsoleErrorService().captureError(error, context);
	}
}

export const errorLogger: ErrorService =
	process.env.NODE_ENV === "production"
		? new SentryErrorService()
		: new ConsoleErrorService();
