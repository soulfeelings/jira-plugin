/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ITreeIssues } from "../models/Jira";

const MainDiv = styled.div`
  margin-top: 20px;
`;

interface IProps {
  treeIssues: ITreeIssues | undefined;
}

export default function TaskTree(props: IProps) {
  const { treeIssues } = props;
  // eslint-disable-next-line no-unused-vars
  const [treeStructure, setTreeStructure] = useState<
    { [key: string]: string } | undefined
  >(undefined);
  useEffect(() => {
    (async () => {
      if (treeIssues) {
        const tempTreeStructure: { [key: string]: string } = {};
        Object.keys(treeIssues).forEach((issueKey) => {
          let treeLine = "";
          treeIssues[issueKey].forEach((issue) => {
            treeLine +=
              issue.fields?.status?.name &&
              issue.fields.status.name.toUpperCase() === "DONE"
                ? "1"
                : "0";
          });
          treeLine = treeLine
            .split("")
            // @ts-expect-error
            .sort((a, b) => b - a)
            .join("");
          tempTreeStructure[issueKey] = treeLine;
        });
        setTreeStructure(tempTreeStructure);
      } else {
        setTreeStructure(undefined);
      }
    })();
  }, [treeIssues]);

  const drawTree = () => {
    if (treeStructure) {
      return Object.keys(treeStructure).map((key) => (
        <>
          <div>{key}</div>
          <div>{treeStructure[key]}</div>
        </>
      ));
    }
    return <div />;
  };
  return (
    <MainDiv>
      {treeIssues && treeStructure && <MainDiv>{drawTree()}</MainDiv>}
      {(treeIssues === undefined || treeStructure === undefined) && (
        <div>no issues</div>
      )}
    </MainDiv>
  );
}
