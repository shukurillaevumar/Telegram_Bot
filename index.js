const { Telegraf } = require("telegraf");
const axios = require("axios");

const telegramToken = "6528381460:AAHNfSSjHblrfDr7A192o1su4toXKyyQo-8";
const openaiKey = "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";

const bot = new Telegraf(telegramToken);

bot.on("text", async (ctx) => {
  const message = ctx.message.text;

  const openaiEndpoint =
    "https://api.openai.com/v1/engines/davinci-codex/completions";

  try {
    const response = await axios.post(
      openaiEndpoint,
      {
        prompt: message,
        max_tokens: 150,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`,
        },
      }
    );

    const completion = response.data.choices[0].text;
    ctx.reply(completion);
  } catch (error) {
    console.error("Error from OpenAI:", error.message);
    ctx.reply("Error from OpenAI. Check the logs for details.");
    console.error("Error object:", error);
  }
});

bot.launch();
