import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:liber/core/components/my_elevated_button_comp.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/constants/lang_text_const.dart';
import 'package:liber/core/widgets/book/my_auth_card_widget.dart';
import 'package:liber/service/auth/login/login_service.dart';
import 'package:liber/service/auth/register/register_service.dart';
import 'package:liber/views/auth/login/login_page.dart';
import 'package:liber/views/auth/sign_up/sign_up_page.dart';

class AuthView extends StatefulWidget {
  const AuthView({Key? key}) : super(key: key);

  @override
  State<AuthView> createState() => _AuthViewState();
}

class _AuthViewState extends State<AuthView> {
  bool sign = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SizedBox(
        height: MediaQuery.of(context).size.height,
        child: Padding(
          padding: EdgeInsets.fromLTRB(16.r, 56.r, 16.r, 28.r),
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    MyAuthCartWidget(
                        291, 33, 74, "liber", LangTextConst().signText1),
                    sign ? const LoginPage() : const SignUpPage()
                  ],
                ),
                Column(
                  children: [
                    Card(
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(24.r),
                      ),
                      child: MyElevatedButtonComp.elevatedButton(
                        context,
                        () async {
                          if (sign == true) {
                            if (LoginPage.usernameController.text.isEmpty) {
                              // print("User Name bow");
                            } else if (LoginPage
                                .passwordController.text.isEmpty) {
                              // print("Password bow");
                            } else {
                              if (LoginPage.number == true) {
                                String userName = "";
                                for (var i = 0;
                                    i <
                                        LoginPage
                                            .usernameController.text.length;
                                    i++) {
                                  if (LoginPage.usernameController.text[i] ==
                                      " ") {
                                  } else if (LoginPage
                                          .usernameController.text[i] ==
                                      "+") {
                                  } else {
                                    userName +=
                                        LoginPage.usernameController.text[i];
                                  }
                                }
                                LoginPage.usernameController.text = userName;
                                await LoginService.postData(
                                  context,
                                  LoginPage.usernameController.text,
                                  LoginPage.passwordController.text,
                                );
                              } else {
                                await LoginService.postData(
                                  context,
                                  LoginPage.usernameController.text,
                                  LoginPage.passwordController.text,
                                );
                              }
                            }
                          } else {
                            if (SignUpPage.nameController.text.isEmpty) {
                              // print("Name bow");
                            } else if (SignUpPage
                                .usernameController.text.isEmpty) {
                              // print("User Name bow");
                            } else if (SignUpPage
                                .passwordController.text.isEmpty) {
                              // print("Password bow");
                            } else {
                              if (SignUpPage.number) {
                                String userName = "";
                                for (var i = 0;
                                    i <
                                        SignUpPage
                                            .usernameController.text.length;
                                    i++) {
                                  if (SignUpPage.usernameController.text[i] ==
                                      " ") {
                                  } else if (SignUpPage
                                          .usernameController.text[i] ==
                                      "+") {
                                  } else {
                                    userName +=
                                        SignUpPage.usernameController.text[i];
                                  }
                                }
                                SignUpPage.usernameController.text = userName;
                                await RegisterService.postData(
                                  context,
                                  SignUpPage.nameController.text,
                                  SignUpPage.usernameController.text = userName,
                                  SignUpPage.passwordController.text,
                                );
                              } else {
                                await RegisterService.postData(
                                  context,
                                  SignUpPage.nameController.text,
                                  SignUpPage.usernameController.text,
                                  SignUpPage.passwordController.text,
                                );
                              }
                            }
                          }
                        },
                        sign ? LangTextConst().authButton : 'Рўйхатдан ўтиш',
                      ),
                    ),
                    SizedBox(height: 16.h),
                    TextButton(
                      onPressed: () => setState(() {
                        sign = !sign;
                        LoginPage.usernameController.text = "";
                        LoginPage.passwordController.text = "";
                        SignUpPage.nameController.text = "";
                        SignUpPage.usernameController.text = "";
                        SignUpPage.passwordController.text = "";
                      }),
                      child: Text(
                        sign ? LangTextConst().register : "Кириш",
                        style: MyTextStyleComp.myTextStyle(
                          color: ColorsConst.links,
                          size: 18,
                          fontF: "Roboto500",
                        ),
                      ),
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
}
