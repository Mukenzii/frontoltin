import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/models/book/book_comments_model.dart';

Column userAboutAndComment(
  BuildContext context,
  BookCommentsModel data,
  int index,
  String? bookGuid,
) {
  return Column(
    mainAxisAlignment: MainAxisAlignment.spaceBetween,
    children: [
      SizedBox(height: 5.h),
      Row(
        children: [
          //? Comment Profile Icon
          CircleAvatar(
            radius: 30.r,
            // backgroundImage:
            //     data.results![index].owner!.profilePicture != null
            //         ? NetworkImage(
            //             "${data.results![index].owner!.profilePicture}",
            //           )
            //         : null,
            backgroundColor:
                // data.results![index].owner!.profilePicture != null
                    // ? null
                    // : 
                    ColorsConst.black,
          ),
          SizedBox(width: 16.w),
          //? Comment Profile Name && data comment
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              //? Comment Profile Name
              Text(
                "${data.results![index].title}",
                style: MyTextStyleComp.myTextStyle(fontF: "Roboto500"),
              ),
              //? Data comment
              SizedBox(height: 10.h),
              Text(
                "${data.results![index].createdAt!.year}.${data.results![index].createdAt!.month}.${data.results![index].createdAt!.day}",
                style: MyTextStyleComp.myTextStyle(
                  color: ColorsConst.darkGray,
                  size: 12,
                ),
              ),
            ],
          ),
        ],
      ),
      Padding(
        padding: EdgeInsets.only(top: 16.r, bottom: 5.r),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              data.results![index].title.toString(),
              style: MyTextStyleComp.myTextStyle(
                color: ColorsConst.darkGray,
                size: 15,
              ),
            ),
          ],
        ),
      ),
      Divider(color: ColorsConst.darkGray),
    ],
  );
}
