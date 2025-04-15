import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_svg/svg.dart';
import 'package:liber/core/constants/colors_const.dart';
import 'package:liber/core/constants/lang_text_const.dart';
import 'package:liber/core/components/my_text_style_comp.dart';
import 'package:liber/core/components/app_bar_comp.dart';
import 'package:liber/models/book/reding/reding_book_models.dart';
import 'package:liber/service/book/reding_book/reding_book_service.dart';

class BookOnlineListening extends StatefulWidget {
  final List bookInfo;
  const BookOnlineListening({required this.bookInfo, Key? key})
      : super(key: key);

  @override
  State<BookOnlineListening> createState() => _BookOnlineListeningState();
}

class _BookOnlineListeningState extends State<BookOnlineListening> {
  AudioPlayer audioPlayer = AudioPlayer();
  bool audioPlay = false;
  bool isPlay = false;
  bool isFirst = true;
  Duration _position = const Duration();
  Duration _maxDuration = const Duration();
  String musicName = 'Behabar';
  String musicAuthor = "Shohroh Rap";
  var press = 0;

  // int indexMusic = 0;
  // List<String> musicList = [
  //   "https://file.uzhits.net/music/dl2/2019/01/11/shoxrux_timur_rakhmanov_-_bexabar_(uzhits.net).mp3",
  //   "https://dl.music-hit.com/mp3/41878.mp3?blatnoi-udar_-_dolya-vorovskaya.mp3",
  //   "https://a1.dlshare.net/sdg/5f/50/8e/129109417_118301632.mp3?name=komar-zapretnaya-zona--rep-eto-delo-chesti.mp3",
  // ];

  List<Map> musicListInfo = [
    {
      "name": "Behabar",
      "author": "Shohroh Rap",
    },
    {
      "name": "Dolya",
      "author": "Blaynoy-udar",
    },
    {
      "name": "Это дело чести",
      "author": "komar",
    }
  ];

  String _printDuration(Duration duration) {
    String twoDigits(int n) => n.toString().padLeft(2, "0");
    String twoDigitMinutes = twoDigits(duration.inMinutes.remainder(60));
    String twoDigitSeconds = twoDigits(duration.inSeconds.remainder(60));
    if (_position.inMicroseconds == _maxDuration.inMicroseconds) {
      // _position = const Duration();
      _position = Duration.zero;
      print("HELLO");
    }
    return "${twoDigits(duration.inHours)}:$twoDigitMinutes:$twoDigitSeconds";
  }

  seekToSek(int sec) {
    Duration newPos = Duration(seconds: sec);
    audioPlayer.seek(newPos);
  }

  PlayerState ps = PlayerState.paused;

  Future autoPlayFunc() async {
    var music = await RedingBookService.getData(widget.bookInfo[0]);
    audioPlayer.play(
      UrlSource("https://api-liber.uz${music.audioBooks![0].body}"),
    );
  }

  @override
  void initState() {
    autoPlayFunc();
    print(widget.bookInfo);
    super.initState();
    audioPlayer.onPlayerStateChanged
        .listen((event) => setState(() => ps = event));
    audioPlayer.onDurationChanged.listen((Duration d) {
      // debugPrint("Max Duration: $d");
      setState(() => _maxDuration = d);
    });
    audioPlayer.onPositionChanged.listen((Duration p) {
      // debugPrint("Current position: $p");
      setState(() => _position = p);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ColorsConst.white,
      appBar: appBarChange(
        context,
        txt: "Аудио Китоб",
        icon: Icons.close,
        actions: [
          IconButton(
            onPressed: () {},
            icon: Icon(Icons.list, color: ColorsConst.black),
          ),
        ],
      ),
      body: FutureBuilder(
        future: RedingBookService.getData(widget.bookInfo[0]),
        builder: (context, AsyncSnapshot<RedingBookModels> snap) => snap.hasData
            ? Padding(
                padding: EdgeInsets.fromLTRB(16.r, 16.r, 16.r, 100.r),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    // Text(musicUrl),
                    //? Image Container, Row online oqish, Row buyurtma qilish
                    Column(
                      children: [
                        //? Image Container
                        Padding(
                          padding: EdgeInsets.only(top: 40.r),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              //? Image Container
                              Container(
                                height: 260.h,
                                width: 203.w,
                                decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(8.r),
                                  image: const DecorationImage(
                                    image: NetworkImage(
                                      'https://source.unsplash.com/random/',
                                    ),
                                    fit: BoxFit.cover,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                        //? online oqish
                        widgetOnlineReadBuy(
                          icon: Icons.book,
                          onTap: () {},
                          txt: LangTextConst().onlineSleeping,
                        ),
                        //? buyurtma qilish
                        widgetOnlineReadBuy(
                          icon: Icons.shopping_cart_rounded,
                          onTap: () {},
                          txt: "Буюртма қилиш",
                        ),
                      ],
                    ),
                    //? Music ...
                    Column(
                      children: [
                        //? Music name
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              widget.bookInfo[1],
                              style: MyTextStyleComp.myTextStyle(
                                size: 16,
                                fontF: 'Roboto500',
                              ),
                            ),
                            SizedBox(height: 10.h),
                            Text(
                              widget.bookInfo[2],
                              style: MyTextStyleComp.myTextStyle(
                                size: 12,
                                color: ColorsConst.darkGray,
                              ),
                            )
                          ],
                        ),
                        //? Slider
                        SizedBox(
                          height: 50,
                          child: Slider(
                            activeColor: ColorsConst.primary,
                            inactiveColor: ColorsConst.darkGray,
                            min: 0,
                            max: _maxDuration.inSeconds.toDouble(),
                            value: _position.inSeconds.toDouble() >=
                                    _maxDuration.inSeconds.toDouble()
                                ? _maxDuration.inSeconds.toDouble()
                                : _position.inSeconds.toDouble(),
                            onChanged: (v) async {
                              if (_position.inSeconds.toDouble() >=
                                  _maxDuration.inSeconds.toDouble()) {
                                _position = const Duration(seconds: 0);
                                await autoPlayFunc();
                                setState(() {});
                              }
                              seekToSek(v.toInt());
                            },
                          ),
                        ),
                        //? Text minut
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 18),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(_printDuration(_position)),
                              Text(_printDuration(_maxDuration)),
                            ],
                          ),
                        ),
                        //? Icons
                        const SizedBox(height: 10),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            //? Back
                            IconButton(
                              onPressed: () {
                                setState(
                                  () {
                                    // press -= 1;
                                    // print(press);
                                    // if (press >= -1) {
                                    //   press = 0;
                                    // }
                                    // for (var i in musicList) {
                                    //   if (press == 0) {
                                    //     audioPlayer
                                    //         .play(UrlSource(musicList[2]));
                                    //   } else if (press == 1) {
                                    //     audioPlayer
                                    //         .play(UrlSource(musicList[1]));
                                    //   } else if (press == 2) {
                                    //     audioPlayer
                                    //         .play(UrlSource(musicList[0]));
                                    //   }
                                    // }
                                  },
                                );
                              },
                              icon: Icon(
                                Icons.fast_rewind,
                                color: ColorsConst.primary,
                                size: 25.sp,
                              ),
                            ),
                            //? Seek back
                            IconButton(
                              onPressed: () => audioPlayer.seek(
                                  _position -= const Duration(seconds: 15)),
                              icon: SvgPicture.asset(
                                'assets/svgs/seek1.svg',
                                height: 20.sp,
                              ),
                            ),
                            //? Plat Pouse
                            IconButton(
                              onPressed: () async {
                                if (isPlay) {
                                  play(
                                      "https://api-liber.uz${snap.data?.audioBooks?[0].body}");
                                } else {
                                  pause();
                                }
                                if (_position.inSeconds.toDouble() >=
                                    _maxDuration.inSeconds.toDouble()) {
                                  _position = Duration.zero;
                                  await autoPlayFunc();
                                  setState(() {});
                                }
                                setState(() {});
                              },
                              icon: ps == PlayerState.paused
                                  ? Icon(
                                      Icons.play_circle_filled,
                                      size: 35.sp,
                                      color: ColorsConst.primary,
                                    )
                                  : Icon(
                                      Icons.pause_circle_filled,
                                      size: 35.sp,
                                      color: ColorsConst.primary,
                                    ),
                            ),
                            //? Seek forward
                            IconButton(
                              onPressed: () {
                                audioPlayer.seek(
                                  _position += const Duration(seconds: 15),
                                );
                                setState(() {});
                              },
                              icon: SvgPicture.asset(
                                'assets/svgs/seek2.svg',
                                height: 20,
                              ),
                            ),
                            //? Next
                            IconButton(
                              onPressed: () {
                                setState(() {
                                  // press += 1;
                                  // print(press);
                                  // if (press >= 3) {
                                  //   press = 0;
                                  // }
                                  // for (var i in musicList) {
                                  //   if (press == 0) {
                                  //     audioPlayer.play(UrlSource(musicList[1]));
                                  //   } else if (press == 1) {
                                  //     audioPlayer.play(UrlSource(musicList[2]));
                                  //   } else if (press == 2) {
                                  //     audioPlayer.play(UrlSource(musicList[0]));
                                  //   }
                                  // }
                                });
                              },
                              icon: Icon(
                                Icons.fast_forward,
                                color: ColorsConst.primary,
                                size: 25.sp,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              )
            : const SizedBox(),
      ),
    );
  }

  Row widgetOnlineReadBuy({void Function()? onTap, IconData? icon, txt}) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Padding(
          padding: EdgeInsets.symmetric(vertical: 8.r),
          child: InkWell(
            onTap: onTap,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Icon(icon, color: ColorsConst.darkGray),
                SizedBox(width: 10.w),
                Text(
                  "$txt",
                  style: MyTextStyleComp.myTextStyle(
                    size: 12,
                    color: ColorsConst.darkGray,
                  ),
                ),
              ],
            ),
          ),
        )
      ],
    );
  }

  play(String url) {
    if (isFirst) {
      Future<void> result = audioPlayer.play(UrlSource(url));
      isFirst = !isFirst;
      if (result == 1) {
        // debugPrint("Music play bo'ldi");
        isPlay = !isPlay;
      } else {
        // debugPrint("Music pouse bo'ldi");
      }
    } else {
      isPlay = !isPlay;
      audioPlayer.resume();
    }
    setState(() {});
  }

  Future pause() async {
    await audioPlayer.pause();
    isPlay = !isPlay;
    setState(() {});
  }

  Future playerDispose() async {
    await audioPlayer.dispose();
  }

  @override
  void dispose() {
    super.dispose();
    playerDispose();
  }
}
