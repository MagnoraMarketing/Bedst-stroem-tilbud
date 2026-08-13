import Link from "next/link";
import { mainNav } from "@/lib/constants";
import Container from "./Container";
import CtaButton from "./CtaButton";
import Logo from "./Logo";
import MobileNav from "./MobileNav";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/90 backdrop-blur">
      <Container className="flex h-18 items-center justify-between gap-4 py-3">
        <Logo />

        <nav className="hidden lg:flex items-center gap-1">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-surface hover:text-brand-navy"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <CtaButton size="md" icon={false}>
            Få gratis tilbud
          </CtaButton>
        </div>

        <MobileNav />
      </Container>
    </header>
  );
}
