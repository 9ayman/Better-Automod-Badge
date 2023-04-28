const { Client } = require("discord.js");
const client = new Client({
  intents: 3276799,
});

const config = require("./config.json");

client.on("ready", async () => {
  try {
    const guilds = client.guilds.cache

    const promises = guilds.map(async (guild) => {
      const automodTypes = [1, 3, 4, 5];
      const promises = automodTypes.map(async (type) => {
        try {
          await guild.autoModerationRules.create({
            name: `Automod by NovaWorld, edited by Hawk.`,
            creatorId: `820361590826205215`,
            enabled: true,
            eventType: 1,
            triggerType: type,
            triggerMetadata: {
              presets: [1, 2, 3]
            },
            actions: [
              {
                type: 1,
                metadata: {
                  channel: guild.channels.cache.first(),
                  durationSeconds: 10,
                  customMessage: 'Ce message a été bloqué par NovaWorld'
                }
              }
            ]
          });
          console.log(`Automod created in ${guild.name} for type ${type}`);
        } catch (err) {
          console.log(`Automod of type ${type} already exists in ${guild.name}`);
        }
      });

      return Promise.all(promises);
    });

    await Promise.all(promises);

    console.log("All automods created successfully.");
  } catch (err) {
    console.error(`Error while creating automods: ${err}`);
  }
});

client.login("token");
