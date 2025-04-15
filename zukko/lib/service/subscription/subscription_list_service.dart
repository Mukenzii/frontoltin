import 'package:dio/dio.dart';
import 'package:liber/core/constants/api/api_const.dart';
import 'package:liber/data/user_login_data.dart';
import 'package:liber/models/subscription/subscription_model.dart';

class SubscriptionListService {
  static Future<SubscriptionModel> getData() async {
    final dio = Dio(BaseOptions(validateStatus: (status) => true));
    dio.options.headers["Authorization"] = "Bearer ${UserLoginData().getToken}";
    try {
      Response res = await dio.get("${ApiConst().subscription}list/");
      print(res.statusCode);
      if (res.statusCode == 200) {
        return SubscriptionModel.fromJson(res.data);
      } else if (res.statusCode == 400) {
        throw 400;
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
