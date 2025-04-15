//! Bowqatan modellaw kere
class ProfileSubscriptionModels {
  ProfileSubscriptionModels({
    this.guid,
    this.category,
    this.beginDate,
    this.endDate,
    this.price,
    this.active,
  });

  String? guid;
  int? category;
  String? beginDate;
  String? endDate;
  String? price;
  String? active;

  factory ProfileSubscriptionModels.fromJson(Map<String, dynamic> json) =>
      ProfileSubscriptionModels(
        guid: json["guid"],
        category: json["category"],
        beginDate: json["begin_date"],
        endDate: json["end_date"],
        price: json["price"],
        active: json["active"],
      );
}
