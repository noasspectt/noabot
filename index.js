const { Client, GatewayIntentBits, EmbedBuilder, ActivityType, PermissionsBitField } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

let isAdBlockingEnabled = true;
let isProfanityBlockingEnabled = true;
let prefix = '.'; // Varsayılan prefix
let whitelistRoles = []; // Whitelisted roles
const bannedWords = ['aq', 'amk', 'oe', 'amına', 'amına koyayım', 'siktirin', 'siktir', 'sg', 'orospu', 'ananı', 'babanı', 'bacını', 'karını', 'sikeyim', 'allahını', 'amcık', 'feriştah', 'oç']; // Buraya engellenecek küfürleri ekleyin
const adLinks = ['http', 'https']; // Buraya engellenecek reklam linklerini ekleyin

client.once('ready', () => {
    console.log('Bot is online!');
    client.user.setActivity('Esinila', { type: ActivityType.Watching });
    // Prefix'i dosyadan yükle
    if (fs.existsSync('prefix.json')) {
        const data = fs.readFileSync('prefix.json', 'utf8');
        const json = JSON.parse(data);
        if (json.prefix) {
            prefix = json.prefix;
        }
    }
    // Whitelist rolleri dosyadan yükle
    if (fs.existsSync('whitelist.json')) {
        const data = fs.readFileSync('whitelist.json', 'utf8');
        whitelistRoles = JSON.parse(data);
    }
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    const memberRoles = message.member.roles.cache.map(role => role.id);
    const isWhitelisted = whitelistRoles.some(role => memberRoles.includes(role));

    if (!isWhitelisted) {
        if (isProfanityBlockingEnabled) {
            for (const word of bannedWords) {
                if (message.content.toLowerCase().includes(word)) {
                    await message.delete();
                    message.channel.send(`${message.author}, bu sunucuda küfür yasaktır!`);
                    return;
                }
            }
        }

        if (isAdBlockingEnabled) {
            for (const link of adLinks) {
                if (message.content.toLowerCase().includes(link)) {
                    await message.delete();
                    message.channel.send(`${message.author}, bu sunucuda reklam yasaktır!`);
                    return;
                }
            }
        }
    }

    if (message.content.toLowerCase() === 'sa') {
        message.channel.send('as');
    }

    // !tw komutu
    if (message.content.toLowerCase() === `${prefix}tw`) {
        message.channel.send('https://www.twitch.tv/esinila');
    }

    // !ig komutu
    if (message.content.toLowerCase() === `${prefix}ig`) {
        message.channel.send('https://www.instagram.com/esinszer/');
    }

    // !kick komutu
    if (message.content.toLowerCase() === `${prefix}kick`) {
        message.channel.send('https://kick.com/esinilaa');
    }

    // Esinila özel kodlar
    
    if (message.content.toLowerCase() === 'beyza') {
        message.channel.send('DAVAR');
    }

    if (message.content.toLowerCase() === 'asya') {
        message.channel.send('OTİSTİK');
    }
    
    if (message.content.toLowerCase() === 'esin') {
        message.channel.send('HADİTEKRARDANDENE');
    }

    if (message.content.toLowerCase() === 'klasikko') {
        message.channel.send('SİKKO SİKKO KLASSİKKO');
    }
    
    if (message.content.toLowerCase() === 'garaus') {
        message.channel.send('GARAUS GARA HAYAT');
    }
    
    if (message.content.toLowerCase() === 'noasspect') {
        message.channel.send('ANONİM OE');
    }
    
    if (message.content.toLowerCase() === 'noa') {
        message.channel.send('ANONİM OE');
    }

    if (message.content.toLowerCase() === 'taribo') {
        message.channel.send('CANIM CİEERİMMM TARİBOMMM');
    }

    if (message.content.toLowerCase() === 'gökdeniz') {
        message.channel.send('GÖTDENİZZZ');
    }

    // Esinila özel kodlar

    if (message.content === `${prefix}ping`) {
        message.channel.send('Pong!');
    }

    if (message.content.startsWith(`${prefix}sil`)) {
        // Kullanıcının `ManageMessages` yetkisini kontrol et
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return message.reply('Bu komutu kullanmak için yeterli yetkiniz yok.');
        }

        const args = message.content.split(' ').slice(1);
        const amount = parseInt(args[0]);

        if (!amount || isNaN(amount)) return message.reply('Lütfen geçerli bir sayı girin.');
        if (amount < 1 || amount > 100) return message.reply('1 ile 100 arasında bir sayı girin.');

        await message.channel.bulkDelete(amount, true).then(deletedMessages => {
            message.channel.send(`Başarıyla ${deletedMessages.size} mesaj silindi.`).then(sentMessage => {
                setTimeout(() => {
                    sentMessage.delete().catch(console.error);
                }, 3000); // 3 saniye bekle ve mesajı sil
            });
        }).catch(err => {
            console.error(err);
            message.channel.send('Mesajları silerken bir hata oluştu.');
        });
    }

    // !8ball komutu
    if (message.content.startsWith(`${prefix}8ball`)) {
        const responses = [
            'Evet.',
            'Hayır.',
            'Belki.',
            'Kesinlikle.',
            'Kesinlikle hayır.',
            'Bundan emin değilim, tekrar sor.',
            'Görüşümce evet.',
            'Görüşümce hayır.'
        ];
        const response = responses[Math.floor(Math.random() * responses.length)];
        message.channel.send(response);
    }

    // !zar komutu
    if (message.content === `${prefix}zar`) {
        const roll = Math.floor(Math.random() * 6) + 1;
        message.channel.send(`Zar: ${roll}`);
    }

    // !şaka komutu
    if (message.content === `${prefix}şaka`) {
        const jokes = [
            'Bilgisayar neden sıcak kahveyi sevmez? Çünkü işlemcisi ısınır.',
            'İki balık karşılaşmış, biri diğerine demiş ki: "Nasılsın?", diğeri cevap vermiş: "Balık gibi..."',
            'Bir tavşan bir gün telefona sarılmış ve demiş ki: "Alo, havuç mu?"'
        ];
        const joke = jokes[Math.floor(Math.random() * jokes.length)];
        message.channel.send(joke);
    }

    // !yardım komutu
    if (message.content === `${prefix}yardım`) {
        const embed = new EmbedBuilder()
            .setTitle('Yardım Komutları')
            .setDescription('Botun mevcut komutları:')
            .addFields(
                { name: `${prefix}ping`, value: 'Pong! ile cevap verir.' },
                { name: `${prefix}sil [miktar]`, value: 'Belirtilen miktarda mesajı siler (1-100 arası).' },
                { name: `${prefix}8ball [soru]`, value: 'Sihirli 8 topu gibi rastgele bir cevap verir.' },
                { name: `${prefix}zar`, value: '1 ile 6 arasında rastgele bir sayı döner.' },
                { name: `${prefix}şaka`, value: 'Rastgele bir şaka yapar.' },
                { name: `${prefix}yardım`, value: 'Bu yardım mesajını gösterir.' },
                { name: `${prefix}reklam-engelleme`, value: 'Reklam engellemeyi açar veya kapatır.' },
                { name: `${prefix}küfür-engelleme`, value: 'Küfür engellemeyi açar veya kapatır.' },
                { name: `${prefix}prefix [yeni prefix]`, value: 'Komut ön ekini değiştirir.' },
                { name: `${prefix}whitelist [rol id]`, value: 'Belirtilen rolü whitelist\'e ekler veya çıkarır.' }
            )
            .setColor('#00FF00');

        message.channel.send({ embeds: [embed] });
    }

    // Reklam engelleme komutu
    if (message.content === `${prefix}reklam-engelleme`) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return message.channel.send('Yetkiniz yetersiz.');
        }
        isAdBlockingEnabled = !isAdBlockingEnabled;
        message.channel.send(`Reklam engelleme ${isAdBlockingEnabled ? 'açıldı' : 'kapandı'}.`);
    }

    // Küfür engelleme komutu
    if (message.content === `${prefix}küfür-engelleme`) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return message.channel.send('Yetkiniz yetersiz.');
        }
        isProfanityBlockingEnabled = !isProfanityBlockingEnabled;
        message.channel.send(`Küfür engelleme ${isProfanityBlockingEnabled ? 'açıldı' : 'kapandı'}.`);
    }

    // Prefix değiştirme veya gösterme komutu
    if (message.content.startsWith(`${prefix}prefix`)) {
        const args = message.content.split(' ').slice(1);
        if (args.length === 0) {
            // Prefix'i göster
            return message.channel.send(`Bu sunucudaki prefix: ${prefix}`);
        }
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.channel.send('Yetkiniz yetersiz.');
        }
        // Prefix'i değiştir
        prefix = args[0];
        fs.writeFileSync('prefix.json', JSON.stringify({ prefix }));
        message.channel.send(`Prefix başarıyla ${prefix} olarak değiştirildi.`);
    }

    // Whitelist komutu
    if (message.content.startsWith(`${prefix}whitelist`)) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.channel.send('Yetkiniz yetersiz.');
        }
        const args = message.content.split(' ').slice(1);
        if (args.length === 0) {
            return message.channel.send('Lütfen bir rol ID\'si girin.');
        }
        const roleId = args[0];
        if (whitelistRoles.includes(roleId)) {
            whitelistRoles = whitelistRoles.filter(role => role !== roleId);
            fs.writeFileSync('whitelist.json', JSON.stringify(whitelistRoles));
            return message.channel.send(`Rol başarıyla whitelist'ten çıkarıldı: ${roleId}`);
        } else {
            whitelistRoles.push(roleId);
            fs.writeFileSync('whitelist.json', JSON.stringify(whitelistRoles));
            return message.channel.send(`Rol başarıyla whitelist'e eklendi: ${roleId}`);
        }
    }

    // Bot etiketlenirse prefix'i göster
    if (message.mentions.has(client.user)) {
        message.channel.send(`Bu sunucudaki prefix: ${prefix}`);
    }
});

// Sunucu oluşturma ve proje aktivitesi sağlama.
const express = require('express');
const app = express();
const port = 3000;

// Web sunucu
app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Sunucu ${port} numaralı bağlantı noktasında yürütülüyor.`);
});

client.login(process.env.token);
