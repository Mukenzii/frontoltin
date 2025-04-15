// ignore_for_file: non_constant_identifier_names
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:liber/core/components/app_bar_comp.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/constants/lang_text_const.dart';
import 'package:liber/mock/user_info_data.dart';
import 'package:liber/models/auth/user/get_user_model.dart';

import '../../../service/auth/user/get_user_service.dart';

class ProfileWallet extends StatelessWidget {
  const ProfileWallet({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: appBarWidget(context, txt: LangTextConst().eBalance, size: 20),
      body: Padding(
        padding: EdgeInsets.fromLTRB(16.r, 30.r, 16.r, 16.r),
        child: Column(
          children: [
            //? Card
            Container(
              height: 100.h,
              width: MediaQuery.of(context).size.width.w,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20.r),
                color: ColorsConst.primary,
              ),
              //? Widgets in Cart (Text,Svg)
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  SizedBox(width: 60.w),
                  //? Text Balans
                  Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      Text(
                        LangTextConst().balance,
                        style: MyTextStyleComp.myTextStyle(
                          color: ColorsConst.white,
                          size: 16,
                        ),
                      ),
                      FutureBuilder(
                        future: GetUserService.getData(),
                        builder: (context, AsyncSnapshot<GetUserModel> snap) {
                          if (!snap.hasData) {
                            return Text(
                              "${UserInfoData.data["balance"]} ${LangTextConst().som}",
                              style: MyTextStyleComp.myTextStyle(
                                color: ColorsConst.white,
                                size: 20,
                                fontF: "Roboto500",
                              ),
                            );
                          } else if (snap.hasError) {
                            return const SizedBox();
                          } else {
                            var data = snap.data!;
                            return Text(
                              "${data.balance} ${LangTextConst().som}",
                              style: MyTextStyleComp.myTextStyle(
                                color: ColorsConst.white,
                                size: 20,
                                fontF: "Roboto500",
                              ),
                            );
                          }
                        },
                      )
                    ],
                  ),
                  Column(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [SvgPicture.asset("assets/svgs/pay_icon.svg")],
                  )
                ],
              ),
            ),
            //? Text(Toldirish)
            Padding(
              padding: EdgeInsets.only(top: 32.r, bottom: 24.r),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  Text(
                    LangTextConst().toFill,
                    style: MyTextStyleComp.myTextStyle(
                      fontF: "Roboto500",
                      size: 16,
                    ),
                  ),
                ],
              ),
            ),
            //? Button(PayMe)
            buttons_pay(context, 'payme'),
            SizedBox(height: 16.h),
            //? Button(Click)
            buttons_pay(context, 'click'),
          ],
        ),
      ),
    );
  }

  //! Widget
  InkWell buttons_pay(BuildContext context, asset) {
    return InkWell(
      onTap: () => Navigator.pushNamed(
        context,
        "/profile_fill_balance",
        arguments: asset,
      ),
      child: Container(
        width: MediaQuery.of(context).size.width.w,
        height: 61.h,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20.r),
          border: Border.all(color: ColorsConst.strokeAccent),
        ),
        child: Center(child: Image.asset("assets/images/$asset.png")),
      ),
    );
  }
}
