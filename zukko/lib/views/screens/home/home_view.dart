import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_svg/svg.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/constants/lang_text_const.dart';
import 'package:liber/mock/books/new_books_data.dart';
import 'package:liber/mock/category_data.dart';
import 'package:liber/mock/user_info_data.dart';
import 'package:liber/models/auth/user/get_user_model.dart';
import 'package:liber/models/book/get_new_books_models.dart';
import 'package:liber/models/category/get_category_model.dart';
import 'package:liber/service/auth/user/get_user_service.dart';
import 'package:liber/service/book/new_books_service.dart';
import 'package:liber/service/book/online_books_service.dart';
import 'package:liber/service/category/list_category_service.dart';

class HomeView extends StatelessWidget {
  const HomeView({name, Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ColorsConst.primary,
      body: SingleChildScrollView(
        child: Column(
          children: [
            //!Name ↓
            SizedBox(
              height: 155,
              width: MediaQuery.of(context).size.width,
              child: Stack(
                children: [
                  SizedBox(
                    width: MediaQuery.of(context).size.width,
                    child: SvgPicture.asset(
                      'assets/svgs/welcome.svg',
                      color: ColorsConst.white,
                      fit: BoxFit.cover,
                    ),
                  ),
                  Positioned(
                    child: SizedBox(
                      height: 155.h,
                      width: MediaQuery.of(context).size.width,
                      child: Padding(
                        padding: EdgeInsets.only(left: 24.r, top: 78.r),
                        child: FutureBuilder(
                          future: GetUserService.getData(),
                          builder: (context, AsyncSnapshot<GetUserModel> snap) {
                            if (!snap.hasData) {
                              return Text(
                                "${LangTextConst().mainText1}\n${UserInfoData.data["first_name"] ?? ""}",
                                style: MyTextStyleComp.myTextStyle(
                                  size: 20,
                                  sizeH: 1.23,
                                  fontW: FontWeight.w700,
                                  color: ColorsConst.white,
                                ),
                              );
                            } else if (snap.hasError) {
                              return const SizedBox();
                            } else {
                              var data = snap.data!;
                              return Text(
                                "${LangTextConst().mainText1}\n${snap.data!.firstName}",
                                style: MyTextStyleComp.myTextStyle(
                                  size: 20,
                                  sizeH: 1.23,
                                  fontW: FontWeight.w700,
                                  color: ColorsConst.white,
                                ),
                              );
                            }
                          },
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            //!Search, Category AND Books ↓
            Container(
              width: MediaQuery.of(context).size.width * 1,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(28.r),
                  topRight: Radius.circular(28.r),
                ),
                color: ColorsConst.white,
              ),
              padding: EdgeInsets.all(16.r),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  //*Search ↓
                  TextFormField(
                    keyboardType: TextInputType.emailAddress,
                    decoration: InputDecoration(
                      filled: true,
                      fillColor: ColorsConst.gray,
                      enabledBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(16.r),
                        borderSide: const BorderSide(color: Color(0xffededed)),
                      ),
                      suffixIcon:
                          Icon(Icons.search, color: ColorsConst.darkGray),
                      contentPadding: EdgeInsets.symmetric(
                        horizontal: 12.r,
                        vertical: 3.r,
                      ),
                      hintText: "Қидириш",
                    ),
                  ),
                  SizedBox(height: 38.w),
                  //*All Button Category ↓
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Text(
                        LangTextConst().typeText,
                        style: MyTextStyleComp.myTextStyle(
                          size: 20,
                          fontF: "Roboto500",
                        ),
                      ),
                      SizedBox(
                        height: 20.h,
                        child: TextButton(
                          style: TextButton.styleFrom(
                            textStyle: MyTextStyleComp.myTextStyle(
                              color: ColorsConst.links,
                              fontW: FontWeight.w700,
                            ),
                            padding: EdgeInsets.zero.r,
                          ),
                          child: Text(LangTextConst().allText),
                          onPressed: () => Navigator.pushNamed(
                            context,
                            '/categories_search',
                          ),
                        ),
                      ),
                    ],
                  ),
                  //*Category ↓
                  SizedBox(
                    width: MediaQuery.of(context).size.width,
                    height: 340.h,
                    child: LayoutBuilder(builder:
                        (BuildContext context, BoxConstraints constraints) {
                      if (constraints.maxWidth >= 320) {
                        return categoryHomeWidget(
                          ((constraints.maxWidth - 60) ~/ 3).toDouble(),
                          ((constraints.maxHeight - 60) ~/ 3).toDouble(),
                        );
                      } else {
                        return categoryHomeWidget(
                          (constraints.maxWidth / 3).toDouble(),
                          (constraints.maxHeight / 3).toDouble(),
                        );
                      }
                    }),
                  ),
                  SizedBox(height: 24.h),
                  //*All Button Books ↓
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        LangTextConst().breakingNews,
                        style: MyTextStyleComp.myTextStyle(
                          size: 20,
                          fontF: "Roboto500",
                        ),
                      ),
                      SizedBox(
                        height: 20,
                        child: TextButton(
                          style: TextButton.styleFrom(
                            textStyle: MyTextStyleComp.myTextStyle(
                              color: ColorsConst.links,
                              fontW: FontWeight.w700,
                            ),
                            padding: EdgeInsets.zero,
                          ),
                          child: Text(LangTextConst().allText),
                          onPressed: () {
                            Navigator.pushNamed(
                              context,
                              '/new_books',
                              arguments: LangTextConst().breakingNews,
                            );
                          },
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 16.h),
                  //*New Books ↓
                  SizedBox(height: 203.w, child: newBooks()),
                  SizedBox(height: 24.h),
                  //*All Button Books ↓
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        LangTextConst().breakingAudio,
                        style: MyTextStyleComp.myTextStyle(
                          size: 20,
                          fontF: "Roboto500",
                        ),
                      ),
                      SizedBox(
                        height: 20,
                        child: TextButton(
                          style: TextButton.styleFrom(
                            textStyle: MyTextStyleComp.myTextStyle(
                              color: ColorsConst.links,
                              fontW: FontWeight.w700,
                            ),
                            padding: EdgeInsets.zero,
                          ),
                          child: Text(LangTextConst().allText),
                          onPressed: () {
                            Navigator.pushNamed(
                              context,
                              '/new_books',
                              arguments: LangTextConst().breakingAudio,
                            );
                          },
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 16.h),
                  //*Audio Books ↓
                  SizedBox(height: 203.w, child: newBooks()),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }

  FutureBuilder<GetNewBooksModel> newBooks() {
    return FutureBuilder(
      future: NewBooksService.getData(),
      builder: (_, AsyncSnapshot<GetNewBooksModel> snap) {
        if (!snap.hasData) {
          if (NewBooksData.data == null) {
            return const Center(child: CircularProgressIndicator.adaptive());
          } else {
            return ListView.builder(
              scrollDirection: Axis.horizontal,
              physics: const BouncingScrollPhysics(),
              itemCount: NewBooksData.data["results"].length <= 9
                  ? NewBooksData.data["results"].length
                  : 9,
              itemBuilder: (context, index) {
                return SizedBox(
                  width: 123.w,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        height: 158.w,
                        width: 123.w,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(8.r),
                          image: NewBooksData.data["results"][index]
                                      ["thumbnail"] !=
                                  null
                              ? DecorationImage(
                                  image: NetworkImage(
                                    NewBooksData.data["results"][index]
                                        ["thumbnail"]!,
                                  ),
                                  fit: BoxFit.cover,
                                )
                              : null,
                        ),
                        margin: EdgeInsets.only(right: index == 9 ? 0 : 17).r,
                      ),
                      Text(
                        NewBooksData.data["results"]?[index]['title'],
                        style: MyTextStyleComp.myTextStyle(fontF: "Roboto500"),
                        overflow: TextOverflow.ellipsis,
                        maxLines: 1,
                      ),
                      Text(
                        NewBooksData.data["results"]?[index]["author"],
                        style: MyTextStyleComp.myTextStyle(
                          size: 12,
                          color: ColorsConst.darkGray,
                        ),
                        overflow: TextOverflow.ellipsis,
                        maxLines: 1,
                      ),
                    ],
                  ),
                );
              },
            );
          }
        } else if (snap.hasError) {
          return const SizedBox();
        } else {
          var data = snap.data!;
          return ListView.builder(
            scrollDirection: Axis.horizontal,
            physics: const BouncingScrollPhysics(),
            itemCount: data.results?.length,
            itemBuilder: (context, index) {
              return InkWell(
                onTap: () {
                  Navigator.pushNamed(context, "/book",
                      arguments: data.results![index].guid);
                },
                child: SizedBox(
                  width: 123.w,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        height: 158.w,
                        width: 123.w,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(8.r),
                          image: data.results?[index].thumbnail != null
                              ? DecorationImage(
                                  image: NetworkImage(
                                    "${data.results![index].thumbnail}",
                                  ),
                                  fit: BoxFit.cover,
                                )
                              : null,
                        ),
                        margin: EdgeInsets.only(right: index == 9 ? 0 : 17).r,
                      ),
                      Text(
                        data.results?[index].title ?? "BOOK NAME",
                        style: MyTextStyleComp.myTextStyle(fontF: "Roboto500"),
                        overflow: TextOverflow.ellipsis,
                        maxLines: 1,
                      ),
                      Text(
                        data.results?[index].author ?? "Avtor name",
                        style: MyTextStyleComp.myTextStyle(
                          size: 12,
                          color: ColorsConst.darkGray,
                        ),
                        overflow: TextOverflow.ellipsis,
                        maxLines: 1,
                      ),
                    ],
                  ),
                ),
              );
            },
          );
        }
      },
    );
  }

  FutureBuilder<GetNewBooksModel> onlineBooks() {
    return FutureBuilder(
      future: OnlineBooksService.getData(),
      builder: (_, AsyncSnapshot<GetNewBooksModel> snap) {
        if (!snap.hasData) {
          if (NewBooksData.data == null) {
            return const Center(child: CircularProgressIndicator.adaptive());
          } else {
            return ListView.builder(
              scrollDirection: Axis.horizontal,
              physics: const BouncingScrollPhysics(),
              itemCount: NewBooksData.data["results"].length <= 9
                  ? NewBooksData.data["results"].length
                  : 9,
              itemBuilder: (context, index) {
                return SizedBox(
                  width: 123.w,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        height: 158.w,
                        width: 123.w,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(8.r),
                          image: NewBooksData.data["results"][index]
                                      ["thumbnail"] !=
                                  null
                              ? DecorationImage(
                                  image: NetworkImage(
                                    NewBooksData.data["results"][index]
                                        ["thumbnail"]!,
                                  ),
                                  fit: BoxFit.cover,
                                )
                              : null,
                        ),
                        margin: EdgeInsets.only(right: index == 9 ? 0 : 17).r,
                      ),
                      Text(
                        NewBooksData.data["results"]?[index]['title'],
                        style: MyTextStyleComp.myTextStyle(fontF: "Roboto500"),
                        overflow: TextOverflow.ellipsis,
                        maxLines: 1,
                      ),
                      Text(
                        NewBooksData.data["results"]?[index]["author"],
                        style: MyTextStyleComp.myTextStyle(
                          size: 12,
                          color: ColorsConst.darkGray,
                        ),
                        overflow: TextOverflow.ellipsis,
                        maxLines: 1,
                      ),
                    ],
                  ),
                );
              },
            );
          }
        } else if (snap.hasError) {
          return const SizedBox();
        } else {
          var data = snap.data!;
          return ListView.builder(
            scrollDirection: Axis.horizontal,
            physics: const BouncingScrollPhysics(),
            itemCount: data.results?.length,
            itemBuilder: (context, index) {
              return InkWell(
                onTap: () {
                  Navigator.pushNamed(context, "/book",
                      arguments: data.results![index].guid);
                },
                child: SizedBox(
                  width: 123.w,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        height: 158.w,
                        width: 123.w,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(8.r),
                          image: data.results?[index].thumbnail != null
                              ? DecorationImage(
                                  image: NetworkImage(
                                    "${data.results![index].thumbnail}",
                                  ),
                                  fit: BoxFit.cover,
                                )
                              : null,
                        ),
                        margin: EdgeInsets.only(right: index == 9 ? 0 : 17).r,
                      ),
                      Text(
                        data.results?[index].title ?? "BOOK NAME",
                        style: MyTextStyleComp.myTextStyle(fontF: "Roboto500"),
                        overflow: TextOverflow.ellipsis,
                        maxLines: 1,
                      ),
                      Text(
                        data.results?[index].author ?? "Avtor name",
                        style: MyTextStyleComp.myTextStyle(
                          size: 12,
                          color: ColorsConst.darkGray,
                        ),
                        overflow: TextOverflow.ellipsis,
                        maxLines: 1,
                      ),
                    ],
                  ),
                ),
              );
            },
          );
        }
      },
    );
  }

  FutureBuilder<GetCategoryModel> categoryHomeWidget(
      double height, double width) {
    return FutureBuilder<GetCategoryModel>(
      future: ListCategoryService.getData(),
      builder: (context, AsyncSnapshot<GetCategoryModel> snap) {
        if (!snap.hasData) {
          return GridView.builder(
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 3,
              crossAxisSpacing: 20,
              mainAxisSpacing: 18,
              mainAxisExtent: 102,
            ),
            itemBuilder: (context, index) {
              return Container(
                height: height,
                width: width,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(16.r),
                  image: DecorationImage(
                    image: NetworkImage(
                      "${CategoryData.data["results"][index]['thumbnail']}",
                    ),
                    fit: BoxFit.cover,
                  ),
                ),
                alignment: Alignment.center,
                child: Text(
                  "${CategoryData.data["results"][index]["title"]}",
                  style: MyTextStyleComp.myTextStyle(
                    size: 12,
                    color: ColorsConst.white,
                    fontF: "Roboto500",
                    sizeH: 1.14,
                  ),
                  textAlign: TextAlign.center,
                ),
              );
            },
            itemCount: CategoryData.data["count"] ?? 0,
          );
        } else if (snap.hasError) {
          return const SizedBox();
        } else {
          var data = snap.data!;
          return GridView.builder(
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 3,
              crossAxisSpacing: 20,
              mainAxisSpacing: 18,
              mainAxisExtent: 102,
            ),
            itemBuilder: (context, index) {
              return InkWell(
                onTap: () {
                  Navigator.pushNamed(context, '/single_category', arguments: [
                    data.results?[index].guid,
                    data.results?[index].title
                  ]);
                },
                child: Container(
                  height: 102.h,
                  width: 102.w,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(16.r),
                    image: DecorationImage(
                      image: NetworkImage("${data.results?[index].thumbnail}"),
                      fit: BoxFit.cover,
                    ),
                  ),
                  alignment: Alignment.center,
                  child: Text(
                    "${data.results?[index].title}",
                    style: MyTextStyleComp.myTextStyle(
                      size: 12,
                      color: ColorsConst.white,
                      fontF: "Roboto500",
                      sizeH: 1.14,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
              );
            },
            itemCount: data.count?.toInt(),
          );
        }
      },
    );
  }
}
