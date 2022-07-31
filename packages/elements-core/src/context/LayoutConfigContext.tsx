import React, { useContext } from 'react';

import { LayoutConfig } from '../types';
import { defaultLayoutConfig } from './defaultLayoutConfig';
import { defaultLayoutConfig as defaultLayoutConfigPTBR } from './defaultLayoutConfig_PT-BR';

export type LayoutConfigLanguage = 'EN' | 'PT-BR';

type LayoutConfigProviderProps = {
  config: LayoutConfig;
  setConfig: (config: LayoutConfig | LayoutConfigLanguage) => void;
};

const LayoutConfigContext = React.createContext<LayoutConfigProviderProps>({
  config: defaultLayoutConfig,
  setConfig: () => {},
});
LayoutConfigContext.displayName = 'LayoutConfigContext';

export const LayoutConfigProvider: React.FC = ({ children }) => {
  const [layoutConfig, setLayoutConfig] = React.useState<LayoutConfig>(defaultLayoutConfig);

  const setLayoutConfigHandler = React.useCallback((newConfig: LayoutConfig | LayoutConfigLanguage) => {
    if (typeof newConfig === 'string') {
      if (newConfig === 'EN') {
        setLayoutConfig(defaultLayoutConfig);
      }
      if (newConfig === 'PT-BR') {
        setLayoutConfig(defaultLayoutConfigPTBR);
      }
    } else {
      setLayoutConfig((previousConfig: LayoutConfig) => {
        return Object.keys(previousConfig).reduce((obj, key) => {
          if (newConfig.hasOwnProperty(key)) {
            obj[key] = { ...previousConfig[key], ...newConfig[key] };
          } else {
            obj[key] = previousConfig[key];
          }
          return obj;
        }, {});
      });
    }
  }, []);

  const contextValue: LayoutConfigProviderProps = {
    config: layoutConfig,
    setConfig: setLayoutConfigHandler,
  };

  return <LayoutConfigContext.Provider value={contextValue}>{children}</LayoutConfigContext.Provider>;
};

export const useLayoutConfigStarter = (userConfig?: LayoutConfig | LayoutConfigLanguage | undefined) => {
  const { config, setConfig } = useContext(LayoutConfigContext);

  React.useEffect(() => {
    if (!userConfig) return;
    setConfig(userConfig);
  }, [userConfig, setConfig]);

  return config;
};

export const useLayoutConfig = () => {
  const { config } = useContext(LayoutConfigContext);
  return config;
};
