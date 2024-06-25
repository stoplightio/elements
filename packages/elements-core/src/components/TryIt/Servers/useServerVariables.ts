import { atom, useAtom } from 'jotai';

const persistedServerVariableValuesAtom = atom({});
export const useServerVariables = () => {
  const [serverVariables, setPersistedServerVariableValues] = useAtom(persistedServerVariableValuesAtom);

  const updateServerVariableValue = (op: 'set' | 'unset', name: string, value: string) => {
    const newServerVariables: { [key: string]: string } = { ...serverVariables };
    if (op === 'unset' && name in newServerVariables) {
      delete newServerVariables[name as keyof typeof newServerVariables];
    } else {
      newServerVariables[name] = value;
    }

    setPersistedServerVariableValues(newServerVariables);
  };

  return { serverVariables, updateServerVariableValue };
};
