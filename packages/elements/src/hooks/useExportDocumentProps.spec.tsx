import '@testing-library/jest-dom';

import { safeStringify } from '@stoplight/yaml';
import { act, renderHook } from '@testing-library/react-hooks';
import { saveAs } from 'file-saver';

import { InstagramAPI as bundledJson } from '../__fixtures__/api-descriptions/Instagram';
import { simpleApiWithoutDescription as json } from '../__fixtures__/api-descriptions/simpleApiWithoutDescription';
import { todosApiBundled as bundledYaml } from '../__fixtures__/api-descriptions/todosApiBundled';
import { zoomApiYaml as yaml } from '../__fixtures__/api-descriptions/zoomApiYaml';
import { useExportDocumentProps } from './useExportDocumentProps';

jest.mock('file-saver');

describe('useExportDocumentProps', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('exports json document', () => {
    const data = renderHook(() =>
      useExportDocumentProps({
        originalDocument: json,
        bundledDocument: bundledJson,
      }),
    );

    act(() => {
      data.result.current.original.onPress();
      data.result.current.bundled.onPress();
    });

    const expectedOriginalDocument = new Blob([JSON.stringify(json, null, 2)], {
      type: 'application/json',
    });

    const expectedBundledDocument = new Blob([JSON.stringify(bundledJson, null, 2)], {
      type: 'application/json',
    });
    expect(saveAs).toBeCalledTimes(2);
    expect(saveAs).toHaveBeenCalledWith(expectedOriginalDocument, 'document.json');
    expect(saveAs).toHaveBeenCalledWith(expectedBundledDocument, 'document.json');
  });

  it('exports yaml document', () => {
    const data = renderHook(() =>
      useExportDocumentProps({
        originalDocument: safeStringify(yaml),
        bundledDocument: bundledYaml,
      }),
    );

    act(() => {
      data.result.current.original.onPress();
      data.result.current.bundled.onPress();
    });

    const expectedOriginalDocument = new Blob([safeStringify(yaml)], {
      type: 'application/yaml',
    });

    const expectedBundledDocument = new Blob([safeStringify(bundledYaml)], {
      type: 'application/yaml',
    });
    expect(saveAs).toBeCalledTimes(2);
    expect(saveAs).toHaveBeenCalledWith(expectedOriginalDocument, 'document.yaml');
    expect(saveAs).toHaveBeenCalledWith(expectedBundledDocument, 'document.yaml');
  });
});
