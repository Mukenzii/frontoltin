import 'package:flutter/material.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:liber/mock/category_data.dart';
import 'package:liber/models/category/get_category_model.dart';
import 'package:liber/service/category/list_category_service.dart';

class AllCategoriesComp extends StatelessWidget {
  const AllCategoriesComp({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SizedBox(
          height: 345.h,
          child: FutureBuilder(
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
                    return InkWell(
                      borderRadius: BorderRadius.circular(16.r),
                      onTap: () {},
                      child: Container(
                        height: 102.h,
                        width: 102.w,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(16.r),
                          color: ColorsConst.darkGray,
                          image: DecorationImage(
                            image: NetworkImage(
                              CategoryData.data['results'][index]['thumbnail'],
                            ),
                            fit: BoxFit.cover,
                          ),
                        ),
                        child: Container(
                          height: MediaQuery.of(context).size.height.h,
                          width: MediaQuery.of(context).size.width.w,
                          decoration: BoxDecoration(
                            color: Colors.black.withOpacity(0.51),
                            borderRadius: BorderRadius.circular(16.r),
                          ),
                          alignment: Alignment.center,
                          child: Text(
                            CategoryData.data['results'][index]['title'],
                            style: MyTextStyleComp.myTextStyle(
                              size: 12,
                              color: ColorsConst.white,
                              fontF: "Roboto500",
                              sizeH: 1.14,
                            ),
                            textAlign: TextAlign.center,
                          ),
                        ),
                      ),
                    );
                  },
                  itemCount: CategoryData.data['results'].length,
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
                      borderRadius: BorderRadius.circular(16.r),
                      onTap: () {
                        Navigator.pushNamed(
                          context,
                          '/single_category',
                          arguments: [
                            data.results?[index].guid,
                            data.results?[index].title
                          ],
                        );
                      },
                      child: Container(
                        height: 102.h,
                        width: 102.w,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(16.r),
                          color: ColorsConst.darkGray,
                          image: data.results![index].thumbnail != null
                              ? DecorationImage(
                                  image: NetworkImage(
                                    data.results![index].thumbnail!,
                                  ),
                                  fit: BoxFit.cover,
                                )
                              : null,
                        ),
                        child: Container(
                          height: MediaQuery.of(context).size.height.h,
                          width: MediaQuery.of(context).size.width.w,
                          decoration: BoxDecoration(
                            color: Colors.black.withOpacity(0.51),
                            borderRadius: BorderRadius.circular(16.r),
                          ),
                          alignment: Alignment.center,
                          child: Text(
                            data.results![index].title ??
                                CategoryData.data['results'][index]['title'],
                            style: MyTextStyleComp.myTextStyle(
                              size: 12.sp,
                              color: ColorsConst.white,
                              fontF: "Roboto500",
                              sizeH: 1.14.h,
                            ),
                            textAlign: TextAlign.center,
                          ),
                        ),
                      ),
                    );
                  },
                  itemCount: data.results!.length,
                );
              }
            },
          ),
        ),
      ],
    );
  }
}
