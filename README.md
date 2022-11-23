# React Native New Arch Performance Tests

## How to run
### Old Arch

#### iOS
- `cd ios && PRODUCTION=1 pod install && cd -`
- `yarn ios --configuration Release --device`

#### Android
- `yarn android --variant=release`

### New Arch

#### iOS
- `cd ios && RCT_NEW_ARCH_ENABLED=1 PRODUCTION=1 pod install && cd -`
- `yarn ios --configuration Release --device`

#### Android
- Open `android/gradle.properties` and change `newArchEnabled=true`.
- `yarn android --variant=release`

## Results
You can find the results in the `perf-tests` directory. [Results spreadsheet](https://docs.google.com/spreadsheets/d/1J79qVMst6aXOoMXvSJPOEyGOdjB5AKyAxybkSP7-mw0/edit#gid=0).

To get new results:
- Navigate to one of the test screens
- In the logs, find entries that contain `marker: `. Copy those into a txt file.
- Run `yarn parse <file.txt> --header --sort -o result.csv` to generate a csv from the logs found in the txt file.
