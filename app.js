const SteamUser = require('steam-user')
const fs = require('fs')
const client = new SteamUser()
const logger = require('./logger')
const Config = require('./config.json');

let count = 0

client.setOption('dataDirectory', './sentry/')
client.setOption('singleSentryfile', true)

if (fs.existsSync('./sentry/sentry.bin')) {
  let sentry = fs.readFileSync('./sentry/sentry.bin')
  client.setSentry(sentry);
  logger.log({level: 'info', message: '[STEAM] logging in with sentry'})
} else {
  logger.log({level: 'info', message: '[STEAM] logging in without sentry'})
}

client.logOn({
  accountName: Config.username,
  password: Config.password,
  machineName: Config.machine
})

client.on('loggedOn', function(details) {
  logger.log({level: 'success', message: 'Logged into Steam as ' + Config.username})
	client.setPersona(SteamUser.EPersonaState.Online)
})

client.on('steamGuard', function(domain, callback) {
  logger.log({level: 'warn', message: 'Steam Guard code needed from email ending in ' + domain})
	let code = getCodeSomehow()
	callback(code)
})

client.on('error', function(e) {
	console.log(e)
})

// client.on('friendMessage', function(steamID, message) {
//   process.stderr.write('\007');
// 	console.log('Friend message from ' + steamID.getSteam3RenderedID() + ': ' + message)
// });

client.on('friendRelationship', function(steamID, relationship) {
  if (relationship == SteamUser.EFriendRelationship.RequestRecipient) {
    count++
    process.stderr.write('\007')
    client.addFriend(steamID)
    logger.log({level: 'success', message: 'Friend request accepted #' + count})
    client.chatMessage(steamID, Config.message)
    logger.log({level: 'info', message: 'Welcome message sent'})
  }
})
