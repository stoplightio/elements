import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { isNonEmpty } from 'fp-ts/lib/Array';
import * as React from 'react';
import { ViolationsDisplay } from '../../../../components/RequestMaker/Response/ViolationsDisplay';
import { RequestMakerStore } from '../../../../stores/request-maker';

storiesOf('components/RequestMaker/Response/ViolationsDisplay', module)
  .addDecorator(withKnobs)
  .add('Violations', () => {
    const violations = [
      { path: ['body'], code: 'required', message: "should have required property 'user'", severity: 0 },
      { path: ['body'], code: 'required', message: "should have required property 'test1'", severity: 0 },
      {
        path: ['body', 'some-property'],
        code: 'required',
        message: "should have required property 'subproperty'",
        severity: 0,
      },
      {
        path: ['body', 'some-other-property'],
        code: 'required',
        message: "should have required property 'subproperty'",
        severity: 0,
      },
      {
        path: ['body', 'some-other-property', 'subproperty2'],
        code: 'required',
        message: "should have required property 'subproperty'",
        severity: 0,
      },
      { path: ['body'], code: 'some-warning', message: 'some warning', severity: 1 },
    ];

    return (isNonEmpty(violations) && <ViolationsDisplay violations={violations} defaultOpen={false} />) || <></>;
  });
