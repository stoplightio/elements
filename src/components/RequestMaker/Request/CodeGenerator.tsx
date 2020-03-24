import { Button, CodeViewer, Menu, MenuItem, Popover, Position } from '@stoplight/ui-kit';
import cn from 'classnames';
import copy from 'copy-to-clipboard';
import { autorun } from 'mobx';
import * as React from 'react';

import { useRequestMakerStore } from '../../../hooks/useRequestMaker';
import { languages } from './httpSnippetLanguages';

export interface ICodeGeneratorProps {
  className?: string;
}

const defaultLibrary = languages[0].libraries ? languages[0].libraries[0] : undefined;
const defaultLanguage = {
  codechoice: languages[0].codechoice,
  librarychoice: defaultLibrary ? defaultLibrary.librarychoice : undefined,
  mode: languages[0].mode,
  text: defaultLibrary ? `${languages[0].name} / ${defaultLibrary.name}` : languages[0].name,
};

export const CodeGenerator: React.FunctionComponent<ICodeGeneratorProps> = ({ className }) => {
  const requestStore = useRequestMakerStore('request');

  const [currentLanguage, setCurrentLanguage] = React.useState(defaultLanguage);
  const [generatedCode, setGeneratedCode] = React.useState<string | null>('');

  React.useEffect(() => {
    return autorun(() => {
      setGeneratedCode(requestStore.generateCode(currentLanguage.codechoice, currentLanguage.librarychoice));
    });
  }, [currentLanguage.codechoice, currentLanguage.librarychoice, requestStore]);

  const hasError = generatedCode === null;

  return (
    <div className={cn(className, 'flex flex-col')}>
      <div className="flex items-center mx-5 mt-5">
        <Popover
          autoFocus={false}
          content={
            <Menu>
              {languages.map((item) => (
                <MenuItem
                  active={item.codechoice === currentLanguage.codechoice}
                  text={item.name}
                  key={item.name}
                  onClick={() => {
                    if (!item.libraries) {
                      setCurrentLanguage({
                        codechoice: item.codechoice,
                        librarychoice: '',
                        mode: item.mode,
                        text: item.name,
                      });
                      setGeneratedCode(requestStore.generateCode(item.codechoice));
                    }
                  }}
                >
                  {item.libraries?.map((library) => (
                    <MenuItem
                      active={library.librarychoice === currentLanguage.librarychoice}
                      text={library.name}
                      key={library.name}
                      onClick={() => {
                        setCurrentLanguage({
                          codechoice: item.codechoice,
                          librarychoice: library.librarychoice,
                          mode: item.mode,
                          text: `${item.name} / ${library.name}`,
                        });
                        setGeneratedCode(requestStore.generateCode(item.codechoice, library.librarychoice));
                      }}
                    />
                  ))}
                </MenuItem>
              ))}
            </Menu>
          }
          position={Position.BOTTOM}
          minimal
          boundary={'window'}
        >
          <Button rightIcon="caret-down" text={currentLanguage.text} />
        </Popover>

        {!hasError && (
          <Button
            className="ml-3"
            icon="duplicate"
            text="Copy to Clipboard"
            onClick={() => {
              copy(generatedCode || '');

              if (typeof window !== 'undefined') {
                try {
                  const elem = window.document.getElementById('request-generated-code');
                  if (elem) {
                    window.getSelection()?.selectAllChildren(elem);
                  }
                } catch (error) {
                  console.error(error);
                }
              }
            }}
          />
        )}
      </div>

      {hasError ? (
        <div className="p-10 text-center text-gray-6">
          There was an error generating the code for {currentLanguage.text}. Try editing your request or picking a
          different language.
        </div>
      ) : (
        <CodeViewer
          id="request-generated-code"
          className="m-5"
          language={currentLanguage.mode}
          value={generatedCode || ''}
          showLineNumbers={true}
        />
      )}
    </div>
  );
};
