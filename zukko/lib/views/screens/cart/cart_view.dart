import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/constants/lang_text_const.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/components/app_bar_comp.dart';
import 'package:liber/core/widgets/book/search_no_result_comp.dart';
import 'package:liber/models/cart/cart_order_model.dart';
import 'package:liber/service/cart/cart_order_service.dart';

class CartView extends StatefulWidget {
  const CartView({Key? key}) : super(key: key);

  @override
  State<CartView> createState() => _CartViewState();
}

class _CartViewState extends State<CartView> {
  double ratingStar = 0;
  Color? color;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ColorsConst.white,
      appBar: appBarChange(context, txt: LangTextConst().cart),
      body: Padding(
        padding: EdgeInsets.all(16.r),
        child: FutureBuilder(
          future: CartOrderService.getData(),
          builder: (context, AsyncSnapshot<CartOrderModel> snapshot) {
            if (!snapshot.hasData) {
              return const CategoriesNoResult();
            } else if (snapshot.hasError) {
              return const SizedBox();
            }
            return SizedBox(
              height: MediaQuery.of(context).size.height.h,
              child: ListView.builder(
                physics: const BouncingScrollPhysics(),
                itemCount: snapshot.data!.results!.length,
                itemBuilder: (context, index) {
                  return SizedBox(
                    height: 200.h,
                    width: MediaQuery.of(context).size.width.w,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Padding(
                          padding: EdgeInsets.symmetric(vertical: 32.r),
                          child: Text(
                            "Буюртма №${index + 1}",
                            style: MyTextStyleComp.myTextStyle(
                              size: 20,
                              fontF: "Roboto500",
                            ),
                          ),
                        ),
                        Row(
                          children: [
                            //? Image Container
                            Container(
                              height: 96.h,
                              width: 96.w,
                              decoration: BoxDecoration(
                                color: ColorsConst.darkGray,
                                borderRadius: BorderRadius.circular(8.r),
                                image: DecorationImage(
                                  fit: BoxFit.cover,
                                  image: NetworkImage(
                                    "${snapshot.data!.results![index].bookImage}",
                                  ),
                                ),
                              ),
                            ),
                            SizedBox(width: 20.w),
                            //? Text Column
                            SizedBox(
                              height: 96.h,
                              child: Column(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceEvenly,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  SizedBox(
                                    width:
                                        MediaQuery.of(context).size.width / 2,
                                    child: Text(
                                      "${snapshot.data!.results![index].bookTitle}",
                                      overflow: TextOverflow.ellipsis,
                                      style: MyTextStyleComp.myTextStyle(
                                        size: 16,
                                        fontF: 'Roboto500',
                                      ),
                                    ),
                                  ),
                                  Text(
                                    "${snapshot.data!.results![index].author}",
                                    style: MyTextStyleComp.myTextStyle(
                                      color: ColorsConst.darkGray,
                                    ),
                                  ),
                                  Text(
                                    "${snapshot.data!.results![index].totalPrice}",
                                    style: MyTextStyleComp.myTextStyle(
                                      color: ColorsConst.tertiary,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  );
                },
              ),
            );
          },
        ),
      ),
    );
  }
}
