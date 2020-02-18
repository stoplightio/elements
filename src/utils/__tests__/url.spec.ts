import { PathParam } from '../../types';
import { replaceParamsInPath } from '../url';

describe('url', () => {
  describe('replace path params', () => {
    test('should replace path params correctly', () => {
      const params: PathParam[] = [
        {
          name: 'pathName',
          value: 'paramValue',
          isEnabled: true,
        },
        {
          name: 'path space',
          value: 'spaceValue',
          isEnabled: true,
        },
        {
          name: 'special$@^(<|',
          value: 'specialValue',
          isEnabled: true,
        },
      ];

      expect(replaceParamsInPath('/{pathName}/{path space}/{special$@^(<|}', params)).toEqual(
        '/paramValue/spaceValue/specialValue',
      );
    });
  });
});
