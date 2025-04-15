// ignore_for_file: avoid_function_literals_in_foreach_calls
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:intl/date_time_patterns.dart';
import 'package:liber/core/components/app_bar_comp.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/constants/lang_text_const.dart';
import 'package:liber/core/widgets/book/ask_container.dart';
import 'package:liber/models/category/get_category_model.dart';
import 'package:liber/service/category/list_category_service.dart';
import 'package:liber/service/subscription/subscription_create_service.dart';

class ProfileFollow extends StatefulWidget {
  const ProfileFollow({super.key});

  @override
  State<ProfileFollow> createState() => _ProfileFollowState();
}

class _ProfileFollowState extends State<ProfileFollow> {
  DateTime date = DateTime.now();
  DateTime dateFuture = DateTime.now();

  List<CategoryType> resultsDays = [];
  List<Result> results = [];
  String? nextUrl;
  late ScrollController controller;
  double price = 0;

  @override
  void initState() {
    getData();
    super.initState();
  }

  Future<void> getData() async {
    var res = await ListCategoryService.getData();
    nextUrl = res.next;
    results.addAll(res.results ?? []);
    setState(() {});
  }

  String? valueDaysGuid;
  String? valueCategoryGuid;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: appBarWidget(context, txt: LangTextConst().subsCribe, size: 20),
      body: Padding(
        padding: EdgeInsets.fromLTRB(16.r, 16.r, 16.r, 64.r),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            //? Widgets
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                //? Asked Container
                askedContainer(
                  context,
                  LangTextConst().youFavorite,
                  LangTextConst().selectPart,
                ),
                //? Text (Obuna davom etish vaqti)
                Padding(
                  padding: EdgeInsets.only(top: 16.r, bottom: 6.r),
                  child: Text(
                    LangTextConst().subscriptionText1,
                    style: MyTextStyleComp.myTextStyle(fontF: 'Roboto500'),
                  ),
                ),
                //? Dorp Down Button (vaqti)
                SizedBox(
                  height: 70,
                  width: MediaQuery.of(context).size.width,
                  child: dropDownButtonCategory(),
                ),
                //? Text (Bolimni tanlash)
                Padding(
                  padding: EdgeInsets.only(top: 16.r, bottom: 6.r),
                  child: Text(
                    LangTextConst().selectPart,
                    style: MyTextStyleComp.myTextStyle(fontF: 'Roboto500'),
                  ),
                ),
                //? Dorp Down Button (bolimni tanlash)
                SizedBox(
                  height: 70,
                  width: MediaQuery.of(context).size.width,
                  child: dropDownButtonDays(),
                ), //? Text (obuna 30 kun ...)
                Padding(
                  padding: EdgeInsets.only(top: 36.r),
                  child: Text(
                    LangTextConst().subscriptionText2,
                    style: MyTextStyleComp.myTextStyle(
                      fontF: 'Roboto500',
                      size: 17,
                    ),
                  ),
                ),
                SizedBox(height: 16.h),
                //? Text (boshlanish,time)
                _texts(
                  LangTextConst().startTime,
                  "${date.day}.${date.month}.${date.year}",
                  null,
                ),
                SizedBox(height: 16.h),
                //? Text (tugash ,time)
                _texts(
                  LangTextConst().finishTime,
                  "${dateFuture.day}.${dateFuture.month}.${dateFuture.year}",
                  null,
                ),
                SizedBox(height: 16.h),
                //? Text (obuna narxi ,price)
                _texts(
                  LangTextConst().subsCribePrice,
                  "${price.toInt()} ${LangTextConst().som}",
                  ColorsConst.primaryVariant,
                ),
              ],
            ),
            //? ElevatedButton (Obuna bolish)
            _elevatedButton(context),
          ],
        ),
      ),
    );
  }

//! Widgets
  Padding _texts(txt1, txt2, color) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 12.r),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            "$txt1",
            style: MyTextStyleComp.myTextStyle(fontF: 'Roboto500'),
          ),
          Text(
            "$txt2",
            style: MyTextStyleComp.myTextStyle(
              fontF: 'Roboto500',
              size: 16,
              color: color,
            ),
          ),
        ],
      ),
    );
  }

  Widget dropDownButtonCategory() {
    return Padding(
      padding: const EdgeInsets.only(top: 3, bottom: 3).r,
      child: Container(
        width: MediaQuery.of(context).size.width,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16.r),
          border: Border.all(color: ColorsConst.strokeAccent),
        ),
        child: DropdownButtonHideUnderline(
          child: Padding(
            padding: const EdgeInsets.only(left: 14.0, right: 22).r,
            child: DropdownButton(
              borderRadius: BorderRadius.circular(16.r),
              isExpanded: true,
              dropdownColor: ColorsConst.white,
              style: MyTextStyleComp.myTextStyle(),
              value: valueCategoryGuid,
              items: results
                  .map(
                    (item) => DropdownMenuItem<String>(
                      onTap: () => setState(() {
                        resultsDays.clear();
                        valueDaysGuid = null;
                        dateFuture = DateTime.now();
                        for (var i = 0; i < results.length; i++) {
                          if (results[i].title == item.title) {
                            resultsDays.addAll(results[i].categoryTypes!);
                          }
                        }
                      }),
                      value: item.guid,
                      child: Text("${item.title}"),
                    ),
                  )
                  .toList(),
              onChanged: (String? value) => setState(
                () => valueCategoryGuid = value,
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget dropDownButtonDays() {
    return Padding(
      padding: const EdgeInsets.only(top: 3, bottom: 3).r,
      child: Container(
        width: MediaQuery.of(context).size.width,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16.r),
          border: Border.all(color: ColorsConst.strokeAccent),
        ),
        child: DropdownButtonHideUnderline(
          child: Padding(
            padding: const EdgeInsets.only(left: 14.0, right: 22).r,
            child: DropdownButton(
              borderRadius: BorderRadius.circular(16.r),
              isExpanded: true,
              dropdownColor: ColorsConst.white,
              style: MyTextStyleComp.myTextStyle(),
              value: valueDaysGuid,
              items: resultsDays
                  .map(
                    (item) => DropdownMenuItem<String>(
                      value: item.guid.toString(),
                      onTap: () => setState(
                        () {
                          for (var i = 0; i < resultsDays.length; i++) {
                            if (resultsDays[i].price == item.price) {
                              dateFuture = DateTime.now().add(
                                Duration(
                                  days: int.parse("${resultsDays[i].days}"),
                                ),
                              );
                              price = double.parse("${resultsDays[i].price}");
                              print(dateFuture);
                              print(resultsDays[i].days);
                            }
                          }
                        },
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text("${item.days} kun"),
                          Text(
                            "${double.parse("${item.price}").toInt()} so'm",
                            style: MyTextStyleComp.myTextStyle(
                              color: ColorsConst.darkGray,
                            ),
                          ),
                        ],
                      ),
                    ),
                  )
                  .toList(),
              onChanged: (String? value) => setState(
                () => valueDaysGuid = value,
              ),
            ),
          ),
        ),
      ),
    );
  }

  ElevatedButton _elevatedButton(BuildContext context) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
        primary: ColorsConst.primary,
        fixedSize: Size(MediaQuery.of(context).size.width.w, 56.h),
      ),
      onPressed: () async {
        if (valueDaysGuid != null && valueCategoryGuid != null) {
          await SubscriptionCreateService.postData(
            context,
            valueCategoryGuid,
            valueDaysGuid,
          );
        }
      },
      child: Text(LangTextConst().subsCribe),
    );
  }
}
