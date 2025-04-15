class BookFavoritesListModel {
  BookFavoritesListModel({
    this.count,
    this.next,
    this.previous,
    this.results,
  });

  int? count;
  dynamic next;
  dynamic previous;
  List<Result>? results;

  factory BookFavoritesListModel.fromJson(Map<String, dynamic> json) =>
      BookFavoritesListModel(
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
    this.category,
    this.bookGuid,
    this.title,
    this.thumbnail,
    this.getReview,
  });

  String? guid;
  String? category;
  String? bookGuid;
  String? title;
  String? thumbnail;
  GetReview? getReview;

  factory Result.fromJson(Map<String, dynamic> json) => Result(
        guid: json["guid"],
        category: json["category"],
        bookGuid: json["book_guid"],
        title: json["title"],
        thumbnail: json["thumbnail"],
        getReview: GetReview.fromJson(json["get_review"]),
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
  });

  int? reviewCount;
  int? rate;
  int? pointOne;
  int? pointTwo;
  int? pointThree;
  int? pointFour;
  int? pointFive;

  factory GetReview.fromJson(Map<String, dynamic> json) => GetReview(
        reviewCount: json["review_count"],
        rate: json["rate"],
        pointOne: json["point_one"],
        pointTwo: json["point_two"],
        pointThree: json["point_three"],
        pointFour: json["point_four"],
        pointFive: json["point_five"],
      );
}
