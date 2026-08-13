import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { ArrowRightIcon } from "./icons";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-border bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-center gap-3 text-xs font-medium text-brand-blue">
        <span className="rounded-full bg-brand-sky px-3 py-1">{post.category}</span>
        <span className="text-foreground/40">{post.readingTime}</span>
      </div>
      <h3 className="mt-4 font-display text-lg font-bold text-brand-navy group-hover:text-brand-blue">
        {post.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm text-foreground/65">{post.excerpt}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue">
        Læs artiklen
        <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
