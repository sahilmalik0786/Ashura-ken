import { Server } from "socket.io";
import { socektAuth } from "../middlewares/socketAuth.middleware.js";
import {
  generateChat,
  generateEmbedding,
  generateTitle,
} from "../services/ai.service.js";
import messageModel from "../models/message.model.js";
import { createMemory, queryMemory } from "../services/vector.service.js";
import { chatModel } from "../models/chat.model.js";

export const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    },
  });
  io.use(socektAuth);

  io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("ai-message", async (messagePayload) => {
      if (!messagePayload.chatID || !messagePayload.content) {
        return socket.emit("ai-message-response", "Invalid message payload");
      }

      const [message, vectors] = await Promise.all([
        messageModel.create({
          user: socket.user?._id,
          chat: messagePayload.chatID,
          content: messagePayload.content,
          role: "user",
        }),
        generateEmbedding(messagePayload.content),
      ]);
      await createMemory({
        vectors,
        messageId: message._id,
        metadata: {
          chat: messagePayload?.chatID,
          user: socket?.user?._id,
          text: messagePayload?.content,
        },
      });
      try {
        const [memory, chatHistory] = await Promise.all([
          queryMemory({
            queryVector: vectors,
            limit: 3,
            metadata: { user: socket.user?._id },
          }),

          messageModel
            .find({
              chat: messagePayload.chatID,
            })
            .sort({ createdAt: -1 })
            .limit(10)
            .lean()
            .then((msgs) => msgs.reverse()),
        ]);

        const stm = chatHistory.map((items) => {
          return {
            role: items.role,
            parts: [{ text: items.content }],
          };
        });

        const ltm = [
          {
            role: "user",
            parts: [
              {
                text: `
              these are some previous messages from the chat, use them to generate a response
              
              ${memory.map((item) => item?.metadata?.text).join("\n")}

            `,
              },
            ],
          },
        ];

        const response = await generateChat([...ltm, ...stm]);

        socket.emit("ai-message-response", {
          role: "model",
          content: response,
          chat: messagePayload?.chatID,
        });

        const currentChat = await chatModel
          .findOne({
            _id: messagePayload.chatID,
          })
          .lean();

        if(!currentChat.title) {
          console.log('jeoo')
          // context is format for the llm to understand
          const context = [
            { role: "user", 
              parts: [{ text: messagePayload?.content }]
            },
            {
              role: "model",
              parts: [{ text: response }],
            },
          ];
          const ChatTitle = await generateTitle(context);
           await chatModel.updateOne({_id:messagePayload?.chatID},
            {
              title:ChatTitle
            }
          )
          socket.emit('chatTitle')
        }

        const [responseMessage, responseVectors] = await Promise.all([
          messageModel.create({
            user: socket.user?._id,
            chat: messagePayload.chatID,
            content: response,
            role: "model",
          }),

          generateEmbedding(response),
        ]);

        await createMemory({
          vectors: responseVectors,
          messageId: responseMessage._id,
          metadata: {
            chat: messagePayload?.chatID,
            user: socket?.user?._id,
            text: response,
          },
        });
      } catch (error) {
        console.log(error);
        socket.emit("ai-response-message", error);
      }
    });
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};
