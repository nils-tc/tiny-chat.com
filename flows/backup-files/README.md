# Custom flow for files backup 

The objective of this custom flow is to backup files on your own storage instead of the temporary Tiny Chat S3 storage.

> **TL;DR** You will have to listen to new messages events on the `#tiny-chat` channel with the Slack events API, check if the message contains a file link from Tiny Chat. If yes, you will backup the file on your own storage and rewrite the message on the slack channel to put your own storage link.

To achieve this, follow these steps:

## 1- Set up Slack app 

Firstly, ensure you have your own Slack app. If not, refer to [this guide](/slack-app/README.md) to create one. You can utilize the provided [app manifest](app-manifest.json) file to request the necessary permissions required for this flow.

## 2- Enable Slack Events API

Next, enable the Slack Events API to receive events from the `#tiny-chat` channel. Refer to [this guide](/slack-events-api/README.md) for detailed instructions on enabling the Slack Events API.

## 3- Implement flow logic

After setting up the Slack app and enabling the Events API, implement the flow logic to handle incoming events. You can find code examples in various programming languages in [this directory](examples). Adapt the logic to listen for new message events in the `#tiny-chat` channel, check if the message contains a file link from Tiny Chat, and if so, backup the file to your own storage. Finally, rewrite the message on the Slack channel to include the link to your own storage.