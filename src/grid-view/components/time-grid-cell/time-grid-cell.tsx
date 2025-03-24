import { memo } from 'react';
import { cn } from '../../../utils/style';

import { useStore } from '../../../core/hooks/use-store';
import styles from './styles.module.css';

type CellProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const TimeGridCell = memo((props: CellProps) => {
  const {
    cell: {
      hour: { height },
    },
  } = useStore((state) => state.gridView.config);
  // const width = useStore((state) => state.gridView.config.cell.hour.width);

  return (
    <div
      {...props}
      className={cn(styles.timeGridCell, props.className)}
      style={{
        ...props.style,
        height,
        // width,
      }}
    />
  );
});
