// ignore_for_file: use_build_context_synchronously
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:liber/core/components/app_bar_comp.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/constants/lang_text_const.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/widgets/book/about_book_widget.dart';
import 'package:liber/core/widgets/book/alert_dialog_widget.dart';
import 'package:liber/core/widgets/book/text_form_field_widget.dart';
import 'package:liber/models/book/book_detail_model.dart';
import 'package:liber/service/auth/user/get_user_service.dart';
import 'package:liber/service/book/book_detail_service.dart';
import 'package:liber/service/book/favorites/book_favorites_create_service.dart';
import 'package:liber/service/book/favorites/book_favorites_delete_service.dart';
import 'package:liber/service/book/favorites/book_favorites_list_service.dart';
import 'package:liber/service/book/review_send_comment.dart';
import 'package:liber/views/screens/book/pages/book_comment_page.dart';

class BookView extends StatefulWidget {
  final String dataGuid;
  const BookView({required this.dataGuid, Key? key}) : super(key: key);

  @override
  State<BookView> createState() => _BookViewState();
}

class _BookViewState extends State<BookView> {
  TextEditingController commentController = TextEditingController();
  int rating = 0;
  String? bookGuid = '';

  List payType = LangTextConst().payType;
  String bookName = "";
  bool bookFavorites = false;
  int bookFavoritesListen = 0;

  favorites() async {
    var data = await BookFavoritesListService.getData(search: bookName);
    if (data.results!.isNotEmpty) {
      bookFavorites = true;
      bookGuid = data.results![0].guid;
    } else {
      bookFavorites = false;
      bookGuid = "";
    }
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: appBarChange(
        context,
        icon: Icons.arrow_back_ios,
        txt: LangTextConst().aboutTheBook,
        actions: [
          bookFavorites == true
              ? IconButton(
                  onPressed: () => setState(() {
                    BookFavoritesDeleteService.deleteData(bookGuid);
                    bookFavorites = false;
                  }),
                  icon: Icon(Icons.bookmark, color: ColorsConst.black),
                )
              : IconButton(
                  onPressed: () => setState(
                    () {
                      BookFavoritesCreateService.postData(widget.dataGuid);
                      bookFavorites = true;
                    },
                  ),
                  icon: Icon(Icons.bookmark_border, color: ColorsConst.black),
                ),
        ],
      ),
      body: FutureBuilder(
        future: BookDetailService.getData(widget.dataGuid),
        builder: (context, AsyncSnapshot snap) {
          if (!snap.hasData) {
            return const Center(child: CircularProgressIndicator.adaptive());
          } else if (snap.hasError) {
            return const SizedBox();
          } else {
            var data = BookDetailModel.fromJson(snap.data);
            bookName = data.title.toString();
            if (bookFavoritesListen == 0) {
              favorites();
              bookFavoritesListen = 1;
            }
            return SizedBox(
              height: MediaQuery.of(context).size.height.h,
              width: MediaQuery.of(context).size.width.w,
              child: SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    //? Image container && Text Types
                    Padding(
                      padding: EdgeInsets.all(16.r),
                      child: Column(
                        children: [
                          //? Image Container && Type && Image Container
                          aboutBook(
                            context,
                            bookName: data.title,
                            bookAuthor: data.author,
                            categoryName: data.category?.title,
                            languageName: data.language,
                            viewCount: data.getReview?["reviewCount"],
                            dataImage: data.thumbnail,
                          ),
                          // ? Buttons buy
                          Column(
                            children: data.types!
                                .map<Widget>(
                                  (e) => SizedBox(
                                    width: MediaQuery.of(context).size.width.w,
                                    child: button(
                                      color: data.types![data.types!.indexOf(e)]
                                                  .bookType ==
                                              "paper"
                                          ? ColorsConst.primary
                                          : null,
                                      textColor:
                                          data.types![data.types!.indexOf(e)]
                                                      .bookType ==
                                                  "paper"
                                              ? ColorsConst.white
                                              : null,
                                      txt:
                                          "${payType[data.types!.indexOf(e)]} - ${data.types![data.types!.indexOf(e)].price} сум ",
                                      onPress: () async {
                                        var userPrice =
                                            await GetUserService.getData();
                                        alertDialogWidget(
                                          context,
                                          data.types!.indexOf(e),
                                          bookPrice:
                                              "${data.types![data.types!.indexOf(e)].price}",
                                          bookCategoryTitle:
                                              "${data.category?.title} китобини харид килиш",
                                          myCount: "${userPrice.balance}",
                                          bookTitle: data.title,
                                          bookGuid: data.guid,
                                          bookTypeGuid: data
                                              .types![data.types!.indexOf(e)]
                                              .guid,
                                          bookType: data
                                              .types![data.types!.indexOf(e)]
                                              .bookType,
                                        );
                                      
                                        
                                      },
                                    ),
                                  ),
                                )
                                .toList(),
                          ),
                        ],
                      ),
                    ),
                    Divider(color: ColorsConst.darkGray),
                    //? Text (qisqacha,diolog)
                    Padding(
                      padding: EdgeInsets.all(16.r),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          //? Text (qisqacha)
                          Text(
                            LangTextConst().briefly,
                            style: MyTextStyleComp.myTextStyle(
                              fontF: "Roboto500",
                              size: 16,
                            ),
                          ),
                          //? Text (diolog)
                          Padding(
                            padding: EdgeInsets.symmetric(vertical: 8.r),
                            child: Text(
                              data.shortDescription.toString(),
                              style: MyTextStyleComp.myTextStyle(
                                  size: 15, sizeH: 1.3),
                            ),
                          ),
                        ],
                      ),
                    ),
                    Divider(color: ColorsConst.darkGray),
                    //? Text (Kitob xaqida fikr, star,izoh)
                    Padding(
                      padding: EdgeInsets.all(16.r),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          //? Text (Kitob haqida fikringiz)
                          Text(
                            LangTextConst().yourOpinionAboutTheBook,
                            style: MyTextStyleComp.myTextStyle(
                              size: 16,
                              fontF: "Roboto500",
                            ),
                          ),
                          //? Star
                          Padding(
                            padding: EdgeInsets.symmetric(vertical: 18.r),
                            child: RatingBar.builder(
                              initialRating: rating.toDouble(),
                              direction: Axis.horizontal,
                              allowHalfRating: false,
                              itemCount: 5,
                              itemPadding:
                                  EdgeInsets.symmetric(horizontal: 10.h),
                              itemBuilder: (context, _) => Icon(
                                Icons.star,
                                color: ColorsConst.primary,
                                size: 20.sp,
                              ),
                              onRatingUpdate: (updateRating) => setState(() {
                                rating = updateRating.toInt();
                              }),
                            ),
                          ),
                          //? Text (Izoh)
                          Text(
                            LangTextConst().explanation,
                            style: MyTextStyleComp.myTextStyle(
                              size: 16,
                              fontF: "Roboto500",
                            ),
                          ),
                          SizedBox(height: 10.h),
                          //? txtform field
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              //? Comment Textformfield
                              textFormField(
                                height: 60.h,
                                width:
                                    MediaQuery.of(context).size.width * 0.68.w,
                                hintText: "Изох",
                                commentController: commentController,
                              ),
                              //? Button Send
                              SizedBox(
                                child: ElevatedButton(
                                  style: ElevatedButton.styleFrom(
                                    elevation: 0,
                                    primary: ColorsConst.primaryVariant,
                                    fixedSize: Size(60.w, 60.h),
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(14.r),
                                    ),
                                  ),
                                  onPressed: () {
                                    BookReviewSendComment.postData(
                                      book: widget.dataGuid,
                                      title: commentController.text,
                                      point: rating,
                                    );
                                  },
                                  child: Icon(
                                    Icons.send,
                                    color: ColorsConst.white,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                    Divider(color: ColorsConst.darkGray),
                    Padding(
                      padding: EdgeInsets.all(16.r),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          //? FIkrlar text
                          Text(
                            LangTextConst().thoughts,
                            style: MyTextStyleComp.myTextStyle(
                              size: 16,
                              fontF: "Roboto500",
                            ),
                          ),
                          SizedBox(height: 10.h),
                          //? Comments
                          BookCommentPage(
                            bookGuid: widget.dataGuid,
                            guid: data.guid!,
                          ),
                        ],
                      ),
                    ),
                    //? Elevated button
                    Padding(
                      padding: EdgeInsets.symmetric(horizontal: 16.r),
                      child: button(
                        color: ColorsConst.white,
                        onPress: () {
                          Navigator.pushNamed(context, '/book_comments',
                              arguments: widget.dataGuid);
                        },
                        textColor: ColorsConst.primary,
                        txt: LangTextConst().allThoughts,
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

  ListView newMethod(BookDetailModel data) {
    return ListView.builder(
      itemCount: data.types!.length,
      itemBuilder: (context, index) {
        return button(
          color: ColorsConst.primary,
          textColor: ColorsConst.white,
          txt: "${payType[index]} - ${data.types![index].price} сум",
          onPress: () {
            alertDialogWidget(
              context,
              index,
              bookGuid: data.guid,
              bookPrice: data.types![index].price,
              bookCategoryTitle: "${data.category} китобини харид килиш",
              myCount: "1234",
              bookTitle: data.title,
            );
          },
        );
      },
    );
  }

//! Widgets
  Padding button({Color? color, Color? textColor, txt, onPress}) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 16.r),
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          elevation: 0,
          side: BorderSide(color: ColorsConst.primary),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(24.r),
          ),
          primary: color ?? ColorsConst.white,
          fixedSize: Size(MediaQuery.of(context).size.width.w, 56.h),
        ),
        onPressed: onPress,
        child: Text(
          "$txt",
          style:
              MyTextStyleComp.myTextStyle(color: textColor, fontF: "Roboto500"),
        ),
      ),
    );
  }
}

/*if (data.types![1].bookType == "paper") {
                                  return button(
                                    color:
                                        data.types![index].bookType == "paper"
                                            ? ColorsConst.primary
                                            : null,
                                    textColor:
                                        data.types![index].bookType == "paper"
                                            ? ColorsConst.white
                                            : null,
                                    txt:
                                        "${payType[0]} - ${data.types![index].price} сум ",
                                    onPress: () async {
                                      var userPrice =
                                          await GetUserService.getData();
                                      alertDialogWidget(
                                        context,
                                        index,
                                        bookPrice:
                                            "${data.types![index].price}",
                                        bookCategoryTitle:
                                            "${data.category?.title} китобини харид килиш",
                                        myCount: "${userPrice.balance}",
                                        bookTitle: data.title,
                                        bookGuid: data.guid,
                                        bookTypeGuid: data.types![index].guid,
                                        bookType: data.types![index].bookType,
                                      );
                                    },
                                  );
                                } else if (data.types![2].bookType == "audio") {
                                  return button(
                                    color:
                                        data.types![index].bookType == "paper"
                                            ? ColorsConst.primary
                                            : null,
                                    textColor:
                                        data.types![index].bookType == "paper"
                                            ? ColorsConst.white
                                            : null,
                                    txt:
                                        "${payType[1]} - ${data.types![index].price} сум ",
                                    onPress: () async {
                                      var userPrice =
                                          await GetUserService.getData();
                                      alertDialogWidget(
                                        context,
                                        index,
                                        bookPrice:
                                            "${data.types![index].price}",
                                        bookCategoryTitle:
                                            "${data.category?.title} китобини харид килиш",
                                        myCount: "${userPrice.balance}",
                                        bookTitle: data.title,
                                        bookGuid: data.guid,
                                        bookTypeGuid: data.types![index].guid,
                                        bookType: data.types![index].bookType,
                                      );
                                    },
                                  );
                                } else if (data.types![0].bookType ==
                                    "online") {
                                  return button(
                                    color:
                                        data.types![index].bookType == "paper"
                                            ? ColorsConst.primary
                                            : null,
                                    textColor:
                                        data.types![index].bookType == "paper"
                                            ? ColorsConst.white
                                            : null,
                                    txt:
                                        "${payType[2]} - ${data.types![index].price} сум ",
                                    onPress: () async {
                                      var userPrice =
                                          await GetUserService.getData();
                                      alertDialogWidget(
                                        context,
                                        index,
                                        bookPrice:
                                            "${data.types![index].price}",
                                        bookCategoryTitle:
                                            "${data.category?.title} китобини харид килиш",
                                        myCount: "${userPrice.balance}",
                                        bookTitle: data.title,
                                        bookGuid: data.guid,
                                        bookTypeGuid: data.types![index].guid,
                                        bookType: data.types![index].bookType,
                                      );
                                    },
                                  );
                                } else {
                                  return SizedBox();
                                } */

// SizedBox(
//   height: MediaQuery.of(context).size.height * 0.3.w,
//   child: ListView.builder(
//     physics: const NeverScrollableScrollPhysics(),
//     itemCount: data.types!.length,
//     itemBuilder: (context, index) {
//       return button(
//         color: data.types![index].bookType == "paper"
//             ? ColorsConst.primary
//             : null,
//         textColor:
//             data.types![index].bookType == "paper"
//                 ? ColorsConst.white
//                 : null,
//         txt:
//             "${payType[index]} - ${data.types![index].price} сум ",
//         onPress: () async {
//           var userPrice =
//               await GetUserService.getData();
//           alertDialogWidget(
//             context,
//             index,
//             bookPrice: "${data.types![index].price}",
//             bookCategoryTitle:
//                 "${data.category?.title} китобини харид килиш",
//             myCount: "${userPrice.balance}",
//             bookTitle: data.title,
//             bookGuid: data.guid,
//             bookTypeGuid: data.types![index].guid,
//             bookType: data.types![index].bookType,
//           );
//         },
//       );
//     },
//   ),
// ),
