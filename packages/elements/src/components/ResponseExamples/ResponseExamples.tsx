import { Panel, Select } from '@stoplight/mosaic';
import { CodeViewer } from '@stoplight/mosaic-code-viewer';
import { IHttpOperation } from '@stoplight/types';
import { useDocument } from '../../context/InlineRefResolver';
import { generateExampleFromMediaTypeContent } from '../../utils/exampleGeneration';
import React from 'react';

export interface ResponseExamplesProps {
    httpOperation: IHttpOperation
    chosenStatusCode?: string;
    chosenMediaType?: string;
}

export const ResponseExamples = ({ httpOperation, chosenMediaType = 'application/json', chosenStatusCode = '200' }: ResponseExamplesProps) => {
    const responses = httpOperation.responses || [];
    const response = responses.find(response => response.code === chosenStatusCode);
    const responseContents = response?.contents?.find(content => content.mediaType === chosenMediaType);

    const [chosenExampleIndex, setChosenExampleIndex] = React.useState(0);
    const document = useDocument();
    const responseExample = generateExampleFromMediaTypeContent(
        responseContents, 
        document,
        chosenExampleIndex
    );

    if (!responseContents || !responseExample) return null;

    const examplesSelect = responseContents.examples && responseContents.examples.length > 1 && (
        <Select options={
            responseContents.examples
                .map((example, index) => ({ value: index, label: example.key }))
            }
            onChange={e => setChosenExampleIndex(parseInt(e.currentTarget.value, 10))}
        />
    );

    return (
        <Panel rounded isCollapsible={false}>
            <Panel.Titlebar rightComponent={examplesSelect}>Response Example</Panel.Titlebar>
            <Panel.Content p={0}>
                <CodeViewer
                aria-label={responseExample}
                noCopyButton
                maxHeight="510"
                language="json"
                value={responseExample}
                showLineNumbers
                />
            </Panel.Content>
        </Panel>
    );
}
