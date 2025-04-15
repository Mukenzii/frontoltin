class SubscriptionModel {
  SubscriptionModel({this.count, this.next, this.previous, this.results});

  int? count;
  dynamic next;
  dynamic previous;
  List<Result>? results;

  factory SubscriptionModel.fromJson(Map<String, dynamic> json) =>
      SubscriptionModel(
        count: json["count"],
        next: json["next"],
        previous: json["previous"],
        results: List<Result>.from(
          json["results"].map((x) => Result.fromJson(x)),
        ),
      );
}

class Result {
  Result({this.guid, this.category, this.beginDate, this.endDate, this.price});

  String? guid;
  Category? category;
  DateTime? beginDate;
  DateTime? endDate;
  String? price;

  factory Result.fromJson(Map<String, dynamic> json) => Result(
        guid: json["guid"],
        category: Category.fromJson(json["category"]),
        beginDate: DateTime.parse(json["begin_date"]),
        endDate: DateTime.parse(json["end_date"]),
        price: json["price"],
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
