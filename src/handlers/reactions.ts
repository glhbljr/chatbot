import { Message } from "whatsapp-web.js";
import { ENABLE_REACTIONS } from "../constants";

export const REACTIONS = {
  queued: process.env.QUEUED_REACTION || "🔁",
  working: process.env.WORKING_REACTION || "⚙️",
  done: process.env.DONE_REACTION || "✅",
  error: process.env.ERROR_REACTION || "⚠️",
};

export type Reaction = keyof typeof REACTIONS;

export async function react(message: Message, reaction: keyof typeof REACTIONS) {
  const chat = await message.getChat();

  switch (ENABLE_REACTIONS) {
    case "false":
      break;
    case "true":
      await message.react(REACTIONS[reaction]);
      break;
    case "dms_only":
      if (!chat.isGroup) await message.react(REACTIONS[reaction]);
      break;
    case "groups_only":
      if (chat.isGroup) await message.react(REACTIONS[reaction]);
      break;
    default:
      break;
  }
}
