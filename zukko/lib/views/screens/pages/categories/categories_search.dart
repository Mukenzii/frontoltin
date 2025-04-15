// ignore_for_file: must_be_immutable
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/components/app_bar_comp.dart';
import 'package:liber/core/widgets/book/all_categories_comp.dart';
import 'package:liber/core/widgets/book/search_no_result_comp.dart';

class CategoriesSearch extends StatelessWidget {
  CategoriesSearch({Key? key}) : super(key: key);
  TextEditingController controller = TextEditingController();
  bool bol = true;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ColorsConst.white,
      appBar: appBarChange(context, txt: "Рукнлар", icon: Icons.arrow_back_ios),
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.all(16.r),
          child: Column(
            children: [
              //? TextForm Field (Qidirish)
              SizedBox(
                height: 50.h,
                width: MediaQuery.of(context).size.width.w,
                child: TextFormField(
                  controller: controller,
                  decoration: InputDecoration(
                    hintText: "Қидириш",
                    fillColor: ColorsConst.gray,
                    enabledBorder: OutlineInputBorder(
                      borderSide: const BorderSide(color: Color(0xffededed)),
                      borderRadius: BorderRadius.circular(16.r),
                    ),
                  ),
                ),
              ),
              SizedBox(height: 24.h),
              bol ? const AllCategoriesComp() : const CategoriesNoResult(),
            ],
          ),
        ),
      ),
    );
  }
}
