import { AFFILIATE_URL } from "@/lib/constants";
import { ArrowRightIcon, BoltIcon } from "./icons";

type Props = {
  children: React.ReactNode;
  size?: "md" | "lg";
  variant?: "primary" | "dark";
  className?: string;
  icon?: boolean;
};

export default function CtaButton({
  children,
  size = "md",
  variant = "primary",
  className = "",
  icon = true,
}: Props) {
  const sizeClasses =
    size === "lg" ? "px-8 py-4 text-lg" : "px-6 py-3 text-base";

  const variantClasses =
    variant === "primary"
      ? "bg-accent text-accent-foreground hover:bg-accent-dark"
      : "bg-brand-navy text-white hover:bg-brand-navy-light";

  return (
    <a
      href={AFFILIATE_URL}
      target="_blank"
      rel="nofollow sponsored noopener"
      className={`group inline-flex items-center justify-center gap-2 rounded-full font-semibold shadow-sm transition-all hover:shadow-lg hover:-translate-y-0.5 ${sizeClasses} ${variantClasses} ${className}`}
    >
      {icon && <BoltIcon className="w-5 h-5" />}
      {children}
      <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}
