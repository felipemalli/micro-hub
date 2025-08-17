import React from 'react';
import MicrofrontendWrapper from './MicrofrontendWrapper';

interface AuthAppProps {
  onAuthChange?: (isAuthenticated: boolean) => void;
}

const AuthApp: React.FC<AuthAppProps> = ({ onAuthChange }) => {
  return (
    <MicrofrontendWrapper
      moduleName="AuthApp"
      moduleScope="auth"
      onAuthChange={onAuthChange}
    />
  );
};

export default AuthApp; 