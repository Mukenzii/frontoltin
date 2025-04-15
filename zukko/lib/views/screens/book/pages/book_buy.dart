import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:liber/core/components/app_bar_comp.dart';
import 'package:liber/core/components/my_elevated_button_comp.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/constants/lang_text_const.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/widgets/book/ask_container.dart';
import 'package:liber/models/book/book_detail_model.dart';
import 'package:liber/service/book/book_detail_service.dart';
import 'package:liber/service/book/book_order_register_service.dart';

class BookBuy extends StatefulWidget {
  final String bookGuid;
  final String bookTypeGuid;
  final String price;
  final int index;

  const BookBuy(
      {required this.bookGuid,
      required this.bookTypeGuid,
      required this.price,
      required this.index,
      Key? key})
      : super(key: key);

  @override
  State<BookBuy> createState() => _BookBuyState();
}

class _BookBuyState extends State<BookBuy> {
  double numberCount = 1;
  String paymentType = 'cash';

  TextEditingController nameController = TextEditingController();
  TextEditingController phoneController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ColorsConst.white,
      appBar: appBarWidget(
        context,
        txt: LangTextConst().orderProcessing,
        size: 18,
      ),
      body: SingleChildScrollView(
        physics: const BouncingScrollPhysics(),
        child: SizedBox(
          height: MediaQuery.of(context).size.height * 0.87.h,
          width: MediaQuery.of(context).size.width.w,
          child: FutureBuilder(
            future: BookDetailService.getData(widget.bookGuid),
            builder: (BuildContext context, AsyncSnapshot snap) {
              //<BookDetailModel>
              if (!snap.hasData) {
                return const Center(
                    child: CircularProgressIndicator.adaptive());
              } else if (snap.hasError) {
                return const Center();
              } else {
                var data = BookDetailModel.fromJson(snap.data!);
                return Padding(
                  padding: EdgeInsets.fromLTRB(16.r, 16.r, 16.r, 16.r),
                  child: SizedBox(
                    width: MediaQuery.of(context).size.width.w,
                    child: Column(
                      children: [
                        //? Widgetlar qismi
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            //? Contriner image and Text
                            Row(
                              children: [
                                //? Image
                                Container(
                                  height: 100.h,
                                  width: 100.w,
                                  decoration: BoxDecoration(
                                    color: ColorsConst.black,
                                    image: DecorationImage(
                                      image: NetworkImage("${data.thumbnail}"),
                                      fit: BoxFit.cover,
                                    ),
                                    borderRadius: BorderRadius.circular(10.r),
                                  ),
                                ),
                                //? Texts
                                Padding(
                                  padding: EdgeInsets.only(left: 16.r),
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      SizedBox(
                                        width:
                                            MediaQuery.of(context).size.width /
                                                2.w,
                                        child: Text(
                                          data.title.toString(),
                                          style: MyTextStyleComp.myTextStyle(
                                            fontF: "Roboto500",
                                            size: 16,
                                          ),
                                          overflow: TextOverflow.clip,
                                          maxLines: 3,
                                        ),
                                      ),
                                      SizedBox(height: 16.h),
                                      Text(
                                        "${double.parse(widget.price) * numberCount} ${LangTextConst().som}",
                                        style: MyTextStyleComp.myTextStyle(
                                          fontF: "Roboto500",
                                          size: 20,
                                          color: ColorsConst.primary,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                            //? Buyurtma soni and counter
                            Padding(
                              padding: EdgeInsets.only(bottom: 30.r, top: 40.r),
                              child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(
                                    LangTextConst().orderNumber,
                                    style: MyTextStyleComp.myTextStyle(
                                      fontF: "Roboto500",
                                    ),
                                  ),
                                  Container(
                                    decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(8.r),
                                      border: Border.all(
                                          color: ColorsConst.darkGray),
                                    ),
                                    height: 30.h,
                                    width: 115.w,
                                    child: Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        Container(
                                          decoration: BoxDecoration(
                                            color: ColorsConst.white,
                                            borderRadius:
                                                BorderRadius.circular(8.r),
                                          ),
                                          width: 32.w,
                                          child: InkWell(
                                            onTap: () => setState(
                                              () {
                                                if (numberCount <= 1) {
                                                  numberCount = 1;
                                                } else {
                                                  numberCount -= 1;
                                                }
                                              },
                                            ),
                                            child: Center(
                                              child: Icon(
                                                Icons.remove,
                                                size: 12.sp,
                                              ),
                                            ),
                                          ),
                                        ),
                                        SizedBox(
                                          child: Center(
                                            child: Text(
                                              '${numberCount.toInt()}',
                                              style:
                                                  MyTextStyleComp.myTextStyle(
                                                size: 12,
                                              ),
                                            ),
                                          ),
                                        ),
                                        Container(
                                          width: 32.w,
                                          decoration: BoxDecoration(
                                            color: ColorsConst.white,
                                            borderRadius:
                                                BorderRadius.circular(8.r),
                                          ),
                                          child: InkWell(
                                            onTap: () {
                                              setState(() => numberCount += 1);
                                            },
                                            child: Center(
                                              child:
                                                  Icon(Icons.add, size: 12.sp),
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            //?text ismingiz and textformfield
                            textTextField(LangTextConst().name, nameController),
                            //?text mobil raqam and textformfield
                            textTextField(
                                LangTextConst().phoneNumber, phoneController),
                            //? radioButton, radioButton text
                            Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Radio(
                                      value: 'cash',
                                      groupValue: paymentType,
                                      onChanged: (value) {
                                        setState(() => paymentType = "$value");
                                      },
                                    ),
                                    Text(
                                      LangTextConst().cash,
                                      style: MyTextStyleComp.myTextStyle(
                                        fontF: 'Roboto500',
                                      ),
                                    ),
                                  ],
                                ),
                                SizedBox(width: 20.w),
                                Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Radio(
                                      value: 'online',
                                      groupValue: paymentType,
                                      onChanged: (value) {
                                        setState(() => paymentType = "$value");
                                      },
                                    ),
                                    Text(
                                      LangTextConst().online,
                                      style: MyTextStyleComp.myTextStyle(
                                        fontF: 'Roboto500',
                                      ),
                                    ),
                                  ],
                                )
                              ],
                            ),

                            SizedBox(height: 20.h),
                            //? Container info
                            showContainer(
                              txtSize: 13,
                              context,
                              LangTextConst().text,
                              '',
                              'operator_icon',
                            ),
                          ],
                        ),
                        SizedBox(height: 50.h),
                        nameController.text.isNotEmpty
                            ? (phoneController.text.isNotEmpty
                                ? MyElevatedButtonComp.elevatedButton(
                                    context,
                                    () async {
                                      await BookOrderRegister.postData(
                                        context,
                                        data.guid,
                                        widget.bookTypeGuid,
                                        "paper",
                                        paymentType: paymentType,
                                        quantity: numberCount,
                                        fullName: nameController.text,
                                        phoneNumber: phoneController.text,
                                      );
                                    },
                                    "${LangTextConst().payType[1]} - ${widget.price} сум",
                                  )
                                : buttonFailed(
                                    "${LangTextConst().payType[1]} - ${widget.price} сум"))
                            : buttonFailed(
                                "${LangTextConst().payType[1]} - ${widget.price} сум"),
                      ],
                    ),
                  ),
                );
              }
            },
          ),
        ),
      ),
    );
  }

  Container buttonFailed(text) {
    return Container(
      height: 56.h,
      width: MediaQuery.of(context).size.width,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24.r),
        color: ColorsConst.black.withOpacity(0.5),
        // border: Border.all(color: ColorsConst.black),
      ),
      alignment: Alignment.center,
      child: Text(
        text,
        style: MyTextStyleComp.myTextStyle(color: ColorsConst.gray),
      ),
    );
  }

  Column textTextField(String txt, TextEditingController controller) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(txt, style: MyTextStyleComp.myTextStyle(fontF: "Roboto500")),
        Padding(
          padding: EdgeInsets.only(top: 8.r, bottom: 16.r),
          child: SizedBox(
            height: 50.h,
            width: MediaQuery.of(context).size.width.w,
            child: TextFormField(
              controller: controller,
              decoration: InputDecoration(
                hintText: txt,
                hintStyle: MyTextStyleComp.myTextStyle(
                  color: ColorsConst.darkGray,
                ),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(16.r),
                  borderSide: BorderSide(color: ColorsConst.darkGray),
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
