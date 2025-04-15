import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:liber/core/constants/api/api_const.dart';
import 'package:liber/data/user_login_data.dart';

class BookReviewSendComment {
  static Future postData({int? point, String? title, String? book}) async {
    final dio = Dio(BaseOptions(validateStatus: (status) => true));
    dio.options.headers["Authorization"] =
        "Bearer ${UserLoginData().getToken}";
    final data = jsonEncode(
      {
        "point": "$point",
        "title": title,
        "book": book,
      },
    );

    try {
      Response res = await dio.post(
        '${ApiConst().book}review/create/',
        data: data,
      );
      if (res.statusCode == 201) {
        return res.data;
      }
    } catch (e) {
      rethrow;
    }
  }
}
