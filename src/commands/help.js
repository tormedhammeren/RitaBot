// -----------------
// Global variables
// -----------------

// codebeat:disable[LOC,ABC,BLOCK_NESTING,ARITY]
const auth = require("../core/auth");
const colors = require("../core/colors");
const discord = require("discord.js");

// ------------------------
// Bot Help / Command List
// ------------------------

module.exports = function(data)
{
   data.color = "info";

   // ----------------------------------------------
   // Detect if help is needed for specific command
   // ----------------------------------------------

   var getHelpWith = "basics";

   if (data.cmd.params)
   {
      const cleanParam = data.cmd.params.toLocaleLowerCase().trim();
      getHelpWith = cleanParam;
   }

   data.text = helpMessage(data.config, data.bot.username, getHelpWith);

   // -------------
   // Send message
   // -------------

   return sendMessage(data);
};

// -------------
// Help Section
// -------------

const helpSection = function(data)
{
   var section =
      `${data.icon}  **[${data.title}](${data.link})**\n\n`
      //`\`${data.cmd} help ${data.help}\`\n\n`
      //"\n```cpp\n" +
      //`Command: "` +
      //`${data.cmd} ${data.cmd} ${data.args}"\n\n` +
      //`Example: "` +
      //`${data.cmd} ${data.cmd} ${data.example}"\n` +
      //`Help: "` +
      //`${data.cmd} help ${data.help}"` +
      //"\n```\n"
   ;

   return section;
};

// ----------
// Help Text
// ----------

const helpMessage = function(config, botname, param)
{
   // ---------
   // Bot Info
   // ---------

   const cmd = config.translateCmdShort;
   const long = config.translateCmd;

   const info =
   `**${botname} Bot - v.${config.version}**\n` +
   `Translates Discord messages (based on \`Google API\`).\n\n` +
   "```md\n" +
   `# All the commands can be found by entering the following:\n` +
   `* ${cmd} help commands = a list of all avaliable commands or \n` +
   `* ${cmd} help modules = a list of avaliable command modules` +
   "```\n\n";

   // ------------
   // Help Basics
   // ------------

   const basics =
   helpSection({
      config: config,
      title: "Translate by Reacting",
      link: "<https://ritabot.gg/trans-reac/>",
      icon: ":flag_white:",
      cmd: null,
      help: "react",
      args: null,
      example: "!t help react for examples"
   }) +
   helpSection({
      config: config,
      title: "Translate Custom Text",
      link: "<https://ritabot.gg/trans-cust/>",
      icon: ":abc:",
      cmd: "this",
      help: "custom",
      args: "to [lang] from [lang]: [msg]",
      example: "to french from english: hello"
   }) +
   helpSection({
      config: config,
      title: "Translate Last Message",
      link: "<https://ritabot.gg/trans-last/>",
      icon: ":arrow_double_up:",
      cmd: "last",
      help: "last",
      args: "[count] from [lang] to [lang]",
      example: "3 from german to spanish"
   }) +
   helpSection({
      config: config,
      title: "Translate Channel (Automatic)",
      link: "<https://ritabot.gg/trans-auto/>",
      icon: ":hash:",
      cmd: "channel",
      help: "auto",
      args: "from [lang] to [lang] for [@/#]",
      example: "from hebrew to arabic for me"
   }) +
   helpSection({
      config: config,
      title: "Stats",
      link: "<https://ritabot.gg/trans-misc/#statistics>",
      icon: ":bar_chart:",
      cmd: "stats",
      help: "stats",
      args: "stats [server/global]",
      example: ""
   }) +
   helpSection({
      config: config,
      title: "Settings",
      link: "<https://ritabot.gg/trans-sett/>",
      icon: ":gear:",
      cmd: "settings",
      help: "settings",
      args: "setLang to [lang]",
      example: "setLang to italian"
   }) +
   helpSection({
      config: config,
      title: "Misc. Settings",
      link: "<https://ritabot.gg/trans-misc/>",
      icon: ":robot:",
      cmd: "misc",
      help: "misc",
      args: "",
      example: ""
   }) +
   helpSection({
      config: config,
      title: "Tasks",
      link: "<https://ritabot.gg/trans-misc/#translations>",
      icon: ":clipboard:",
      cmd: "Tasks",
      help: "Tasks",
      args: "",
      example: ""
   }) +
   helpSection({
      config: config,
      title: "ReadMe",
      link: "<https://ritabot.gg/secure/>",
      icon: ":bookmark_tabs:",
      cmd: "readme",
      help: "readme",
      args: "",
      example: ""
   }) +
   helpSection({
      config: config,
      title: "Report Bugs / Request Features",
      link: "<https://github.com/RitaBot-Project/RitaBot/issues>",
      icon: "🙋🏽‍♀️"
   }) +
   helpSection({
      config: config,
      title: "Donate Via Open Collective",
      link: "<https://opencollective.com/ritabot-project>",
      icon: ":dollar: ",
      cmd: "donate",
      help: "donate",
      args: "oc",
      example: ""
   }) +
   helpSection({
      config: config,
      title: "Donate Via Github",
      link: "<https://github.com/sponsors/RitaBot-Project>",
      icon: ":dollar: ",
      cmd: "donate",
      help: "donate",
      args: "github",
      example: ""
   });


   // ----------------
   // Module Commands
   // ----------------

   const modules =
   `__**Modules**__\n\n` +
   `These will help you look through ${botname}'s commands.` +
   "```md\n" +

   `# Translation Help Modules\n` +
   `> ${cmd} help auto\n` +
   `> ${cmd} help react\n` +
   `> ${cmd} help last\n` +
   `> ${cmd} help this\n\n` +

   `# Translation Style Modules\n` +
   `> ${cmd} help embed\n` +
   `> ${cmd} help bot2bot\n\n` +

   `# Information Modules\n` +
   `> ${cmd} help stats\n` +
   `> ${cmd} help tasks\n` +
   `> ${cmd} help settings\n\n` +

   `# Other Modules\n` +
   `> ${cmd} help misc\n` +
   `> ${cmd} help report\n` +
   `> ${cmd} help readme\n` +
   `> ${cmd} help donate\n` +
   `> ${cmd} help debug\n` +
   `> ${cmd} help prefix\n` +
   "```";

   // -----------------
   // ReadMe + Discord
   // -----------------

   const readme =

   `**Github ReadMe**\n\n` +
   `To read the GitHub read me go here:\n` +
   `- https://github.com/RitaBot-Project/RitaBot/blob/master/README.md  \n\n` +
   `If you need to update your bot's version you can do so here:\n` +
   `- https://ritabot.gg/update/ \n\n` +
   `You can join Rita's Discord Support Server here: \n` +
   `- https://discord.gg/mgNR64R` +
   "\n\n";


   // --------------------------------
   // Report Bugs + Report in Discord
   // --------------------------------

   const report =
   `**Report Bugs**\n\n` +
   `You can report issues in Github here:\n` +
   `- https://github.com/RitaBot-Project/RitaBot/issues\n\n` +
   `Rita also has a support server with it's developers and contributors: \n` +
   `- https://discord.gg/mgNR64R \n` +
   "\n\n";

   // --------------
   // Commands List
   // --------------

   const commands =
   `__**All Available Commands**__\n\n` +
   `This is a list of all avaliable commands\n` +
   "```md\n" +
   `# Translation Commands\n` +
   `* ${cmd} this to [lang] from [lang]: [msg]\n` +
   `* ${cmd} last [n] to [lang] from [lang]\n` +
   `* ${cmd} channel to [lang] from [lang] for [me/@/#]\n` +
   `* ${cmd} auto to [lang] for [me/@/#]\n` +
   `* ${cmd} stop for [me/@/#]\n\n` +

   `# Information Commands\n` +
   `* ${cmd} tasks\n` +
   `* ${cmd} stats [server/global]\n` +
   `* ${cmd} version\n` +
   `* ${cmd} proc\n` +
   `* ${cmd} shards\n` +
   `* ${cmd} list\n\n` +

   `# Settings Commands\n` +
   `* ${cmd} settings updatebot\n` +
   `* ${cmd} settings updatedb\n` +
   `* ${cmd} settings setlang\n` +
   `* ${cmd} settings disconnect\n` +
   `* ${cmd} settings listservers\n\n` +

   `# Style Commands\n` +
   `* ${cmd} embed [on/off]\n` +
   `* ${cmd} bot2bot [on/off]\n` +
   `* ${cmd} prefix [prefix]\n\n` +

   `# Misc Commands\n` +
   `* ${cmd} invite\n` +
   `* ${cmd} help modules\n\n` +

   `# Debug Commands\n` +
   `* ${cmd} debug [on/pff]\n` +
   `* ${cmd} stats debug\n\n` +

   `# Want to Support RITA\n` +
   `* ${cmd} donate [oc/github]\n\n` +
   "```";

   // ----------------------
   // Custom message (this)
   // ----------------------

   const custom =
   `__**Translate Custom Message**__\n\n` +
   `Translates a custom message entered by user.\n` +
   "```md\n" +

   `# Command\n` +
   `> ${cmd} this: [msg] \n` +
   `> ${cmd} this to [lang] from [lang]: [msg] \n\n` +

   `# Parameters\n` +
   `> to [lang] - defaults to server default language\n` +
   `> to [lang, lang, ...] - translates to multiple languages\n` +
   `> from [lang] - defaults to automatic detection\n\n` +

   `# Examples\n` +
   `* ${cmd} this: bonjour \n` +
   `* ${cmd} this to spanish: hello world \n` +
   `* ${cmd} this to arabic, hebrew: I love you \n` +
   `* ${cmd} this to de from en: how are you? \n` +
   "```";

   // --------------------
   // Flag Emoji Reaction
   // --------------------

   const react =
   `__**Translate by reaction**__\n\n` +
   `# Add a message reaction with the flag of the language` +
   `you wish to translate to\n\n` +
   `# Examples\n` +
   `:flag_gb: = English\n` +
   `:flag_fr: = French\n\n` +
   ` Please note that only official country flags are registered`;

   // --------------------
   // Last Message (last)
   // --------------------

   const last =
   `__**Translate Last Message(s)**__\n\n` +
   `Translates last message chain(s) in channel. A chain is a collection of ` +
   `messages by the same author, to keep things simple.\n` +
   "```md\n" +

   `# Command\n` +
   `> ${cmd} last \n` +
   `> ${cmd} last [n] to [lang] from [lang] \n\n` +

   `# Parameters\n` +
   `> to [lang] - defaults to server default language\n` +
   `> to [lang, lang, ...] - translates to multiple languages\n` +
   `> from [lang] - defaults to automatic detection\n` +
   `> [n] - number of chains to translate, default is 1\n` +
   `> [-n] - negative number means only one chain is translated\n\n` +

   `# Examples\n` +
   `* ${cmd} last 2 \n` +
   `* ${cmd} last to english \n` +
   `* ${cmd} last to english, german, french \n` +
   `* ${cmd} last -6 to english from german` +
   "```";

   // -------------------------
   // Auto translate (channel)
   // -------------------------

   const auto =
   `__**Auto Translate Channels/Users**__\n\n` +
   `Automatically translates any new messages in channel and forwards them ` +
   `to you. Admins/mods can set forwarding to other channels or users in ` +
   `server. Messages in forwarded channels will also be sent back to origin*.` +
   "```md\n" +

   `# Command\n` +
   `> ${cmd} channel \n` +
   `> ${cmd} channel to [lang] from [lang] for [me/@/#] \n` +
   `> ${cmd} stop for [me/@/#] \n\n` +

   `# Parameters\n` +
   `> to [lang] - defaults to server default language\n` +
   `> from [lang] -  language to translate from, now includes 'auto'\n` +
   `> for [me/@/#] - defaults to "me", admins can use mentions \n\n` +

   `# Examples\n` +
   `* ${cmd} channel to english from chinese \n` +
   `* ${cmd} channel to en from de for #englishChannel \n` +
   `* ${cmd} channel to de from en for @steve \n` +
   `* ${cmd} channel to en from ru for #ch1, #ch2, #usr1 \n` +
   "```";

   // --------------
   // Tasks Command
   // --------------

   const tasks =
   `__**Channel Tasks**__\n\n` +
   `Displays translation tasks of the current channel` +
   "```md\n" +

   `# Displays translation tasks of the current channel\n` +
   `> ${cmd} tasks\n\n` +

   `# Displays translation tasks of specified channel\n` +
   `* COMING IN FUTURE UPDATE \n` +
   `> ${cmd} tasks for [#channel]\n` +
   "```";

   // ----------------------
   // Auto translate (stop)
   // ----------------------

   const stop =
   `__**Stop Auto Translation**__\n\n` +
   `Terminates auto-translation of channel for you. ` +
   `Admins/mods can stop for other channels or users in server.` +
   "```md\n" +

   `# Command\n` +
   `> ${cmd} stop \n` +
   `> ${cmd} stop for [me/@/#/all] \n\n` +

   `# Parameters\n` +
   `> for [me/@/#/all] - defaults to "me" \n\n` +

   `# Examples\n` +
   `* ${cmd} stop \n` +
   `* ${cmd} stop for me \n` +
   `* ${cmd} stop for @usr1 \n` +
   `* ${cmd} stop for #ch1 \n` +
   `* ${cmd} stop for all \n` +
   "```";

   // -------------
   // Misc Command
   // -------------

   const misc =
   `__**Miscellaneous Commands**__\n\n` +
   "```md\n" +

   `# Help\n` +
   `> ${cmd} help\n` +
   `> ${cmd} help [command]\n\n` +

   `# Links\n` +
   `> ${cmd} invite\n\n` +

   `# Supported Languages\n` +
   `> ${cmd} list\n\n` +

   `# Donate\n` +
   `> ${cmd} donate [oc/github]\n\n` +

   `# Prefix\n` +
   `> ${cmd} prefix\n\n` +
   "```";

   // -----------------
   // Settings Command
   // -----------------

   const settings =
   `__**Settings**__\n\n` +
   `These commands are available only to admins in server channels.` +
   "```md\n" +

   `# Set default server language\n` +
   `> ${cmd} settings setLang to [lang]\n\n` +

   `# Disconnect bot from server\n` +
   `> ${cmd} settings disconnect\n\n` +

   `# Displays list of servers the bot is in\n` +
   `> ${cmd} settings listservers\n\n` +
   "```";

   // -------------------
   // Statistics Command
   // -------------------

   const stats =
   `__**Statistics**__\n\n` +
   "```md\n" +

   `# Statistics\n` +
   `> ${cmd} version \n` +
   `> ${cmd} stats \n` +
   `> ${cmd} stats global \n` +
   `> ${cmd} stats server \n\n` +

   `* Admin Only - Do not use in public channels\n` +
   `> ${cmd} stats debug \n` +
   "```";

   // -----------
   // Embed Help
   // -----------
   const embed =
   `__**Message Embed Styles**__\n\n` +
   "```md\n" +

   `# Command\n` +
   `> ${cmd} embed [on/off]\n\n` +

   `# Parameters\n` +
   `> on - Turns on Embed Translation\n` +
   `> off - Turns on Webhook Translation Sending\n\n` +

   `# Examples\n` +
   `* ${cmd} embed on \n` +
   `* ${cmd} embed off \n` +
   "```";
   // -------------
   // Bot2bot Help
   // -------------

   const bot2bot =
   `__**Bot to Bot Translation**__\n\n` +
   "```md\n" +
   `* Usually 90% of bots ignore other bot messages but this feature attemptes to translate them.\n\n` +

   `# Command\n` +
   `> ${cmd} bot2bot [on/off]\n\n` +

   `# Parameters\n` +
   `> on - Turns on Bot2Bot Translations\n` +
   `> off - Turns off Bot2Bot Translations\n\n` +

   `# Examples\n` +
   `* ${cmd} bot2bot on \n` +
   `* ${cmd} bot2bot off \n` +
   "```";

   // -----------------
   // Debug Command
   // -----------------

   const debug =
   `__**Debug Webhook**__\n\n` +
   "```md\n" +

   `# Command\n` +
   `> ${cmd} debug [on/off]\n\n` +

   `# Parameters\n` +
   `> on - Turns debug webhook on\n` +
   `> off - Turns debug webhook off\n\n` +

   `# Examples\n` +
   `* ${cmd} debug on \n` +
   `* ${cmd} debug off \n` +
   "```";

   // ---------------
   // Prefix Command
   // ---------------

   const prefix =
   `__**Prefix**__\n\n` +
   "```md\n" +

   `# Command\n` +
   `> ${cmd} prefix [prefix]\n\n` +
   `> ${long} prefix [prefix]\n\n` +

   `# Parameters\n` +
   `> [prefix] - Changes the prefix of your bot commands\n` +
   `> reset - Reset your prefix back to default\n\n` +

   `# Examples\n` +
   `* ${cmd} prefix $tr - your prefix would now be $tr \n` +
   `* ${long} prefix $tr - your prefix would now be $tr \n` +
   `* ${cmd} prefix reset - resets your prefix back to !tr\n` +
   `* ${long} prefix reset - resets your prefix back to !tr\n` +
   "```";

   // ----------
   // Donations
   // ----------

   const donate =
   `__**Want to Donate to RITA's Development **__\n\n` +
   "```md\n" +

   `# Donate\n` +
   `* Becoming a Sponsor, Supporter or Backer of RitaBot will \n` +
   `* allow us to continue development long into the future, \n` +
   `* and constantly strive to add new features and functionality  \n` +
   `* to allow all users to break the language barrier and be  \n` +
   `* heard and understood regardless of the language spoken\n\n` +
   `> You can Donate at Github Sponsors\n` +
   `* ${cmd} donate github\n\n` +
   `> You can Donate at Open Collective\n` +
   `* ${cmd} donate oc\n\n` +
   `> Thank you for your continued support - RITA Dev Team` +
   "```";

   // ----------------
   // Proccess result
   // ----------------

   const paramMap =
   {
      "basics": info + basics,
      "modules": modules,
      "readme": readme,
      "report": report,
      "commands": commands,
      "custom": custom,
      "react": react,
      "last": last,
      "auto": auto,
      "tasks": tasks,
      "stop": stop,
      "misc": misc,
      "settings": settings,
      "stats": stats,
      "embed": embed,
      "bot2bot": bot2bot,
      "debug": debug,
      "prefix": prefix,
      "donate": donate
   };

   //if (paramMap.hasOwnProperty(param))
   if (Object.prototype.hasOwnProperty.call(paramMap,param))
   {
      return paramMap[param];
   }

   return paramMap.basics;
};

// ----------------------
// Send message function
// ----------------------

function sendMessage (data)
{
   data.message.delete(5000);
   const richEmbedMessage = new discord.RichEmbed()
      .setColor(colors.get(data.color))
      .setAuthor(data.bot.username, data.bot.displayAvatarURL)
      .setDescription(data.text)
      .setTimestamp()
      .setFooter("This message will self-destruct in one minute");

   return data.message.channel.send(richEmbedMessage).then(msg =>
   {
      msg.delete(60000);
   });
}