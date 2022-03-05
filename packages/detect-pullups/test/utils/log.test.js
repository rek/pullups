import { logWarn, logDebug } from '../../src/utils/log';
describe('log', () => {
    test('logWarn', () => {
        console.warn = jest.fn();
        logWarn('enabled by default');
        expect(console.warn).toBeCalled();
    });
    test('logDebug', () => {
        console.log = jest.fn();
        logDebug('disabled by default');
        expect(console.log).not.toBeCalled();
    });
});
