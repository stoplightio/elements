export type Branch = {
  id: number;
  slug: string;
  is_default: boolean;
  is_published: boolean;
  projectId: number;
  name?: string;
};
