module.exports = {
  preset: 'jest-expo',
  moduleNameMapper: {
    '\\.(lottie)$': '<rootDir>/__mocks__/lottieMock.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)'
  ],
}; 