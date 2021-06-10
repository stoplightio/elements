import { createResolvedObject, getOriginalObject } from './resolvedObject';

describe('createResolvedObject', () => {
  it('resolves a reference', () => {
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

  it('resolves a reference to an object', () => {
    const resolvedObject = createResolvedObject({
      paramaterA: {
        parameterB: {
          $ref: '#/bundled/parameterB',
        },
      },
      bundled: {
        parameterB: {
          something: 'something else',
        },
      },
    });

    expect((resolvedObject as any).paramaterA.parameterB).toEqual({
      something: 'something else',
    });
  });

  it('resolves a circular reference', () => {
    const resolvedObject = createResolvedObject({
      paramaterA: {
        $ref: '#/bundled/paramaterA',
      },
      bundled: {
        paramaterA: {
          parameterB: {
            $ref: '#/bundled/parameterB',
          },
          parameterC: 'parameterC value',
        },
        parameterB: {
          paramaterA: {
            $ref: '#/bundled/paramaterA',
          },
        },
      },
    });

    expect((resolvedObject as any).paramaterA.parameterB.paramaterA.parameterB.paramaterA.parameterC).toBe(
      'parameterC value',
    );
  });

  it('resolves circular reference to the same value', () => {
    const resolvedObject = createResolvedObject({
      paramaterA: {
        $ref: '#/bundled/paramaterA',
      },
      bundled: {
        paramaterA: {
          parameterB: {
            $ref: '#/bundled/parameterB',
          },
          parameterC: 'parameterC value',
        },
        parameterB: {
          paramaterA: {
            $ref: '#/bundled/paramaterA',
          },
        },
      },
    });

    expect((resolvedObject as any).paramaterA.parameterB.paramaterA.parameterB.paramaterA).toBe(
      (resolvedObject as any).paramaterA,
    );
  });

  it('resolves deeply nested reference', () => {
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

  it('resolves references nested in arrays', () => {
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

  it('allows to retrieve the original object', () => {
    const originalObject = {
      paramaterA: {
        parameterB: {
          $ref: '#/bundled/parameterB',
        },
      },
      bundled: {
        parameterB: 'parameterB value',
      },
    };
    const resolvedObject = createResolvedObject(originalObject);

    expect(getOriginalObject((resolvedObject as any).paramaterA)).toBe(originalObject.paramaterA);
  });

  it('allows to customize resolution process', () => {
    const originalObject = {
      paramaterA: {
        parameterB: {
          $ref: '#/bundled/parameterB',
        },
      },
      bundled: {
        parameterB: 'parameterB value',
      },
    };

    const resolvedObject = createResolvedObject(originalObject, {
      resolver: ({ pointer }, propertyPath, originalObject) => ({
        pointer,
        propertyPath,
        originalObjectProperties: Object.keys(originalObject),
      }),
    });

    expect((resolvedObject as any).paramaterA.parameterB).toEqual({
      pointer: '#/bundled/parameterB',
      propertyPath: ['paramaterA', 'parameterB'],
      originalObjectProperties: ['paramaterA', 'bundled'],
    });
  });

  it('provides error message when resolving fails', () => {
    const resolvedObject = createResolvedObject({
      paramaterA: {
        parameterB: {
          $ref: '#/bundled/parameterB',
        },
      },
    });

    expect((resolvedObject as any).paramaterA.parameterB).toEqual({
      $ref: '#/bundled/parameterB',
      $error: "Could not resolve '#/bundled/parameterB'",
    });
  });

  it('does not pass non-string references to resolver and ignores them', () => {
    const originalObject = {
      paramaterA: {
        parameterB: {
          $ref: {
            not: 'a reference string',
          },
        },
      },
    };

    const resolvedObject = createResolvedObject(originalObject, {
      resolver: ({ pointer }) => {
        if (typeof pointer !== 'string') {
          throw new Error('Pointer should be a string!!!');
        }
      },
    });

    expect(resolvedObject).toEqual(originalObject);
  });
});
