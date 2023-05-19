const { Client } = require("discord.js");
const config = require("./config.json");
const client = new Client({
  intents: 3276799,
});

const guildIgnoreList = ["Guilds to ignore"];

client.on("ready", async () => {
  try {
    const guilds = client.guilds.cache;

    const promises = guilds.map(async (guild) => {
      const automodTypes = [1, 3, 4, 5];
      const promises = [];

      if (!guildIgnoreList.includes(guild.id)) {
        // Loop 7 times for type 1 automod
        for (let i = 0; i < 7; i++) {
          promises.push(
            guild.autoModerationRules
              .create({
                name: `Automod by NovaWorld, edited by Hawk.`,
                creatorId: `820361590826205215`,
                enabled: true,
                eventType: 1,
                triggerType: 1,
                triggerMetadata: {
                  presets: [1, 2, 3],
                },
                actions: [
                  {
                    type: 1,
                    metadata: {
                      channel: guild.channels.cache.first(),
                      durationSeconds: 10,
                      customMessage: "By Hawk",
                    },
                  },
                ],
              })
              .then(() =>
                console.log(`Automod created in ${guild.name} for type 1`)
              )
              .catch((err) =>
                console.log(`Automod of type 1 already exists in ${guild.name}`)
              )
          );
        }

        // Create other types of automod
        automodTypes.forEach((type) => {
          if (type === 1) return;
          promises.push(
            guild.autoModerationRules
              .create({
                name: `Automod by NovaWorld, edited by Hawk.`,
                creatorId: `820361590826205215`,
                enabled: true,
                eventType: 1,
                triggerType: type,
                triggerMetadata: {
                  presets: [1, 2, 3],
                },
                actions: [
                  {
                    type: 1,
                    metadata: {
                      channel: guild.channels.cache.first(),
                      durationSeconds: 10,
                      customMessage: "By Hawk",
                    },
                  },
                ],
              })
              .then(() =>
                console.log(`Automod created in ${guild.name} for type ${type}`)
              )
              .catch((err) =>
                console.log(`Automod of type ${type} already exists in ${guild.name}`)
              )
          );
        });
      }

      return Promise.all(promises);
    });

    await Promise.all(promises);

    console.log("All automods created successfully.");
  } catch (err) {
    console.error(`Error while creating automods: ${err}`);
  }
});

client.login(config.token);
