import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Demo app para testar os componentes
import Button from './components/Button/Button';
import Card from './components/Card/Card';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          🧩 Componentes Compartilhados
        </h1>
        
        <div className="space-y-8">
          {/* Botões */}
          <Card>
            <h2 className="text-xl font-semibold mb-4">Botões</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="success">Success</Button>
              <Button loading>Loading...</Button>
            </div>
          </Card>

          {/* Cards */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card variant="default" hover>
                <h3 className="font-semibold">Card Padrão</h3>
                <p className="text-gray-600">Com hover effect</p>
              </Card>
              <Card variant="elevated">
                <h3 className="font-semibold">Card Elevado</h3>
                <p className="text-gray-600">Sombra mais forte</p>
              </Card>
              <Card variant="outlined">
                <h3 className="font-semibold">Card com Borda</h3>
                <p className="text-gray-600">Estilo minimalista</p>
              </Card>
              <Card variant="glass">
                <h3 className="font-semibold">Card Glass</h3>
                <p className="text-gray-600">Efeito glassmorphism</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);