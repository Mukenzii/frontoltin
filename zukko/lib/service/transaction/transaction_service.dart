import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:liber/core/constants/api/api_const.dart';
import 'package:liber/data/user_login_data.dart';

class TransactionService {
  static Future postData(String transactionType, String price) async {
    final dio = Dio(BaseOptions(validateStatus: (status) => true));
    final data = jsonEncode(
      {"transaction_type": "$transactionType", "price": "$price"},
    );

    dio.options.headers["Authorization"] = "Bearer ${UserLoginData().getToken}";

    try {
      Response res = await dio.post(
        "${ApiConst().transaction}initialize_payment/",
        data: data,
      );

      if (res.statusCode == 200) {
        return res.data;
      }
    } catch (e) {
      rethrow;
    }
  }
}
