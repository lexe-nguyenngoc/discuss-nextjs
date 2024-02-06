"use client";

import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@nextui-org/react";
import React from "react";
import { useFormState } from "react-dom";

import * as actions from "@/actions";

const TopicCreateForm = () => {
  const [state, action] = useFormState(actions.createTopic, {
    errors: {},
  });

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Topic</h3>
            <Input
              label="Name"
              name="name"
              labelPlacement="outside"
              placeholder="Name"
              isInvalid={!!state.errors.name}
              errorMessage={state.errors.name?.[0]}
            />
            <Textarea
              label="Description"
              name="description"
              labelPlacement="outside"
              placeholder="Describe your topic"
              isInvalid={!!state.errors.description}
              errorMessage={state.errors.description?.[0]}
            />

            {state.errors._form && (
              <div className="rounded p-2 bg-red-200 border-red-400">
                {state.errors._form[0]}
              </div>
            )}

            <Button type="submit">Submit</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};
export default TopicCreateForm;
