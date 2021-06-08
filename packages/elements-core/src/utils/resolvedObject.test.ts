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

  it('returns the same object when accessing the parameter multiple times', () => {
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

    expect((resolvedObject as any).paramaterA).toBe((resolvedObject as any).paramaterA);
  });

  it('returns the same object when called twice', () => {
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

    expect(createResolvedObject(resolvedObject)).toBe(resolvedObject);
  });
});
