import { useChosenServerUrl } from '../useChosenServerUrl';

describe('useChosenServerUrl', () => {
  it('given no trailing non-alphanumeric char, should return the leading and mark trailing as null', () => {
    const chosenServerUrl = 'https://todos.stoplight.io/development';
    const { leading, trailing } = useChosenServerUrl(chosenServerUrl);

    expect(leading).toBe('https://todos.stoplight.io/development');
    expect(trailing).toBeNull();
  });

  it('given trailing non-alphanumeric char, should return the leading and trailing parts of the chosen server url', () => {
    expect(useChosenServerUrl('https://todos.stoplight.io/development-')).toStrictEqual({
      leading: 'https://todos.stoplight.io/development',
      trailing: '-',
    });

    expect(useChosenServerUrl('https://todos.stoplight.io/development--')).toStrictEqual({
      leading: 'https://todos.stoplight.io/development',
      trailing: '--',
    });
  });
});
