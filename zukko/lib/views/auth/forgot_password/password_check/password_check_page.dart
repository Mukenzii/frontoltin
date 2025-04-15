import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:liber/core/components/my_elevated_button_comp.dart';
import 'package:liber/views/auth/forgot_password/page/forgot_password_page.dart';
import 'package:sms_autofill/sms_autofill.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/constants/lang_text_const.dart';
import 'package:liber/core/widgets/book/my_auth_card_widget.dart';
import 'package:liber/service/auth/forgot_password/forgot_password_check_service.dart';
import 'package:liber/service/auth/resend_otp/resend_otp_service.dart';
import 'package:liber/views/auth/sign_up/sign_up_page.dart';

class PasswordCheckPage extends StatefulWidget {
  final String firstName;
  final String userName;
  final String password;

  const PasswordCheckPage(
      {required this.firstName,
      required this.userName,
      required this.password,
      Key? key})
      : super(key: key);
  static int timerMaxSeconds = 60;

  @override
  State<PasswordCheckPage> createState() => _PasswordCheckPageState();
}

class _PasswordCheckPageState extends State<PasswordCheckPage> {
  TextEditingController verifyCode = TextEditingController();

  String get timerString {
    Duration duration = const Duration(minutes: 1);
    // print(duration);
    return '${duration.inMinutes}:${(duration.inSeconds % 60).toString().padLeft(2, '0')}';
  }

  final interval = const Duration(seconds: 1);
  int currentSeconds = 0;

  String get timerText =>
      '${((PasswordCheckPage.timerMaxSeconds - currentSeconds) ~/ 60).toString().padLeft(2, '0')}: ${((PasswordCheckPage.timerMaxSeconds - currentSeconds) % 60).toString().padLeft(2, '0')}';

  startTimeout([int? milliseconds]) {
    var duration = interval;
    Timer.periodic(duration, (timer) {
      setState(() {
        // print(timer.tick);
        currentSeconds = timer.tick;
        if (timer.tick >= PasswordCheckPage.timerMaxSeconds) timer.cancel();
      });
    });
  }

  @override
  void initState() {
    startTimeout();
    // print(timerText);
    super.initState();
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(16, 56, 16, 64),
          child: SizedBox(
            height: MediaQuery.of(context).size.height * 0.85,
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
                          lineHeight: 1,
                          colorBuilder: FixedColorBuilder(ColorsConst.black),
                          textStyle: MyTextStyleComp.myTextStyle(size: 24),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(16),
                      child: Text(
                        timerText,
                        style: MyTextStyleComp.myTextStyle(
                          size: 16,
                          fontF: "Roboto500",
                        ),
                      ),
                    ),
                    currentSeconds == PasswordCheckPage.timerMaxSeconds
                        ? InkWell(
                            onTap: () {
                              startTimeout();
                              ResendOtpService.postData(
                                widget.firstName,
                                widget.userName,
                                widget.password,
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
                      onTap: () => Navigator.pop(context),
                      child: Text(
                        LangTextConst().verify3,
                        style: MyTextStyleComp.myTextStyle(
                          color: ColorsConst.links,
                          size: 16,
                          fontF: "Roboto500",
                        ),
                      ),
                    ),
                    SizedBox(height: 31.h),
                    verifyCode.text.length == 6
                        ? MyElevatedButtonComp.elevatedButton(context,
                            () async {
                            print(widget.userName);

                            if (verifyCode.text.isEmpty) {
                            } else if (verifyCode.text.length == 6) {
                              await ForgotPasswordCheckService.postData(
                                context,
                                widget.userName,
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
