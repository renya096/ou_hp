import type { Metadata } from "next";
import { getCleaningSegment } from "@/content/cleaning";
import { CleaningSegmentPage } from "../_parts";

const s = getCleaningSegment("minpaku")!;

export const metadata: Metadata = {
  title: s.title,
  description: s.description,
  alternates: { canonical: s.path },
  openGraph: { title: s.title, description: s.description, url: s.path },
};

export default function Page() {
  return <CleaningSegmentPage s={s} />;
}
