// const axios = require("axios");
const puppeteer = require('puppeteer');
// const cheerio = require('cheerio');
const Discord = require('discord.js');

const scraper = {
    ranking: async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setRequestInterception(true);

        //if the page makes a  request to a resource type of image or stylesheet then abort that  request
        page.on('request', request => {
            if (request.resourceType() === 'image' || request.resourceType() === 'stylesheet')
                request.abort();
            else
                request.continue();
        });

        await page.goto('https://www.hltv.org/ranking/teams');
        const data = await page.evaluate(() => {
            const logo = document.querySelector('div.ranking-header > span.team-logo > img').src;
            const names = Array.from(document.querySelectorAll('div.ranking-header > div.relative > div.teamLine > span.name')).map(e => e.textContent).slice(0, 25);;
            const points = Array.from(document.querySelectorAll('div.ranking-header > div.relative > div.teamLine > span.points')).map(e => e.textContent).slice(0, 25);;
            const players = Array.from(document.querySelectorAll('div.ranking-header > div.relative > div.playersLine')).map(e => {
                return Array.from(e.children).map(child => child.textContent);
            }).slice(0, 25);;

            return {
                logo,
                teams: names.map((name, index) => ({
                    rank: index + 1,
                    name,
                    points: points[index],
                    players: players[index]
                }))
            }
        });
        await browser.close();

        const embedMsg = {
            color: "0x0099ff",
            title: "World Ranking",
            url: 'https://www.hltv.org/ranking/teams',
            thumbnail: {
                url: data.logo,
            },
            fields: data.teams.map(team => {
                const { rank, name, points, players } = team;
                return {
                    name: `#${rank} ${name} ${points}`, value: `Players: ${players.join(', ')}`
                }
            }),
            timestamp: new Date(),
            footer: {
                text: "Data by hltv.org",
            },
        };

        return embedMsg;
    },
    // matches: async () => {
    //     const browser = await puppeteer.launch();
    //     const page = await browser.newPage();
    //     await page.setRequestInterception(true);

    //     //if the page makes a  request to a resource type of image or stylesheet then abort that  request
    //     page.on('request', request => {
    //         if (request.resourceType() === 'image' || request.resourceType() === 'stylesheet')
    //             request.abort();
    //         else
    //             request.continue();
    //     });

    //     await page.goto('https://www.hltv.org/matches?predefinedFilter=top_tier');
    //     const data = await page.evaluate(() => {
    //         const logo = document.querySelector('div.ranking-header > span.team-logo > img').src;
    //         const names = Array.from(document.querySelectorAll('div.ranking-header > div.relative > div.teamLine > span.name')).map(e => e.textContent).slice(0, 25);;
    //         const points = Array.from(document.querySelectorAll('div.ranking-header > div.relative > div.teamLine > span.points')).map(e => e.textContent).slice(0, 25);;
    //         const players = Array.from(document.querySelectorAll('div.ranking-header > div.relative > div.playersLine')).map(e => {
    //             return Array.from(e.children).map(child => child.textContent);
    //         }).slice(0, 25);;

    //         return {
    //             logo,
    //             teams: names.map((name, index) => ({
    //                 rank: index + 1,
    //                 name,
    //                 points: points[index],
    //                 players: players[index]
    //             }))
    //         }
    //     });
    //     await browser.close();

    //     const embedMsg = {
    //         color: "0x0099ff",
    //         title: "World Ranking",
    //         url: 'https://www.hltv.org/ranking/teams',
    //         thumbnail: {
    //             url: data.logo,
    //         },
    //         fields: data.teams.map(team => {
    //             const { rank, name, points, players } = team;
    //             return {
    //                 name: `#${rank} ${name} ${points}`, value: `Players: ${players.join(', ')}`
    //             }
    //         }),
    //         timestamp: new Date(),
    //         footer: {
    //             text: "Data by hltv.org",
    //         },
    //     };

    //     return embedMsg;
    // },

    help: () => {
        return {
            color: "0x0099ff",
            fields: [{
                name: "%ranking", value: "top 25 teams world ranking"
            },
                // {
                //     name: "%player {player-name}", value: "look up a player's stats"
                // }, {
                //     name: "%team {team-name}", value: "look up a team's stats"
                // }, {
                //     name: "%matches", value: "upcoming notable matches"
                // }, {
                //     name: "%results", value: "matches' results"
                // }, {
                //     name: "%help", value: "list of messages"
                // }
            ],
            timestamp: new Date(),
        };
    }
}
module.exports = scraper;

