import 'package:flutter/material.dart';
import 'package:liber/core/widgets/book/search_no_result_comp.dart';
import 'package:liber/models/cart/audio/audio_cart_models.dart';
import 'package:liber/service/cart/audio_books_service.dart';
import 'package:rating_bar_flutter/rating_bar_flutter.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class AudioBookWidget extends StatefulWidget {
  const AudioBookWidget({Key? key}) : super(key: key);

  @override
  State<AudioBookWidget> createState() => _AudioBookWidgetState();
}

class _AudioBookWidgetState extends State<AudioBookWidget> {
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
    var res = await AudioBooksService.getData();
    nextUrl = res.next;
    results.addAll(res.results ?? []);
    setState(() {});
  }

  pagination() async {
    if (controller.position.pixels == controller.position.maxScrollExtent) {
      if (nextUrl == null) {
        return;
      }
      var res = await AudioBooksService.getData(next: nextUrl);
      nextUrl = res.next;
      results.addAll(res.results ?? []);
      setState(() {});
    }
  }

  double ratingStar = 0;
  @override
  Widget build(BuildContext context) {
    if (results.isEmpty) {
      return const Expanded(child: CategoriesNoResult());
    } else {
      return Expanded(
        child: ListView.builder(
          controller: controller,
          itemCount: results.length + 1,
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
              return InkWell(
                onTap: () {
                  Navigator.pushNamed(
                    context,
                    "/book_online_list",
                    arguments: [
                      results[index].bookGuid,
                      results[index].book,
                      results[index].author
                    ],
                  );
                },
                child: Padding(
                  padding: EdgeInsets.only(top: 16.r),
                  child: Row(
                    children: [
                      //? Image Container
                      Container(
                        height: 96.h,
                        width: 96.w,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(8.r),
                          color: ColorsConst.primary,
                          image: results[index].thumbnail != null
                              ? DecorationImage(
                                  fit: BoxFit.cover,
                                  image: NetworkImage(
                                    "${results[index].thumbnail}",
                                  ),
                                )
                              : null,
                        ),
                      ),
                      SizedBox(width: 20.w),
                      //? Text Column
                      SizedBox(
                        height: 96.h,
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            SizedBox(
                              width: MediaQuery.of(context).size.width.w / 2.w,
                              child: Text(
                                results[index].book ?? "",
                                style: MyTextStyleComp.myTextStyle(
                                  size: 16.sp,
                                  fontF: 'Roboto500',
                                ),
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                            RatingBarFlutter(
                              onRatingChanged: (rating) => setState(
                                () => ratingStar = rating!,
                              ),
                              filledIcon: Icons.star,
                              emptyIcon: Icons.star_border,
                              halfFilledIcon: Icons.star_half,
                              isHalfAllowed: true,
                              aligns: Alignment.centerLeft,
                              filledColor: ColorsConst.primary,
                              emptyColor: ColorsConst.darkGray,
                              size: 14.r,
                            ),
                            Text(
                              results[index].author ?? "",
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
                ),
              );
            }
          },
        ),
      );
    }
  }
}
