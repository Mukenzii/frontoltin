import 'package:dio/dio.dart';
import 'package:liber/core/constants/api/api_const.dart';
import 'package:liber/mock/category_data.dart';
import 'package:liber/models/category/get_category_model.dart';

class ListCategoryService {
  static Future<GetCategoryModel> getData({next}) async {
    final dio = Dio(BaseOptions(validateStatus: (status) => true));
    try {
      Response res = await dio.get(next ?? "${ApiConst().category}list/");
      if (res.statusCode == 200) {
        CategoryData.data = res.data;
        return GetCategoryModel.fromJson(res.data);
      } else {
        throw res.statusCode.toString();
      }
    } catch (e) {
      rethrow;
    }
  }
}

class ListCategoryService2 {
  static Future getData({next}) async {
    final dio = Dio(BaseOptions(validateStatus: (status) => true));
    try {
      Response res = await dio.get(next ?? "${ApiConst().category}list/");
      if (res.statusCode == 200) {
        CategoryData.data = res.data;
        return res.data;
      } else {
        throw res.statusCode.toString();
      }
    } catch (e) {
      rethrow;
    }
  }
}
