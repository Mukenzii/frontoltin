import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/data/user_login_data.dart';

class LoadingView extends StatefulWidget {
  const LoadingView({Key? key}) : super(key: key);

  @override
  State<LoadingView> createState() => _LoadingViewState();
}

class _LoadingViewState extends State<LoadingView> {
  Future checkGuid() async {
    var sp = await UserLoginData.instance();
    if (sp.getGuid!.isEmpty) {
      Navigator.pushNamedAndRemoveUntil(context, '/auth', (route) => false);
    } else if (sp.getGuid == "null") {
      Navigator.pushNamedAndRemoveUntil(
          context, '/onboarding', (route) => false);
    } else {
      Navigator.pushNamedAndRemoveUntil(context, '/screens', (route) => false);
    }
  }

  @override
  void initState() {
    super.initState();
    checkGuid();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ColorsConst.primary,
      body: Center(
        child: SizedBox(
          height: 100.w,
          width: 100.w,
          child: Image.asset(
            "assets/images/book_icon.png",
            color: Colors.white,
          ),
        ),
      ),
    );
  }
}
