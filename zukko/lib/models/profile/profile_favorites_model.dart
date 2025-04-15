class ProfileFavoritesModel {
  ProfileFavoritesModel({
    this.count,
    this.next,
    this.previous,
    this.results,
  });

  int? count;
  dynamic next;
  dynamic previous;
  List<Result>? results;

  factory ProfileFavoritesModel.fromJson(Map<String, dynamic> json) =>
      ProfileFavoritesModel(
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
    this.book,
    this.getRate,
    this.getReview,
  });

  String? guid;
  Book? book;
  GetRate? getRate;
  GetReview? getReview;

  factory Result.fromJson(Map<String, dynamic> json) => Result(
        guid: json["guid"],
        book: Book.fromJson(json["book"]),
        getRate: GetRate.fromJson(json["get_rate"]),
        getReview: GetReview.fromJson(json["get_review"]),
      );
}

class Book {
  Book({
    this.guid,
    this.title,
    this.author,
    this.thumbnail,
  });

  String? guid;
  String? title;
  String? author;
  String? thumbnail;

  factory Book.fromJson(Map<String, dynamic> json) => Book(
        guid: json["guid"],
        title: json["title"],
        author: json["author"],
        thumbnail: json["thumbnail"],
      );
}

class GetRate {
  GetRate({
    this.rate,
  });

  int? rate;

  factory GetRate.fromJson(Map<String, dynamic> json) => GetRate(
        rate: json["rate"],
      );
}

class GetReview {
  GetReview({
    this.review,
  });

  int? review;

  factory GetReview.fromJson(Map<String, dynamic> json) => GetReview(
        review: json["review"],
      );
}
