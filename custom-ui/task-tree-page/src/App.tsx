// eslint-disable-next-line no-use-before-define
import React, { useState, useEffect } from "react";
import { view } from "@forge/bridge";
import Spinner from "@atlaskit/spinner";
import styled from "styled-components";
import BoardSelector from "./components/BoardSelector";
import SprintSelector from "./components/SprintSelector";
import {
  IBoardOption,
  IContext,
  ISprintOption,
  ITreeIssues,
} from "./models/Jira";
import { getSprintIssues } from "./services/jira-service";

const MainDiv = styled.div`
  width: 400px;
`;

function App() {
  const [context, setContext] = useState<IContext | undefined>(undefined);
  const [board, setBoard] = useState<IBoardOption | undefined>(undefined);
  const [sprints, setSprints] = useState<Array<ISprintOption>>([]);
  const [sprintIssues, setSprintIssues] = useState<ITreeIssues | undefined>(
    undefined
  );

  const getIssuesForSprints = async () => {
    console.log("getIssuesForSprints");
    console.log(sprints);
    if (sprints && sprints.length > 0) {
      console.log("getIssuesForSprints enter");
      const tempSprintIssues: ITreeIssues = {};
      // eslint-disable-next-line no-restricted-syntax
      for (const sprint of sprints) {
        tempSprintIssues[sprint.label.name] = [];
        // eslint-disable-next-line no-await-in-loop
        const tempIssueSprints = await getSprintIssues(sprint.label.id);
        console.log(tempIssueSprints);
        tempSprintIssues[sprint.label.name] = tempIssueSprints;
      }
      console.log(sprintIssues);
      console.log(tempSprintIssues);
      setSprintIssues(tempSprintIssues);
    }
  };

  useEffect(() => {
    let isCancelled = false;

    const executeFunction = async () => {
      try {
        console.log("Async function started");
        if (!isCancelled) {
          await getIssuesForSprints();
        }
      } catch (error) {
        console.error("Error in async function:", error);
      }
    };

    // Set interval to execute every 60 seconds
    const intervalId = setInterval(() => {
      executeFunction();
    }, 15000);

    // Cleanup interval and cancel ongoing async tasks
    return () => {
      isCancelled = true;
      clearInterval(intervalId);
    };
  }, [sprints]);

  useEffect(() => {
    (async () => {
      // @ts-expect-error
      const tempContext = (await view.getContext()) as IContext;
      setContext(tempContext);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (sprints.length > 0) {
        await getIssuesForSprints();
      } else {
        setSprintIssues(undefined);
      }
    })();
  }, [sprints]);

  const setBoardValue = async (value: IBoardOption) => {
    setBoard(value);
  };

  const setSprintValue = async (value: Array<ISprintOption>) => {
    setSprints(value);
  };
  return (
    <>
      {context?.extension?.project?.id && (
        <MainDiv>
          <BoardSelector
            fieldKey="board-selector"
            required
            label="Board"
            defaultValue={board}
            isDisabled={!context?.extension?.project?.id}
            isMulti={false}
            isClearable={false}
            // @ts-expect-error
            setValue={setBoardValue}
            projectId={context?.extension?.project?.id}
          />
          <SprintSelector
            fieldKey="sprint-selector"
            required
            label="Sprints"
            defaultValue={sprints}
            isDisabled={board === undefined}
            isMulti
            isClearable={false}
            // @ts-expect-error
            setValue={setSprintValue}
            boardId={board?.label.id ? board?.label.id.toString() : undefined}
          />
        </MainDiv>
      )}
      {context?.extension?.project?.id === undefined && <Spinner />}
    </>
  );
}

export default App;
