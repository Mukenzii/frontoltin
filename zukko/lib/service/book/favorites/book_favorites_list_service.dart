import 'package:dio/dio.dart';
import 'package:liber/core/constants/api/api_const.dart';
import 'package:liber/data/user_login_data.dart';
import 'package:liber/models/book/book_favorites_list_model.dart';

class BookFavoritesListService {
  static Future<BookFavoritesListModel> getData({next, search = ""}) async {
    final dio = Dio(BaseOptions(validateStatus: (status) => true));
    dio.options.headers["Authorization"] = "Bearer ${UserLoginData().getToken}";
    try {
      Response res = await dio.get(
        next ?? "${ApiConst().book}favourite/list/",
        queryParameters: {"search": search},
      );
      if (res.statusCode == 200) {
        return BookFavoritesListModel.fromJson(res.data);
      } else {
        throw "${res.statusCode}";
      }
    } catch (e) {
      rethrow;
    }
  }
}
