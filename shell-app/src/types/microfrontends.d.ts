declare module 'auth/AuthApp' {
  import { ComponentType } from 'react';
  
  interface AuthAppProps {
    onAuthChange?: (isAuthenticated: boolean) => void;
  }
  
  const AuthApp: ComponentType<AuthAppProps>;
  export default AuthApp;
}

declare module 'rickmorty/RickMortyApp' {
  import { ComponentType } from 'react';
  
  interface RickMortyAppProps {
    isAuthenticated?: boolean;
  }
  
  const RickMortyApp: ComponentType<RickMortyAppProps>;
  export default RickMortyApp;
}