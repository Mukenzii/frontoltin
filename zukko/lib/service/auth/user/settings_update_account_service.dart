import 'dart:convert';
import 'dart:io';
import 'package:dio/dio.dart';
import 'package:liber/core/constants/api/api_const.dart';
import 'package:liber/data/user_login_data.dart';

class SettingsUpdateAccount {
  static Future putData(context, name, gender, dateOfBirth, File file) async {
    // UserInfoData.data
    final api = "${ApiConst().account}${UserLoginData().getGuid}/update/";
    final dio = Dio(BaseOptions(validateStatus: (status) => true));
    String _fileName = file.path.split('/').last;
    var formData = FormData.fromMap(
      {
        "first_name": name,
        'profile_picture':
            await MultipartFile.fromFile(file.path, filename: file.path),
        "gender": "male",
        "date_of_birth": "2022-09-12"
      },
    );

    try {
      Response res = await dio.put(
        api,
        data: formData,
        options: Options(headers: {"Content-Type": "images/jpg"}),
      );
      if (res.statusCode == 200) {
        return res.data;
      } else if (res.statusCode == 400) {
      } else if (res.statusCode == 404) {
      } else if (res.statusCode == 500) {}
    } catch (e) {
      rethrow;
    }
  }
}

class SettingsUpdateAccountNoImage {
  static Future putData(context, name, gender, dateOfBirth) async {
    final api = "${ApiConst().account}${UserLoginData().getGuid}/update/";
    final dio = Dio(BaseOptions(validateStatus: (status) => true));

    final noImageData = jsonEncode({
      "first_name": "$name",
      "gender": "male",
      "date_of_birth": "0001-01-01"
    });

    try {
      Response res = await dio.put(api, data: noImageData);
      // print(res.statusCode);
      if (res.statusCode == 200) {
        // print("Data -> 200");
        return res.data;
      } else if (res.statusCode == 400) {
        // print("Error -> 400");
        // print(res);
      } else if (res.statusCode == 404) {
        // print("Error -> 404");
      } else if (res.statusCode == 500) {
        // print("Error -> 500");
      }
    } catch (e) {
      rethrow;
    }
  }
}
