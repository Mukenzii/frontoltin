import 'package:dio/dio.dart';
import 'package:liber/core/constants/api/api_const.dart';
import 'package:liber/mock/books/new_books_data.dart';
import 'package:liber/models/book/get_new_books_models.dart';

class NewBooksService {
  static Future<GetNewBooksModel> getData({String? next}) async {
    final dio = Dio(BaseOptions(validateStatus: (status) => true));
    try {
      Response res = await dio.get(next ?? '${ApiConst().book}new-books/');
      if (res.statusCode == 200) {
        NewBooksData.data = res.data;
        return GetNewBooksModel.fromJson(res.data);
      } else {
        throw "Not Found";
      }
    } catch (e) {
      rethrow;
    }
  }
}
