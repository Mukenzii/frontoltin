class BookFilterModel {
  BookFilterModel({this.count, this.next, this.previous, this.results});

  int? count;
  String? next;
  dynamic previous;
  List<Result>? results;

  factory BookFilterModel.fromJson(Map<String, dynamic> json) =>
      BookFilterModel(
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
    this.rating,
    this.category,
    this.categoryUz,
    this.categoryRu,
    this.language,
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
  String? thumbnail;
  int? rating;
  String? category;
  String? categoryUz;
  String? categoryRu;
  String? language;
  String? shortDescription;
  String? shortDescriptionUz;
  String? shortDescriptionRu;
  String? publishedDate;
  String? createdAt;
  List<Type>? types;

  factory Result.fromJson(Map<String, dynamic> json) => Result(
        guid: json["guid"],
        title: json["title"],
        slug: json["slug"],
        author: json["author"],
        thumbnail: json["thumbnail"] == null ? null : json["thumbnail"],
        rating: json["rating"],
        category: json["category"],
        categoryUz: json["category_uz"],
        categoryRu: json["category_ru"],
        language: json["language"],
        shortDescription: json["short_description"],
        shortDescriptionUz: json["short_description_uz"],
        shortDescriptionRu: json["short_description_ru"],
        publishedDate: json["published_date"],
        createdAt: json["created_at"],
        types: List<Type>.from(json["types"].map((x) => Type.fromJson(x))),
      );

  get owner => null;
}

class Type {
  Type({this.guid, this.bookType, this.price});

  String? guid;
  String? bookType;
  String? price;

  factory Type.fromJson(Map<String, dynamic> json) => Type(
        guid: json["guid"],
        bookType: json["book_type"],
        price: json["price"],
      );
}
