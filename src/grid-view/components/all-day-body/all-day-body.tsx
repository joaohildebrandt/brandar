import { cn } from '../../../utils/style';

import styles from './styles.module.css';

type AllDayBodyProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const AllDayBody = ({ className, ...props }: AllDayBodyProps) => {
  return <div className={cn(styles.allDayBody, className)} {...props} />;
};
