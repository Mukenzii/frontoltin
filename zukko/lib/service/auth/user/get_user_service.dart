// ignore_for_file: use_build_context_synchronously
import 'package:dio/dio.dart';
import 'package:liber/core/constants/api/api_const.dart';
import 'package:liber/data/user_login_data.dart';
import 'package:liber/mock/user_info_data.dart';
import 'package:liber/models/auth/user/get_user_model.dart';

class GetUserService {
  static Future<GetUserModel> getData() async {
    var akk = await UserLoginData.instance();
    var guid = akk.getGuid;

    final dio = Dio(BaseOptions(validateStatus: (status) => true));
    try {
      Response res = await dio.get("${ApiConst().account}${guid}/detail/");
      if (res.statusCode == 200) {
        UserInfoData.data = res.data;
        return GetUserModel.fromJson(res.data);
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
