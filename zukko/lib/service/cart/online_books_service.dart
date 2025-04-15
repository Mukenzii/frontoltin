import 'package:dio/dio.dart';
import 'package:liber/core/constants/api/api_const.dart';
import 'package:liber/data/user_login_data.dart';
import 'package:liber/models/cart/online/online_cart_models.dart';

class OnlineBooksService {
  static Future<OnlineCartModel> getData({next}) async {
    final dio = Dio(BaseOptions(validateStatus: (status) => true));
    dio.options.headers["Authorization"] = "Bearer ${UserLoginData().getToken}";
    try {
      Response res = await dio.get(
        next ?? '${ApiConst().account}online_book/list/',
      );
      if (res.statusCode == 200) {
        return OnlineCartModel.fromJson(res.data);
      } else {
        throw "Not Found";
      }
    } catch (e) {
      rethrow;
    }
  }
}
