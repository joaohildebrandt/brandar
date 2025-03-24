import { useStore } from '../../../core/hooks/use-store';
import { cn } from '../../../utils/style';

import styles from './styles.module.css';

type GridProps = {
  className?: string;
  children: (props: { days: Date[] }) => React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>;

export const Grid = ({ children, ...props }: GridProps) => {
  const days = useStore((state) => state.calendar.days);

  return (
    <div {...props} className={cn(styles.grid)}>
      {children({
        days,
      })}
    </div>
  );
};
