import 'package:dio/dio.dart';
import 'package:liber/core/constants/api/api_const.dart';
import 'package:liber/data/user_login_data.dart';

class BookFavoritesDeleteService {
  static Future deleteData(bookGuid) async {
    final dio = Dio(BaseOptions(validateStatus: (status) => true));
    dio.options.headers["Authorization"] = "Bearer ${UserLoginData().getToken}";
    try {
      Response res = await dio.delete(
        "${ApiConst().book}favourite/$bookGuid/delete/",
      );

      if (res.statusCode == 204) {
        return res.data;
      }
    } catch (e) {
      rethrow;
    }
  }
}
