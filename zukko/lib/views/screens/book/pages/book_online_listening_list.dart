import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/components/app_bar_comp.dart';

class BookOnlineListeningList extends StatelessWidget {
  const BookOnlineListeningList({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xfff5f5f5),
      appBar: appBarChange(context, txt: "Мундарижа", icon: Icons.close),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          //? Text Kirish
          Padding(
            padding: EdgeInsets.all(16.r),
            child: Text(
              "Кириш",
              style: MyTextStyleComp.myTextStyle(size: 20, fontF: "Roboto500"),
            ),
          ),
          Expanded(
            child: Container(
              color: ColorsConst.white,
              height: MediaQuery.of(context).size.height.h,
              width: MediaQuery.of(context).size.width.w,
              child: ListView(
                children: [
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 16.r),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        //? Birinchi qism
                        _text(
                            text: "Биринчи қисм",
                            txtFont: "Roboto500",
                            txtSize: 20.sp),
                        //? Birinchi bob
                        _text(
                            text: "Биринчи боб",
                            txtFont: "Roboto500",
                            txtSize: 16.sp),
                        _text(
                            text: "Нега одамлар пулни тежай олмайдилар",
                            txtFont: "Roboto500",
                            txtSize: 16.sp),
                        _text(text: "2", txtFont: "Roboto500", txtSize: 16.sp),
                        _text(text: "3", txtFont: "Roboto500", txtSize: 16.sp),
                        _text(text: "4", txtFont: "Roboto500", txtSize: 16.sp),
                        _text(text: "5", txtFont: "Roboto500", txtSize: 16.sp),
                        //? Ikkinchi bob
                        _text(
                            text: "Иккинчи боб",
                            txtFont: "Roboto500",
                            txtSize: 16.sp),
                        _text(text: "2", txtFont: "Roboto500", txtSize: 16.sp),
                        _text(text: "3", txtFont: "Roboto500", txtSize: 16.sp),
                        _text(text: "4", txtFont: "Roboto500", txtSize: 16.sp),
                        _text(text: "5", txtFont: "Roboto500", txtSize: 16.sp),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  TextButton _text({String? text, double? txtSize, txtFont}) {
    return TextButton(
      onPressed: () {},
      child: Text(
        "$text",
        style: MyTextStyleComp.myTextStyle(
          size: txtSize!,
          fontF: txtFont,
          color: ColorsConst.black,
        ),
      ),
    );
  }
}
