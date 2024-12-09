/* eslint-disable react/jsx-one-expression-per-line */
// eslint-disable-next-line no-use-before-define
import React from "react";
import { Field } from "@atlaskit/form";
import { AsyncSelect } from "@atlaskit/select";
import { IBoardOption, IOption } from "../models/Jira";
import { getBoardsForProject } from "../services/jira-service";
// import { getBoardsForProject } from "../services/jira-service";

interface IProps {
  fieldKey: string;
  required: boolean;
  label: string;
  defaultValue: IBoardOption | undefined;
  isDisabled: boolean;
  isMulti: boolean;
  isClearable: boolean | undefined;
  setValue: (_value: Array<IOption>, _fieldName: string) => void;
  projectId: string;
}

export default function BoardSelector(props: IProps) {
  const {
    fieldKey,
    required,
    label,
    defaultValue,
    isDisabled,
    isMulti,
    setValue,
    isClearable,
    projectId,
  } = props;
  const formatLabel = (board: IBoardOption) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <span style={{ marginLeft: 5 }} id="project-span">
        {board.label.name}
      </span>
    </div>
  );
  return (
    <Field
      key={fieldKey}
      label={label}
      name={fieldKey}
      id={fieldKey}
      isDisabled={isDisabled}
      isRequired={required}
    >
      {({ fieldProps: { id, ...rest } }) => (
        /*     @ts-ignore */
        <AsyncSelect
          {...rest}
          loadOptions={(val) => getBoardsForProject(projectId, val)}
          formatOptionLabel={formatLabel}
          inputId={id}
          cacheOptions
          menuPosition="fixed"
          menuContainerStyle={{ zIndex: 9999 }}
          defaultOptions
          isClearable={isClearable === undefined ? true : isClearable}
          isMulti={isMulti || false}
          // @ts-expect-error
          onChange={(value) => setValue(value, fieldKey)}
          value={defaultValue}
        />
      )}
    </Field>
  );
}
