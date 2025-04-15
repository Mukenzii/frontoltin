import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/constants/lang_text_const.dart';
import 'package:liber/views/screens/audio/audio_book_view.dart';
import 'package:liber/views/screens/online/online_book_view.dart';
import 'package:liber/views/screens/cart/cart_view.dart';
import 'package:liber/views/screens/home/home_view.dart';
import 'package:liber/views/screens/profile/profile_view.dart';

class ScreensView extends StatefulWidget {
  const ScreensView({Key? key}) : super(key: key);

  @override
  State<ScreensView> createState() => _ScreensViewState();
}

class _ScreensViewState extends State<ScreensView>
    with TickerProviderStateMixin {
  TabController? tabController;
  @override
  void initState() {
    super.initState();
    tabController = TabController(length: 5, vsync: this);
    tabController!.index = 2;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: TabBarView(
        controller: tabController,
        physics: const NeverScrollableScrollPhysics(),
        children: const [
          EBooksView(),
          AudioBookView(),
          HomeView(),
          CartView(),
          ProfileView(),
        ],
      ),
      bottomNavigationBar: TabBar(
        physics: const NeverScrollableScrollPhysics(),
        labelPadding: EdgeInsets.zero,
        padding: EdgeInsets.only(bottom: 10.r),
        indicatorColor: Colors.white,
        controller: tabController,
        tabs: [
          tab(LangTextConst().eBook, "book_mark", tabController!.index, 0),
          tab(LangTextConst().audio, "headphone", tabController!.index, 1),
          tab(LangTextConst().home, "home", tabController!.index, 2),
          tab(LangTextConst().cart, "shopping_cart", tabController!.index, 3),
          tab(LangTextConst().profile, "user", tabController!.index, 4),
        ],
        onTap: (v) => setState(() => tabController!.index = v),
      ),
    );
  }

  Tab tab(text, icon, tabIndex, i) {
    return Tab(
      icon: SvgPicture.asset(
        'assets/svgs/${icon}_tab.svg',
        color: tabIndex == i ? ColorsConst.primary : ColorsConst.text,
      ),
      child: Text(
        text,
        style: MyTextStyleComp.myTextStyle(
          size: 12,
          color: tabIndex == i ? ColorsConst.primary : ColorsConst.text,
        ),
      ),
    );
  }
}
