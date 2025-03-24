import { useStore } from '../../../core/hooks/use-store';
import { cn } from '../../../utils/style';

import styles from './styles.module.css';

type AllDayProps = {
  children: (props: { days: Date[] }) => React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>;

export const AllDay = ({ className, children, ...props }: AllDayProps) => {
  const days = useStore((state) => state.calendar.days);

  return (
    <div {...props} className={cn(styles.allDay, className)}>
      {children({ days })}
    </div>
  );
};
