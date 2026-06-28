import Link from "next/link";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "text-link"
  | "text-link-on-dark";

const base =
  "btn-press inline-flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200";

const variants: Record<ButtonVariant, string> = {
  primary:
    "rounded-full bg-white px-6 py-3 text-[15px] font-semibold leading-none text-black hover:bg-zinc-200",
  secondary:
    "rounded-full border border-white/10 bg-white/5 px-6 py-3 text-[15px] font-medium leading-none text-white hover:border-white/20 hover:bg-white/10",
  ghost:
    "rounded-full border border-transparent bg-transparent px-6 py-3 text-[15px] font-medium leading-none text-zinc-400 hover:border-white/5 hover:text-white hover:bg-white/5",
  "text-link":
    "bg-transparent p-0 text-[15px] font-medium text-primary-on-dark underline-offset-[6px] hover:underline",
  "text-link-on-dark":
    "bg-transparent p-0 text-[15px] font-medium text-primary-on-dark underline-offset-[6px] hover:underline",
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
  variant = "primary",
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
