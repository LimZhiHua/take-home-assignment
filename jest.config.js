module.exports = {
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest', // Transform TypeScript, JSX, and JS
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/fileTransformer.js', // So jest can handle other files (like SVGs)
  },
  testEnvironment: 'jsdom', // React requires a browser-like environment
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transformIgnorePatterns: [
    '/node_modules/(?!(axios)/)', // Allow specific ESM modules to be transformed
  ],
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy', // Mock CSS as an empty object or return actual class names for testing
  },
};
