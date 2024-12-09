import { requestJira } from "@forge/bridge";
import {
  IBoardOption,
  IBoardResponse,
  IIssue,
  ISprintIssuesResponse,
  ISprintOption,
  ISprintResponse,
} from "../models/Jira";

export const getBoardsForProject = async (
  projectId: string | undefined,
  filter: string
): Promise<Array<IBoardOption>> => {
  if (projectId) {
    const response = await requestJira(
      `/rest/agile/1.0/board?projectKeyOrId=${projectId}`
    );
    const boardResponse = (await response.json()) as IBoardResponse;
    const boards = boardResponse.values.map((board) => ({
      value: board.id.toString(),
      label: board,
    }));
    if (filter && filter !== "") {
      return boards.filter((board) => board.label.name.startsWith(filter));
    }
    return boards;
  }
  return [];
};

export const getSprintsForBoard = async (
  boardId: string | undefined,
  filter: string
): Promise<Array<ISprintOption>> => {
  console.log("here", filter);
  if (boardId) {
    const response = await requestJira(
      `/rest/agile/1.0/board/${boardId}/sprint`
    );
    const sprintResponse = (await response.json()) as ISprintResponse;
    console.log(sprintResponse);
    const sprints = sprintResponse.values.map((sprint) => ({
      value: sprint.id.toString(),
      label: sprint,
    }));
    if (filter && filter !== "") {
      return sprints.filter((sprint) => sprint.label.name.startsWith(filter));
    }
    return sprints;
  }
  return [];
};

export const getSprintIssues = async (sprintId): Promise<Array<IIssue>> => {
  const response = await requestJira(
    `/rest/agile/1.0/sprint/${sprintId}/issue?fields=status`
  );
  const sprintIssueResponse = (await response.json()) as ISprintIssuesResponse;
  console.log(sprintIssueResponse);
  return sprintIssueResponse.issues;
};
