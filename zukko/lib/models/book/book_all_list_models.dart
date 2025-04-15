class BookAllListModel {
  BookAllListModel({
    this.count,
    this.next,
    this.previous,
    this.results,
  });

  int? count;
  dynamic next;
  dynamic previous;
  List<Result>? results;

  factory BookAllListModel.fromJson(Map<String, dynamic> json) =>
      BookAllListModel(
        count: json["count"],
        next: json["next"],
        previous: json["previous"],
        results:
            List<Result>.from(json["results"].map((x) => Result.fromJson(x))),
      );
}

class Result {
  Result({
    this.guid,
    this.title,
    this.slug,
    this.author,
    this.thumbnail,
    this.getReview,
    this.category,
    this.categoryUz,
    this.categoryRu,
    this.language,
    this.publisher,
    this.isbn,
    this.shortDescription,
    this.shortDescriptionUz,
    this.shortDescriptionRu,
    this.publishedDate,
    this.createdAt,
    this.types,
  });

  String? guid;
  String? title;
  String? slug;
  String? author;
  dynamic thumbnail;
  Map<String, double>? getReview;
  String? category;
  dynamic categoryUz;
  String? categoryRu;
  String? language;
  dynamic publisher;
  dynamic isbn;
  String? shortDescription;
  dynamic shortDescriptionUz;
  dynamic shortDescriptionRu;
  dynamic publishedDate;
  String? createdAt;
  List<Type>? types;

  factory Result.fromJson(Map<String, dynamic> json) => Result(
        guid: json["guid"],
        title: json["title"],
        slug: json["slug"],
        author: json["author"],
        thumbnail: json["thumbnail"],
        getReview: Map.from(json["get_review"])
            .map((k, v) => MapEntry<String, double>(k, v.toDouble())),
        category: json["category"],
        categoryUz: json["category_uz"],
        categoryRu: json["category_ru"],
        language: json["language"],
        publisher: json["publisher"],
        isbn: json["isbn"],
        shortDescription: json["short_description"],
        shortDescriptionUz: json["short_description_uz"],
        shortDescriptionRu: json["short_description_ru"],
        publishedDate: json["published_date"],
        createdAt: json["created_at"],
        types: List<Type>.from(json["types"].map((x) => Type.fromJson(x))),
      );
}

class Type {
  Type({
    this.guid,
    this.bookType,
    this.price,
  });

  String? guid;
  String? bookType;
  String? price;

  factory Type.fromJson(Map<String, dynamic> json) => Type(
        guid: json["guid"],
        bookType: json["book_type"],
        price: json["price"],
      );
}
