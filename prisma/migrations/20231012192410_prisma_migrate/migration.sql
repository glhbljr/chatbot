-- CreateTable
CREATE TABLE "WAChat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "jailbroken" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "BingConversation" (
    "waChatId" TEXT NOT NULL PRIMARY KEY,
    "waMessageId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "jailbreakId" TEXT,
    "parentMessageId" TEXT,
    "invocationId" INTEGER NOT NULL,
    "encryptedSignature" TEXT NOT NULL,
    "expiryTime" TEXT NOT NULL,
    CONSTRAINT "BingConversation_waChatId_fkey" FOREIGN KEY ("waChatId") REFERENCES "WAChat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reminder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reminder" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "waChatId" TEXT NOT NULL,
    CONSTRAINT "Reminder_waChatId_fkey" FOREIGN KEY ("waChatId") REFERENCES "WAChat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "cache" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL
);
