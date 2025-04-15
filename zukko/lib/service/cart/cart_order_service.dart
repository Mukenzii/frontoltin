import 'package:dio/dio.dart';

import 'package:liber/core/constants/api/api_const.dart';
import 'package:liber/data/user_login_data.dart';
import 'package:liber/models/cart/cart_order_model.dart';

class CartOrderService {
  static Future<CartOrderModel> getData() async {
    final dio = Dio(BaseOptions(validateStatus: (status) => true));
    dio.options.headers["Authorization"] = "Bearer ${UserLoginData().getToken}";
    try {
      Response res = await dio.get("${ApiConst().order}customer/list/");

      if (res.statusCode == 200) {
        return CartOrderModel.fromJson(res.data);
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
      // print("Error catch !");
      rethrow;
    }
  }
}
