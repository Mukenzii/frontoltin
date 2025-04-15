import 'package:dio/dio.dart';
import 'package:liber/core/constants/api/api_const.dart';
// import 'package:liber/data/user_login_data.dart';
import 'package:liber/models/book/book_detail_model.dart';

class BookDetailService {
  static Future getData(guid) async {
    //<BookDetailModel>
    final dio = Dio(BaseOptions(validateStatus: (status) => true));
    try {
      // dio.options.headers["Authorization"] = "Bearer ${UserLoginData().getToken}";
      Response res = await dio.get("${ApiConst().book}$guid/detail/");
      // print("${ApiConst().book}$guid/detail/");
      // print(UserLoginData().getToken);
      // print("${res.data}");
      if (res.statusCode == 200) {
        // return BookDetailModel.fromJson(res.data);
        return res.data;
      } else if (res.statusCode == 400) {
        throw "${res.statusCode}";
      } else if (res.statusCode == 404) {
        throw "${res.statusCode}";
      } else if (res.statusCode == 500) {
        throw "${res.statusCode}";
      } else {
        throw "Not Found";
      }
    } catch (e) {
      rethrow;
    }
  }
}
