import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:liber/core/constants/api/api_const.dart';
import 'package:liber/data/user_login_data.dart';

class BookFavoritesCreateService {
  static Future postData(bookGuid) async {
    final data = jsonEncode({"book": "$bookGuid"});
    final dio = Dio(BaseOptions(validateStatus: (status) => true));
    dio.options.headers["Authorization"] = "Bearer ${UserLoginData().getToken}";
    try {
      Response res = await dio.post(
        "${ApiConst().book}favourite/create/",
        data: data,
      );
      // print(res.statusCode);
      // print(res.data);
      // print(UserLoginData().getToken);
      // print(bookGuid);
      if (res.statusCode == 201) {
        return res.data;
      } else {
        throw "${res.statusCode}";
      }
    } catch (e) {
      rethrow;
    }
  }
}
