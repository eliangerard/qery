module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    //setupFiles: ['./jest.setup.js']
    moduleNameMapper: {
        '\\.(css)$': 'identity-obj-proxy',
    },
}