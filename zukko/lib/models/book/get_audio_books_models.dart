class GetAudioBooksModel {
  GetAudioBooksModel({this.count, this.next, this.previous, this.results});

  int? count;
  String? next;
  dynamic previous;
  List<Result>? results;

  factory GetAudioBooksModel.fromJson(Map<String, dynamic> json) =>
      GetAudioBooksModel(
        count: json["count"],
        next: json["next"],
        previous: json["previous"],
        results:
            List<Result>.from(json["results"].map((x) => Result.fromJson(x))),
      );
}

class Result {
  Result({this.book, this.guid, this.title, this.bookType});

  Book? book;
  String? guid;
  String? title;
  String? bookType;

  factory Result.fromJson(Map<String, dynamic> json) => Result(
        book: Book.fromJson(json["book"]),
        guid: json["guid"],
        title: json["title"],
        bookType: json["book_type"],
      );
}

class Book {
  Book({
    this.guid,
    this.title,
    this.slug,
    this.author,
    this.thumbnail,
    this.rating,
    this.category,
    this.language,
    this.publisher,
    this.isbn,
    this.shortDescription,
    this.shortDescriptionUz,
    this.shortDescriptionRu,
    this.publishedDate,
    this.createdAt,
  });

  String? guid;
  String? title;
  String? slug;
  String? author;
  String? thumbnail;
  int? rating;
  String? category;
  String? language;
  dynamic publisher;
  dynamic isbn;
  String? shortDescription;
  String? shortDescriptionUz;
  String? shortDescriptionRu;
  String? publishedDate;
  String? createdAt;

  factory Book.fromJson(Map<String, dynamic> json) => Book(
        guid: json["guid"],
        title: json["title"],
        slug: json["slug"],
        author: json["author"],
        thumbnail: json["thumbnail"],
        rating: json["rating"],
        category: json["category"],
        language: json["language"],
        publisher: json["publisher"],
        isbn: json["isbn"],
        shortDescription: json["short_description"],
        shortDescriptionUz: json["short_description_uz"],
        shortDescriptionRu: json["short_description_ru"],
        publishedDate: json["published_date"],
        createdAt: json["created_at"],
      );
}
