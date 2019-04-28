const SteamUser = require('steam-user')
const fs = require('fs')
const client = new SteamUser()
const logger = require('./logger')
const SelfReloadJSON = require('self-reload-json');
let config = new SelfReloadJSON(__dirname + '/config.json');

config.on('error', function(e) {})
config.on('updated', function(e) {
  logger.log({level: 'info', message: 'Reloaded config'})
})

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
  accountName: config.username,
  password: config.password,
  machineName: config.machine,
  twoFactorCode: config.auth || ''
})

client.on('loggedOn', function(details) {
  logger.log({level: 'success', message: 'Logged into Steam as ' + config.username})
	client.setPersona(SteamUser.EPersonaState.Online)
})

client.on('steamGuard', function(domain, callback) {
  logger.log({level: 'warn', message: 'Steam Guard code needed from email ending in ' + domain})
	let code = getCodeSomehow()
	callback(code)
})

client.on('error', function(e) {
	logger.log({level: 'error', message: 'An error occured: ' + e.message})
})

client.on('friendRelationship', function(steamID, relationship) {
  if (relationship == SteamUser.EFriendRelationship.RequestRecipient) {
    count++
    process.stderr.write('\007')
    client.addFriend(steamID)
    logger.log({level: 'success', message: 'Friend request accepted #' + count})
    if (config.online == 'custom') {
      client.chatMessage(steamID, config.custom_msg)
    } else if (config.online) {
      client.chatMessage(steamID, config.msg)
    } else {
      client.chatMessage(steamID, config.afk_msg)
    }
  }
})
