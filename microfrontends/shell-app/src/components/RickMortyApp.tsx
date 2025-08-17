import React from 'react';
import MicrofrontendWrapper from './MicrofrontendWrapper';

interface RickMortyAppProps {
  isAuthenticated?: boolean;
}

const RickMortyApp: React.FC<RickMortyAppProps> = ({ isAuthenticated }) => {
  return (
    <MicrofrontendWrapper
      moduleName="RickMortyApp"
      moduleScope="rickmorty"
      isAuthenticated={isAuthenticated}
    />
  );
};

export default RickMortyApp; 