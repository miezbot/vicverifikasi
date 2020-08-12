'use_strict'

const Discord = require('discord.js')
const config = require('./config.json')


const shortcode = (n) => {
    const possible = 'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghjklmnopqrstuvwxyz0123456789'
    let text = ''
    for (var i = 0; i < n + 1; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))
    return text;
}

const client = new Discord.Client()

client.on('ready', () => {
    client.user.setActivity(config.playing)
    console.log(`[VERIFYBOT] Connected as ${client.user.username}#${client.user.discriminator} ${client.user.id}`)
})
let greetings = [
    '<:vhere:728256641576730625> Haii! **:name:**! Selamat datang .. apakah hari kamu menyenangkan?.',
    '<:vhere:728256641576730625> Senang melihatmu bergabung **:name:**!!, selamat datang diserver **VALORANT Indonesia Community**.',
    '<:vhere:728256641576730625> Wah ada teman baru kita **:name:**, yang sudah melakukan verifikasi!.',
    '<:vhere:728256641576730625> Terima kasih sudah melakukan verifikasi **:name:**!, sehat selalu.',
    '<:vhere:728256641576730625> Hmm ada temen baru nih yang baru bergabung dikomunitas kita **:name:**!, selamat datang.',
    '<:vhere:728256641576730625> Kerja bagus! **:name:**, kamu telah melakukan verifikasi dengan benar, semoga betah ya!.',
    '<:vhere:728256641576730625> Sepertinya mata kamu **:name:**, jeli juga saat melakukan verifikasi.',
    '<:vhere:728256641576730625> **:name:**, Tepat! terima kasih, kamu telah diverifikasi.',
    '<:vhere:728256641576730625> Mantul! **:name:**, semoga betah ya di VIC.',
    '<:vhere:728256641576730625> Taratakdung, Gugus 2, Nama **:name:**, sudah melakukan verifikasi.',
    '<:vhere:728256641576730625> Kerja bagus! :100: **:name:**, kamu melakukan dengan baik disana!'
];



client.on('guildMemberAdd', (member) => {
    client.guilds.cache.get(config.guild).member(member).roles.add('733463038866227348')    
if (member.user.bot || member.guild.id !== config.guild) return
    const token = shortcode(10)
    const welcomemsg = `Selamat datang **${member.user.tag}** diwajibkan untuk membaca <#720281282176745564> \nJika kamu sudah membaca, **Verifikasi** dengan cara membalas **DM ini** ulangi kata berikut: \n\n\`\`\`Saya telah menyetujui kebijakan vic dan siap menerima sanksi. Token saya adalah ${token}.\`\`\`\n **pesan ini case-sensitive, dan diharap mengikut semua sampai akhir! ** \n\nBingung? tanyakan Staff.`
    console.log(`${member.user.username}#${member.user.discriminator} joined! CODE: "${token}"`)
    member.send(welcomemsg)
    member.user.token = token
})

const verifymsg = 'Saya telah menyetujui kebijakan vic dan siap menerima sanksi. Token saya adalah {token}.'

client.on('message', (message) => {
  const completemsg = `Terima kasih sudah melakukan **Verifikasi** ${message.author} dengan ini kamu menyetujui dan menerima sanksi jika melanggar!.`

    if (message.author.bot || !message.author.token || message.channel.type !== `dm`) return
    if (message.content !== (verifymsg.replace('{token}', message.author.token))) return
    message.channel.send({
        embed: {
            color: 16729684,
//Math.floor(Math.random() * (0xFFFFFF + 1)),
            description: completemsg,
            timestamp: new Date(),
            footer: {
                text: `Verifikasi Berhasil`
            }
        }
    })
    setTimeout(() => {

        client.channels.cache.get('684207615709806654').send(greetings[ Math.floor(Math.random() * greetings.length) ].replace(':name:', message.author.tag)).then(ok =>{
          ok.react(695844016088023050)
        })

    }, 10000);
    client.guilds.cache.get(config.guild).member(message.author).roles.remove(config.role) // ensure this is a string in the config ("")
        .then(console.log(`TOKEN: ${message.author.token} :: Role ${config.role} remove to member ${message.author.id}`))
        .catch(console.error)
})

client.on('disconnect', (event) => {
    setTimeout(() => client.destroy().then(() => client.login(config.token)), 10000)
    console.log(`[DISCONNECT] Notice: Disconnected from gateway with code ${event.code} - Attempting reconnect.`)
})

client.on('reconnecting', () => {
    console.log(`[NOTICE] ReconnectAction: Reconnecting to Discord...`)
})

client.on('error', console.error)
client.on('warn', console.warn)

process.on('unhandledRejection', (error) => {
    console.error(`Uncaught Promise Error: \n${error.stack}`)
})

process.on('uncaughtException', (err) => {
    let errmsg = (err ? err.stack || err : '').toString().replace(new RegExp(`${__dirname}/`, 'g'), './')
    console.error(errmsg)
})


//////////////////////
//const http = require('http');
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
console.log(Date.now() + " Ping Received");
response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
/////////////////////////
client.login(config.token)
