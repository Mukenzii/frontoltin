import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:liber/core/components/my_elevated_button_comp.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/constants/lang_text_const.dart';
import 'package:liber/core/widgets/book/my_auth_card_widget.dart';
import 'package:liber/service/auth/forgot_password/forgot_password_confirm_service.dart';

class PasswordConfirmPage extends StatelessWidget {
  static String userName = "";
  PasswordConfirmPage({Key? key}) : super(key: key);

  final TextEditingController passController1 = TextEditingController();
  final TextEditingController passController2 = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.fromLTRB(16, 56, 16, 28),
        child: SingleChildScrollView(
          child: SizedBox(
            height: MediaQuery.of(context).size.height * 0.89,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    MyAuthCartWidget(
                      291,
                      33,
                      74,
                      "liber",
                      LangTextConst().signText1,
                    ),
                    Padding(
                      padding: const EdgeInsets.only(top: 25, bottom: 6),
                      child: Text(
                        LangTextConst().confirmPassword1,
                        style: MyTextStyleComp.myTextStyle(fontF: "Roboto500"),
                      ),
                    ),
                    Form(
                      key: key,
                      child: TextFormField(
                        key: key,
                        controller: passController1,
                        decoration: InputDecoration(
                          fillColor: ColorsConst.gray,
                          enabledBorder: OutlineInputBorder(
                            borderSide:
                                const BorderSide(color: Color(0xffededed)),
                            borderRadius: BorderRadius.circular(16.r),
                          ),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(top: 25, bottom: 6),
                      child: Text(
                        LangTextConst().confirmPassword2,
                        style: MyTextStyleComp.myTextStyle(fontF: "Roboto500"),
                      ),
                    ),
                    Form(
                      key: key,
                      child: TextFormField(
                        key: key,
                        controller: passController2,
                        decoration: InputDecoration(
                          fillColor: ColorsConst.gray,
                          enabledBorder: OutlineInputBorder(
                            borderSide:
                                const BorderSide(color: Color(0xffededed)),
                            borderRadius: BorderRadius.circular(16.r),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
                Column(
                  children: [
                    Card(
                      elevation: 30,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(24),
                      ),
                      child: MyElevatedButtonComp.elevatedButton(
                        context,
                        () async {
                          if (passController1.text == passController2.text) {
                            await ForgotPasswordConfirmService.postData(
                              context,
                              userName,
                              passController1.text,
                              passController2.text,
                            );
                          }
                        },
                        LangTextConst().authButton,
                      ),
                    ),
                    const SizedBox(height: 16),
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
