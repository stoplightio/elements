export function getWorkspaceSlug(workspaceUrl: string) {
  const regExp = /^(https?:\/\/)?([^.]+)\./g;
  const match = regExp.exec(workspaceUrl);
  return match?.length === 3 ? match[2] : '';
}
