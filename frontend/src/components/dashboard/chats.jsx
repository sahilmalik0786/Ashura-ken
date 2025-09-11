import React, { useEffect, useState } from "react";
import MessageArea from "../MessageArea";
import InputArea from "../PromptInput";
import { io } from "socket.io-client";
import { useUserMessages } from "@/hooks/useUserMessages";
import { useLoaderData, useParams } from "react-router";
import { queryClient } from "@/queryClient";
import { Loader } from "../ui/shadcn-io/ai/loader";

const Chats = () => {
  const [text, setText] = useState();
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState();
  const [draft, setDraft] = useState(true);
  const [status, setStatus] = useState("ready");
  // console.log(mutationCache)
  useEffect(() => {
    const socketio = io(import.meta.env.VITE_API_URL, {
      withCredentials: true,
    });

    socketio.on("ai-message-response", (messagePayload) => {
      setMessages((prev) => [
        ...prev,
        {
          role: messagePayload?.role,
          content: messagePayload?.content,
        },
      ]);
      setStatus("ready");
    });

    setSocket(socketio);

    return () => {
      socketio.disconnect();
    };
  }, []);
  const param = useParams();
  const { id } = param;
  const { data, isLoading } = useUserMessages(id);

  useEffect(() => {
    {
      data && setDraft(false);
    }

    {
      !isLoading &&
        data &&
        setMessages(
          data.map((i) => ({
            role: i.role,
            content: i.content,
          }))
        );
    }
    return () => {
      setMessages([]);
      setDraft(true);
    };
  }, [isLoading, data]);
  // if(queryClient.isFetching()){
  //   return <Loader />
  // }

  return (
    <div className="h-[calc(100svh-5rem)] overflow-hidden   flex flex-col items-center justify-center">
      {!draft && (
        <div className="scrollbar-hide max-w-3xl w-full max-h-screen h-[calc(100vh-10rem)]">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              {" "}
              <Loader />{" "}
            </div>
          ) : (
            <MessageArea text={messages} status={status} />
          )}
        </div>
      )}

      <div className=" max-w-3xl w-full ">
        <InputArea
          draft={draft}
          setText={setText}
          text={text}
          setMsg={setMessages}
          socket={socket}
          setStatus={setStatus}
        />
      </div>
    </div>
  );
};

export default Chats;
