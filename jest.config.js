module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ['text', 'text-summary', 'html-spa'],
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/$1',
  },
};
