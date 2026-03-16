import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "md" | "sm";

type SharedProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  fullWidth?: boolean;
};

type ButtonAsLinkProps = SharedProps & {
  href: string;
  target?: string;
  rel?: string;
};

type ButtonAsButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

export type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

function isLinkProps(props: ButtonProps): props is ButtonAsLinkProps {
  return typeof (props as ButtonAsLinkProps).href === "string";
}

function getClassNames(variant: ButtonVariant, size: ButtonSize, fullWidth: boolean, className?: string) {
  return [
    styles.button,
    variant === "primary" ? styles.primary : styles.secondary,
    size === "sm" ? styles.small : styles.medium,
    fullWidth ? styles.fullWidth : "",
    className ?? ""
  ]
    .filter(Boolean)
    .join(" ");
}

export function Button(props: ButtonProps) {
  const { children, variant = "primary", size = "md", className, fullWidth = false } = props;

  const classes = getClassNames(variant, size, fullWidth, className);

  if (isLinkProps(props)) {
    const { href, target, rel } = props;
    return (
      <Link className={classes} href={href} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  const {
    type = "button",
    variant: buttonVariant,
    size: buttonSize,
    className: classNameProp,
    fullWidth: fullWidthProp,
    children: buttonChildren,
    ...buttonProps
  } = props as ButtonAsButtonProps;

  void buttonVariant;
  void buttonSize;
  void classNameProp;
  void fullWidthProp;
  void buttonChildren;

  return (
    <button className={classes} type={type} {...buttonProps}>
      {children}
    </button>
  );
}
