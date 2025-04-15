import 'package:flutter/material.dart';
import 'package:rating_bar_flutter/rating_bar_flutter.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class BookTypeComp extends StatefulWidget {
  const BookTypeComp({super.key});

  @override
  State<BookTypeComp> createState() => _BookTypeCompState();
}

class _BookTypeCompState extends State<BookTypeComp> {
  double ratingStar = 0;
  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: ListView.builder(
        itemCount: 1,
        itemBuilder: (context, index) {
          return Padding(
            padding: EdgeInsets.only(top: 16.r),
            child: Row(
              children: [
                //? Image Container
                Container(
                  height: 96.h,
                  width: 96.w,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(8.r),
                    color: ColorsConst.darkGray,
                    // image: const DecorationImage(
                    //   fit: BoxFit.cover,
                    //   image: NetworkImage(
                    //     "https://source.unsplash.com/random",
                    //   ),
                    // ),
                  ),
                ),
                SizedBox(width: 20.w),
                //? Text Column
                SizedBox(
                  height: 96.h,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "Стив Джобс",
                        style: MyTextStyleComp.myTextStyle(
                          size: 16.sp,
                          fontF: 'Roboto500',
                        ),
                      ),
                      RatingBarFlutter(
                        onRatingChanged: (rating) => setState(
                          () => ratingStar = rating!,
                        ),
                        filledIcon: Icons.star,
                        emptyIcon: Icons.star_border,
                        halfFilledIcon: Icons.star_half,
                        isHalfAllowed: true,
                        aligns: Alignment.centerLeft,
                        filledColor: ColorsConst.primary,
                        emptyColor: ColorsConst.darkGray,
                        size: 14.r,
                      ),
                      Text(
                        "Жорж Оруел",
                        style: MyTextStyleComp.myTextStyle(
                          color: ColorsConst.darkGray,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
