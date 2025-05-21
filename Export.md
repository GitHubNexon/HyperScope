Here's the list with the additional points:

1. Ensure that you have OpenJDK 17, Android Studio, and its associated tools and NDK (Native Development Kit) installed on your system.

2. Initialize a new Expo project by executing the following command in your terminal: `pnpm create expo-app@latest`. This command will prompt you to provide some details about your project, such as the project name and configuration options.

3. Before building the Android app, you need to prebuild the `android` directory. Run the command `pnpm expo prebuild` to generate the necessary files. Additionally, you should provide your app's package name during this step. For example, if your app's package name is `com.example.app`.

4. Generate a keystore file. Use an administrator shell to create the keystore. Run the following command: `keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000` and enter your password (store it safely somewhere) and details.

5. Add this keystore file in your `android/app` folder.

6. Add the following details in your `android/gradle.properties` file:
```
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```

7. Now, go to the `android/app/build.gradle` file and make the changes for the release:
```
signingConfigs {
    release {
        if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
            storeFile file(MYAPP_UPLOAD_STORE_FILE)
            storePassword MYAPP_UPLOAD_STORE_PASSWORD
            keyAlias MYAPP_UPLOAD_KEY_ALIAS
            keyPassword MYAPP_UPLOAD_KEY_PASSWORD
        }
    }
}
buildTypes {
    release {
        ...
        signingConfig signingConfigs.release
    }
}
```

8. Open the terminal in the root of the app and run `pnpm react-native build-android --mode=release` to make the `.aab` file of your app. You can find your `.aab` file in the `android/app/build/outputs/build/release` folder.

9. To make an `.apk` file, connect your Android phone with USB to your PC with USB debugging enabled. Run the command `pnpm expo run:android --variant release`. You can find your `.apk` file in the `android\app\build\outputs\apk\release\` folder, and it will also be installed on the connected device.