import { IHttpOperation } from '@stoplight/types';
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';
import { ResponseExamples } from './ResponseExamples';

const httpOperation: IHttpOperation = {
    method: 'GET',
    path: 'some/path',
    id: 'some-id',
    responses: [
        {
            code: '200',
            contents: [
                {
                    mediaType: 'application/json',
                    examples: [
                        {
                            key: 'First Example',
                            value: { some: 'example' }
                        },
                        {
                            key: 'Second Example',
                            value: '{ "another": "example" }'
                        }
                    ]
                }
            ]
        }
    ]
}

describe('Response Examples', () => {
    it('displays first provided example by default', () => {
        render(<ResponseExamples 
            httpOperation={httpOperation} 
            chosenMediaType="application/json" 
            chosenStatusCode="200" />
        );

        expect(JSON.parse(screen.getByRole('textbox').textContent || '')).toEqual({
            some: 'example'
        });
    })
});