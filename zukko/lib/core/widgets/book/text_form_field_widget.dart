import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/constants/colors_const.dart';

textFormField({
  double? height,
  double? width,
  TextEditingController? commentController,
  String? hintText,
}) {
  return SizedBox(
    height: height,
    width: width,
    child: TextFormField(
      controller: commentController,
      decoration: InputDecoration(
        hintText: hintText,
        hintStyle: MyTextStyleComp.myTextStyle(
          color: ColorsConst.darkGray,
          size: 16.sp,
        ),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16.r),
          borderSide: BorderSide(color: ColorsConst.gray),
        ),
      ),
    ),
  );
}
