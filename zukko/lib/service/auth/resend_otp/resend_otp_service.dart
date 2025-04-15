import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:liber/core/constants/api/api_const.dart';
import 'package:liber/views/auth/forgot_password/password_check/password_check_page.dart';

class ResendOtpService {
  static Future postData(firstName, userName, password) async {
    final dio = Dio(BaseOptions(validateStatus: (status) => true));
    final data = jsonEncode({
      "first_name": "$firstName",
      "username": "$userName",
      "password": "$password"
    });
    print(userName);
    try {
      Response res = await dio.post(
        "${ApiConst().account}resend-otp/",
        data: data,
      );
      print(res.statusCode);
      if (res.statusCode == 200) {
        PasswordCheckPage.timerMaxSeconds = 60;
        return res.data;
      }
    } catch (e) {
      rethrow;
    }
  }
}
