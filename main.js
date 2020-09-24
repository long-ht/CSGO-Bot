const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

const token = process.env.DISCORD_TOKEN;
const { ranking, player, team, matches, results } = require('./scraper');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (msg) => {
    msg.content = msg.content.trim();
    if (msg.content === '%tr' || msg.content === 'teamranking') {
        msg.reply({ embed: await ranking() });
    }
    //features to be added
    // else if (msg.content === "%result") {
    //     msg.reply({ embed: await results() });
    // } else if (msg.content === "%matches") {
    //     msg.reply({ embed: await matches() });
    // } else if (msg.startsWith("%team ")) {
    //     msg.reply({ embed: await team() });
    // } else if (msg.startsWith("%player ")) {
    //     msg.reply({ embed: await player() });
    // } 
    else if (msg === "%help") {
        msg.reply({ embed: help() });
    }
});

client.login(token);