import React, { useEffect, useState } from 'react';
import { Router } from 'react-router-dom';
import { AppRouter } from './app/router/AppRouter';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import { HistoryProvider } from './app/providers/HistoryProvider';
import './styles/globals.css';
import { History } from 'history';

const App: React.FC<{ history?: History }> = ({ history }) => {
    const [location, setLocation] = useState(history?.location || { pathname: '/rickmorty' });

    useEffect(() => {
      if (history) {
        setLocation(history.location);
        
        const unlisten = history.listen((update: any) => {
          setLocation(update.location || history.location);
        });
        return unlisten;
      }
    }, [history]);

  return (
    <ErrorBoundary>
      <HistoryProvider history={history}>
        <Router location={location} navigator={history}>
          <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
            <AppRouter />
          </div>
        </Router>
      </HistoryProvider>
    </ErrorBoundary>
  );
};

export default App; 