class BookDetailModel {
  BookDetailModel({
    this.guid,
    this.title,
    this.author,
    this.thumbnail,
    this.getReview,
    this.category,
    this.language,
    this.hardcover,
    this.numberOfPage,
    this.publisher,
    this.isbn,
    this.shortDescription,
    this.shortDescriptionUz,
    this.shortDescriptionRu,
    this.publishedDate,
    this.types,
    this.createdAt,
  });

  String? guid;
  String? title;
  String? author;
  String? thumbnail;
  Map<String, num>? getReview;
  Category? category;
  String? language;
  bool? hardcover;
  dynamic numberOfPage;
  String? publisher;
  String? isbn;
  String? shortDescription;
  String? shortDescriptionUz;
  String? shortDescriptionRu;
  String? publishedDate;
  List<Type>? types;
  DateTime? createdAt;

  factory BookDetailModel.fromJson(Map<String, dynamic> json) =>
      BookDetailModel(
        guid: json["guid"],
        title: json["title"],
        author: json["author"],
        thumbnail: json["thumbnail"],
        getReview: Map.from(json["get_review"])
            .map((k, v) => MapEntry<String, num>(k, v)),
        category: Category.fromJson(json["category"]),
        language: json["language"],
        hardcover: json["hardcover"],
        numberOfPage: json["number_of_page"],
        publisher: json["publisher"],
        isbn: json["isbn"],
        shortDescription: json["short_description"],
        shortDescriptionUz: json["short_description_uz"],
        shortDescriptionRu: json["short_description_ru"],
        publishedDate: json["published_date"],
        types: List<Type>.from(json["types"].map((x) => Type.fromJson(x))),
        createdAt: DateTime.parse(json["created_at"]),
      );
}

class Category {
  Category({this.guid, this.title, this.thumbnail});

  String? guid;
  String? title;
  String? thumbnail;

  factory Category.fromJson(Map<String, dynamic> json) => Category(
        guid: json["guid"],
        title: json["title"],
        thumbnail: json["thumbnail"],
      );
}

class GetReview {
  GetReview({
    this.reviewCount,
    this.rate,
    this.pointOne,
    this.pointTwo,
    this.pointThree,
    this.pointFour,
    this.pointFive,
    this.pointOnePercent,
    this.pointTwoPercent,
    this.pointThreePercent,
    this.pointFourPercent,
    this.pointFivePercent,
  });

  num? reviewCount;
  num? rate;
  num? pointOne;
  num? pointTwo;
  num? pointThree;
  num? pointFour;
  num? pointFive;
  num? pointOnePercent;
  num? pointTwoPercent;
  num? pointThreePercent;
  num? pointFourPercent;
  num? pointFivePercent;

  factory GetReview.fromJson(Map<String, num> json) => GetReview(
        reviewCount: json["review_count"],
        rate: json["rate"],
        pointOne: json["point_one"],
        pointTwo: json["point_two"],
        pointThree: json["point_three"],
        pointFour: json["point_four"],
        pointFive: json["point_five"],
        pointOnePercent: json["point_one_percent"],
        pointTwoPercent: json["point_two_percent"],
        pointThreePercent: json["point_three_percent"],
        pointFourPercent: json["point_four_percent"],
        pointFivePercent: json["point_five_percent"],
      );
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
