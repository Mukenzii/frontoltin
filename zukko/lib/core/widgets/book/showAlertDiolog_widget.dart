// import 'package:flutter/material.dart';
// import 'package:flutter_svg/flutter_svg.dart';
// import 'package:liber/core/constants/colors_const.dart';
// import 'package:liber/core/constants/lang_text_const.dart';
// import 'package:liber/core/constants/my_text_const.dart';


// ElevatedButton elevatedButton(BuildContext context) {
//   return ElevatedButton(
//     style: ElevatedButton.styleFrom(
//       shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
//       primary: ColorsConst.primary,
//       fixedSize: Size(MediaQuery.of(context).size.width, 56),
//     ),
//     onPressed: () {
//       showDialog(
//         context: context,
//         builder: (_) => AlertDialog(
//           shape: const RoundedRectangleBorder(
//               borderRadius: BorderRadius.all(Radius.circular(20))),
//           content: Builder(
//             builder: (context) {
//               return Container(
//                 height: 286,
//                 width: 343,
//                 child: Column(
//                   mainAxisAlignment: MainAxisAlignment.spaceEvenly,
//                   children: [
//                     SvgPicture.asset("assets/svgs/pay_icon.svg"),
//                     Text(
//                       LangTextConst().noMoney,
//                       style: MyTextStyleComp.myTextStyle(
//                         fontF: 'Roboto500',
//                         size: 17,
//                       ),
//                     ),
//                     ElevatedButton(
//                       style: ElevatedButton.styleFrom(
//                         primary: ColorsConst.primary,
//                         fixedSize: const Size(191, 48),
//                         shape: RoundedRectangleBorder(
//                           borderRadius: BorderRadius.circular(20),
//                         ),
//                       ),
//                       onPressed: () => Navigator.pop(context),
//                       child: Text(
//                         LangTextConst().pay,
//                         style: MyTextStyleComp.myTextStyle(
//                           color: ColorsConst.white,
//                           size: 16,
//                         ),
//                       ),
//                     ),
//                   ],
//                 ),
//               );
//             },
//           ),
//         ),
//       );
//     },
//     child: Text(LangTextConst().subsCribe),
//   );
// }
