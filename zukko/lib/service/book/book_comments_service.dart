import 'package:dio/dio.dart';
import 'package:liber/core/constants/api/api_const.dart';
import 'package:liber/models/book/book_comments_model.dart';

class BookCommentsService {
  static Future<BookCommentsModel> getData({
    String? guid,
    String? next,
    String search = '',
    int? limit,
    int? offset,
  }) async {
    final dio = Dio(BaseOptions(validateStatus: (status) => true));
    try {
      Response res = await dio.get(
        next ??
            (limit == null
                ? "${ApiConst().book}review/$guid/list/"
                : "${ApiConst().book}review/$guid/list/?limit=$limit"),
      );

      if (res.statusCode == 200) {
        return BookCommentsModel.fromJson(res.data);
      } else if (res.statusCode == 400) {
        throw 400;
      } else if (res.statusCode == 404) {
        throw 404;
      } else if (res.statusCode == 500) {
        throw 500;
      } else {
        throw 'Not Found';
      }
    } catch (e) {
      rethrow;
    }
  }
}
