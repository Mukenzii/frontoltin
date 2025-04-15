import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class CategoriesNoResult extends StatelessWidget {
  const CategoriesNoResult({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      child: Center(
        child: Column(
          children: [
            Padding(
              padding: EdgeInsets.only(top: 78.r, bottom: 40.r),
              child: SvgPicture.asset(
                "assets/svgs/search_no_result.svg",
                fit: BoxFit.cover,
              ),
            ),
            Text(
              "Сизнинг сўровингиз бўйича\n хечнарса топилмади!",
              textAlign: TextAlign.center,
              style: MyTextStyleComp.myTextStyle(
                color: ColorsConst.darkGray,
                size: 14.sp,
              ),
            )
          ],
        ),
      ),
    );
  }
}
