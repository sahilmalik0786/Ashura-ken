import promptModel from "../models/prompt.model.js";
import { generateTags } from "../services/ai.service.js";
import { connectToDb } from "../db/db.js";
export const savePromptController = async (req, res) => {
  const user = req.user;
  const { prompt } = req.body;
  await connectToDb()

  const generatedtags = await generateTags(prompt);

  const newtags = generatedtags
    .split("\n")
    .map((line) => line.replace(/\*+/g, "").trim().toLowerCase()) // remove * and extra spaces
    .filter(Boolean);

  await promptModel.create({
    prompt: prompt,
    user: user._id,
    tags: newtags,
    isPublic: true,
  });
  res.status(201).json({
    message: "prompt saved successfully",
  });
};

export const getPromptsController = async (req, res) => {
  const user = req.user;
  await connectToDb()
  const prompts = await promptModel.find({
    user: user._id,
  });
  if (!prompts) {
    return res.status(200).json({
      message: "No prompts of this user",
    });
  }
  res.status(201).json({
    message: "Prompts found successfully",
    prompts,
  });
};

export const getCommunityPrompt = async (req, res) => {
  await connectToDb()
  const communityPrompts = await promptModel.find({ isPublic: true });

  
  res.status(200).json({
    message: "community prompts",
    communityPrompts,
  });
};

export const searchPromptsController = async (req, res) => {
  try {
    const { tag } = req.params;
    await connectToDb()

    const prompts = await promptModel.find({ tags: tag.toLowerCase() });
    if (!prompts || prompts.length === 0) {
      return res.status(200).json({
        prompts: [],
        message: "No prompts found for this tag",
      });
    }

    res.status(200).json({
      prompts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
