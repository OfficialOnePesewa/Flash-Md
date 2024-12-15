const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'OP-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUJZOVhSZnNKL3VqRkNObkRXMnVFTmUweCtrUHZ6NnplWlhtSWhEWWYxOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZXFwOFJWL2MranlOTU1tQVRIWmZDb24zbDZPSVM0WGNqeVBIeWRsejNTND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnTDdDdUtBbEk5N0ExeFBrekZBTDFFMHlraTJQREZJT21UUXNXaHhZK1Z3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVdFd1OHlSdnlrRU9vMWtmR3I1VzI2V2FxVGdYeUhTTFB2Z2JIQU9mSFJNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9GSlB1M0NtWWZDYmo5Nk9kTWFsbmNSaENXMjdNS2FnZTVkSjJiN29FbEE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9EYzBPcmMyWExYV0pCK3UzT2ZQcTFMcUthV2JUVWxObjlpQklEMFNYMGM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUxiTVZnVXNEdmZOYlpKMUhJY0hsSDRqYWszRFVTa1ZBMXZKVk5hRXZHUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTWRJTkk3akdDL0kwQ2lzMlgxcVlobmloNzFrVDNiWWo4QlBXYm85TW95VT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJhbVVFeHJiaWdQUWp2R0RkTzhLL1Z2MmVXTmxsTmxQWjVsSWh1WTZaWXpGbXV5bDUyV0ZCb2pFVVE0Ykt1REM1Q2RVUCtSbnpqOXJxYkFTYzBSS2d3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQyLCJhZHZTZWNyZXRLZXkiOiI2UjVuRDZIWjN2bkFGYXBHTGE0RXFSVjg3QUVIVCtFcG52TkFlTjJ0bllRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzMzU0NDQ4MjQ5NEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzNDc1NzU5RjM4OTEwQ0I2MjE0NUE4Mjg3MjAxODJDNCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzM0MjMyMDU2fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzM1NDQ0ODI0OTRAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiODlGN0JDNzM5NTkyRTJBMDZFM0Y2NDU2QkFDMjA2MjkifSwibWVzc2FnZVRpbWVzdGFtcCI6MTczNDIzMjA1OX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiRTNJTkpwNDVRV1NZc3JtSndHS1E4dyIsInBob25lSWQiOiI2OGViYTY4ZS01N2RjLTQxNmUtOTM5MC00YTk3MzcwNjYzN2IiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQXVmdGU5bGJkRG5VRmtMQis0TWFJMFFzMGdjPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ijk5MHJpcEwzMndoV2IzcndSU1pYdDJQSFFGND0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJHSk5RRFQxRSIsIm1lIjp7ImlkIjoiMjMzNTQ0NDgyNDk0OjMyQHMud2hhdHNhcHAubmV0IiwibmFtZSI6Ik9mZmljaWFsIE9uZVBlc2V3YSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSnl6d05jR0VPYVArYm9HR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiRkJVUk1vM0VOSU9yTjcrQThBZGtsSVVWcVA1WjB0dkNCQnFXMXh6Wkdoaz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZVYwSWhoa3ZxRDVuNWF0aFg2K3ZUb0tob1RsSU9uakMvNWxQWmdPZVIvY2NSbW1YeUN6Nlk3eWM5bno2aXBLcm1KaHNWVSs5LzFxUHo3YzdCVGw4QUE9PSIsImRldmljZVNpZ25hdHVyZSI6Ik91MnorZndvV0w2YWZtNkU0ODhUWU5KQ2dET05xTFZTQ1pXWFlsSFZrR3hUZ2dTOHBwVnVjUjlDZmFZZEhNSktqS05UUWw5Umtva1lMU3N1aVp5Q2d3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjMzNTQ0NDgyNDk0OjMyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlJRVkVUS054RFNEcXplL2dQQUhaSlNGRmFqK1dkTGJ3Z1FhbHRjYzJSb1oifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzQyMzIwNTEsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBS2VhIn0=;;;=>',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "Official OnePesewa",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "233544482494",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
