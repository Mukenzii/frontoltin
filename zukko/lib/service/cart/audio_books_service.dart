import 'package:dio/dio.dart';
import 'package:liber/core/constants/api/api_const.dart';
import 'package:liber/data/user_login_data.dart';
import 'package:liber/models/cart/audio/audio_cart_models.dart';

class AudioBooksService {
  static Future<AudioCartModel> getData({next}) async {
    final dio = Dio(BaseOptions(validateStatus: (status) => true));
    dio.options.headers["Authorization"] = "Bearer ${UserLoginData().getToken}";
    try {
      Response res = await dio.get(
        next ?? "${ApiConst().account}audio_book/list/",
      );
      if (res.statusCode == 200) {
        return AudioCartModel.fromJson(res.data);
      } else {
        throw "Not Found";
      }
    } catch (e) {
      rethrow;
    }
  }
}
