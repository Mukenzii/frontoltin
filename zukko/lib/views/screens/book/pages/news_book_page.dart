import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/constants/lang_text_const.dart';
import 'package:liber/models/book/get_new_books_models.dart';
import 'package:liber/service/book/new_books_service.dart';
import 'package:rating_bar_flutter/rating_bar_flutter.dart';

class NewBooksPage extends StatefulWidget {
  final String titleName;
  const NewBooksPage({required this.titleName, Key? key}) : super(key: key);

  @override
  State<NewBooksPage> createState() => _NewBooksPageState();
}

class _NewBooksPageState extends State<NewBooksPage> {
  TextEditingController textController = TextEditingController();
  late double ratingStar = 0;
  List<Result> results = [];
  String? nextUrl;
  late ScrollController scrollController;

  @override
  void initState() {
    super.initState();
    getData();
    scrollController = ScrollController()..addListener(pagination);
  }

  Future<void> getData() async {
    var res = await NewBooksService.getData();
    var r = res;
    nextUrl = r.next;
    results.addAll(r.results ?? []);
    setState(() {});
  }

  pagination() async {
    if (scrollController.position.pixels ==
        scrollController.position.maxScrollExtent) {
      if (nextUrl == null) {
        return;
      }
      var res = await NewBooksService.getData(next: nextUrl);
      var r = res;
      // debugPrint("nex url === ${r.next}");
      nextUrl = r.next;
      results.addAll(r.results ?? []);
      setState(() {});
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ColorsConst.white,
      appBar: AppBar(
        backgroundColor: ColorsConst.white,
        centerTitle: true,
        leading: IconButton(
          onPressed: () => Navigator.pop(context),
          icon: Icon(Icons.arrow_back_ios_new, color: ColorsConst.black),
        ),
        title: Text(
          widget.titleName,
          style: MyTextStyleComp.myTextStyle(size: 20),
        ),
        elevation: 0,
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
                decoration: InputDecoration(
                  enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(16.r),
                      borderSide: const BorderSide(color: Color(0xffededed))),
                  filled: true,
                  fillColor: ColorsConst.gray,
                  hintText: LangTextConst().search,
                  suffixIcon: const Icon(Icons.search),
                ),
              ),
            ),
            //* Tarif
            SizedBox(height: 16.h),
            Expanded(
              child: results.isEmpty
                  ? const Center(
                      child: Padding(
                        padding: EdgeInsets.all(20),
                        child: CircularProgressIndicator.adaptive(),
                      ),
                    )
                  : GridView.builder(
                      controller: scrollController,
                      physics: const BouncingScrollPhysics(),
                      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 2,
                        crossAxisSpacing: 20,
                        mainAxisSpacing: 18,
                        mainAxisExtent: 290.h,
                      ),
                      itemBuilder: (context, index) {
                        return InkWell(
                          borderRadius: BorderRadius.circular(16.r),
                          onTap: () {
                            Navigator.pushNamed(
                              context,
                              "/book",
                              arguments: results[index].guid,
                            );
                          },
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Container(
                                width: 162.w,
                                height: 210.h,
                                decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(8.r),
                                  image: results[index].thumbnail != null
                                      ? DecorationImage(
                                          image: NetworkImage(
                                            results[index].thumbnail!,
                                          ),
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
                                    RatingBarFlutter(
                                      onRatingChanged: (rating) {},
                                      filledIcon: Icons.star,
                                      emptyIcon: Icons.star_border,
                                      halfFilledIcon: Icons.star_half,
                                      // isHalfAllowed: true,
                                      aligns: Alignment.centerLeft,
                                      filledColor: ColorsConst.primary,
                                      emptyColor: ColorsConst.darkGray,
                                      size: 18.sp,
                                    ),
                                    SizedBox(height: 9.71.h),
                                    Text(
                                      results[index].title ?? "BOOK NAME",
                                      style: MyTextStyleComp.myTextStyle(
                                        size: 20,
                                        fontF: "Roboto500",
                                      ),
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                    SizedBox(height: 5.h),
                                    Text(
                                      results[index].author ?? "Avtor name",
                                      style: MyTextStyleComp.myTextStyle(
                                        color: ColorsConst.darkGray,
                                      ),
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        );
                      },
                      itemCount: results.length,
                    ),
            ),
          ],
        ),
      ),
    );
  }
}
