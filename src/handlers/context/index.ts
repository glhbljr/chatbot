import { Message } from "whatsapp-web.js";
import { stripIndents } from "common-tags";
import { reminderContext } from "./reminder";
import { getChatContext } from "./chat";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone"; // dependent on utc plugin

dayjs.extend(utc);
dayjs.extend(timezone);

export async function createContextFromMessage(message: Message) {
  const timezone = dayjs.tz.guess();
  const timestampUTC = dayjs().utc();
  const timestampLocal = timestampUTC.tz(timezone).format();

  const chatContext = await getChatContext(message);

  const context = stripIndents`[system](#context)
  ${chatContext}
  - The user's timezone is '${timezone}'
  - The user's local date and time is: ${timestampLocal}

  [system](#additional_instructions)
  ## Regarding dates and times:
  - Do **NOT** use UTC/GMT dates and times. These are for internal use only.
  - You **MUST ALWAYS** use the user's local date and time when asked about dates and/or times
  - You **MUST ALWAYS** use the user's local date and time when creating reminders

  ${reminderContext}
  `;

  return context;
}
