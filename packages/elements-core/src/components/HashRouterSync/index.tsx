import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * HashRouterSync ensures React Router v6's HashRouter properly responds to hash changes
 * when used in web component contexts (like Custom Elements with Shadow DOM).
 * 
 * The issue: React Router v6's HashRouter doesn't always detect hash changes when:
 * - Embedded in a web component
 * - Running inside another SPA framework (e.g., VitePress)
 * - Events don't properly bubble through Shadow DOM boundaries
 * 
 * This component listens for hash changes and forces React Router to navigate,
 * ensuring content updates when users click navigation links.
 */
export const HashRouterSync = (): null => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Track the current hash to detect changes
    let currentHash = window.location.hash;

    const syncHashWithRouter = () => {
      const newHash = window.location.hash;
      
      // Only navigate if the hash actually changed and doesn't match React Router's current location
      if (newHash !== currentHash) {
        currentHash = newHash;
        
        // Extract the path from the hash (e.g., "#/path" -> "/path")
        const path = newHash.slice(1) || '/';
        
        // Only navigate if React Router isn't already at this path
        if (location.pathname + location.search + location.hash !== path) {
          navigate(path, { replace: true });
        }
      }
    };

    // Listen for hash changes from the browser
    window.addEventListener('hashchange', syncHashWithRouter);

    // Also listen for popstate events (browser back/forward)
    window.addEventListener('popstate', syncHashWithRouter);

    // Sync on mount to handle direct navigation to hashed URLs
    syncHashWithRouter();

    return () => {
      window.removeEventListener('hashchange', syncHashWithRouter);
      window.removeEventListener('popstate', syncHashWithRouter);
    };
  }, [navigate, location]);

  return null;
};

