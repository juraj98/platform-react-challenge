import Link from "next/link";
import type { FC, MouseEvent, MouseEventHandler, ReactNode } from "react";
import { useCallback } from "react";

export interface NonRedirectLinkProps {
  href: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  className?: string;
}

export const NonRedirectLink: FC<NonRedirectLinkProps> = ({
  href,
  children,
  className,
  onClick,
}) => {
  const onClickListener = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      event.stopPropagation();

      if (window) {
        window.history.pushState({ href }, "", href);
      }

      if (onClick) onClick(event);
    },
    [href, onClick]
  );

  return (
    <Link href={href} className={className} onClick={onClickListener}>
      {children}
    </Link>
  );
};
