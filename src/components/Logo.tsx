import Link from "next/link";
import { BoltIcon } from "./icons";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-navy text-accent">
        <BoltIcon className="w-5 h-5" />
      </span>
      <span className="font-display text-lg font-bold leading-none text-brand-navy">
        Billig
        <span className="text-brand-blue">elrengning</span>
        <span className="text-accent-dark">.dk</span>
      </span>
    </Link>
  );
}
