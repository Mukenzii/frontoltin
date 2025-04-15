import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/components/app_bar_comp.dart';
import 'package:liber/core/constants/lang_text_const.dart';
// import 'package:liber/core/widgets/user_about_and_comment_widget.dart';
import 'package:liber/models/book/book_comments_model.dart';
import 'package:liber/service/book/book_comments_service.dart';

class BookComments extends StatefulWidget {
  final String bookGuid;
  const BookComments({required this.bookGuid, Key? key}) : super(key: key);

  @override
  State<BookComments> createState() => _BookCommentsState();
}

class _BookCommentsState extends State<BookComments> {
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
    var res = await BookCommentsService.getData(guid: widget.bookGuid,limit: 6);
    nextUrl = res.next;
    results.addAll(res.results ?? []);
    setState(() {});
  }

  pagination() async {
    if (controller.position.pixels == controller.position.maxScrollExtent) {
      if (nextUrl == null) {
        return;
      }
      var res = await BookCommentsService.getData(
          guid: widget.bookGuid, next: nextUrl);
      nextUrl = res.next;
      results.addAll(res.results ?? []);
      setState(() {});
    }
  }

  @override
  Widget build(BuildContext context) {
    return Builder(builder: (context) {
      return Scaffold(
        backgroundColor: ColorsConst.white,
        appBar: appBarChange(
          context,
          icon: Icons.close,
          txt: LangTextConst().allThoughts,
        ),
        body: Padding(
          padding: EdgeInsets.all(16.r),
          child: ListView.builder(
            controller: controller,
            itemCount: results.length + 1,
            physics: const BouncingScrollPhysics(),
            itemBuilder: (context, index) {
              if (results.length == index) {
                if (nextUrl != null) {
                  return const Center(
                    child: Padding(
                      padding: EdgeInsets.all(20),
                      child: CircularProgressIndicator.adaptive(),
                    ),
                  );
                } else {
                  return const SizedBox();
                }
              } else {
                return Column(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    SizedBox(height: 5.h),
                    Row(
                      children: [
                        //? Comment Profile Icon
                        CircleAvatar(
                          radius: 30.r,
                          // backgroundImage:
                          //     results[index].owner!.profilePicture != null
                          //         ? NetworkImage(
                          //             "${results[index].owner!.profilePicture}",
                          //           )
                          //         : null,
                          backgroundColor:
                              // results[index].owner!.profilePicture != null
                                  // ? null
                                  // :
                                  ColorsConst.black,
                        ),
                        SizedBox(width: 16.w),
                        //? Comment Profile Name && data comment
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            //? Comment Profile Name
                            Text(
                              "${results[index].title}",
                              style: MyTextStyleComp.myTextStyle(
                                fontF: "Roboto500",
                              ),
                            ),
                            //? Data comment
                            SizedBox(height: 10.h),
                            Text(
                              "${results[index].createdAt!.year}.${results[index].createdAt!.month}.${results[index].createdAt!.day}",
                              style: MyTextStyleComp.myTextStyle(
                                color: ColorsConst.darkGray,
                                size: 12,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                    Padding(
                      padding: EdgeInsets.only(top: 16.r, bottom: 5.r),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            results[index].title.toString(),
                            style: MyTextStyleComp.myTextStyle(
                              color: ColorsConst.darkGray,
                              size: 15,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Divider(color: ColorsConst.darkGray),
                  ],
                );
                // return Text("${results[index].title}");
              }
            },
          ),
        ),
      );
    });
  }
}
