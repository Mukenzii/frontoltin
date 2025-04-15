import 'package:flutter/material.dart';
import 'package:flutter_launcher_icons/utils.dart';
import 'package:flutter_svg/svg.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

Container askedContainer(BuildContext context, String txt1, String txt2) {
  return Container(
    height: 88.h,
    width: MediaQuery.of(context).size.width.w,
    decoration: BoxDecoration(
      color: ColorsConst.secondary,
      borderRadius: BorderRadius.circular(20.r),
    ),
    child: Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Padding(
          padding: EdgeInsets.only(left: 24.r),
          child: SizedBox(
            width: 225.w,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  txt1,
                  style: MyTextStyleComp.myTextStyle(
                    color: ColorsConst.white,
                    size: 16,
                  ),
                ),
                SizedBox(height: 4.h),
                Text(
                  txt2,
                  style: MyTextStyleComp.myTextStyle(
                    color: ColorsConst.white,
                    size: 12,
                  ),
                ),
              ],
            ),
          ),
        ),
        Container(
          width: 92.w,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(20.r),
            image: const DecorationImage(
              image: AssetImage("assets/svgs/asked_icon.png"),
              fit: BoxFit.fill,
            ),
          ),
        ),
      ],
    ),
  );
}

InkWell showContainer(
    BuildContext context, String txt1, String txt2, String image,
    {double txtSize = 16}) {
  return InkWell(
    onTap: () => Navigator.pushNamed(context, '/profile_follow'),
    child: Container(
      height: 88.h,
      width: MediaQuery.of(context).size.width.w,
      decoration: BoxDecoration(
        color: ColorsConst.secondary,
        borderRadius: BorderRadius.circular(20.r),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Padding(
            padding: EdgeInsets.only(left: 24.r),
            child: SizedBox(
              width: 225.w,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    txt1,
                    style: MyTextStyleComp.myTextStyle(
                      color: ColorsConst.white,
                      size: txtSize,
                    ),
                  ),
                  SizedBox(height: 4.h),
                  Text(
                    txt2,
                    style: MyTextStyleComp.myTextStyle(
                      color: ColorsConst.white,
                      size: 12,
                    ),
                  ),
                ],
              ),
            ),
          ),
          Container(
            width: 92.w,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(20.r),
              image: DecorationImage(
                  image: AssetImage(
                    "assets/svgs/$image.png",
                  ),
                  fit: BoxFit.fill),
            ),
          ),
        ],
      ),
    ),
  );
}
