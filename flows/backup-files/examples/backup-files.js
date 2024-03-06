// Code example for node.js using Express.js framework
// This code was generated by chatGPT from pseudo-code
// If you spot an issue, feel free to create a PR to fix it

const { WebClient } = require('@slack/web-api');
const axios = require('axios');
const { SlackApiError } = require('@slack/web-api');


const slackSigningSecret = 'YOUR_SLACK_SIGNING_SECRET';
const slackToken = 'YOUR_SLACK_API_TOKEN';

const slackClient = new WebClient(slackToken);


function downloadFile(fileLink) {
    console.log("Downloading file:", fileLink);
    return axios.get(fileLink)
        .then(response => {
            if (response.status === 200) {
                return response.data;
            } else {
                console.log("Error downloading file:", fileLink);
                return null;
            }
        })
        .catch(error => {
            console.error("Error downloading file:", error);
            return null;
        });
}

async function rewriteMessage(event, newText) {
    const channelID = event.channel;
    const messageTS = event.ts;

    try {
        const response = await slackClient.chat.update({
            channel: channelID,
            ts: messageTS,
            text: newText
        });

        if (response.ok) {
            console.log("Message updated successfully!");
        } else {
            console.log(`Failed to update message: ${response.error}`);
        }
    } catch (error) {
        if (error instanceof SlackApiError) {
            console.log(`Error updating message: ${error.response.error}`);
        } else {
            console.error("Error updating message:", error);
        }
    }
}

// This is the main function of your flow, use it on your route which listens to Slack events API
function backupFiles(req) {
    const { event, type } = req.body;

    if (
        type === 'message' &&
        event.thread_ts &&
        event.bot_id &&
        event.text.includes('https://files.tiny-chat.com')
    ) {
        const pattern = /https:\/\/files\.tiny-chat\.com\S+\|/;
        const match = event.text.match(pattern);

        if (match) {
            const fileLink = match[0];
            console.log("Found a Tiny Chat file link:", fileLink);

            downloadFile(fileLink)
                .then(fileContent => {
                    if (fileContent) {
                        let newFileLink = null;
                        // TODO: Upload the file to your own storage and return the new file link
                        // newFileLink = uploadToStorage(fileContent);
                        const newText = event.text.replace(pattern, newFileLink);
                        rewriteMessage(event, newText);
                    }
                })
                .catch(error => {
                    console.error("Error downloading file:", error);
                });
        }
    }

    res.sendStatus(200);
};