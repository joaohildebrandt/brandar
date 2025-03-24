import { memo } from 'react';
import { cn } from '../../../utils/style';

import styles from './styles.module.css';

export const Container = memo(
  ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
      <div className={cn(styles.container, className)} {...props}>
        {children}
      </div>
    );
  },
);
