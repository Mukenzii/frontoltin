import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';
import 'package:liber/core/constants/api/api_const.dart';
import 'package:liber/views/auth/verify/verify_page.dart';

class VerifyCodeService {
  static Future postData(context, username, otp) async {
    final dio = Dio(BaseOptions(validateStatus: (status) => true));
    final data = jsonEncode({"username": "$username", "otp": "$otp"});
    try {
      Response res = await dio.post(
        "${ApiConst().account}verify-phone/",
        data: data,
      );
      if (res.statusCode == 200) {
        // VerifyPage.timerMaxSeconds = 0;
        Navigator.pushNamedAndRemoveUntil(context, '/auth', (route) => false);
        return res.data;
      }
    } catch (e) {
      rethrow;
    }
  }
}
