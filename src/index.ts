import { App, AppInfo, AppSlide } from "tickerowl-app-base";

export default class DotaApp implements App {
  getInfo(): AppInfo {
    return {
      id: "dota-app",
      name: "Dota 2 App",
      description: "Show your Dota 2 rank & tier",
      version: 1,
      author: "Pramod",
      authorXUrl: "https://twitter.com/@pramodk73",
      authorGitHubUrl: "https://github.com/pskd73",
    };
  }

  getSlides(): Record<string, AppSlide> {
    return {
      "dota-ranks": {
        title: "Dota 2 Ranks",
        description: "Shows your Dota 2 rank & tier",
        inputs: {
          "account-id": {
            type: "text",
            label: "Account ID",
            required: true,
            placeholder: "Enter your Dota 2 account ID. Ex: 76561197960287930",
          },
        },
        getData: async ({ inputs }) => {
          const accountId = inputs["account-id"];

          const response = await fetch(
            `https://api.opendota.com/api/players/${accountId.value.value}`
          );
          const data = await response.json();

          return {
            slides: [
              {
                type: "TEXT",
                text: data.profile.personaname,
              },
              {
                type: "KEY_VALUE",
                key: "Rank",
                value: data.leaderboard_rank.toString(),
              },
              {
                type: "KEY_VALUE",
                key: "Tier",
                value: data.rank_tier.toString(),
              },
            ],
          };
        },
      },
    };
  }
}
