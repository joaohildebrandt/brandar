import { cn } from '../../../utils/style';

import styles from './styles.module.css';

type ViewProps = React.HTMLAttributes<HTMLDivElement>;

export const View = ({ className, children, ...props }: ViewProps) => {
  return (
    <div {...props} className={cn(styles.view, className)}>
      {children}
    </div>
  );
};
