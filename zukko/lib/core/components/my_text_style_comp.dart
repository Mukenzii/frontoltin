import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:liber/core/constants/colors_const.dart';

class MyTextStyleComp {
  static TextStyle myTextStyle({
    double size = 14,
    double sizeH = 1,
    Color? color,
    String fontF = "Roboto400",
    FontWeight fontW = FontWeight.normal,
    FontStyle fontS = FontStyle.normal,
  }) {
    return TextStyle(
      height: sizeH.h,
      fontSize: size.sp,
      color: color ?? ColorsConst.text,
      fontFamily: fontF,
      fontWeight: fontW,
      fontStyle: fontS,
    );
  }
}
