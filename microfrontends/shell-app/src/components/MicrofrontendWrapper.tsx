import React, { useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface MicrofrontendWrapperProps {
  mount: (el: HTMLElement, options: any) => any;
  [key: string]: any;
}

const MicrofrontendWrapper: React.FC<MicrofrontendWrapperProps> = ({ 
  mount,
  ...additionalProps
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const onParentNavigateRef = useRef<((options: { pathname: string }) => void) | null>(null);

  useEffect(() => {
    if (ref.current && mount) {
      try {
        const mountOptions = {
          initialPath: location.pathname,
          onNavigate: ({ pathname: nextPathname }: { pathname: string }) => {
            if (location.pathname !== nextPathname) {
              navigate(nextPathname);
            }
          },
          ...additionalProps
        };

        const mountedInstance = mount(ref.current, mountOptions);

        if (mountedInstance?.onParentNavigate) {
          onParentNavigateRef.current = mountedInstance.onParentNavigate;
        }
      } catch (error) {
        console.error('Error mounting microfrontend:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (onParentNavigateRef.current) {
      onParentNavigateRef.current({ pathname: location.pathname });
    }
  }, [location.pathname]);

  return <div ref={ref} />;
};

export default MicrofrontendWrapper;