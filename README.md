# friendem 🤖 ➡️ 👫

Automatically accepts incoming Steam friend requests & sends them a custom greeting.

## Instructions
```
npm install
```

### Edit the configuration options
Open `config.json` and edit the options.

**username** *(string)* **(required)**\
Steam username

**password** *(string)* **(required)**\
Steam password

**machine** *(string)* **(optional)**\
Machine name provided to steam auth

**online** **(required)** *(`true`, `false`, `custom`)*\
Online status

**msg** *(string)* **(optional)**\
Greeting message when online === `true`

**afk_msg** *(string)* **(optional)**\
Greeting message when online === `false`

**custom_msg** *(string)* **(optional)**\
Greeting message when online === `custom`

#### Hot options
Changes made to `online`, `msg`, `afk_msg` & `custom_msg` are reloaded in real time & doesn't require an app restart.

### Run the 🤖
```
npm start
```

### Wait for some friends to add you.

## License
This project is under the MIT license.
