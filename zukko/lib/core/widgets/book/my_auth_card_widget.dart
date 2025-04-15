import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/constants/colors_const.dart';

class MyAuthCartWidget extends StatelessWidget {
  final double h, sizeH, horizontal;
  final String icon, text;

  const MyAuthCartWidget(
      this.h, this.sizeH, this.horizontal, this.icon, this.text,
      {Key? key})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      color: ColorsConst.primary,
      elevation: 30,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
      child: Container(
        height: h.h,
        width: MediaQuery.of(context).size.width.w,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(24.r),
          image: const DecorationImage(
            image: AssetImage("assets/images/welcome.png"),
            fit: BoxFit.cover,
          ),
        ),
        padding: EdgeInsets.symmetric(horizontal: horizontal),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(26.4.r),
                color: ColorsConst.white.withOpacity(0.12),
              ),
              child: Container(
                margin: EdgeInsets.all(5.r),
                height: 79.h,
                width: 79.w,
                decoration: BoxDecoration(
                  color: ColorsConst.white,
                  borderRadius: BorderRadius.circular(26.r),
                ),
                alignment: Alignment.center,
                child: SizedBox(
                  width: 60.w,
                  height: 44.h,
                  child: SvgPicture.asset('assets/svgs/$icon.svg'),
                ),
              ),
            ),
            SizedBox(height: sizeH),
            Text(
              text,
              style: MyTextStyleComp.myTextStyle(
                size: 20.sp,
                fontF: "Roboto500",
                color: ColorsConst.white,
                sizeH: 1.24.h,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}
