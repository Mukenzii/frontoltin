import 'package:dio/dio.dart';
import 'package:liber/core/constants/api/api_const.dart';
import 'package:liber/models/category/single_category_model.dart';

class SingleCategoryService {
  static Future<SingleCategoryModel> getData(String bookGuid,
      {String? next, String search = ""}) async {
    final dio = Dio(BaseOptions(validateStatus: (status) => true));
    try {
      Response res = await dio.get(
        next ?? "${ApiConst().book}book-filter/",
        queryParameters: {"category": bookGuid, "search": search},
      );
      print("${bookGuid}");
      if (res.statusCode == 200) {
        return SingleCategoryModel.fromJson(res.data);
      } else {
        throw res.statusCode.toString();
      }
    } catch (e) {
      rethrow;
    }
  }
}
