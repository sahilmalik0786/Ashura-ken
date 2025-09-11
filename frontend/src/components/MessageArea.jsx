import { Message, MessageContent } from "@/components/ui/shadcn-io/ai/message";
import { CopyIcon, CheckCheck } from "lucide-react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "./ui/shadcn-io/ai/conversation";
import { Response } from "./ui/shadcn-io/ai/response";

import { Action, Actions } from "./ui/shadcn-io/ai/actions";
import { useState } from "react";
const MessageArea = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (content) => {
    console.log(content);

    try {
      await navigator.clipboard.writeText(content).then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1500);
      });

      console.log("Text copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const actions = [
    {
      icon: copied ? CheckCheck : CopyIcon,
      label: copied ? "copied" : "copy",
      onClick: (content) => handleCopy(content),
    },
  ];

  return (
    <div >
      <Conversation className=" w-full   h-[calc(100svh-14rem)] relative  not-sm:h-[calc(100svh-13rem)] ">
        <ConversationContent >
          {text?.map((message) => (
            <Message
              className={`flex flex-col gap-2 ${
                message.role === "model" ? "items-start" : "items-end"
              }`}
              from={message.role}
            >
              <MessageContent>
                <Response>{message.content}</Response>
              </MessageContent>
              {message.role === "model" && (
                <Actions className="mt-2">
                  {actions.map((action) => (
                    <Action
                      key={action.label}
                      label={action.label}
                      onClick={() => action.onClick(message.content)}
                      tooltip={action.label}
                    >
                      <action.icon className="size-4" />
                    </Action>
                  ))}
                </Actions>
              )}
              {/* <MessageAvatar src={message.avatar} /> */}
            </Message>
          ))}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    </div>
  );
};
export default MessageArea;
