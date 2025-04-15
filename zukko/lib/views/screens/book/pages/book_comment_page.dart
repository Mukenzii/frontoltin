import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:liber/core/widgets/book/user_about_and_comment_widget.dart';
import 'package:liber/models/book/book_comments_model.dart';
import 'package:liber/service/book/book_comments_service.dart';

class BookCommentPage extends StatelessWidget {
  final String guid, bookGuid;

  const BookCommentPage({required this.bookGuid, required this.guid, Key? key})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: BookCommentsService.getData(guid: guid),
      builder: (BuildContext context, AsyncSnapshot<BookCommentsModel> snap) {
        if (!snap.hasData) {
          return const Center(child: CircularProgressIndicator.adaptive());
        } else if (snap.hasError) {
          throw ("error");
        } else {
          var data = snap.data!;
          return Column(
            children: data.results!
                .map<Widget>(
                  (e) => SizedBox(
                    width: MediaQuery.of(context).size.width.w,
                    child: userAboutAndComment(
                      context,
                      data,
                      data.results?.indexOf(e) ?? 0,
                      bookGuid,
                    ),
                  ),
                )
                .toList(),
          );
        }
      },
    );
  }
}
