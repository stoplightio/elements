const ALPHANUMERIC = /[^A-Za-z0-9]+$/;

type ChosenServerUrl = {
  leading: string;
  trailing: string | null;
};

export function useChosenServerUrl(chosenServerUrl: string): ChosenServerUrl {
  const match = ALPHANUMERIC.exec(chosenServerUrl);

  if (match === null) {
    return {
      leading: chosenServerUrl,
      trailing: null,
    };
  }

  return {
    leading: chosenServerUrl.substring(0, match.index),
    trailing: chosenServerUrl.substring(match.index),
  };
}
