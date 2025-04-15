import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:liber/core/constants/lang_text_const.dart';

class LangPage extends StatefulWidget {
  const LangPage({Key? key}) : super(key: key);

  @override
  State<LangPage> createState() => _LangPageState();
}

class _LangPageState extends State<LangPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(LangTextConst().lang),
      ),
      body: Column(
        children: [
          TextButton(
            onPressed: () {
              context.setLocale(const Locale("ru"));
              Navigator.popAndPushNamed(context, "/screens");
            },
            child: const Text("Rus"),
          ),
          TextButton(
            onPressed: () {
              context.setLocale(const Locale("uk"));
              Navigator.popAndPushNamed(context, "/screens");
            },
            child: const Text("Uzb"),
          ),
        ],
      ),
    );
  }
}
