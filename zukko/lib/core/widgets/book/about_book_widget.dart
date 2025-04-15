import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/constants/lang_text_const.dart';

aboutBook(
  BuildContext context, {
  String? bookName,
  String? bookAuthor,
  String? categoryName,
  String? languageName,
  num? viewCount,
  String? dataImage,
}) {
  return Row(
    mainAxisAlignment: MainAxisAlignment.spaceBetween,
    children: [
      //? Image Container
      Container(
        height: 158.h,
        width: 123.w,
        decoration: BoxDecoration(
          color: ColorsConst.darkGray,
          borderRadius: BorderRadius.circular(12.r),
          image: DecorationImage(
              image: NetworkImage(dataImage.toString()), fit: BoxFit.cover),
        ),
      ),
      //? texts
      SizedBox(
        width: MediaQuery.of(context).size.width * 0.50.w,
        height: 158.h,
        child: Padding(
            padding: EdgeInsets.all(8.r),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                //? Book name
                Text(
                  bookName ?? '',
                  overflow: TextOverflow.ellipsis,
                  maxLines: 1,
                  style: MyTextStyleComp.myTextStyle(fontF: "Roboto500"),
                ),
                //? Author
                Text(
                  bookAuthor ?? '',
                  style: MyTextStyleComp.myTextStyle(
                    color: ColorsConst.darkGray,
                  ),
                  overflow: TextOverflow.ellipsis,
                  maxLines: 1,
                ),
                //? Text Rukn && Biznes
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    //? Rukn text
                    Text(
                      LangTextConst().rukn,
                      overflow: TextOverflow.ellipsis,
                      maxLines: 1,
                      style: MyTextStyleComp.myTextStyle(fontF: "Roboto500"),
                    ),
                    //? category text
                    Expanded(
                      child: Text(
                        categoryName.toString(),
                        style: MyTextStyleComp.myTextStyle(
                          size: 12,
                          color: ColorsConst.darkGray,
                        ),
                        textAlign: TextAlign.right,
                        overflow: TextOverflow.ellipsis,
                      ),
                    )
                  ],
                ),
                //? Text Language && Uzb tili
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    //? Til text
                    Text(
                      LangTextConst().lang,
                      overflow: TextOverflow.ellipsis,
                      maxLines: 1,
                      style: MyTextStyleComp.myTextStyle(fontF: "Roboto500"),
                    ),
                    //? Uzbek tili text
                    Text(
                      languageName.toString(),
                      overflow: TextOverflow.ellipsis,
                      maxLines: 1,
                      style: MyTextStyleComp.myTextStyle(
                        color: ColorsConst.darkGray,
                      ),
                    ),
                  ],
                ),
                //? Icons listen book views
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: const [
                        Icon(Icons.headphones_outlined),
                        Icon(Icons.book)
                      ],
                    ),
                    //? eye icon number
                    Row(
                      children: [
                        Icon(
                          Icons.remove_red_eye_rounded,
                          color: ColorsConst.darkGray,
                        ),
                        SizedBox(width: 10.w),
                        Text(
                          "${viewCount ?? 0}", //? ahad jon aka ocirib qoyganla
                          style: MyTextStyleComp.myTextStyle(
                            color: ColorsConst.darkGray,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            )),
      ),
    ],
  );
}
