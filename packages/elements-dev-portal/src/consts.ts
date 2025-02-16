const ROOT_CACHE_KEY = '@stoplight/elements-dev-portal/client-query';

export const devPortalCacheKeys = {
  all: [ROOT_CACHE_KEY] as const,

  projects: () => [ROOT_CACHE_KEY, 'projects'] as const,
  project: (projectId: string) => [...devPortalCacheKeys.projects(), projectId] as const,
  projectsList: () => [...devPortalCacheKeys.projects(), 'list'] as const,
  projectDetails: (projectId: string) => [...devPortalCacheKeys.project(projectId), 'details'] as const,

  branches: (projectId: string) => [...devPortalCacheKeys.project(projectId), 'branches'] as const,
  branch: (projectId: string, branch: string) => [...devPortalCacheKeys.branches(projectId), branch] as const,
  branchesList: (projectId: string) => [...devPortalCacheKeys.branches(projectId), 'list'] as const,
  branchDetails: (projectId: string, branch: string) =>
    [...devPortalCacheKeys.branch(projectId, branch), 'details'] as const,
  branchTOC: (projectId: string, branch: string) => [...devPortalCacheKeys.branch(projectId, branch), 'toc'] as const,

  branchNodes: (projectId: string, branch: string) =>
    [...devPortalCacheKeys.branch(projectId, branch), 'nodes'] as const,
  branchNode: (projectId: string, branch: string, node: string) =>
    [...devPortalCacheKeys.branchNodes(projectId, branch), node] as const,
  branchNodesList: (projectId: string, branch: string) =>
    [...devPortalCacheKeys.branchNodes(projectId, branch), 'list'] as const,
  branchNodeDetails: (projectId: string, branch: string, node: string) =>
    [...devPortalCacheKeys.branchNode(projectId, branch, node), 'details'] as const,

  search: () => [...devPortalCacheKeys.all, 'search'],
  searchNodes: (filters: { projectIds?: string[]; branchSlug?: string; workspaceId?: string; search?: string }) => [
    ...devPortalCacheKeys.search(),
    filters,
  ],
};
