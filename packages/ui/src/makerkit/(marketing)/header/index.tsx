import { cn } from '../../../lib/utils';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  logo?: React.ReactNode;
  navigation?: React.ReactNode;
  actions?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  className,
  logo,
  navigation,
  actions,
  ...props
}) => (
  <div
    className={cn(
      'site-header bg-background/80 dark:bg-background/50 sticky top-0 z-10 w-full py-1 backdrop-blur-md',
      className
    )}
    {...props}
  >
    <div className="container">
      <div className="grid h-14 grid-cols-3 items-center">
        <div className={'mx-auto md:mx-0'}>{logo}</div>
        <div className="order-first md:order-none">{navigation}</div>
        <div className="flex items-center justify-end gap-x-2">{actions}</div>
      </div>
    </div>
  </div>
);
