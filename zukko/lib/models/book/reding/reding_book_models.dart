class RedingBookModels {
  RedingBookModels({this.onlineBooks, this.audioBooks});

  List<Book>? onlineBooks;
  List<Book>? audioBooks;

  factory RedingBookModels.fromJson(Map<String, dynamic> json) =>
      RedingBookModels(
        onlineBooks:
            List<Book>.from(json["online_books"].map((x) => Book.fromJson(x))),
        audioBooks:
            List<Book>.from(json["audio_books"].map((x) => Book.fromJson(x))),
      );
}

class Book {
  Book({this.guid, this.title, this.bookType, this.body});

  String? guid;
  String? title;
  String? bookType;
  String? body;

  factory Book.fromJson(Map<String, dynamic> json) => Book(
        guid: json["guid"],
        title: json["title"],
        bookType: json["book_type"],
        body: json["body"],
      );
}
