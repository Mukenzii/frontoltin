import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:rating_bar_flutter/rating_bar_flutter.dart';
import 'package:liber/core/components/app_bar_comp.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/constants/lang_text_const.dart';

class ProfileFavorites extends StatefulWidget {
  const ProfileFavorites({super.key});

  @override
  State<ProfileFavorites> createState() => _ProfileFavoritesState();
}

class _ProfileFavoritesState extends State<ProfileFavorites> {
  double ratingStar = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: appBarWidget(
        context,
        txt: LangTextConst().favoritesText,
      ),
      body: Padding(
        padding: EdgeInsets.all(16.r),
        child: Column(
          children: [
            //? Container info
            Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20.r),
                color: ColorsConst.secondary,
              ),
              height: 88.h,
              width: MediaQuery.of(context).size.width.w,
              child: Row(
                children: [
                  Padding(
                    padding: EdgeInsets.fromLTRB(24.r, 16.r, 2.r, 16.r),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        SizedBox(
                          width: MediaQuery.of(context).size.width * 0.6.w,
                          child: Text(
                            LangTextConst().favoritesText,
                            style: MyTextStyleComp.myTextStyle(
                              size: 12,
                              color: ColorsConst.white,
                            ),
                          ),
                        ),
                        Text(
                          LangTextConst().understandable,
                          style: MyTextStyleComp.myTextStyle(
                            color: ColorsConst.white,
                            size: 12,
                            fontW: FontWeight.w700,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    height: MediaQuery.of(context).size.height.h,
                    width: 92.w,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(20.r),
                      image: const DecorationImage(
                        image: AssetImage("assets/images/favorites.png"),
                        fit: BoxFit.cover,
                      ),
                    ),
                  )
                ],
              ),
            ),
            //? Favorites products
            Expanded(
              child: ListView.builder(
                itemCount: 2,
                itemBuilder: (context, index) {
                  return Padding(
                    padding: EdgeInsets.symmetric(vertical: 16.r),
                    child: SizedBox(
                      height: 96.h,
                      width: MediaQuery.of(context).size.width.w,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          //? Image,Text(Column)
                          Row(
                            children: [
                              //? Image Container
                              Container(
                                height: 96.h,
                                width: 96.w,
                                decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(20.r),
                                  image: const DecorationImage(
                                    fit: BoxFit.cover,
                                    image: NetworkImage(
                                      "https://source.unsplash.com/random",
                                    ),
                                  ),
                                ),
                              ),
                              SizedBox(width: 20.w),
                              //? Text Column
                              Column(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceEvenly,
                                children: [
                                  Text(
                                    "Стив Джобс",
                                    style: MyTextStyleComp.myTextStyle(
                                      size: 16,
                                      fontF: 'Roboto500',
                                    ),
                                  ),
                                  RatingBarFlutter(
                                    onRatingChanged: (rating) => setState(
                                      () => ratingStar = rating!,
                                    ),
                                    filledIcon: Icons.star,
                                    emptyIcon: Icons.star_border,
                                    halfFilledIcon: Icons.star_half,
                                    isHalfAllowed: true,
                                    aligns: Alignment.centerLeft,
                                    filledColor: ColorsConst.primary,
                                    emptyColor: ColorsConst.darkGray,
                                    size: 14.sp,
                                  ),
                                  Text(
                                    "Жорж Оруел",
                                    style: MyTextStyleComp.myTextStyle(
                                      color: ColorsConst.darkGray,
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                          //? Delete Icon
                          Column(
                            mainAxisAlignment: MainAxisAlignment.start,
                            children: [
                              SizedBox(height: 12.h),
                              InkWell(
                                onTap: () {},
                                child: CircleAvatar(
                                  radius: 12.r,
                                  backgroundColor: ColorsConst.darkGray,
                                  child: Center(
                                    child: Icon(
                                      Icons.close,
                                      color: ColorsConst.white,
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
