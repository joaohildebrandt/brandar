type WeekCellProps = React.HTMLAttributes<HTMLDivElement>;

export const WeekCell = ({ className, children, ...props }: WeekCellProps) => {
  return <div {...props}>{children}</div>;
};
