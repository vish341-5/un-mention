import { notFound } from "next/navigation";
import { getBookBySlug, getDay } from "@/data/books/index";
import CardReader from "@/components/reader/CardReader";

interface Props {
  params: {
    slug: string;
    day: string;
  };
}

export default function DayPage({ params }: Props) {
  const book = getBookBySlug(params.slug);
  if (!book) notFound();

  const day = getDay(params.slug, parseInt(params.day));
  if (!day) notFound();

  return <CardReader day={day} book={book} />;
}

export function generateStaticParams() {
  // Add your book slugs and day numbers here
  return [
    { slug: "48-laws-of-power", day: "1" },
    { slug: "atomic-habits", day: "1" },
    { slug: "zero-to-one", day: "1" },
  ];
}
