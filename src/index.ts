import { App, AppInfo, AppSlide, SlideMaker } from "tickerowl-app-base";

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
              SlideMaker.text({ text: data.profile.personaname }),
              SlideMaker.keyValue({
                key: "Rank",
                value: data.leaderboard_rank.toString(),
              }),
              SlideMaker.keyValue({
                key: "Tier",
                value: data.rank_tier.toString(),
              }),
            ],
          };
        },
      },
    };
  }
}
