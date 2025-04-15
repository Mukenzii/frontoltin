import 'package:epub_view/epub_view.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:internet_file/internet_file.dart';
import 'package:liber/core/components/app_bar_comp.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/service/book/reding_book/reding_book_service.dart';

class BookOnlineReading extends StatefulWidget {
  final String guid;
  const BookOnlineReading({required this.guid, Key? key}) : super(key: key);

  @override
  State<BookOnlineReading> createState() => _BookOnlineReadingState();
}

class _BookOnlineReadingState extends State<BookOnlineReading> {
  EpubController? epubController;
  final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();
  String? cfiController;
  Future<void> asyncInit() async {
    var snap = await RedingBookService.getData(widget.guid);
    var data = snap.onlineBooks!;
    cfiController = epubController?.generateEpubCfi();
    epubController = EpubController(
      document: EpubDocument.openData(
        await InternetFile.get("https://api-liber.uz${data[0].body}"),
      ),
      epubCfi: '$cfiController',
    );
    setState(() {});
  }

  int fontIndex = 0;
  double lightValue = 1;
  double textSize = 16;
  bool bookTextStyleSettings = false;
  String fontFamily = "Helvetica";
  Color colorText = ColorsConst.black;
  Color colorMode = ColorsConst.white;

  @override
  void initState() {
    asyncInit();
    super.initState();
  }

  @override
  Widget build(BuildContext context) => Scaffold(
        backgroundColor: ColorsConst.white,
        appBar: appBarChange(
          context,
          icon: Icons.arrow_back,
          txt: "Э-китоб",
          actions: [
            IconButton(
              onPressed: () => setState(
                () => bookTextStyleSettings = !bookTextStyleSettings,
              ),
              icon: const Icon(Icons.settings, color: Colors.black),
            ),
            Builder(
              builder: (context) => IconButton(
                icon: const Icon(Icons.menu, color: Colors.black),
                onPressed: () => Scaffold.of(context).openDrawer(),
              ),
            ),
          ],
        ),
        drawer: Drawer(
          backgroundColor: ColorsConst.white,
          width: MediaQuery.of(context).size.width,
          child: ListView(
            children: [
              AppBar(
                elevation: 0,
                backgroundColor: Colors.white,
                leading: IconButton(
                  onPressed: () => Navigator.pop(context),
                  icon: const Icon(Icons.close, color: Colors.black),
                ),
                title: const Text(
                  "Мундарижа",
                  style: TextStyle(color: Colors.black, fontSize: 20),
                ),
              ),
              SizedBox(
                height: MediaQuery.of(context).size.height,
                width: MediaQuery.of(context).size.width,
                child: epubController == null
                    ? const Center(child: CircularProgressIndicator.adaptive())
                    : EpubViewTableOfContents(
                        padding: EdgeInsets.all(16.r),
                        itemBuilder: (context, index, chapter, itemCount) {
                          return TextButton(
                            onPressed: () {
                              // print('CfiController : $cfiController');
                              // print('chapter.startIndex:${chapter.startIndex}');
                              // print('chapter.startIndex:${chapter.title}');
                              cfiController =
                                  'epubcfi(/6/6[schapter-2]!/4/2/1612)';
                              Navigator.pop(context);
                            },
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.start,
                              children: [
                                Text(
                                  "${chapter.title}",
                                  overflow: TextOverflow.ellipsis,
                                  // textDirection: TextDirection.ltr,
                                  style: MyTextStyleComp.myTextStyle(
                                    color: ColorsConst.black,
                                    fontF: 'Roboto500',
                                    size: 16,
                                  ),
                                ),
                              ],
                            ),
                          );
                        },
                        controller: epubController!,
                      ),
              ),
            ],
          ),
        ),
        body: Column(
          children: [
            Expanded(
              flex: 4,
              child: epubController == null
                  ? const Center(child: CircularProgressIndicator.adaptive())
                  : Container(
                      color: colorMode,
                      child: EpubView(
                        controller: epubController!,
                        builders: EpubViewBuilders<DefaultBuilderOptions>(
                          options: DefaultBuilderOptions(
                            loaderSwitchDuration: const Duration(seconds: 1),
                            // chapterPadding: EdgeInsets.all(8.r),
                            // paragraphPadding:
                            // EdgeInsets.symmetric(horizontal: 16.r),
                            textStyle: TextStyle(
                              letterSpacing: 0,
                              wordSpacing: 0,
                              fontSize: textSize,
                              fontFamily: fontFamily,
                              color: colorText.withOpacity(
                                lightValue.toDouble(),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
            ),
            bookTextStyleSettings
                ? Expanded(
                    flex: 2,
                    child: Padding(
                      padding: EdgeInsets.all(16.r),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          //FONT
                          Row(
                            children: [
                              SizedBox(
                                width: 72.w,
                                child: Text(
                                  "Font",
                                  style: MyTextStyleComp.myTextStyle(
                                    size: 16,
                                    fontF: "Roboto500",
                                  ),
                                ),
                              ),
                              Expanded(
                                child: Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    textFont(0, "Helvetica"),
                                    textFont(1, "Georgia"),
                                    textFont(2, "American_Typewriter"),
                                    textFont(3, "Baskerville"),
                                    textFont(4, "Times_New_Roman"),
                                  ],
                                ),
                              ),
                            ],
                          ),
                          //SIZE
                          Row(
                            children: [
                              SizedBox(
                                width: 72.w,
                                child: Text(
                                  "Size",
                                  style: MyTextStyleComp.myTextStyle(
                                    size: 16,
                                    fontF: "Roboto500",
                                  ),
                                ),
                              ),
                              Row(
                                children: [
                                  //-
                                  InkWell(
                                    onTap: () {
                                      if (textSize == 8) {
                                      } else {
                                        textSize -= 1;
                                      }
                                      setState(() {});
                                    },
                                    child: Container(
                                      alignment: Alignment.center,
                                      height: 35.h,
                                      width: 48.w,
                                      decoration: BoxDecoration(
                                        border: Border.all(
                                          color: ColorsConst.black
                                              .withOpacity(0.15),
                                          width: 1.5,
                                        ),
                                        borderRadius: BorderRadius.circular(5),
                                      ),
                                      child: Text(
                                        "-",
                                        style: MyTextStyleComp.myTextStyle(
                                          color: ColorsConst.black,
                                          size: 30,
                                        ),
                                      ),
                                    ),
                                  ),
                                  //Size Text
                                  Padding(
                                    padding: EdgeInsets.all(16.r),
                                    child: Text("${textSize.toInt()}"),
                                  ),
                                  //Size +
                                  InkWell(
                                    onTap: () {
                                      if (textSize == 32) {
                                      } else {
                                        textSize += 1;
                                      }
                                      setState(() {});
                                    },
                                    child: Container(
                                      alignment: Alignment.center,
                                      height: 35.h,
                                      width: 48.w,
                                      decoration: BoxDecoration(
                                        border: Border.all(
                                          color: ColorsConst.black
                                              .withOpacity(0.15),
                                          width: 1.5,
                                        ),
                                        borderRadius: BorderRadius.circular(5),
                                      ),
                                      child: Text(
                                        "+",
                                        style: MyTextStyleComp.myTextStyle(
                                          size: 30,
                                          color: ColorsConst.black,
                                        ),
                                      ),
                                    ),
                                  ),
                                ],
                              )
                            ],
                          ),
                          //Light
                          Row(
                            children: [
                              SizedBox(
                                width: 72.w,
                                child: Text(
                                  "Light",
                                  style: MyTextStyleComp.myTextStyle(
                                    size: 16,
                                    fontF: "Roboto500",
                                  ),
                                ),
                              ),
                              Expanded(
                                child: Slider.adaptive(
                                  thumbColor: ColorsConst.white,
                                  activeColor: ColorsConst.black,
                                  min: 0,
                                  max: 1,
                                  value: lightValue,
                                  onChanged: (v) =>
                                      setState(() => lightValue = v),
                                ),
                              ),
                            ],
                          ),
                          //MODE
                          Row(
                            children: [
                              SizedBox(
                                width: 72.w,
                                child: Text(
                                  "Mode",
                                  style: MyTextStyleComp.myTextStyle(
                                    size: 16,
                                    fontF: "Roboto500",
                                  ),
                                ),
                              ),
                              Expanded(
                                child: Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    modeFunk(
                                      "Day",
                                      1.5,
                                      ColorsConst.white,
                                      ColorsConst.black,
                                      ColorsConst.black,
                                    ),
                                    modeFunk(
                                      "Night",
                                      3,
                                      ColorsConst.modeNight,
                                      ColorsConst.modeBorder,
                                      ColorsConst.white,
                                    ),
                                    modeFunk(
                                      "Sepia",
                                      3,
                                      ColorsConst.modeSepia,
                                      ColorsConst.modeBorder,
                                      ColorsConst.modeSepiaText,
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  )
                : const SizedBox(),
          ],
        ),
      );

  Expanded modeFunk(
      modeName, double borderLight, color, borderColor, textColor) {
    return Expanded(
      child: Padding(
        padding: EdgeInsets.only(right: modeName != 2 ? 10 : 0),
        child: InkWell(
          onTap: () => setState(() {
            colorMode = color;
            colorText = textColor;
          }),
          child: Container(
            height: 35,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(5.r),
              color: color,
              border: Border.all(width: borderLight, color: borderColor),
            ),
            alignment: Alignment.center,
            child: Text(
              modeName,
              style: TextStyle(
                color: textColor ?? ColorsConst.black,
              ),
            ),
          ),
        ),
      ),
    );
  }

  InkWell textFont(index, fontF) {
    return InkWell(
      onTap: () => setState(() {
        fontIndex = index;
        fontFamily = fontF;
      }),
      child: Container(
        alignment: Alignment.center,
        height: 35.h,
        width: 48.w,
        decoration: BoxDecoration(
          border: Border.all(
            color: fontIndex == index
                ? ColorsConst.black
                : ColorsConst.black.withOpacity(0.15),
            width: 1.5,
          ),
          borderRadius: BorderRadius.circular(5),
        ),
        child: Text(
          "Aa",
          style: MyTextStyleComp.myTextStyle(
              size: 20, color: ColorsConst.black, fontF: fontF),
        ),
      ),
    );
  }
}
