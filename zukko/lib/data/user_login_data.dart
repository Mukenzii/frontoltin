import 'package:shared_preferences/shared_preferences.dart';

class UserLoginData {
  static SharedPreferences? _preferences;
  static Future<UserLoginData> instance() async {
    if (_preferences == null) {
      _preferences = await SharedPreferences.getInstance();
    }
    return UserLoginData();
  }

  String? get getToken => _preferences?.getString("token") ?? "null";
  set setToken(String? token) => _preferences?.setString("token", token ?? "null");

  String? get getGuid => _preferences?.getString("guid") ?? "null";
  set setGuid(String? guid) => _preferences?.setString("guid", guid ?? "null");
}
