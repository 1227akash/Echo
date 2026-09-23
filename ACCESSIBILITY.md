# ♿ ECHO Accessibility Statement & Guide

**ECHO** is committed to ensuring a delightful, barrier-free musical experience for everyone, regardless of physical or visual abilities. We strive to adhere to Android Accessibility Guidelines and WCAG 2.1 (Level AA) standards.

---

## 🎯 Accessibility Features & Principles

### 1. Screen Reader & TalkBack Optimization
- **Meaningful Content Descriptions:** Every interactive button, playback control, slider, and icon in ECHO features explicit, contextual descriptions for screen readers (e.g. TalkBack).
- **Live Playback Announcements:** When tracks change, TalkBack users receive unobtrusive accessibility events announcing the track title and artist.
- **Semantic Headings & Lists:** Navigation sections, search results, and playlists are structured using semantic headings (`AccessibilityHeading`) to enable rapid TalkBack swipe navigation.

### 2. Touch Targets & Ergonomics
- **Minimum 48dp Component Targets:** All clickable UI elements (play/pause, shuffle, repeat, queue buttons, menu overflow) comply with the Android 48dp × 48dp minimum interactive component size.
- **Spacing:** Adequate margins between adjacent buttons to eliminate accidental touches.
- **One-Handed Navigation:** Core playback and search controls are positioned within comfortable thumb-reach zones.

### 3. Dynamic Text & Font Scaling
- **Scalable Typography (`sp` Units):** All text elements in ECHO use scalable pixels (`sp`).
- **Support for Large Font Sizes:** Layouts gracefully expand and reflow when users increase their system font scale (up to 200%) in Android Display settings without clipping or truncated text.
- **Bold Text Support:** ECHO honors Android's system-wide "Bold text" accessibility setting.

### 4. Color Contrast & Visual Adaptability
- **High-Contrast Theming:** Dark and Light themes are engineered with minimum 4.5:1 contrast ratios for body text and 3:1 for large display text and key icons.
- **OLED Pure Black Mode:** A dedicated high-contrast AMOLED black theme reduces eye strain in dark environments and maximizes visibility.
- **Dynamic Theming (Material You):** Integrates with Android 12+ wallpaper color extraction to honor user system color preferences.

### 5. Lyrics & Synchronized Text Display
- **Adjustable Lyrics Size:** In the player view, users can pinch or select text size preferences for karaoke lyrics.
- **High-Legibility Fonts:** Clean, sans-serif typography ensures lyrics can be effortlessly read at a glance.
- **Synchronized Visual Highlighting:** The active sung lyric line is distinctly highlighted with increased brightness and scale, providing clear visual tracking for auditory-impaired or cognitive users.

### 6. Haptic Feedback & Audio Cues
- **Tactile Confirmations:** Light haptic pulses confirm playback actions (play, pause, next, seek bar adjustments, favorites).
- **Haptic Controls:** Users who are sensitive to vibration can toggle tactile feedback on or off in **Settings → Appearance & Interface → Haptics**.

### 7. Physical Keyboards, Switches & External Controls
- **Full Keyboard Navigation:** Tab, Shift+Tab, Arrow keys, Spacebar (play/pause), and Enter allow full navigation using external Bluetooth keyboards or hardware switch devices.
- **Headset & Bluetooth Remote Controls:** Standard MediaSessionCompat hardware keys (Play/Pause, Next Track, Previous Track, Fast Forward, Rewind) work natively across all headsets, smartwatches, and car steering wheel controls.

---

## 🛠️ How to Enable Accessibility Features on Android

1. Open your device **Settings**.
2. Scroll to and tap **Accessibility**.
3. Here you can enable:
   - **TalkBack** (Spoken feedback)
   - **Display size and text** (Increase font size or make text bold)
   - **Color and motion** (High contrast text, remove animations)
   - **Vibration & haptic strength**

---

## 📢 Feedback & Reporting Accessibility Barriers

If you encounter any accessibility issues, difficult-to-navigate screens, or have suggestions for improving accessibility in ECHO:
- **GitHub Issues:** [github.com/akashtiwari1227/ECHO/issues](https://github.com/akashtiwari1227/ECHO/issues)
- **Tag:** Label your issue with `accessibility`.

Your feedback helps make ECHO accessible to everyone!
