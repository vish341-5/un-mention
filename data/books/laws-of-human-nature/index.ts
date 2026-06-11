import { Book } from "@/types/book";
import day1 from "./day1";
// import day2 from "./day2"; etc

const yourBook: Book = {
  slug: "your-book-slug",
  title: "Book Title",
  author: "Author Name",
  description: "Short description here.",
  coverImage: "/covers/your-book.jpg",
  theme: "dark",
  accentColor: "#YOURCOLOR",
  days: [day1], // add more as you build them
};

export default yourBook;