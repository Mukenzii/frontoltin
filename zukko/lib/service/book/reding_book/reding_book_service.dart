// ignore_for_file: unnecessary_brace_in_string_interps, unused_local_variable

import 'package:dio/dio.dart';
import 'package:liber/core/constants/api/api_const.dart';
import 'package:liber/data/user_login_data.dart';
import 'package:liber/models/book/reding/reding_book_models.dart';

class RedingBookService {
  static late String bookGuid;

  static Future<RedingBookModels> getData(bookGuid) async {
    final dio = Dio(BaseOptions(validateStatus: (status) => true));
    dio.options.headers["Authorization"] = "Bearer ${UserLoginData().getToken}";
    try {
      Response res =
          await dio.get("${ApiConst().book}content/${bookGuid}/contents/");
      if (res.statusCode == 200) {
        return RedingBookModels.fromJson(res.data);
      } else if (res.statusCode == 400) {
        throw 400;
      } else if (res.statusCode == 500) {
        throw 500;
      } else {
        throw "Not Found";
      }
    } catch (e) {
      rethrow;
    }
  }
}
