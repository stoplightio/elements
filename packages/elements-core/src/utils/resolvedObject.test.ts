import { createResolvedObject } from './resolvedObject';

describe('createResolvedObject', () => {
  it('resolves refed property', () => {
    const resolvedObject = createResolvedObject({
      paramaterA: {
        parameterB: {
          $ref: '#/bundled/parameterB',
        },
      },
      bundled: {
        parameterB: 'parameterB value',
      },
    });

    expect((resolvedObject as any).paramaterA.parameterB).toBe('parameterB value');
  });

  it('resolves deeply nested refed property', () => {
    const resolvedObject = createResolvedObject({
      paramaterA: {
        parameterB: {
          $ref: '#/bundled/parameterB',
        },
      },
      bundled: {
        parameterB: {
          parameterC: {
            $ref: '#/bundled/parameterC',
          },
        },
        parameterC: 'parameterC value',
      },
    });

    expect((resolvedObject as any).paramaterA.parameterB.parameterC).toBe('parameterC value');
  });

  it('resolves refs in arrays', () => {
    const resolvedObject = createResolvedObject({
      list: [
        {
          parameterB: {
            $ref: '#/bundled/parameterB',
          },
        },
      ],
      bundled: {
        parameterB: {
          parameterC: {
            $ref: '#/bundled/parameterC',
          },
        },
        parameterC: 'parameterC value',
      },
    });

    expect((resolvedObject as any).list[0].parameterB.parameterC).toBe('parameterC value');
  });
});
