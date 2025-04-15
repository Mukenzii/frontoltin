import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_svg/svg.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/constants/lang_text_const.dart';

class Onboarding extends StatefulWidget {
  const Onboarding({Key? key}) : super(key: key);

  @override
  State<Onboarding> createState() => _OnboardingState();
}

class _OnboardingState extends State<Onboarding> with TickerProviderStateMixin {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: EdgeInsets.fromLTRB(16.r, 16.r, 16.r, 64.r),
          child: Column(
            children: [
              Expanded(
                flex: 9,
                child: TabBarView(
                  controller: TabController(length: 3, vsync: this),
                  children: [
                    Padding(
                      padding: EdgeInsets.symmetric(vertical: 35.r),
                      child: OnBoardingWidget(
                        svg: "1",
                        text: LangTextConst().onboarding1,
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.symmetric(vertical: 35.r),
                      child: OnBoardingWidget(
                        svg: "2",
                        text: LangTextConst().onboarding2,
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.symmetric(vertical: 35.r),
                      child: OnBoardingWidget(
                        svg: "3",
                        text: LangTextConst().onboarding3,
                      ),
                    ),
                  ],
                ),
              ),
              Expanded(
                flex: 1,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(24.r),
                    ),
                    primary: ColorsConst.primary,
                    fixedSize: Size(MediaQuery.of(context).size.width.w, 56.h),
                  ),
                  onPressed: () {
                    Navigator.pushNamedAndRemoveUntil(
                        context, "/auth", (route) => false);
                  },
                  child: Text(LangTextConst().onboardingButton),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class OnBoardingWidget extends StatelessWidget {
  final String svg;
  final String text;
  const OnBoardingWidget({required this.svg, required this.text, Key? key})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: SizedBox(
        height: 360.h,
        width: 217.w,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            SvgPicture.asset("assets/svgs/onboarding_$svg.svg"),
            Text(text,
                textAlign: TextAlign.center,
                style: MyTextStyleComp.myTextStyle(
                  size: 20,
                  fontF: "Roboto500",
                )),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  Icons.circle,
                  size: 10.r,
                  color:
                      svg == "1" ? ColorsConst.primary : ColorsConst.darkGray,
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 4.0),
                  child: Icon(
                    Icons.circle,
                    size: 10.r,
                    color:
                        svg == "2" ? ColorsConst.primary : ColorsConst.darkGray,
                  ),
                ),
                Icon(
                  Icons.circle,
                  size: 10.r,
                  color:
                      svg == "3" ? ColorsConst.primary : ColorsConst.darkGray,
                ),
              ],
            )
          ],
        ),
      ),
    );
  }
}
