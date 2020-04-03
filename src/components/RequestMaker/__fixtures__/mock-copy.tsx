export const mockCopy = jest.fn();
jest.mock('copy-to-clipboard', () => mockCopy);
