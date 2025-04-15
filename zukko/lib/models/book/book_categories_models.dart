class GetCategoryModel {
  GetCategoryModel({
    this.count,
    this.next,
    this.previous,
    this.results,
  });

  int? count;
  dynamic next;
  dynamic previous;
  List<Result>? results;

  factory GetCategoryModel.fromJson(Map<String, dynamic> json) =>
      GetCategoryModel(
        count: json["count"],
        next: json["next"],
        previous: json["previous"],
        results: List<Result>.from(
          json["results"].map((x) => Result.fromJson(x)),
        ),
      );
}

class Result {
  Result({
    this.guid,
    this.thumbnail,
    this.title,
    this.titleUz,
    this.titleRu,
    this.categoryTypes,
  });

  String? guid;
  String? thumbnail;
  String? title;
  String? titleUz;
  String? titleRu;
  List<CategoryType>? categoryTypes;

  factory Result.fromJson(Map<String, dynamic> json) => Result(
        guid: json["guid"],
        thumbnail: json["thumbnail"],
        title: json["title"],
        titleUz: json["title_uz"] == null ? null : json["title_uz"],
        titleRu: json["title_ru"] == null ? null : json["title_ru"],
        categoryTypes: List<CategoryType>.from(
          json["category_types"].map((x) => CategoryType.fromJson(x)),
        ),
      );
}

class CategoryType {
  CategoryType({
    this.guid,
    this.days,
    this.price,
  });

  String? guid;
  int? days;
  String? price;

  factory CategoryType.fromJson(Map<String, dynamic> json) => CategoryType(
        guid: json["guid"],
        days: json["days"],
        price: json["price"],
      );
}