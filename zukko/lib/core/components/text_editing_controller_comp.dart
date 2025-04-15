import 'package:flutter/material.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/constants/lang_text_const.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

textEditingControllerComp({
  TextEditingController? controller,
  BuildContext? context,
}) {
  SizedBox(
    height: 50.h,
    width: MediaQuery.of(context!).size.width.w,
    child: TextFormField(
      controller: controller,
      decoration: InputDecoration(
        hintText: LangTextConst().search,
        suffixIcon: const Icon(Icons.search),
        contentPadding: EdgeInsets.fromLTRB(12.r, 3.r, 12.r, 3.r),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16.r),
          borderSide: BorderSide(color: ColorsConst.darkGray),
        ),
      ),
    ),
  );
}
