import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:liber/core/constants/api/api_const.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/widgets/book/alert_dialog_widget.dart';
import 'package:liber/data/user_login_data.dart';

class BookOrderRegister {
  static Future postData(
    context,
    book,
    bookType,
    routeName, {
    paymentType,
    quantity,
    phoneNumber,
    fullName,
  }) async {
    final dio = Dio(BaseOptions(validateStatus: (status) => true));
    dio.options.headers["Authorization"] = "Bearer ${UserLoginData().getToken}";
    final dataPaper = jsonEncode(
      {
        "book": "$book",
        "book_type": "$bookType",
        "payment_type": paymentType,
        "quantity": "$quantity",
        "phone_number": "$phoneNumber",
        "full_name": "$fullName"
      },
    );
    final dataOnline = jsonEncode(
      {
        "book": "$book",
        "book_type": "$bookType",
        "payment_type": 'online',
      },
    );
    try {
      Response res = await dio.post(
        "${ApiConst().order}customer/create/",
        data: routeName == "paper" ? dataPaper : dataOnline,
      );
      // print("${ApiConst().order}customer/create/");
      // print(res.data);
      // print(res.statusCode);
      // print(book);
      // print(bookType);
      // print(routeName);
      // print(paymentType);
      // print(quantity);
      // print(phoneNumber);
      // print(fullName);
      print(res.data);
      print(res.statusCode);
      if (res.statusCode == 201) {
        // if (routeName == "paper") {
        //   Navigator.pushNamedAndRemoveUntil(
        //       context, '/screens', (route) => false);
        // } else if (routeName == "audio") {
        //   Navigator.pop(context);
        //   // Navigator.pushNamed(context, "/book_online_list");
        // } else if (routeName == "online") {
        //   Navigator.pop(context);
        //   // Navigator.pushNamed(context, "/book_online_reading");
        // }
        res.data;
        Navigator.pop(context);
        return showDialog(
          context: context,
          builder: (context) => AlertDialog(
            title: Center(
              child: Column(
                children: [
                  Icon(
                    Icons.check_circle_outline,
                    color: Colors.green,
                    size: 80.r,
                  ),
                  Padding(
                    padding: EdgeInsets.symmetric(vertical: 8.r),
                    child: Text("Siz bu kitobni sotib oldingiz"),
                  ),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(24.r),
                      ),
                      primary: ColorsConst.primary,
                      fixedSize: Size(130.w, 45.h),
                    ),
                    child: const Text("Ортга Кайтиш"),
                    onPressed: () => Navigator.pop(context),
                  ),
                ],
              ),
            ),
          ),
        );
      } else if (res.statusCode == 400) {
        Navigator.pop(context);
        return showDialog(
          context: context,
          builder: (context) => AlertDialog(
            alignment: Alignment.center,
            contentPadding: const EdgeInsets.all(16),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(20.r),
            ),
            title: Column(
              children: [
                Text("${res.data["errors"]["message"]}"),
                SizedBox(
                  height: 20.h,
                ),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(24.r),
                    ),
                    primary: ColorsConst.primary,
                    fixedSize: Size(130.w, 45.h),
                  ),
                  child: const Text("Ортга Кайтиш"),
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
          ),
        );
        // if (routeName == "audio") {
        //   return Navigator.pushNamed(context, "/book_online_list");
        // } else if (routeName == "online") {
        //   return Navigator.pushNamed(context, "/book_online_reading");
        // }
      }
    } catch (e) {
      rethrow;
    }
  }
}
