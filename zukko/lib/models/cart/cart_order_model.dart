class CartOrderModel {
    CartOrderModel({this.count, this.next, this.previous, this.results});

    int? count;
    String? next;
    dynamic previous;
    List<Result>? results;

    factory CartOrderModel.fromJson(Map<String, dynamic> json) => CartOrderModel(
        count: json["count"],
        next: json["next"],
        previous: json["previous"],
        results: List<Result>.from(json["results"].map((x) => Result.fromJson(x))),
    );

}

class Result {
    Result({
        this.guid,
        this.bookTitle,
        this.bookImage,
        this.categoryTitle,
        this.categoryTitleUz,
        this.categoryTitleRu,
        this.shortDescription,
        this.shortDescriptionUz,
        this.shortDescriptionRu,
        this.author,
        this.publisher,
        this.publishedDate,
        this.getReview,
        this.paymentType,
        this.orderNumber,
        this.totalPrice,
        this.quantity,
        this.status,
        this.phoneNumber,
        this.fullName,
    });

    String? guid;
    String? bookTitle;
    String? bookImage;
    String? categoryTitle;
    String? categoryTitleUz;
    String? categoryTitleRu;
    String? shortDescription;
    String? shortDescriptionUz;
    String? shortDescriptionRu;
    String? author;
    String? publisher;
    String? publishedDate;
    Map<String, double>? getReview;
    String? paymentType;
    String? orderNumber;
    String? totalPrice;
    int? quantity;
    String? status;
    String? phoneNumber;
    String? fullName;

    factory Result.fromJson(Map<String, dynamic> json) => Result(
        guid: json["guid"],
        bookTitle: json["book_title"],
        bookImage: json["book_image"],
        categoryTitle: json["category_title"],
        categoryTitleUz: json["category_title_uz"],
        categoryTitleRu: json["category_title_ru"],
        shortDescription: json["short_description"],
        shortDescriptionUz: json["short_description_uz"],
        shortDescriptionRu: json["short_description_ru"],
        author: json["author"],
        publisher: json["publisher"],
        publishedDate: json["published_date"],
        getReview: Map.from(json["get_review"]).map((k, v) => MapEntry<String, double>(k, v.toDouble())),
        paymentType: json["payment_type"],
        orderNumber: json["order_number"],
        totalPrice: json["total_price"],
        quantity: json["quantity"],
        status: json["status"],
        phoneNumber: json["phone_number"],
        fullName: json["full_name"],
    );
}