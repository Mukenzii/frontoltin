import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/constants/lang_text_const.dart';
import 'package:mask_text_input_formatter/mask_text_input_formatter.dart';

class SignUpPage extends StatefulWidget {
  const SignUpPage({Key? key}) : super(key: key);
  static TextEditingController nameController = TextEditingController();
  static TextEditingController usernameController =
      TextEditingController(text: "+998");
  static TextEditingController passwordController = TextEditingController();
  static bool number = true;
  @override
  State<SignUpPage> createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage> {
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
            LangTextConst().loginText1,
            style: MyTextStyleComp.myTextStyle(fontF: "Roboto500"),
          ),
        ),
        SizedBox(
          height: 50,
          child: TextFormField(
            controller: SignUpPage.nameController,
            decoration: InputDecoration(
              fillColor: ColorsConst.gray,
              enabledBorder: OutlineInputBorder(
                borderSide: const BorderSide(color: Color(0xffededed)),
                borderRadius: BorderRadius.circular(16.r),
              ),
            ),
          ),
        ),
        Padding(
          padding: EdgeInsets.only(top: 16.r, bottom: 6.r),
          child: Text(
            LangTextConst().loginText2,
            style: MyTextStyleComp.myTextStyle(fontF: "Roboto500"),
          ),
        ),
        SizedBox(
          height: 50,
          child: userNameText != LangTextConst().userNumberText
              ? TextFormField(
                  inputFormatters: [
                    MaskTextInputFormatter(mask: "+998 ## ### ## ##"),
                  ],
                  controller: SignUpPage.usernameController,
                  onTap: () => setState(
                      () => SignUpPage.usernameController.text = "+998 "),
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
                  controller: SignUpPage.usernameController,
                  decoration: InputDecoration(
                    fillColor: ColorsConst.gray,
                    enabledBorder: OutlineInputBorder(
                      borderSide: const BorderSide(color: Color(0xffededed)),
                      borderRadius: BorderRadius.circular(16.r),
                    ),
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
                  SignUpPage.usernameController.text = "";
                  SignUpPage.number = false;
                  userNameText = LangTextConst().userNumberText;
                } else {
                  SignUpPage.usernameController.text = "+998";
                  SignUpPage.number = true;
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
        Padding(
          padding: EdgeInsets.only(bottom: 12.r),
          child: SizedBox(
            height: 50,
            child: TextFormField(
              obscureText: passEye,
              controller: SignUpPage.passwordController,
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
          ),
        ),
      ],
    );
  }
}
