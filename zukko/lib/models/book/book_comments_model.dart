class BookCommentsModel {
  BookCommentsModel({this.count, this.next, this.previous, this.results});

  int? count;
  String? next;
  dynamic previous;
  List<Result>? results;

  factory BookCommentsModel.fromJson(Map<String, dynamic> json) =>
      BookCommentsModel(
        count: json["count"],
        next: json["next"],
        previous: json["previous"],
        results:
            List<Result>.from(json["results"].map((x) => Result.fromJson(x))),
      );
}

class Result {
  Result({this.guid, this.point, this.title, this.createdAt, this.owner});

  String? guid;
  int? point;
  String? title;
  DateTime? createdAt;
  dynamic owner;

  factory Result.fromJson(Map<String, dynamic> json) => Result(
        guid: json["guid"],
        point: json["point"],
        title: json["title"],
        createdAt: DateTime.parse(json["created_at"]),
        owner: json["owner"],
      );
}
