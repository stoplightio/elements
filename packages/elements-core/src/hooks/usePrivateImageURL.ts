export const usePrivateImageURL = (url: string) => {
  const { state } = useOvermind();
  const [src, setSrc] = React.useState<string>();
  const [checked, setChecked] = React.useState(false);
  const [isPrivate, setIsPrivate] = React.useState(false);

  if (!checked) {
    if (state.auth.isLoggedIn && url && url.startsWith(state.api.httpHost + '/api')) {
      setIsPrivate(true);

      fetch(url, { headers: { authorization: `Bearer ${state.auth.jwt}` } })
        .then(res => res.blob())
        .then(blob => URL.createObjectURL(blob))
        .then(setSrc);
    }
    setChecked(true);
    return;
  }

  return isPrivate ? src : url;
};
