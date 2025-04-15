import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:liber/core/components/app_bar_comp.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/constants/lang_text_const.dart';
import 'package:liber/mock/user_info_data.dart';
import 'package:liber/models/auth/user/get_user_model.dart';
import 'package:liber/service/transaction/transaction_service.dart';
import 'package:url_launcher/url_launcher_string.dart';

import '../../../service/auth/user/get_user_service.dart';

class ProfileFillBalance extends StatefulWidget {
  final String transactionType;
  const ProfileFillBalance({required this.transactionType, Key? key})
      : super(key: key);

  @override
  State<ProfileFillBalance> createState() => _ProfileFillBalanceState();
}

class _ProfileFillBalanceState extends State<ProfileFillBalance> {
  TextEditingController sumController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: appBarWidget(context, txt: LangTextConst().pay),
      body: Padding(
        padding: EdgeInsets.fromLTRB(16.r, 26.r, 16.r, 46.r),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                //? Container (Id,Balans)
                Container(
                  height: 77.h,
                  width: MediaQuery.of(context).size.width,
                  decoration: BoxDecoration(
                    color: ColorsConst.primary,
                    borderRadius: BorderRadius.circular(20.r),
                  ),
                  child: Center(
                    child: FutureBuilder(
                      future: GetUserService.getData(),
                      builder: (context, AsyncSnapshot<GetUserModel> snap) {
                        if (!snap.hasData) {
                          return Text(
                            "ID: ${UserInfoData.data['id']}  Баланс: ${UserInfoData.data['balance']} сўм",
                            style: MyTextStyleComp.myTextStyle(
                              color: ColorsConst.white,
                              fontF: "Roboto500",
                            ),
                          );
                        } else if (snap.hasError) {
                          return const SizedBox();
                        } else {
                          var data = snap.data!;
                          return Text(
                            "ID: ${data.id}  Баланс: ${data.balance} сўм",
                            style: MyTextStyleComp.myTextStyle(
                              color: ColorsConst.white,
                              fontF: "Roboto500",
                            ),
                          );
                        }
                      },
                    ),
                  ),
                ),
                //? Text (sum)
                Padding(
                  padding: EdgeInsets.only(top: 24.r, bottom: 6.r),
                  child: Text(
                    LangTextConst().amount,
                    style: MyTextStyleComp.myTextStyle(fontF: "Roboto500"),
                  ),
                ),
                //? TextFormField
                SizedBox(
                  height: 50.h,
                  width: MediaQuery.of(context).size.width.w,
                  child: TextFormField(
                    controller: sumController,
                    keyboardType: TextInputType.number,
                    decoration: InputDecoration(
                      hintStyle: TextStyle(height: 3.h),
                      hintText: LangTextConst().amount,
                      border: OutlineInputBorder(
                        borderSide: BorderSide(color: ColorsConst.darkGray),
                        borderRadius: BorderRadius.circular(20.r),
                      ),
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(
              height: 48.h,
              width: MediaQuery.of(context).size.width.w,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  primary: ColorsConst.primary,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20.r),
                  ),
                ),
                onPressed: () async {
                  var res = await TransactionService.postData(
                    widget.transactionType,
                    sumController.text,
                  );
                  int sum = int.parse(sumController.text);
                  if (sum >= 1000) {
                    await _launchUrl(res["generated_link"]);
                  } else {
                    // print("1000 dan tepa bosin");
                  }
                },
                child: Text(
                  LangTextConst().toFill,
                  style: MyTextStyleComp.myTextStyle(
                    fontF: "Roboto500",
                    color: ColorsConst.white,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _launchUrl(_url) async {
    if (await launchUrlString(_url,
        mode: LaunchMode.externalNonBrowserApplication)) {
      throw 'What faq $_url';
    } else {
      // print("Good baby");
    }
    setState(() {});
  }
}
