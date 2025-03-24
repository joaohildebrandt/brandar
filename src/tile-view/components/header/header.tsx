import { useStore } from '../../../core/hooks/use-store';
import { cn } from '../../../utils/style';

import styles from './styles.module.css';

type TileGridProps = {
  className?: string;
  children: (props: { week: string[] }) => React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>;

export const Header = ({ children, ...props }: TileGridProps) => {
  const week = useStore((state) => state.calendar.week);

  return (
    <div {...props} className={cn(styles.header)}>
      {children({
        week,
      })}
    </div>
  );
};
