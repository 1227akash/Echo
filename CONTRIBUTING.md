# Contributing to ECHO

Thank you for your interest in contributing to **ECHO**! This document outlines the development workflow, code standards, and submission guidelines.

---

## Code of Conduct

All contributors are expected to adhere to our [Code of Conduct](CODE_OF_CONDUCT.md). Please report unacceptable behavior to maintainers.

---

## Getting Started

### Prerequisites
* Android Studio (Koala Feature Drop 2024.1.2 or newer)
* JDK 17 or JDK 21 (Temurin / OpenJDK)
* Android SDK (API 35/36) & NDK 26+
* Git

### Cloning the Repository
```bash
git clone https://github.com/akashtiwari1227/ECHO.git
cd ECHO
```

### Local Configuration
Copy `.env.example` to `.env` to supply build-time environment properties:
```bash
cp .env.example .env
```

---

## Architecture Overview

**ECHO** is built using modern Android architecture patterns:
* **UI Layer:** Jetpack Compose, Material 3 Expressive, Navigation Compose.
* **Audio Engine:** ExoPlayer / Media3 with Jellyfin FFmpeg software decoders and custom C++ DSP processing (`AudioEngine.cpp`).
* **Streaming Client:** YouTube Music API client.
* **Scrobbling:** Last.fm REST API with MediaSessionCompat monitoring.
* **Dependency Injection:** Dagger Hilt.
* **Storage & Caching:** Room Database, DataStore Preferences.
* **Networking:** Retrofit, OkHttp 4, Kotlinx Serialization.

---

## Development Guidelines

### Branching Strategy
* `main` contains the latest stable development code.
* Create feature or bugfix branches from `main` using descriptive names:
  * `feat/your-feature-name`
  * `fix/issue-description`

### Code Style & Quality
* Follow official Kotlin coding conventions and Android Architecture recommendations.
* Keep composables focused, stateless where possible, and extract complex state into ViewModels.
* Ensure all native C++ code respects 16KB memory page alignment constraints for Android 15+.
* Avoid embedding hardcoded API secrets or URLs directly in source files.

### Testing
Run local unit tests before opening a pull request:
```bash
./gradlew testDebugUnitTest
```

---

## Submitting a Pull Request

1. Fork the repository and create your branch from `main`.
2. Ensure the code compiles cleanly: `./gradlew assembleDebug`.
3. Open a Pull Request against `main`.
4. Provide a clear explanation of your changes and any testing performed.
5. Maintainers will review and merge your contribution!
