import 'package:flutter/material.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

elevetedButtonWidget( BuildContext context,{
  
  String? txt,
  void Function()? onPress,
}) {
  ElevatedButton(
    style: ElevatedButton.styleFrom(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24.r)),
      primary: ColorsConst.primary,
      fixedSize: Size(MediaQuery.of(context).size.width.w, 56.h),
    ),
    onPressed: onPress,
    child: Text("$txt"),
  );
}
