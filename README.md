# LOF Mobile App

[![circleB]][circleL]
[![prettierB]][prettierL]
[![commitsB]][commitsL]

## About

This mobile app is built with [React Native](https://facebook.github.io/react-native/) and [Redux](https://redux.js.org/). It consumes an API located [here](https://github.com/fnmendez/lof-api). It offers an instant bike booking service using Location and Bluetooth Low Energy interfaces.

## Index

- [Development](#development)
- [Environment variables](#environment-variables)
- [Dependencies](#dependencies)
- [Author](#author)

## Development

Clone the repo and install dependencies

```bash
git clone https://github.com/fnmendez/lof-mobile-app LOFMobileApp
cd LOFMobileApp
yarn
```

Start a development server and you will be able to run the app in your device

```bash
yarn start
```

If you want to use Android and iOS simulators instead, run

```sh
yarn sim
```

## Dependencies

- [Axios](https://github.com/axios/axios): Handle HTTP requests
- [BLE Manager](https://github.com/innoveit/react-native-ble-manager): Offer an interface for Bluetooth Low Energy on Android and iOS.
- [Dotenv](https://github.com/zetachang/react-native-dotenv): Allows to simulate using environment variables in this context.
- [Mapbox GL](https://github.com/mapbox/react-native-mapbox-gl): It offers the map, tracking the user location and some animated actions.
- [React Navigation](https://github.com/react-navigation/react-navigation): Offer a navigation system interface with components, APIs and more.
- [Redux](https://github.com/reduxjs/redux): Handles the app state and its changes.
- [Redux Persist](https://github.com/rt2zz/redux-persist): Restore last Redux state.
- [Redux Promise Middleware](https://github.com/pburtchaell/redux-promise-middleware): Handle async action creators for Redux.
- [Redux Thunk](https://github.com/reduxjs/redux-thunk): Allow returning functions from Redux action creators and passing an extra argument for them.

## Author

- [Franco Méndez Z.](https://github.com/fnmendez) - Only engineer to develop this mobile app and the [API](https://github.com/fnmendez/lof-api)

<!-- Badges -->

[commitsB]:https://img.shields.io/badge/commits-conventional%20-blue.svg
[commitsL]:https://conventionalcommits.org

[prettierB]:https://img.shields.io/badge/code%20style-prettier-orange.svg
[prettierL]:https://github.com/prettier/prettier

[circleB]:https://circleci.com/gh/fnmendez/lof-mobile-app/tree/master.svg?style=svg
[circleL]:https://circleci.com/gh/fnmendez/lof-mobile-app/tree/master
