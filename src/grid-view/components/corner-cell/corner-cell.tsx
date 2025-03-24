import { memo } from 'react';
import { useStore } from '../../../core';
import { cn } from '../../../utils/style';

import styles from './styles.module.css';

export const CornerCell = memo(
  ({
    className,
    style,
    children,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>) => {
    const {
      cell: {
        hour: { width },
      },
    } = useStore((state) => state.gridView.config);
    return (
      <div
        className={cn(styles.cornerCell, className)}
        style={{ ...style, width }}
        {...props}
      >
        {children}
      </div>
    );
  },
);
