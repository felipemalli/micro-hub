import React from 'react';
import MicrofrontendWrapper from './MicrofrontendWrapper';

interface RickMortyAppProps {
  isAuthenticated?: boolean;
}

const RickMortyApp: React.FC<RickMortyAppProps> = ({ isAuthenticated }) => {
  const mountRickMorty = async (el: HTMLElement, options: any) => {

    const { mount } = await import('rickmorty/RickMortyApp');
    return mount(el, options);
  };

  return (
    <MicrofrontendWrapper
      mount={mountRickMorty}
      isAuthenticated={isAuthenticated}
    />
  );
};

export default RickMortyApp; 