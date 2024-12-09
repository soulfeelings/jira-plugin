export interface IOption {
  value: string;
  label: string;
  type?: string;
}

interface IBoard {
  id: number;
  name: string;
  self: string;
  type: "scrum" | "kanban"; // Restrict to known types
}

export interface IBoardResponse {
  isLast: boolean;
  maxResults: number;
  startAt: number;
  total: number;
  values: IBoard[]; // Array of `IBoard` objects
}

interface ISprint {
  id: number;
  self: string;
  state: "closed" | "active" | "future"; // Known states
  name: string;
  startDate?: string; // Optional because not all sprints have it
  endDate?: string; // Optional because not all sprints have it
  completeDate?: string; // Optional because not all sprints have it
  originBoardId?: number; // Optional because not all sprints have it
  goal: string;
}

export interface ISprintResponse {
  isLast: boolean;
  maxResults: number;
  startAt: number;
  total: number;
  values: ISprint[]; // Array of `ISprint` objects
}

export interface ISprintOption {
  value: string;
  label: ISprint;
  type?: string;
}

export interface IBoardOption {
  value: string;
  label: IBoard;
  type?: string;
}

export interface IContext {
  localId: string;
  cloudId: string;
  environmentId: string;
  environmentType: string;
  moduleKey: string;
  siteUrl: string;
  extension: {
    issue: {
      key: string;
      id: string;
      type: string;
      typeId: string;
    };
    project: {
      id: string;
      key: string;
      type: string;
    };
    fieldId: string;
    fieldName: string;
    fieldType: string;
    renderContext: string;
    type: string;
    entryPoint: string;
    fieldValue: {
      appvalues: string;
      groups: string;
      groupvalues: string;
    };
  };
  accountId: string;
  license: string;
  timezone: string;
  locale: string;
  theme: string;
}

interface IStatusCategory {
  self: string;
  id: number;
  key: string;
  colorName: string;
  name: string;
}

interface IStatus {
  self: string;
  description: string;
  iconUrl: string;
  name: string;
  id: string;
  statusCategory: IStatusCategory;
}

interface IFields {
  status: IStatus;
}

export interface IIssue {
  expand: string;
  id: string;
  self: string;
  key: string;
  fields: IFields;
}

export interface ISprintIssuesResponse {
  expand: string;
  startAt: number;
  maxResults: number;
  total: number;
  issues: IIssue[];
}

export interface ITreeIssues {
  [key: string]: Array<IIssue>;
}
