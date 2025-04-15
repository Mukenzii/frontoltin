import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/constants/lang_text_const.dart';
import 'package:liber/service/book/book_order_register_service.dart';
import 'package:liber/service/book/reding_book/reding_book_service.dart';
import 'package:liber/views/screens/book/pages/book_buy.dart';

alertDialogWidget(
  BuildContext context,
  int bookPayIndex, {
  String? bookPrice,
  String? bookCategoryTitle,
  String? bookTitle,
  String myCount = '',
  String? bookGuid,
  String? bookTypeGuid,
  String? bookType,
}) {
  showDialog(
    context: context,
    builder: (context) {
      return AlertDialog(
        alignment: Alignment.center,
        contentPadding: const EdgeInsets.all(16),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20.r),
        ),
        content: SizedBox(
          height: 238.h,
          width: MediaQuery.of(context).size.width.w,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              //? Text Author book
              Text(
                bookTitle.toString(),
                style: MyTextStyleComp.myTextStyle(
                  fontF: 'Roboto500',
                  size: 17,
                ),
              ),
              //? Autdio kitobni tanlaw text
              Text(
                bookCategoryTitle.toString(),
                style: MyTextStyleComp.myTextStyle(),
              ),
              //? Price
              Text(
                "$bookPrice сум".toString(),
                style: MyTextStyleComp.myTextStyle(
                  fontF: 'Roboto500',
                  color: ColorsConst.primary,
                  size: 20,
                ),
              ),
              Divider(color: ColorsConst.darkGray),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  //? Text Xisobingizda
                  Text(
                    "${LangTextConst().count} $myCount",
                    style: MyTextStyleComp.myTextStyle(
                      color: ColorsConst.darkGray,
                    ),
                  ),
                  SizedBox(height: 20.h),
                  //? Buttons bekor qilish && xarid qiliw
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      TextButton(
                        onPressed: () => Navigator.pop(context),
                        child: Text(
                          LangTextConst().cancel,
                          style: MyTextStyleComp.myTextStyle(
                            size: 16,
                            color: ColorsConst.primary,
                          ),
                        ),
                      ),
                      //? Barch fikrlar
                      ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(24.r),
                          ),
                          primary: ColorsConst.primary,
                          fixedSize: Size(130.w, 45.h),
                        ),
                        child: Text(LangTextConst().shopping),
                        onPressed: () {
                          if (bookType == "online") {
                            RedingBookService.bookGuid = "${bookGuid}";
                            BookOrderRegister.postData(
                              context,
                              bookGuid,
                              bookTypeGuid,
                              bookType,
                            );
                          } else if (bookType == "audio") {
                            RedingBookService.bookGuid = "${bookGuid}";
                            BookOrderRegister.postData(
                              context,
                              bookGuid,
                              bookTypeGuid,
                              bookType,
                            );
                          } else if (bookType == "paper") {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => BookBuy(
                                  bookGuid: bookGuid.toString(),
                                  price: "$bookPrice",
                                  bookTypeGuid: "${bookTypeGuid}",
                                  index: bookPayIndex,
                                ),
                              ),
                            );
                          }
                        },
                      ),
                    ],
                  ),
                ],
              ),
            ],
          ),
        ),
      );
    },
  );
}
