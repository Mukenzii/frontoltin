import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:liber/core/constants/lang_text_const.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/components/app_bar_comp.dart';
import 'package:liber/core/widgets/cart/online_book_widget.dart';

class EBooksView extends StatelessWidget {
  const EBooksView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: appBarChange(context, txt: "Э-китоблар"),
      body: Padding(
        padding: EdgeInsets.all(16.r),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              LangTextConst().myEBooks,
              style: MyTextStyleComp.myTextStyle(size: 18, fontF: "Roboto500"),
            ),
            const OnlineBookWidget()
          ],
        ),
      ),
    );
  }
}
