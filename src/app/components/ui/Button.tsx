import Link from "next/link";

type ButtonVariant = "ghost" | "filled";

const base =
  "inline-flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 rounded-[32px] button-cap px-6 py-3";

const variants: Record<ButtonVariant, string> = {
  ghost:
    "border border-ink text-ink bg-transparent hover:bg-canvas-card",
  filled:
    "border border-hairline text-ink bg-canvas-card hover:bg-hairline",
};

interface ButtonProps {
  variant?: ButtonVariant;
  href?: string;
  download?: boolean;
  target?: string;
  rel?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({
  variant = "ghost",
  href,
  download,
  target,
  rel,
  type = "button",
  disabled,
  className = "",
  children,
  onClick,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        download={download}
        target={target}
        rel={rel}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={classes}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
