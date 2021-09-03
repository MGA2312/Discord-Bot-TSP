
//requires, etc
require('dotenv').config();
const { Client, Intents } = require ( 'discord.js' );
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { token } = require('./config.json');
const ytdl = require('ytdl-core');
const queue = new Map();

const { generateDependencyReport } = require('@discordjs/voice');

console.log(generateDependencyReport());


//confirmo inicio en qmt
client.on('ready', () => {
	console.log(`${client.user.username} actualizo en QMT`);
    var generalChannel = client.channels.cache.get("882836363953721346")
});


//Prueba
client.on("message", message => {
  if(message.content.startsWith("hola")){
    message.channel.send("tu nariz contra mis bolas, te falta calle...");
  }
});

//comandos
const prefix = '/';

client.on('message', async message=> {
  if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const serverQueue = queue.get(message.guild.id);

    //comandos
    switch (command) {
    //play
    case "play":
      execute(message, serverQueue);
      message.channel.send("Reproduciendo...");
    break;
    //skip
    case "skip":
      skip(message, serverQueue);
      message.channel.send("Siguiente...");
    break;
    //stop
    case "stop":
      stop(message, serverQueue);
      message.channel.send("Stopeado rey");
    break;
    //help
    case "help":
      message.channel.send("Por ahora no esta disponible (paja armarla)");
    break;
    //no disponible
    default:
    message.channel.send(`Comando no disponible, escriba ${prefix}help para mostrar la lista de comandos`);
    break;
  }
    
});

//agregar canciones a la cola


async function execute(message, serverQueue) {
  const args = message.content.split(" ");
  const voiceChannel = message.member.voice.channel;
  
  

  if (!voiceChannel)
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  } 

  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
   };

  if (!serverQueue) {
    // Crea "contrato"(funcion) de la cola
  const queueContruct = {
    textChannel: message.channel,
    voiceChannel: voiceChannel,
    connection: null,
    songs: [],
    volume: 5,
    playing: true,
  };

 // configura usando el contrato
 queue.set(message.guild.id, queueContruct);

 // agrega a la cola la cancion
 queueContruct.songs.push(song);

 try {
  // Intenta conectar al canal de voz
  var connection = await voiceChannel.join();
  queueContruct.connection = connection;
  // le da play a la cancion
  play(message.guild, queueContruct.songs[0]);
 } catch (err) {
  // si no puede entrar pasa el error por consola
  console.log(err);
  queue.delete(message.guild.id);
  return message.channel.send(err);
 }
  }
  else { 
  serverQueue.songs.push(song);
  return message.channel.send(`${song.title} se agrego a tu cola`);
  } 
  }

//reproduce canciones
function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  //si no escribiste cancion borra de la cola la peticion
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
    const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Reproduciendo: **${song.title}**`);
  
  } 

  function skip(message, serverQueue) {
    //si no esta en chat de voz...
    if (!message.member.voice.channel)
      return message.channel.send(
        "Tenés que estar en un chat de voz"
      );
    if (!serverQueue)
      return message.channel.send("No hay otras canciones en la cola xd");
    serverQueue.connection.dispatcher.end();
  }

  function stop(message, serverQueue) {
    if (!message.member.voice.channel)
      return message.channel.send(
        "Tenés que estar en el chat de voz para detener"
      );
    
    if (!serverQueue)
      return message.channel.send("No hay nada que detener xd");
      
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
  }

//login
client.login(token);


