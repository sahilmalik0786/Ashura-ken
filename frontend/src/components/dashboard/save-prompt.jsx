import React from "react";
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
} from "../ui/shadcn-io/ai/prompt-input";
import HoverCard from "../hoverCard";
import { usePrompts } from "@/hooks/usePrompts";
import { useForm, Controller } from "react-hook-form";
import { useSavePrompt } from "@/hooks/useSavePrompt";
import { toast } from "sonner";

const SavePrompt = () => {
  const { data: prompts } = usePrompts();
  const {
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
    control,
  } = useForm();
  const savePrompt = useSavePrompt()
  const onSubmit = async (data) => {
       const res = await savePrompt.mutateAsync(data)
        toast(res)
        reset()
  };
  return (
    <div className=" h-full  w-full  flex flex-col items-center justify-center p-4 gap-6">
      <div className="p-2 w-full flex flex-col h-[calc(100svh-6rem)] items-start justify-center gap-3">
        <div className="w-full max-w-xl mx-auto">
          <h1 className="mb-2 font-sans ">Save your prompts here</h1>
          <PromptInput className={"p-1"} onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="prompt"
              control={control}
              rules={{
                required: "Please Enter the Prompt",
                minLength: "message",
              }}
              render={({ field }) => (
                <PromptInputTextarea
                  {...field}
                  placeholder="Enter the Prompt..."
                />
              )}
            />
            <PromptInputSubmit
              className={"flex justify-self-end"}
              variant="ghost"
            />
          </PromptInput>
          {errors.prompt && (
            <small className="text-red-400"> {errors.prompt.message} </small>
          )}
        </div>
        <h4>Previous Saved</h4>
        <div className="h-fit max-h-full w-full  relative rounded-lg p-1 grid xl:grid-cols-3 sm:grid-cols-1 gap-3 overflow-y-auto ">
          {Array.isArray(prompts) &&
            !prompts.length == 0 &&
             prompts.map((i) => {
              return <HoverCard i={i} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default SavePrompt;
