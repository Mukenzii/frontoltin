import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:liber/core/components/my_elevated_button_comp.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/constants/lang_text_const.dart';
import 'package:liber/core/widgets/book/my_auth_card_widget.dart';
import 'package:liber/service/auth/forgot_password/forgot_password_service.dart';

class ForgotPasswordPage extends StatelessWidget {
  ForgotPasswordPage({Key? key}) : super(key: key);
  final TextEditingController controller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      
      body: Padding(
        padding: EdgeInsets.fromLTRB(16.r, 56.r, 16.r, 28.r),
        child: SingleChildScrollView(
          child: SizedBox(
            height: MediaQuery.of(context).size.height * 0.88,
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
                      padding: EdgeInsets.only(top: 25.r, bottom: 6.r),
                      child: Text(
                        LangTextConst().loginText2,
                        style: MyTextStyleComp.myTextStyle(fontF: "Roboto500"),
                      ),
                    ),
                    TextFormField(
                      controller: controller,
                      decoration: InputDecoration(
                        fillColor: ColorsConst.gray,
                        enabledBorder: OutlineInputBorder(
                          borderSide:
                              const BorderSide(color: Color(0xffededed)),
                          borderRadius: BorderRadius.circular(16.r),
                        ),
                      ),
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        TextButton(
                          onPressed: () => Navigator.pop(context),
                          child: Text("Ортга Кайтиш"),
                        ),
                      ],
                    )
                  ],
                ),
                Card(
                  elevation: 30,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(24),
                  ),
                  child: MyElevatedButtonComp.elevatedButton(
                    context,
                    () async => await ForgotPasswordService.postData(
                      context,
                      controller.text,
                    ),
                    LangTextConst().authButton,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
