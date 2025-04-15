import 'package:flutter/material.dart';
import 'package:liber/views/auth/forgot_password/page/forgot_password_page.dart';
import 'package:liber/views/auth/forgot_password/password_check/password_check_page.dart';
import 'package:liber/views/auth/forgot_password/password_confirm/password_confirm_page.dart';
import 'package:liber/views/auth/verify/verify_page.dart';
import 'package:liber/views/auth/view/auth_view.dart';
import 'package:liber/views/loading_view.dart';
import 'package:liber/views/screens/book/pages/favorites/book_favorites_page.dart';
import 'package:liber/views/screens/book/pages/news_book_page.dart';
import 'package:liber/views/screens/profile/lang_page.dart';
import 'package:liber/views/screens/view/screens_view.dart';
import 'package:liber/views/screens/book/pages/book_online_reading.dart';
import 'package:liber/views/screens/book/view/book_view.dart';
import 'package:liber/views/screens/book/pages/book_buy.dart';
import 'package:liber/views/screens/book/pages/book_comments.dart';
import 'package:liber/views/screens/book/pages/book_online_listening.dart';
import 'package:liber/views/screens/book/pages/book_online_listening_list.dart';
import 'package:liber/views/screens/pages/categories/categories_search.dart';
import 'package:liber/views/screens/pages/categories/single_category_page.dart';
import 'package:liber/views/screens/pages/onboarding/onboarding_view.dart';
import 'package:liber/views/screens/profile/profile_view.dart';
import 'package:liber/views/screens/profile/profile_favorites.dart';
import 'package:liber/views/screens/profile/profile_fill_balance.dart';
import 'package:liber/views/screens/profile/profile_subscription.dart';
import 'package:liber/views/screens/profile/profile_settings.dart';
import 'package:liber/views/screens/profile/profile_wallet.dart';

class MyRoutes {
  static final MyRoutes _instance = MyRoutes.init();
  static MyRoutes get instance => MyRoutes._instance;
  MyRoutes.init();
  Route? onGenerate(RouteSettings s) {
    var args = s.arguments;
    switch (s.name) {
      case '/loading':
        return MaterialPageRoute(builder: (_) => const LoadingView());
//?------------------------------OnBoarding-------------------------------------
      case '/onboarding':
        return MaterialPageRoute(builder: (_) => const Onboarding());

//?---------------------------------Auth----------------------------------------
      case '/auth':
        return MaterialPageRoute(builder: (_) => const AuthView());
      case '/verify':
        return MaterialPageRoute(builder: (_) => const VerifyPage());
      //*--- Forgot Password ---
      case '/forgot_password':
        return MaterialPageRoute(builder: (_) => ForgotPasswordPage());
      case '/password_check':
        return MaterialPageRoute(
          builder: (_) =>
              PasswordCheckPage(firstName: "", userName: "$args", password: ""),
        );
      case '/password_confirm':
        return MaterialPageRoute(builder: (_) => PasswordConfirmPage());
//?--------------------------------Screens--------------------------------------
      //*-------- Main ---------
      case '/screens':
        return MaterialPageRoute(builder: (_) => const ScreensView());
      case '/single_category':
        return MaterialPageRoute(
            builder: (_) => SingleCategoryPage(bookInfo: (args as List)));
      //*------ Categories -----
      case '/categories_search':
        return MaterialPageRoute(builder: (_) => CategoriesSearch());
      //*--------- Book --------
      case '/book':
        return MaterialPageRoute(builder: (_) => BookView(dataGuid: "$args"));
      case '/book_buy':
        return MaterialPageRoute(
          builder: (_) => BookBuy(
            bookGuid: "$args",
            bookTypeGuid: "$args",
            price: "$args",
            index: int.parse("$args"),
          ),
        );
      case '/book_online_listening_list':
        return MaterialPageRoute(
            builder: (_) => const BookOnlineListeningList());
      case '/book_online_list':
        return MaterialPageRoute(
          builder: (_) => BookOnlineListening(bookInfo: (args as List)),
        );
      case '/book_comments':
        return MaterialPageRoute(
            builder: (_) => BookComments(bookGuid: "$args"));
      case '/book_online_reading':
        return MaterialPageRoute(
            builder: (_) => BookOnlineReading(guid: "$args"));
      case '/new_books':
        return MaterialPageRoute(
          builder: (_) => NewBooksPage(titleName: "$args"),
        );
      case '/book_favorites':
        return MaterialPageRoute(builder: (_) => const BookFavorites());

      //*------ Profile --------
      case '/profile_view':
        return MaterialPageRoute(builder: (_) => const ProfileView());
      case '/profile_wallet':
        return MaterialPageRoute(builder: (_) => const ProfileWallet());
      case '/profile_settings':
        return MaterialPageRoute(builder: (_) => const ProfileSettings());
      case '/profile_follow':
        return MaterialPageRoute(builder: (_) => const ProfileFollow());
      case '/profile_favorites':
        return MaterialPageRoute(builder: (_) => const ProfileFavorites());
      case '/profile_fill_balance':
        return MaterialPageRoute(
          builder: (_) => ProfileFillBalance(transactionType: "$args"),
        );
      case '/lang':
        return MaterialPageRoute(builder: (_) => const LangPage());
    }
  }
}
