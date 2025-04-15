import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:liber/core/components/app_bar_comp.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/constants/lang_text_const.dart';
import 'package:liber/core/widgets/book/search_no_result_comp.dart';
import 'package:liber/models/book/book_favorites_list_model.dart';
import 'package:liber/service/book/favorites/book_favorites_list_service.dart';
import 'package:liber/views/screens/book/pages/favorites/book_favorites_pagination.dart';
import 'package:rating_bar_flutter/rating_bar_flutter.dart';

class BookFavorites extends StatefulWidget {
  const BookFavorites({Key? key}) : super(key: key);

  @override
  State<BookFavorites> createState() => _BookFavoritesState();
}

class _BookFavoritesState extends State<BookFavorites> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: ColorsConst.white,
        appBar: appBarWidget(
          context,
          txt: LangTextConst().favorites,
          size: 18,
        ),
        body: Padding(
          padding: EdgeInsets.all(16.r),
          child: Column(
            children: const [
              BookFavoritesPagination(),
            ],
          ),
        )
        // FutureBuilder(
        //   future: BookFavoritesListService.getData(),
        //   builder: (context, AsyncSnapshot<BookFavoritesListModel> snap) {
        //     if (!snap.hasData) {
        //       return const Center(child: CircularProgressIndicator.adaptive());
        //     } else {
        //       var data = snap.data!.results!;
        //       if (data.isEmpty) {
        //         return Text("Kitob Yo'q");
        //       } else {
        //         return ListView.builder(
        //           itemBuilder: (context, index) {
        //             return Text(data[index].title.toString());
        //           },
        //           itemCount: data.length,
        //         );
        //       }
        //     }
        //   },
        // ),
        );
  }

  // @override
  // Widget build(BuildContext context) {
  //   return Scaffold(
  //     backgroundColor: ColorsConst.white,
  //     appBar: appBarWidget(
  //       context,
  //       txt: LangTextConst().favorites,
  //       size: 18,
  //     ),
  //     body: const MyF(),
  //   );
  // }
}
