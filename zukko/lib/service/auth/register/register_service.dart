import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:liber/core/constants/api/api_const.dart';
import 'package:liber/service/auth/resend_otp/resend_otp_service.dart';
import 'package:liber/views/auth/sign_up/sign_up_page.dart';

class RegisterService {
  static Future postData(context, fistName, userName, password) async {
    final dio = Dio(BaseOptions(validateStatus: (status) => true));
    final data = jsonEncode({
      "first_name": '$fistName', //fistName
      "username": "$userName", //userName
      "password": '$password' //password
    });
    try {
      Response res = await dio.post(
        "${ApiConst().account}register/",
        data: data,
      );
      // print("Status code => ${res.statusMessage}");
      print("Status code => ${res.statusCode}");
      print(userName);
      // print(res.data);
      showDialog(
        context: context,
        builder: (context) => const Center(
          child: CircularProgressIndicator.adaptive(),
        ),
      );
      if (res.statusCode == 201) {
        showDialog(
          context: context,
          builder: (context) => const Center(
            child: CircularProgressIndicator.adaptive(),
          ),
        );
        await ResendOtpService.postData(fistName, userName, password);
        Navigator.pushNamed(context, '/verify',
            arguments: SignUpPage.usernameController.text);
        return res.data;
      } else if (res.statusCode == 400) {
        return showDialog(
          context: context,
          builder: (context) => const AlertDialog(
            title: Text("Bunday akkaunt ro'yxatdan o'tgan"),
          ),
        );
        //   await ResendOtpService.postData(fistName, userName, password);

        //   Navigator.pushNamed(context, '/verify');
        //   // await ResendOtpService.postData(fistName, userName, password);
      }
    } catch (e) {
      rethrow;
    }
  }
}
