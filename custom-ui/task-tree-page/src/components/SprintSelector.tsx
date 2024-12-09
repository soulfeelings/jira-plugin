/* eslint-disable react/jsx-one-expression-per-line */
// eslint-disable-next-line no-use-before-define
import React, { useState, useEffect } from "react";
import { Field } from "@atlaskit/form";
import { AsyncSelect } from "@atlaskit/select";
import { IOption, ISprintOption } from "../models/Jira";
import { getSprintsForBoard } from "../services/jira-service";

interface IProps {
  fieldKey: string;
  required: boolean;
  label: string;
  defaultValue: Array<ISprintOption>;
  isDisabled: boolean;
  isMulti: boolean;
  isClearable: boolean | undefined;
  setValue: (_value: Array<IOption>, _fieldName: string) => void;
  boardId: string | undefined;
}

export default function SprintSelector(props: IProps) {
  const {
    fieldKey,
    required,
    label,
    defaultValue,
    isDisabled,
    isMulti,
    setValue,
    isClearable,
    boardId,
  } = props;

  const [defaultOptions, setDefaultOptions] = useState<Array<ISprintOption>>(
    []
  );

  useEffect(() => {
    (async () => {
      const newSprints = await getSprintsForBoard(boardId, "");
      setDefaultOptions(newSprints);
    })();
  }, [boardId]);

  const formatLabel = (sprint: ISprintOption) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <span style={{ marginLeft: 5 }} id="project-span">
        {sprint.label.name}
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
          loadOptions={(val) => getSprintsForBoard(boardId, val)}
          formatOptionLabel={formatLabel}
          inputId={id}
          cacheOptions={false}
          menuPosition="fixed"
          menuContainerStyle={{ zIndex: 9999 }}
          defaultOptions={defaultOptions}
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
