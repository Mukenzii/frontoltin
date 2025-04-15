import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:liber/core/constants/colors_const.dart';

ratingStar({double? ratingData, double? ratingIconSize}) {
  return Padding(
    padding: EdgeInsets.symmetric(vertical: 18.r),
    child: RatingBar.builder(
      initialRating: ratingData!.toDouble(),
      direction: Axis.horizontal,
      allowHalfRating: false,
      itemCount: 5,
      itemPadding: EdgeInsets.symmetric(horizontal: 10.h),
      itemBuilder: (context, _) => Icon(
        Icons.star_border,
        color: ColorsConst.primary,
        size: ratingIconSize,
      ),
      onRatingUpdate: (updateRating) => updateRating += ratingData,
    ),
  );
}
