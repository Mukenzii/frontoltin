import 'package:flutter/material.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/constants/colors_const.dart';

AppBar appBarWidget(BuildContext context, {String? txt, double size = 20}) {
  return AppBar(
    centerTitle: true,
    backgroundColor: ColorsConst.white,
    leading: InkWell(
      child: Icon(Icons.arrow_back_ios, color: ColorsConst.black),
      onTap: () => Navigator.pop(context),
    ),
    title: Text(
      "$txt",
      style: MyTextStyleComp.myTextStyle(size: size, fontF: "Roboto500"),
    ),
    elevation: 0,
  );
}

AppBar appBarChange(BuildContext context,
    {String? txt, IconData? icon, List<Widget>? actions}) {
  return AppBar(
    backgroundColor: ColorsConst.white,
    centerTitle: true,
    actions: actions,
    leading: InkWell(
      child: Icon(icon, color: ColorsConst.black),
      onTap: () => Navigator.pop(context),
    ),
    title: Text(
      "$txt",
      style: MyTextStyleComp.myTextStyle(size: 20, fontF: "Roboto500"),
    ),
    elevation: 0.0,
  );
}
