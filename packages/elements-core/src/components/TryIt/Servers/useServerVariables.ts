import { atom, useAtom } from 'jotai';

const persistedServerVariableValuesAtom = atom({});
export const useServerVariables = () => {
  const [serverVariables, setPersistedServerVariableValues] = useAtom(persistedServerVariableValuesAtom);

  const updateServerVariableValue = (name: string, value: string) => {
    setPersistedServerVariableValues(Object.assign({}, serverVariables, { [name]: value }));
  };

  return { serverVariables, updateServerVariableValue };
};
