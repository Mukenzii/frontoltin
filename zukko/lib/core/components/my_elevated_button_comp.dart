import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/constants/colors_const.dart';

class MyElevatedButtonComp {
  static ElevatedButton elevatedButton(BuildContext context, onPressed, text,
      {double h = 56}) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(24.r),
        ),
        primary: ColorsConst.primary,
        fixedSize: Size(MediaQuery.of(context).size.width.w, h.h),
      ),
      onPressed: onPressed,
      child: Text(
        text,
        style:
            MyTextStyleComp.myTextStyle(size: 16.sp, color: ColorsConst.white),
      ),
    );
  }
}
