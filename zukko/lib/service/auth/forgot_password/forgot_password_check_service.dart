// POST //*2
// /account/password-reset-check/
// account_password-reset-check_create
import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';
import 'package:liber/core/constants/api/api_const.dart';

class ForgotPasswordCheckService {
  static Future postData(context, userName, checkCode) async {
    final dio = Dio(BaseOptions(validateStatus: (status) => true));
    final data =
        jsonEncode({"username": "$userName", "confirm_code": "$checkCode"});
    try {
      Response res = await dio.post(
        "${ApiConst().account}password-reset-check/",
        data: data,
      );
      print(res.statusCode);
      print(res.data);
      if (res.statusCode == 200) {
        Navigator.pushReplacementNamed(context, '/password_confirm');
      }
    } catch (e) {
      rethrow;
    }
  }
}
