import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:liber/core/constants/lang_text_const.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/components/app_bar_comp.dart';
import 'package:liber/core/widgets/cart/audio_book_widget.dart';

class AudioBookView extends StatelessWidget {
  const AudioBookView({Key? key}) : super(key: key);
  final bool isTrue = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: appBarChange(context, txt: LangTextConst().audio),
      body: Padding(
        padding: EdgeInsets.all(16.r),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              LangTextConst().myAudioBooks,
              style: MyTextStyleComp.myTextStyle(size: 18, fontF: "Roboto500"),
            ),
            const AudioBookWidget(),
          ],
        ),
      ),
    );
  }
}
