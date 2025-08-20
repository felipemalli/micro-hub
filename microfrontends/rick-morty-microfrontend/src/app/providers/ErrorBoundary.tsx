import { Component, ErrorInfo, ReactNode } from 'react';
import { CoreButton } from "@felipemalli-libs/microhub-ui/react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <div className="text-red-600 mb-4">
              <span className="text-6xl">💥</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Ops! Algo deu errado
            </h1>
            <p className="text-gray-600 mb-4">
              Ocorreu um erro inesperado. Tente recarregar a página.
            </p>
            <CoreButton
              variant="outline"
              type="button"
              onCoreClick={() => window.location.reload()}
            >
              Recarregar página
            </CoreButton>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 