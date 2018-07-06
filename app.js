const SteamUser = require('steam-user')
const client = new SteamUser()
const Config = require('./config.json');

client.logOn({
  accountName: Config.username,
  password: Config.password,
  machineName: Config.machine
})

client.on('loggedOn', function(details) {
	console.log("Logged into Steam as " + client.steamID.getSteam3RenderedID())
	client.setPersona(SteamUser.EPersonaState.Online)
})

client.on('steamGuard', function(domain, callback) {
	console.log("Steam Guard code needed from email ending in " + domain)
	let code = getCodeSomehow()
	callback(code)
})

client.on('error', function(e) {
	console.log(e)
})

// client.on('friendMessage', function(steamID, message) {
//   process.stderr.write("\007");
// 	console.log("Friend message from " + steamID.getSteam3RenderedID() + ": " + message)
// });


client.on("friendRelationship", function(steamID, relationship) {
  if (relationship == SteamUser.EFriendRelationship.RequestRecipient) {
    process.stderr.write("\007")
    client.addFriend(steamID)
    console.log("Friend request accepted")
    client.chatMessage(steamID, Config.message)
    console.log("Welcome message sent")
  }
})
