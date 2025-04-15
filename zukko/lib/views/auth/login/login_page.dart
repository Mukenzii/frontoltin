import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/constants/lang_text_const.dart';
import 'package:mask_text_input_formatter/mask_text_input_formatter.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);
  static TextEditingController usernameController =
      TextEditingController(text: "+998");
  static TextEditingController passwordController = TextEditingController();
  static bool number = true;

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  bool passEye = true;
  String userNameText = LangTextConst().userEmailText;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: EdgeInsets.only(top: 25.r, bottom: 6.r),
          child: Text(
            LangTextConst().loginText2,
            style: MyTextStyleComp.myTextStyle(fontF: "Roboto500"),
          ),
        ),
        userNameText != LangTextConst().userNumberText
            ? TextFormField(
                inputFormatters: [
                  MaskTextInputFormatter(mask: "+998 ## ### ## ##"),
                ],
                controller: LoginPage.usernameController,
                onTap: () =>
                    setState(() => LoginPage.usernameController.text = "+998 "),
                decoration: InputDecoration(
                  hintText: "+998",
                  fillColor: ColorsConst.gray,
                  enabledBorder: OutlineInputBorder(
                    borderSide: const BorderSide(color: Color(0xffededed)),
                    borderRadius: BorderRadius.circular(16.r),
                  ),
                ),
              )
            : TextFormField(
                controller: LoginPage.usernameController,
                decoration: InputDecoration(
                  fillColor: ColorsConst.gray,
                  enabledBorder: OutlineInputBorder(
                    borderSide: const BorderSide(color: Color(0xffededed)),
                    borderRadius: BorderRadius.circular(16.r),
                  ),
                ),
              ),
        Row(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            TextButton(
              style: ButtonStyle(
                padding: MaterialStateProperty.all(EdgeInsets.zero),
              ),
              onPressed: () => setState(() {
                if (userNameText == LangTextConst().userEmailText) {
                  LoginPage.usernameController.text = "";
                  userNameText = LangTextConst().userNumberText;
                  LoginPage.number = false;
                } else {
                  LoginPage.usernameController.text = "+998";
                  LoginPage.number = true;
                  userNameText = LangTextConst().userEmailText;
                }
              }),
              child: Text(userNameText),
            ),
          ],
        ),
        Padding(
          padding: EdgeInsets.only(bottom: 6.r),
          child: Text(
            LangTextConst().loginText3,
            style: MyTextStyleComp.myTextStyle(fontF: "Roboto500"),
          ),
        ),
        TextFormField(
          obscureText: passEye,
          controller: LoginPage.passwordController,
          decoration: InputDecoration(
            suffixIcon: IconButton(
              padding: EdgeInsets.zero,
              onPressed: () => setState(() => passEye = !passEye),
              icon: passEye
                  ? const Icon(Icons.visibility)
                  : const Icon(Icons.visibility_off),
            ),
            fillColor: ColorsConst.gray,
            enabledBorder: OutlineInputBorder(
              borderSide: const BorderSide(color: Color(0xffededed)),
              borderRadius: BorderRadius.circular(16.r),
            ),
          ),
        ),
        Padding(
          padding: EdgeInsets.only(bottom: 6.r),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              TextButton(
                onPressed: () =>
                    Navigator.pushNamed(context, "/forgot_password"),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    Text(
                      LangTextConst().forgotPassword,
                      style: MyTextStyleComp.myTextStyle(
                        fontF: "Roboto500",
                        color: ColorsConst.links,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
