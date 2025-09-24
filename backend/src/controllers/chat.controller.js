import { chatModel } from "../models/chat.model.js";
import messageModel from "../models/message.model.js";

export const chatController = async (req, res) => {
  const { message } = req.body;

  const user = req.user;
  const chat = await chatModel.create({
    user: user._id,
  });

  res.status(201).json({
    message: "Chat created successfully",
    chat: {
      id: chat._id,
      lastActivity: chat.lastActivity,
    },
  });
};

export const userChatsController = async (req, res) => {
  const user = req.user;

  const chats = await chatModel.find({
    user: user._id,
  });

  if (chats.length == 0) {
    return res.status(400).json({
      message: "there are no chats created with this user",
    });
  }

  res.status(200).json({
    message: "Chats found successfully",
    chats,
  });
};

export const chatsHistoryController = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(401).json({
      message: "there is no chat id to begin with",
    });
  }

  const messages = await messageModel.find({
    chat: id,
  });

  if (messages.length == 0) {
    return res.status(400).json({
      message: "there are no messages with this chat id",
    });
  }

  res.status(200).json({
    message: "messages found successfully",
    messages,
  });
};
