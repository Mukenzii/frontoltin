import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/constants/lang_text_const.dart';
import 'package:liber/core/widgets/book/ask_container.dart';
import 'package:liber/data/user_login_data.dart';
import 'package:liber/mock/user_info_data.dart';
import 'package:liber/models/auth/user/get_user_model.dart';
import 'package:liber/service/auth/user/get_user_service.dart';

class ProfileView extends StatefulWidget {
  const ProfileView({super.key});

  @override
  State<ProfileView> createState() => _ProfileViewState();
}

class _ProfileViewState extends State<ProfileView> {
  @override
  void initState() {
    super.initState();
  }

  var son = NumberFormat.compactLong(locale: "ru");

  bool isTrue = true;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ColorsConst.white,
      appBar: AppBar(
        centerTitle: true,
        backgroundColor: ColorsConst.white,
        title: Text(
          LangTextConst().profile,
          style: MyTextStyleComp.myTextStyle(size: 20, fontF: "Roboto500"),
        ),
        elevation: 0,
      ),
      body: Padding(
        padding: EdgeInsets.fromLTRB(16.r, 0.r, 16.r, 16.r),
        child: SingleChildScrollView(
          child: Column(
            children: [
              //?  ------ Container info
              FutureBuilder(
                future: GetUserService.getData(),
                builder: (context, AsyncSnapshot<GetUserModel> snap) {
                  if (!snap.hasData) {
                    return UserInfoData.data.isEmpty
                        ? const SizedBox()
                        : loadingData(UserInfoData.data);
                  } else if (snap.hasError) {
                    return const SizedBox();
                  } else {
                    return successData(snap.data!);
                  }
                },
              ),
              //?  ------ If true show Container
              isTrue
                  ? showContainer(context, LangTextConst().profileText1,
                      LangTextConst().profileText2, "asked_icon")
                  : const SizedBox(),
              SizedBox(height: 10.h),
              //? Obuna bolish
              _iconAndText(
                onTap: () => Navigator.pushNamed(context, '/profile_follow'),
                icon: Icons.sell_outlined,
                text: LangTextConst().subsCribe,
              ),
              //? E-Xisob
              _iconAndText(
                onTap: () => Navigator.pushNamed(context, "/profile_wallet"),
                icon: Icons.account_balance_wallet_outlined,
                text: LangTextConst().eBalance,
              ),
              //? Sozlamalar
              _iconAndText(
                onTap: () => Navigator.pushNamed(context, "/profile_settings"),
                icon: Icons.settings,
                text: LangTextConst().settings,
              ),
              //? Log Out rejim
              // _iconAndText(
              //   onTap: () {},
              //   icon: Icons.dark_mode_outlined,
              //   text: LangTextConst().darkMode,
              //   issTrue: true,
              // ),
              _iconAndText(
                onTap: () => Navigator.popAndPushNamed(context, "/lang"),
                icon: Icons.language,
                text: LangTextConst().lang,
              ),
              _iconAndText(
                onTap: () => Navigator.pushNamed(context, "/book_favorites"),

                icon: Icons.bookmark_border,
                text: LangTextConst().favorites,
              ),
              _iconAndText(
                onTap: () {
                  UserLoginData().setGuid = "";
                  UserLoginData().setToken = "";
                  Navigator.pushNamedAndRemoveUntil(
                      context, '/auth', (route) => false);
                },
                icon: Icons.exit_to_app_outlined,
                text: LangTextConst().exit,
              ),
            ],
          ),
        ),
      ),
    );
  }

  //! Widget
  SizedBox _iconAndText({icon, text, void Function()? onTap}) {
    return SizedBox(
      height: 70.h,
      width: MediaQuery.of(context).size.width.w,
      child: Column(
        children: [
          InkWell(
            onTap: onTap,
            child: Padding(
              padding: EdgeInsets.only(top: 16.r, bottom: 16.r),
              child: Row(
                children: [
                  Icon(icon, color: ColorsConst.black, size: 19.r),
                  Padding(
                    padding: EdgeInsets.only(left: 18.r),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          "$text",
                          style: MyTextStyleComp.myTextStyle(size: 16),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          Divider(color: ColorsConst.darkGray),
        ],
      ),
    );
  }

  Widget successData(GetUserModel data) {
    return Padding(
      padding: EdgeInsets.only(bottom: 32.r),
      child: Container(
        height: 100.h,
        width: MediaQuery.of(context).size.width.w,
        decoration: BoxDecoration(
          color: ColorsConst.primary,
          borderRadius: BorderRadius.circular(20.r),
        ),
        //?  ------ Avatar && Texts
        child: Padding(
          padding: EdgeInsets.all(16.r),
          child: Row(
            children: [
              //?  ------ Avatar
              CircleAvatar(
                radius: 40.r,
                backgroundColor: ColorsConst.white,
                child: Center(
                  child: data.profilePicture == null
                      ? CircleAvatar(
                          radius: 30.r,
                          child: Icon(Icons.person, size: 30.sp),
                        )
                      : CircleAvatar(
                          radius: 30.r,
                          backgroundImage: NetworkImage(data.profilePicture),
                        ),
                ),
              ),
              //?  ------ Text(Name,Number,Id,Balans,Icon)
              Padding(
                padding: EdgeInsets.only(left: 13.r),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    //?  ------ Text(Name)
                    Text(
                      data.firstName!,
                      style: MyTextStyleComp.myTextStyle(
                        color: ColorsConst.white,
                        size: 16,
                        fontF: "Roboto500",
                      ),
                    ),
                    //?  ------ Text(Phone)
                    Text(
                      data.username!,
                      style: MyTextStyleComp.myTextStyle(
                        color: ColorsConst.white,
                        size: 12,
                      ),
                    ),
                    //?  ------ Text(Id,Balans,Icon)
                    Row(
                      children: [
                        Text(
                          "ID: ${data.id}  Баланс: ${son.format(double.parse("${data.balance}"))} сўм",
                          style: MyTextStyleComp.myTextStyle(
                            color: ColorsConst.white,
                            size: 12,
                          ),
                          overflow: TextOverflow.ellipsis,
                        ),
                        InkWell(
                          onTap: () => Navigator.pushNamed(
                              context, '/profile_fill_balance'),
                          child: Icon(
                            Icons.add_circle_outline,
                            color: ColorsConst.white,
                            size: 20.sp,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget loadingData(data) {
    return Padding(
      padding: EdgeInsets.only(bottom: 32.r),
      child: Container(
        height: 100.h,
        width: MediaQuery.of(context).size.width.w,
        decoration: BoxDecoration(
          color: ColorsConst.primary,
          borderRadius: BorderRadius.circular(20.r),
        ),
        //?  ------ Avatar && Texts
        child: Padding(
          padding: EdgeInsets.all(16.r),
          child: Row(
            children: [
              //?  ------ Avatar
              CircleAvatar(
                radius: 40.r,
                backgroundColor: ColorsConst.white,
                child: Center(
                  child: data["profile_picture"] != null
                      ? CircleAvatar(
                          radius: 30.r,
                          backgroundImage: NetworkImage(
                            data["profile_picture"] ?? "",
                          ),
                        )
                      : CircleAvatar(
                          radius: 30.r,
                          child: Icon(Icons.person, size: 30.sp),
                        ),
                ),
              ),
              //?  ------ Text(Name,Number,Id,Balans,Icon)
              Padding(
                padding: EdgeInsets.only(left: 13.r),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    //?  ------ Text(Name)
                    Text(
                      data["first_name"] ?? "",
                      style: MyTextStyleComp.myTextStyle(
                        color: ColorsConst.white,
                        size: 16,
                        fontF: "Roboto500",
                      ),
                    ),
                    //?  ------ Text(Phone)
                    Text(
                      data["username"] ?? "",
                      style: MyTextStyleComp.myTextStyle(
                        color: ColorsConst.white,
                        size: 12,
                      ),
                    ),
                    //?  ------ Text(Id,Balans,Icon)
                    Row(
                      children: [
                        Text(
                          "ID: ${data["id"] ?? ""}  Баланс: ${son.format(double.parse(data["balance"]))} сўм",
                          style: MyTextStyleComp.myTextStyle(
                            color: ColorsConst.white,
                            size: 12,
                          ),
                        ),
                        InkWell(
                          onTap: () => Navigator.pushNamed(
                            context,
                            '/profile_fill_balance',
                          ),
                          child: Icon(
                            Icons.add_circle_outline,
                            color: ColorsConst.white,
                            size: 20.sp,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
