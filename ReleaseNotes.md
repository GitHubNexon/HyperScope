Next release instructions:

android/app/build.gradle, inside defaultConfig

defaultConfig {
    applicationId 'com.syntaxsentinel.hyperscope'
    minSdkVersion rootProject.ext.minSdkVersion
    targetSdkVersion rootProject.ext.targetSdkVersion
    versionCode 2          // increment this every release
    versionName "1.0.1"    // update this as well
}


- Update "version" from "1.0.0" to "1.0.1"
- Add "versionCode": 2 inside the "android" section of app.json
- Run `npx expo run:android --variant release `
