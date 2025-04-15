// ignore_for_file: avoid_print
import 'package:dio/dio.dart';
import 'package:liber/core/constants/api/api_const.dart';
import 'package:liber/data/user_login_data.dart';
import 'package:liber/models/profile/profile_subscription_models.dart';

class ProfileSubscriptionService {
  static Future<ProfileSubscriptionModels> getData() async {
    final dio = Dio(BaseOptions(validateStatus: (status) => true));
    try {
      Response res = await dio
          .get("${ApiConst().subscription}list/${UserLoginData().getGuid}");
      if (res.statusCode == 200) {
        return ProfileSubscriptionModels.fromJson(res.data);
      } else if (res.statusCode == 400) {
        throw 400;
      } else if (res.statusCode == 404) {
        throw 404;
      } else if (res.statusCode == 500) {
        throw 500;
      } else {
        throw "Not Found";
      }
    } catch (e) {
      rethrow;
    }
  }
}

//! chala joyi bor  token qoww kerak backend chala joyi bor