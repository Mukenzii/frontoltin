// ignore_for_file: must_be_immutable, non_constant_identifier_names, use_build_context_synchronously
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:image_picker/image_picker.dart';
import 'package:liber/core/components/app_bar_comp.dart';
import 'package:liber/core/components/my_elevated_button_comp.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/constants/lang_text_const.dart';
import 'package:liber/service/auth/user/settings_update_account_service.dart';

class ProfileSettings extends StatefulWidget {
  const ProfileSettings({super.key});

  @override
  State<ProfileSettings> createState() => _ProfileSettingsState();
}

class _ProfileSettingsState extends State<ProfileSettings> {
  TextEditingController nameController = TextEditingController();

  File? image;

  Future pickImage() async {
    try {
      final image = await ImagePicker()
          .pickImage(source: ImageSource.gallery, imageQuality: 8);

      if (image == null) return;

      final imageTemp = File(image.path);

      setState(() => this.image = imageTemp);
    } on PlatformException catch (e) {
      // print('Failed to pick image: $e');
    }
  }

  Future pickImageC() async {
    try {
      final image = await ImagePicker().pickImage(source: ImageSource.camera);

      if (image == null) return;

      final imageTemp = File(image.path);

      setState(() => this.image = imageTemp);
    } on PlatformException catch (e) {
      // print('Failed to pick image: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ColorsConst.white,
      appBar: appBarWidget(context, txt: LangTextConst().settings, size: 20),
      body: Padding(
        padding: const EdgeInsets.fromLTRB(16, 0, 16, 46),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                //? Upload Image (Icon,Text)
                Padding(
                  padding: EdgeInsets.only(top: 45.r, bottom: 35.r),
                  child: InkWell(
                    onTap: () async {
                      await showModalBottomSheet(
                        backgroundColor: Colors.transparent,
                        context: context,
                        builder: (_) {
                          return SizedBox(
                            height: 180.h,
                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.end,
                                children: [
                                  InkWell(
                                    onTap: () async {
                                      await pickImageC();
                                      Navigator.pop(context);
                                    },
                                    child: Container(
                                      height: 50.h,
                                      width:
                                          MediaQuery.of(context).size.width.w,
                                      alignment: Alignment.center,
                                      decoration: BoxDecoration(
                                        color: ColorsConst.white,
                                        borderRadius: BorderRadius.only(
                                          topLeft: Radius.circular(12.r),
                                          topRight: Radius.circular(12.r),
                                        ),
                                      ),
                                      child: Text(
                                        'Rasmga olish',
                                        style: MyTextStyleComp.myTextStyle(),
                                      ),
                                    ),
                                  ),
                                  InkWell(
                                    onTap: () async {
                                      await pickImage();
                                      Navigator.pop(context);
                                    },
                                    child: Container(
                                      alignment: Alignment.center,
                                      height: 50.h,
                                      width:
                                          MediaQuery.of(context).size.width.w,
                                      decoration: BoxDecoration(
                                        color: ColorsConst.white,
                                        borderRadius: BorderRadius.only(
                                          bottomLeft: Radius.circular(12.r),
                                          bottomRight: Radius.circular(12.r),
                                        ),
                                      ),
                                      child: const Text('Galeriyadan tanlash'),
                                    ),
                                  ),
                                  SizedBox(height: 8.h),
                                  InkWell(
                                    onTap: () => Navigator.pop(context),
                                    child: Container(
                                      height: 50.h,
                                      width:
                                          MediaQuery.of(context).size.width.w,
                                      alignment: Alignment.center,
                                      decoration: BoxDecoration(
                                        color: ColorsConst.white,
                                        borderRadius:
                                            BorderRadius.circular(16.r),
                                      ),
                                      child: const Text('Bekor qilish'),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          );
                        },
                      );
                    },
                    child: Row(
                      children: [
                        image == null
                            ? Icon(
                                Icons.account_circle_outlined,
                                color: ColorsConst.primary,
                                size: 64.sp,
                              )
                            : Container(
                                height: 64.w,
                                width: 64.w,
                                decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(72.r),
                                  image: DecorationImage(
                                    fit: BoxFit.cover,
                                    image: FileImage(image!),
                                  ),
                                ),
                              ),
                        SizedBox(width: 20.w),
                        Text(
                          LangTextConst().uploadImage,
                          style: MyTextStyleComp.myTextStyle(
                            color: ColorsConst.primary,
                            size: 16,
                            fontF: "Roboto500",
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                //? Text(Ismingiz)
                Text(
                  LangTextConst().name,
                  style: MyTextStyleComp.myTextStyle(
                    fontF: "Roboto500",
                    color: ColorsConst.black,
                  ),
                ),
                SizedBox(height: 10.h),
                //? TextFormField(Ismingiz kiriting)
                SizedBox(
                  height: 50.h,
                  width: MediaQuery.of(context).size.width.w,
                  child: TextFormField(
                    controller: nameController,
                    decoration: InputDecoration(
                      hintText: LangTextConst().name,
                      hintStyle:
                          TextStyle(height: 2.h, color: ColorsConst.darkGray),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(16.r),
                        borderSide: BorderSide(color: ColorsConst.gray),
                      ),
                    ),
                  ),
                ),
              ],
            ),
            MyElevatedButtonComp.elevatedButton(
              context,
              () async {
                DateTime date = DateTime.now();
                // print("day:${date.day}");
                // print("month:${date.month}");
                // print("year:${date.year}");

                if (nameController.text.isNotEmpty) {
                  if (image != null) {
                    await SettingsUpdateAccount.putData(
                      context,
                      nameController.text,
                      "male",
                      "${date.day}.${date.month}.${date.year}",
                      image!,
                    );
                  } else {
                    await SettingsUpdateAccountNoImage.putData(
                      context,
                      nameController.text,
                      "male",
                      "${date.day}.${date.month}.${date.year}",
                    );
                  }
                  Navigator.pop(context);
                }
              },
              "Ўзгартириш",
            ),
          ],
        ),
      ),
    );
  }
}
