import React, { useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createBrowserHistory } from 'history';

interface MicrofrontendWrapperProps {
  moduleName: string;
  moduleScope: string;
  onAuthChange?: (isAuthenticated: boolean) => void;
  isAuthenticated?: boolean;
  [key: string]: any;
}

const MicrofrontendWrapper: React.FC<MicrofrontendWrapperProps> = ({ 
  moduleName,
  moduleScope,
  onAuthChange,
  isAuthenticated,
  ...additionalProps
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const mountMicrofrontend = async () => {
      if (ref.current) {
        try {
          let mountFunction;
          
          if (moduleScope === 'auth' && moduleName === 'AuthApp') {
            // @ts-ignore
            const authModule = await import('auth/AuthApp');
            mountFunction = authModule.mount;
          } else if (moduleScope === 'rickmorty' && moduleName === 'RickMortyApp') {
            // @ts-ignore
            const rickMortyModule = await import('rickmorty/RickMortyApp');
            mountFunction = rickMortyModule.mount;
          } else {
            throw new Error(`Unknown microfrontend: ${moduleScope}/${moduleName}`);
          }
          
          if (!mountFunction) {
            throw new Error(`Mount function not found in ${moduleScope}/${moduleName}`);
          }
          
          const history = createBrowserHistory();

          // Preparar as opções para passar para o mount
          const mountOptions = {
            initialPath: location.pathname,
            onNavigate: ({ pathname: nextPathname }: { pathname: string }) => {
              const { pathname } = location;
              if (pathname !== nextPathname) {
                navigate(nextPathname);
              }
            },
            defaultHistory: history,
            // Adicionar props condicionalmente
            ...(onAuthChange && { onAuthChange }),
            ...(isAuthenticated !== undefined && { isAuthenticated }),
            ...additionalProps
          };

          const mountedInstance = mountFunction(ref.current, mountOptions);

          // Cleanup function
          return () => {
            if (mountedInstance?.onParentNavigate) {
              mountedInstance.onParentNavigate({ pathname: location.pathname });
            }
          };
        } catch (error) {
          console.error(`Error loading ${moduleScope}/${moduleName} microfrontend:`, error);
          console.error('Error details:', error);
        }
      }
    };

    mountMicrofrontend();
  }, [moduleName, moduleScope, location.pathname, navigate, onAuthChange, isAuthenticated]);

  // Handle parent navigation changes
  useEffect(() => {
    // A navegação será tratada pelo mount function acima
  }, [location]);

  return <div ref={ref} />;
};

export default MicrofrontendWrapper;