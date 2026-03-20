# Testing the Expo React Native App

## Overview
This is an Expo-based React Native app (not React Native CLI). It uses expo-router for file-based routing.

## Starting the Dev Server
```bash
npx expo start --web --clear
```
- The `--clear` flag clears Metro cache, which is important after fixing syntax errors
- Web version serves at `http://localhost:8081`
- Metro bundles ~1385 modules; expect ~35s for initial bundle

## Key Routes to Test
- `/` - Home screen with navigation tabs (Home, Doctors, Pharmacy, Lab Tests, Insurance, My Health)
- `/doctors/online` - Online Consult screen
- `/doctors/surgery` - Surgery screen
- `/doctors/specialty/orthopaedics` - Orthopaedics specialty
- `/doctors/specialty/psychiatry` - Psychiatry specialty
- `/doctors/specialty/womenshealth` - Women's Health specialty
- `/doctors/specialty/cardiology` - Cardiology specialty
- `/doctors/specialty/dermatology` - Dermatology specialty
- `/doctors/specialty/generalpractitioner` - General Practitioner specialty

## Common Issues

### Stray Quotes in StyleSheet Objects
Some specialty doctor files may have stray single quotes after `DoctorsTheme.colors.*` references (e.g. `DoctorsTheme.colors.white'` instead of `DoctorsTheme.colors.white`). These cause "Unterminated string constant" syntax errors in Metro.

To check: `grep -r "DoctorsTheme\.colors\.\w\+'" app/`

### Missing Imports
Some files may use `DoctorsTheme` without importing it. Since expo-router eagerly loads all route modules, a missing import in ANY route file will crash the entire app with `ReferenceError: DoctorsTheme is not defined`.

To check: Look for files that reference `DoctorsTheme` but don't import it.

### Unescaped Apostrophes in Strings
Strings containing apostrophes inside single-quoted strings (e.g. `'Women's Wellness Package'`) cause syntax errors. Fix by using double quotes.

## Project Structure
- `app/` - Main app code (expo-router routes)
- `app-code/` - Duplicate copy of app code (changes should be applied to both)
- `app/components/doctors/DoctorsTheme.js` - Shared theme constants and data arrays
- `app/_layout.js` - Root layout with all registered routes

## Important Notes
- No CI/CD configured on this repo
- No linter, type checker, or test suite - manual verification only
- Changes in `app/` should also be mirrored in `app-code/` directory
- The app has no authentication or credentials needed for testing

## Devin Secrets Needed
None - this app requires no authentication or API keys for local testing.
