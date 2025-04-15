// POST //?3
// /account/password-reset-confirm/
// account_password-reset-confirm_create

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:liber/core/constants/api/api_const.dart';

class ForgotPasswordConfirmService {
  static Future postData(context, username, newPassword1, newPassword2) async {
    final dio = Dio(BaseOptions(validateStatus: (status) => true));
    final data = {
      "username": "$username",
      "new_password1": "$newPassword1",
      "new_password2": "$newPassword2"
    };

    try {
      Response res = await dio.post(
        "${ApiConst().account}password-reset-confirm/",
        data: data,
      );
      if (res.statusCode == 200) {
        Navigator.pushNamedAndRemoveUntil(context, "/auth", (route) => false);
        return res.data;
      }
    } catch (e) {
      rethrow;
    }
  }
}
