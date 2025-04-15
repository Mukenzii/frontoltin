// POST //!1
// /account/password-reset/
// account_password-reset_create
import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:liber/core/constants/api/api_const.dart';
import 'package:liber/views/auth/forgot_password/password_confirm/password_confirm_page.dart';

class ForgotPasswordService {
  static Future postData(context, username) async {
    final dio = Dio(BaseOptions(validateStatus: (status) => true));
    final data = jsonEncode({"username": "$username"});
    try {
      Response res = await dio.post(
        "${ApiConst().account}password-reset/",
        data: data,
      );

      if (res.statusCode == 201) {
        PasswordConfirmPage.userName = username;
        Navigator.pushNamed(context, "/password_check", arguments: username);
        return res.data;
      } else {}
    } catch (e) {
      rethrow;
    }
  }
}
