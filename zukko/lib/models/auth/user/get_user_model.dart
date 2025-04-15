class GetUserModel {
  GetUserModel({
    this.id,
    this.guid,
    this.firstName,
    this.username,
    this.profilePicture,
    this.balance,
    this.orders,
    this.transactions,
  });

  int? id;
  String? guid;
  String? firstName;
  String? username;
  dynamic profilePicture;
  String? balance;
  List<dynamic>? orders;
  List<dynamic>? transactions;

  factory GetUserModel.fromJson(Map<String, dynamic> json) => GetUserModel(
        id: json["id"],
        guid: json["guid"],
        firstName: json["first_name"],
        username: json["username"],
        profilePicture: json["profile_picture"],
        balance: json["balance"],
        orders: List<dynamic>.from(json["orders"].map((x) => x)),
        transactions: List<dynamic>.from(json["transactions"].map((x) => x)),
      );
}
