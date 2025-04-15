import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:liber/core/constants/api/api_const.dart';
import 'package:liber/data/user_login_data.dart';
import 'package:liber/service/auth/user/get_user_service.dart';

class LoginService {
  static Future postData(context, username, password) async {
    final dio = Dio(BaseOptions(validateStatus: (status) => true));
    final data = jsonEncode(
      {
        "username": "$username",
        "password": "$password",
      },
    );
    try {
      Response res =
          await dio.post("${ApiConst().account}user-login/", data: data);
      // print(username);
      // print(res.statusCode);
      // print(res.data);
      if (res.statusCode == 200) {
        var sp = await UserLoginData.instance();
        sp.setGuid = await res.data['guid'];
        sp.setToken = await res.data["access"];
        showDialog(
          context: context,
          builder: (context) => const Center(
            child: CircularProgressIndicator.adaptive(),
          ),
        );
        await GetUserService.getData();
        Navigator.pushNamedAndRemoveUntil(
          context,
          '/screens',
          (route) => false,
        );
        return res.data;
      } else {
        // print("${res.statusCode}");
        return showDialog(
          context: context,
          builder: (context) => const AlertDialog(
            title: Text("Bunday akkaunt mavjud emas"),
          ),
        );
      }
      // if (res.data['non_field_errors'][0] == "Your account is not verified!") {
      //   // Navigator.pushNamed(context, '/verify');
      // }
    } catch (e) {
      rethrow;
    }
  }
}
