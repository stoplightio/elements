import { Drawer as DrawerComponent } from '@stoplight/ui-kit';
import * as React from 'react';

interface IDrawer {
  isOpen: boolean;
  className?: string;
  backdropClassName?: string;
  onClose?: () => void;
}

export const Drawer: React.FunctionComponent<IDrawer> = ({
  isOpen,
  className,
  backdropClassName,
  onClose,
  children,
}) => {
  return (
    <DrawerComponent className={className} backdropClassName={backdropClassName} isOpen={isOpen} onClose={onClose}>
      {children}
    </DrawerComponent>
  );
};
