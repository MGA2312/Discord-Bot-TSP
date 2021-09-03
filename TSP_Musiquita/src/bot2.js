//puto el que lee 2
//uwu
//requires, etc
require('dotenv').config();
const { Client, Intents } = require ( 'discord.js' );
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { token } = require('./config.json');
const ytdl = require('ytdl-core');
const queue = new Map();
const { VoiceConnectionStatus, AudioPlayerStatus  } = require('@discordjs/voice');
const { getVoiceConnection } = require('@discordjs/voice');
const { createAudioPlayer } = require('@discordjs/voice');
const { joinVoiceChannel } = require('@discordjs/voice');


//confirmo inicio en qmt

client.on('ready', () => {
	console.log(`${client.user.username} actualizo en QMT`);
    var generalChannel = client.channels.cache.get("844630814830755850")
});

//Prueba
client.on('message', message => {
  if(message.content.startsWith("hola")){
    message.channel.send("tu nariz contra mis bolas, te falta calle...");
  }
});

//prefijo
const prefix = '/';

 //comandos
client.on('message', async message=> {
  if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    switch (command) {
    //play
    case "play":
      message.channel.send("Reproduciendo...");
    break;
    case "pause":
        player.pause();
        message.channel.send("Pausando...");
    break;
    //skip
    case "skip":
      
      message.channel.send("Siguiente...");
    break;
    // resume
    case "resume":
        player.unpause();
        message.channel.send("Resumiendo reproducción...");
    break;
    //stop
    case "stop":
        player.stop();
        message.channel.send("Stopeado rey");
    break;
    //help
    case "help":

      message.channel.send(`${prefix}play: reproduce links o busca en youtube <br>
                            ${prefix}pause: pausa la reproducciòn <br>
                            ${prefix}skip:saltea la reproducciòn actual por la proxima en la lista de reproducciòn o cola <br>
                            ${prefix}resume:vuelve a reproducir<br>
                            ${prefix}stop:detiene la reproducciòn<br>` );
    break;
    //no disponible
    default:
    message.channel.send(`Comando no disponible, escriba ${prefix}help para mostrar la lista de comandos`);
    break;
  }
    
});

//voice connection 
//suscripcion a un canal de voz
 

// subscription could be undefined if the connection is destroyed!
if (subscription) {
	// Unsubscribe after 5 seconds (stop playing audio on the voice connection)
	setTimeout(() => subscription.unsubscribe(), 5_000);
}



//creacion de audio player
const player = createAudioPlayer();


//creacion de conexion
const connection = getVoiceConnection(myVoiceChannel.guild.id);
const connection = joinVoiceChannel({
	channelId: channel.id,
	guildId: channel.guild.id,
	adapterCreator: channel.guild.voiceAdapterCreator,
});

/*
player.stop();
player.pause();
player.unpause();
connection.destroy();
connection.subscribe(audioPlayer);
*/ 




//reproducir audio
const subscription = connection.subscribe(audioPlayer);
if (subscription) {
	// Unsubscribe after 5 seconds (stop playing audio on the voice connection)
	setTimeout(() => subscription.unsubscribe(), 5_000);
}








//login
client.login(token);


