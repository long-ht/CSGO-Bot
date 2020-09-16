const Discord = require('discord.js');
const client = new Discord.Client();
const token = "NzU1NjQ3MzgxMTkzODgzNjg5.X2GVdg.r5-Ia6_oyPMShKveiNnAtzCXubQ";
const { ranking } = require('./scraper');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (msg) => {
    msg.content = msg.content.trim();
    if (msg.content === '%tr' || msg.content === 'teamranking') {
        msg.reply({ embed: await ranking() });
    } else if (msg.content === "%result") {
        // const message = await covidTracking.country(msg.content);
        msg.reply("test");
    } else if (msg.content === "%upcoming") {
        // const message = await covidTracking.country(msg.content);
        msg.reply("test");
    }
    // else if (msg.content.startsWith("%ti ")) {
    //     const message = await covidTracking.country(msg.content);
    //     msg.reply(message);
    // } else if (msg.content.startsWith("%pi ")) {
    //     const message = await covidTracking.country(msg.content);
    //     msg.reply(message);
    // }
});

client.login(token);