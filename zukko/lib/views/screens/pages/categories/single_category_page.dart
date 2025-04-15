import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:liber/models/category/single_category_model.dart';
import 'package:liber/service/category/single_category_service.dart';
import 'package:rating_bar_flutter/rating_bar_flutter.dart';
import 'package:liber/core/components/app_bar_comp.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/constants/lang_text_const.dart';
import 'package:liber/core/widgets/book/ask_container.dart';

class SingleCategoryPage extends StatefulWidget {
  final List bookInfo;
  const SingleCategoryPage({required this.bookInfo, Key? key})
      : super(key: key);

  @override
  State<SingleCategoryPage> createState() => _SingleCategoryPageState();
}

class _SingleCategoryPageState extends State<SingleCategoryPage> {
  TextEditingController textController = TextEditingController();
  late double ratingStar = 0;

  List<Result> results = [];
  String? nextUrl;
  late ScrollController controller;

  @override
  void initState() {
    getData();
    super.initState();
    controller = ScrollController()..addListener(pagination);
  }

  Future<void> getData() async {
    results = [];
    print(results);
    var res =
        await SingleCategoryService.getData(widget.bookInfo[0], search: "");
    nextUrl = res.next;
    results.addAll(res.results ?? []);
    setState(() {});
  }

  Future<void> searchData(String search) async {
    results = [];
    var res =
        await SingleCategoryService.getData(widget.bookInfo[0], search: search);
    nextUrl = res.next;
    results.addAll(res.results ?? []);
    setState(() {});
  }

  pagination() async {
    if (controller.position.pixels == controller.position.maxScrollExtent) {
      if (nextUrl == null) {
        return;
      }
      var res = await SingleCategoryService.getData(widget.bookInfo[0],
          next: nextUrl);
      nextUrl = res.next;
      results.addAll(res.results ?? []);
      setState(() {});
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ColorsConst.white,
      appBar: appBarChange(
        context,
        txt: widget.bookInfo[1],
        icon: Icons.arrow_back_ios,
      ),
      body: Padding(
        padding: EdgeInsets.all(16.r),
        child: Column(
          children: [
            //* Search
            SizedBox(
              height: 50.h,
              width: MediaQuery.of(context).size.width.w,
              child: TextFormField(
                controller: textController,
                onChanged: (v) => setState(
                  () {
                    print(results);
                    results = [];
                    if (v.isEmpty) {
                      getData();
                    } else {
                      searchData(textController.text);
                    }
                  },
                ),
                decoration: InputDecoration(
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(16.r),
                    borderSide: BorderSide(color: ColorsConst.gray),
                  ),
                  filled: true,
                  fillColor: ColorsConst.white,
                  hintText: LangTextConst().search,
                  suffixIcon: const Icon(Icons.search),
                ),
              ),
            ),
            Padding(
              padding: EdgeInsets.symmetric(vertical: 16.r),
              child: showContainer(
                context,
                "${widget.bookInfo[1]} ${LangTextConst().text1}",
                LangTextConst().text2,
                "asked_icon",
              ),
            ),
            Expanded(child: newBookLoading(results)),
          ],
        ),
      ),
    );
  }

  newBookLoading(List<Result> results) {
    if (results.isEmpty) {
      return const Center(
        child: Padding(
          padding: EdgeInsets.all(20),
          child: CircularProgressIndicator.adaptive(),
        ),
      );
    } else {
      return GridView.builder(
        physics: const BouncingScrollPhysics(),
        controller: controller,
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 20,
          mainAxisSpacing: 18,
          mainAxisExtent: 290.w,
        ),
        itemBuilder: (context, index) {
          return InkWell(
            borderRadius: BorderRadius.circular(16.r),
            onTap: () {
              Navigator.pushNamed(
                context,
                '/book',
                arguments: results[index].guid,
              );
            },
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  height: 210.h,
                  width: 162.w,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(8.r),
                    color: ColorsConst.darkGray,
                    image: results[index].thumbnail != null
                        ? DecorationImage(
                            image: NetworkImage(results[index].thumbnail!),
                            fit: BoxFit.cover,
                          )
                        : null,
                  ),
                ),
                SizedBox(height: 9.h),
                SizedBox(
                  // height: 65.h,
                  width: 209.w,
                  child: Column(
                    // mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      bookRate(results[index].getReview?["rate"]?.toInt()),
                      SizedBox(height: 9.71.h),
                      Text(
                        results[index].title ?? "",
                        style: MyTextStyleComp.myTextStyle(
                          size: 20,
                          fontF: "Roboto500",
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                      SizedBox(height: 5.h),
                      Text(
                        results[index].author ?? "",
                        style: MyTextStyleComp.myTextStyle(
                          color: ColorsConst.darkGray,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          );
        },
        itemCount: results.length,
      );
    }
  }

  Widget bookRate(int? data, {double s = 18}) {
    print(data);
    if (data == 5) {
      return Row(children: [
        Icon(Icons.star, size: s.sp, color: ColorsConst.primary),
        Icon(Icons.star, size: s.sp, color: ColorsConst.primary),
        Icon(Icons.star, size: s.sp, color: ColorsConst.primary),
        Icon(Icons.star, size: s.sp, color: ColorsConst.primary),
        Icon(Icons.star, size: s.sp, color: ColorsConst.primary),
      ]);
    } else if (data == 4) {
      return Row(children: [
        Icon(Icons.star, size: s.sp, color: ColorsConst.primary),
        Icon(Icons.star, size: s.sp, color: ColorsConst.primary),
        Icon(Icons.star, size: s.sp, color: ColorsConst.primary),
        Icon(Icons.star, size: s.sp, color: ColorsConst.primary),
        Icon(Icons.star_border, size: s.sp, color: ColorsConst.darkGray),
      ]);
    } else if (data == 3) {
      return Row(children: [
        Icon(Icons.star, size: s.sp, color: ColorsConst.primary),
        Icon(Icons.star, size: s.sp, color: ColorsConst.primary),
        Icon(Icons.star, size: s.sp, color: ColorsConst.primary),
        Icon(Icons.star_border, size: s.sp, color: ColorsConst.darkGray),
        Icon(Icons.star_border, size: s.sp, color: ColorsConst.darkGray),
      ]);
    } else if (data == 2) {
      return Row(children: [
        Icon(Icons.star, size: s.sp, color: ColorsConst.primary),
        Icon(Icons.star, size: s.sp, color: ColorsConst.primary),
        Icon(Icons.star_border, size: s.sp, color: ColorsConst.darkGray),
        Icon(Icons.star_border, size: s.sp, color: ColorsConst.darkGray),
        Icon(Icons.star_border, size: s.sp, color: ColorsConst.darkGray),
      ]);
    } else if (data == 1) {
      return Row(children: [
        Icon(Icons.star, size: s.sp, color: ColorsConst.primary),
        Icon(Icons.star_border, size: s.sp, color: ColorsConst.darkGray),
        Icon(Icons.star_border, size: s.sp, color: ColorsConst.darkGray),
        Icon(Icons.star_border, size: s.sp, color: ColorsConst.darkGray),
        Icon(Icons.star_border, size: s.sp, color: ColorsConst.darkGray),
      ]);
    } else {
      return Row(children: [
        Icon(Icons.star_border, size: s.sp, color: ColorsConst.darkGray),
        Icon(Icons.star_border, size: s.sp, color: ColorsConst.darkGray),
        Icon(Icons.star_border, size: s.sp, color: ColorsConst.darkGray),
        Icon(Icons.star_border, size: s.sp, color: ColorsConst.darkGray),
        Icon(Icons.star_border, size: s.sp, color: ColorsConst.darkGray),
      ]);
    }
  }
}
