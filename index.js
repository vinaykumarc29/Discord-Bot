
const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const { GoogleGenerativeAI } = require("@google/generative-ai");
 


const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });

client.on("messageCreate",(message)=>{
  const input = message.content;

  if(input.startsWith("@gemini")) {

    async function generativeSearch() {

      const prompt = input.split("@gemini")[1]
      const result = await model.generateContent(prompt); 
      const response = result.response.text();
      
      if(response.length < 2000){
        return message.reply({
          content: response
        })
      }else{
        const msg1 = response.slice(0,Math.ceil(response.length/2));
        const msg2 = response.slice(Math.ceil(response.length/2));
        await message.reply({
          content: msg1
        });
        await message.reply({
          content: msg2
        });
      }
    }
    generativeSearch();
    
  }
})


client.login(process.env.DISCORD_BOT_TOKEN);
