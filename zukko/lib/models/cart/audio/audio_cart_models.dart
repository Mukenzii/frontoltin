class AudioCartModel {
  AudioCartModel({this.count, this.next, this.previous, this.results});

  int? count;
  dynamic next;
  dynamic previous;
  List<Result>? results;

  factory AudioCartModel.fromJson(Map<String, dynamic> json) => AudioCartModel(
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
    this.bookGuid,
    this.category,
    this.book,
    this.author,
    this.publisher,
    this.publishedDate,
    this.bookType,
    this.thumbnail,
    this.getReview,
    this.state,
  });

  String? guid;
  String? bookGuid;
  String? category;
  String? book;
  String? author;
  dynamic publisher;
  dynamic publishedDate;
  String? bookType;
  String? thumbnail;
  Map<String, num>? getReview;
  String? state;

  factory Result.fromJson(Map<String, dynamic> json) => Result(
        guid: json["guid"],
        bookGuid: json["book_guid"],
        category: json["category"],
        book: json["book"],
        author: json["author"],
        publisher: json["publisher"],
        publishedDate: json["published_date"],
        bookType: json["book_type"],
        thumbnail: json["thumbnail"],
        getReview: Map.from(json["get_review"])
            .map((k, v) => MapEntry<String, num>(k, v)),
        state: json["state"],
      );
}
