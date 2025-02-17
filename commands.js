require("dotenv").config();
const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "gemini",
    description: "Uses Gemini To Give responses",
  },
];

const rest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_BOT_TOKEN
);

  async function updateCommands(){
    try {
  console.log("Started refreshing application (/) commands.");

  await rest.put(Routes.applicationCommands("1331271937539838054"), {
    body: commands,
  });

  console.log("Successfully reloaded application (/) commands.");
} catch (error) {
  console.error(error);
}
  }

  updateCommands();