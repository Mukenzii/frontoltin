export interface IBook {
  guid: string;
  title: string;
  author: string;
  thumbnail: string;
  language: string;
  hardcover: string;
  publisher: string;
  isbn: string;
  short_description: string;
  short_description_uz: string;
  short_description_ru: string;
  published_date: string;
  created_at: string | Date;
  types: { guid: string; book_type: string; price: string };
}
