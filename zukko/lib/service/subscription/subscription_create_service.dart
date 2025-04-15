// ignore_for_file: use_build_context_synchronously

import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/constants/api/api_const.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/constants/lang_text_const.dart';
import 'package:liber/data/user_login_data.dart';

class SubscriptionCreateService {
  static Future postData(BuildContext context, category, categoryType) async {
    final dio = Dio(BaseOptions(validateStatus: (status) => true));
    dio.options.headers["Authorization"] = "Bearer ${UserLoginData().getToken}";
    var data = jsonEncode({
      "category": "$category",
      "category_type": "$categoryType",
    });
    try {
      Response res = await dio.post(
        "${ApiConst().subscription}create/",
        data: data,
      );
      print(res.statusCode);
      if (res.statusCode == 201) {
        return res.data;
      } else if (res.statusCode == 400) {
        if (res.data['errors']['message'].toString().isNotEmpty) {
          return showDialog(
            context: context,
            builder: (_) => AlertDialog(
              shape: const RoundedRectangleBorder(
                  borderRadius: BorderRadius.all(Radius.circular(20))),
              content: Builder(
                builder: (context) {
                  return SizedBox(
                    height: 286.h,
                    width: 343.w,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        SvgPicture.asset("assets/svgs/pay_icon.svg"),
                        Text(
                          // LangTextConst().noMoney,
                          "${res.data['errors']['message']}",
                          textAlign: TextAlign.center,
                          style: MyTextStyleComp.myTextStyle(
                            fontF: 'Roboto500',
                            size: 17,
                          ),
                        ),
                        ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            primary: ColorsConst.primary,
                            fixedSize: Size(191.w, 48.h),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(20.r),
                            ),
                          ),
                          onPressed: () {
                            Navigator.pop(context);
                          },
                          child: Text(
                            LangTextConst().back,
                            style: MyTextStyleComp.myTextStyle(
                              color: ColorsConst.white,
                              size: 16,
                            ),
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),
          );
        }
      } else if (res.statusCode == 500) {
        throw 500;
      } else {
        throw "Not Found";
      }
    } catch (e) {
      rethrow;
    }
  }

  // Future<T?> showAlertDialog<T>(BuildContext context) {
  //   return ;
  // }
}
