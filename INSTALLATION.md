# 📦 ECHO Installation & Deployment Guide

This guide provides detailed, step-by-step instructions for installing, configuring, and building **ECHO** on Android devices.

---

## 📱 Device Requirements

| Specification | Minimum | Recommended |
|:---|:---|:---|
| **Android OS** | Android 7.0 (Nougat, API 24) | Android 12+ (API 31+) |
| **RAM** | 2 GB | 4 GB or higher |
| **Storage** | 100 MB free space | 1 GB+ for cached tracks & offline downloads |
| **Architecture** | ARM64 (`arm64-v8a`), ARMv7 (`armeabi-v7a`), x86_64 | ARM64 (`arm64-v8a`) |
| **Network** | Active internet connection for streaming | Wi-Fi / LTE / 5G |

---

## 🚀 Installation Methods

### Method 1: Sideloading the Pre-built APK (Simplest)

1. **Download the APK:**
   - Go to the **[GitHub Releases](https://github.com/akashtiwari1227/ECHO/releases)** page.
   - Download the latest `ECHO-v4.2.0-release.apk` (or `app-release.apk`).

2. **Enable Unknown Sources / Install Unknown Apps:**
   - When tapping the downloaded APK, Android may notify you: *"For your security, your phone is not allowed to install unknown apps from this source"*.
   - Tap **Settings** on the prompt.
   - Toggle **Allow from this source** to ON for your browser or file manager.

3. **Complete Installation:**
   - Tap **Install** and wait for the package installer to complete.
   - Tap **Open** to launch ECHO!

---

### Method 2: Installing via ADB (Android Debug Bridge)

For developers and power users using a computer:

1. **Enable Developer Options & USB Debugging:**
   - On your phone: Open **Settings → About Phone**.
   - Tap **Build Number** 7 times until you see *"You are now a developer!"*.
   - Return to **Settings → System → Developer Options** and enable **USB Debugging**.

2. **Connect via USB and Verify Connection:**
   ```bash
   adb devices
   ```
   *(Accept the RSA fingerprint prompt on your Android screen)*

3. **Install the APK directly:**
   ```bash
   adb install -r ECHO-v4.2.0-release.apk
   ```

---

### Method 3: Compiling and Installing from Source

If you want to compile ECHO yourself from the open-source code:

#### Prerequisites
- **Git** installed on your machine
- **JDK 17** or **JDK 21** (Temurin or OpenJDK)
- **Android Studio** (Koala Feature Drop 2024.1.2 or newer)
- **Android SDK Platform 35/36** and Build-Tools

#### Build Steps
```bash
# 1. Clone the repository
git clone https://github.com/akashtiwari1227/ECHO.git
cd ECHO

# 2. Configure environment (optional custom keys)
cp .env.example .env

# 3. Compile the debug APK
./gradlew assembleDebug

# 4. Install directly to your connected device
./gradlew installDebug
```

#### Generating a Signed Release APK
To create an optimized, signed APK for distribution:
```bash
# Set your keystore environment variables or configure in gradle
export KEYSTORE_PATH="/path/to/my-release-key.jks"
export STORE_PASSWORD="your_store_password"
export KEY_PASSWORD="your_key_password"
export KEY_ALIAS="your_key_alias"

./gradlew assembleRelease
```
The resulting APK is located at:
`app/build/outputs/apk/release/app-release.apk`

---

## ⚙️ Initial Configuration & Setup

Once installed, follow these quick steps to get the most out of ECHO:

### 1. YouTube Music Client
ECHO connects to the public YouTube Music catalog automatically out-of-the-box. No account sign-in is required to search and stream music.
- *(Optional)* In **Settings → YouTube Music**, you can connect your personal account to synchronize liked playlists and listening history.

### 2. Last.fm Scrobbler Setup
To track all your listening history:
1. Open ECHO and tap the **Settings** gear icon in the top right.
2. Scroll to **Integrations → Last.fm**.
3. Tap **Connect Last.fm**.
4. Log in and authorize ECHO in your browser.
5. Once authorized, return to ECHO. Live scrobbling is now active!

### 3. Bit-Perfect Audio & DAC Output (For Audiophiles)
If you connect an external USB DAC or dongle:
1. Navigate to **Settings → Playback & Audio Engine**.
2. Select **Exclusive USB Audio Driver** to bypass Android's 48kHz audio resampler.
3. Enjoy bit-perfect direct playback up to 24-bit / 192kHz.

---

## ❓ Troubleshooting & FAQs

### Problem: "App not installed" / Package signature conflict
- **Cause:** You may have a previous version installed with a different signing key.
- **Solution:** Uninstall any previous version, then install the new APK.

### Problem: Playback stops when screen turns off
- **Cause:** Android OEM aggressive battery optimization (e.g. Samsung, Xiaomi, Huawei).
- **Solution:** Go to **Settings → Apps → ECHO → Battery** and select **Unrestricted**.

### Problem: Lyrics are not showing
- **Cause:** No LRCLIB match found for non-standard title or offline state.
- **Solution:** Tap the lyrics search button in the player to search alternate titles or fetch manual lyrics.

---

*For further assistance, file an issue at [github.com/akashtiwari1227/ECHO/issues](https://github.com/akashtiwari1227/ECHO/issues).*
