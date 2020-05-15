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
  const [generatedCode, setGeneratedCode] = React.useState();

  React.useEffect(() => {
    return autorun(() => {
      setGeneratedCode(requestStore.generateCode(currentLanguage.codechoice, currentLanguage.librarychoice));
    });
  }, [currentLanguage.codechoice, currentLanguage.librarychoice, requestStore]);

  const hasError = typeof generatedCode === 'object' && generatedCode.error;

  return (
    <div className={cn(className, 'flex flex-col')}>
      <div className="flex items-center mx-5 mt-5">
        <Popover
          autoFocus={false}
          content={
            <Menu>
              {languages.map(item => (
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
                  {item.libraries
                    ? item.libraries.map(library => (
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
                      ))
                    : null}
                </MenuItem>
              ))}
            </Menu>
          }
          position={Position.BOTTOM}
          minimal={true}
          usePortal={false}
        >
          <Button rightIcon="caret-down" text={currentLanguage.text} />
        </Popover>

        {!hasError && (
          <Button
            className="ml-3"
            icon="duplicate"
            text="Copy to Clipboard"
            onClick={() => {
              copy(generatedCode);

              try {
                // @ts-ignore
                window.getSelection().selectAllChildren(document.getElementById('request-generated-code'));
              } catch (error) {
                console.error(error);
              }
            }}
          />
        )}
      </div>

      {hasError ? (
        <div className="text-center p-10 text-gray-6">
          There was an error generating the code for {currentLanguage.text}. Try editing your request or picking a
          different language.
        </div>
      ) : (
        <CodeViewer
          id="request-generated-code"
          className="m-5"
          language={currentLanguage.mode}
          value={generatedCode}
          showLineNumbers={true}
        />
      )}
    </div>
  );
};
