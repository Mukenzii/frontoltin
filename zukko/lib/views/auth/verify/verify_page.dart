// ignore_for_file: no_leading_underscores_for_local_identifiers, avoid_print
import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:sms_autofill/sms_autofill.dart';
import 'package:liber/core/components/my_elevated_button_comp.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/constants/lang_text_const.dart';
import 'package:liber/core/widgets/book/my_auth_card_widget.dart';
import 'package:liber/service/auth/resend_otp/resend_otp_service.dart';
import 'package:liber/service/auth/verify_code/verify_code_service.dart';
import 'package:liber/views/auth/sign_up/sign_up_page.dart';

class VerifyPage extends StatefulWidget {
  const VerifyPage({Key? key}) : super(key: key);

  @override
  State<VerifyPage> createState() => _VerifyPageState();
  static int timerMaxSeconds = 60;
}

class _VerifyPageState extends State<VerifyPage> with TickerProviderStateMixin {
  TextEditingController verifyCode = TextEditingController();

  String get timerString {
    Duration duration = const Duration(minutes: 1);
    // print(duration);
    return '${duration.inMinutes}:${(duration.inSeconds % 60).toString().padLeft(2, '0')}';
  }

  final interval = const Duration(seconds: 1);
  int currentSeconds = 0;
  String get timerText =>
      '${((VerifyPage.timerMaxSeconds - currentSeconds) ~/ 60).toString().padLeft(2, '0')}: ${((VerifyPage.timerMaxSeconds - currentSeconds) % 60).toString().padLeft(2, '0')}';

  startTimeout([int? milliseconds]) {
    var duration = interval;
    Timer.periodic(duration, (timer) {
      setState(() {
        // print(timer.tick);
        currentSeconds = timer.tick;
        if (timer.tick >= VerifyPage.timerMaxSeconds) timer.cancel();
      });
    });
  }

  @override
  void initState() {
    startTimeout();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.fromLTRB(16.r, 56.r, 16.r, 64.r),
          child: SizedBox(
            height: MediaQuery.of(context).size.height * 0.8.h,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                MyAuthCartWidget(
                    219, 16, 33, "verify_icon", LangTextConst().verify1),
                Column(
                  children: [
                    SizedBox(
                      width: 170.w,
                      child: PinFieldAutoFill(
                        controller: verifyCode,
                        currentCode: verifyCode.text,
                        onCodeSubmitted: (v) {},
                        onCodeChanged: (v) {},
                        codeLength: 6,
                        decoration: UnderlineDecoration(
                          lineHeight: 2,
                          colorBuilder: FixedColorBuilder(ColorsConst.darkGray),
                          textStyle: MyTextStyleComp.myTextStyle(size: 24),
                        ),
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.all(16.r),
                      child: Text(
                        timerText,
                        style: MyTextStyleComp.myTextStyle(
                          size: 16,
                          fontF: "Roboto500",
                        ),
                      ),
                    ),
                    currentSeconds == VerifyPage.timerMaxSeconds
                        ? InkWell(
                            onTap: () {
                              startTimeout();
                              ResendOtpService.postData(
                                SignUpPage.nameController.text,
                                SignUpPage.usernameController.text,
                                SignUpPage.passwordController.text,
                              );
                            }, //! verfiy service code request yoziladi
                            child: Text(
                              LangTextConst().verify2,
                              style: MyTextStyleComp.myTextStyle(
                                color: ColorsConst.links,
                                size: 16,
                                fontF: "Roboto500",
                              ),
                            ),
                          )
                        : Text(
                            LangTextConst().verify2,
                            style: MyTextStyleComp.myTextStyle(
                              color: ColorsConst.darkGray,
                              size: 16,
                              fontF: "Roboto500",
                            ),
                          ),
                  ],
                ),
                Column(
                  children: [
                    InkWell(
                      onTap: () {
                        Navigator.pop(context);
                        Navigator.pop(context);
                      },
                      child: Text(
                        LangTextConst().verify3,
                        style: MyTextStyleComp.myTextStyle(
                          color: ColorsConst.links,
                          size: 16,
                          fontF: "Roboto500",
                        ),
                      ),
                    ),
                    const SizedBox(height: 31),
                    verifyCode.text.length == 6
                        ? MyElevatedButtonComp.elevatedButton(context, () {
                            if (verifyCode.text.isEmpty) {
                              // print("Bo'sh");
                            } else if (verifyCode.text.length == 6) {
                              VerifyCodeService.postData(
                                context,
                                SignUpPage.usernameController.text,
                                verifyCode.text,
                              );
                              // Navigator.pushNamedAndRemoveUntil(
                              //     context, '/screens', (route) => false);
                            } else {
                              // print("kod to'lumas");
                            }
                          }, LangTextConst().authButton)
                        : Container(
                            height: 56.h,
                            width: MediaQuery.of(context).size.width,
                            alignment: Alignment.center,
                            decoration: BoxDecoration(
                              color: ColorsConst.darkGray,
                              borderRadius: BorderRadius.circular(24),
                            ),
                            child: Text(LangTextConst().authButton),
                          ),
                  ],
                )
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    super.dispose();
    startTimeout;
  }
}
