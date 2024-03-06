# Introduction to the Slack Event API

## What is the Slack Event API?

The [Slack Event API](https://api.slack.com/apis/connections/events-api) is a feature provided by Slack that allows developers to build applications that can listen for and respond to events that occur in a Slack workspace. 

`With the Slack events API, you will be able to react to new events on the #tiny-chat channel.`


## Getting Started

To get started with the Slack Event API, you'll need to:
1. **Create a Slack App**: [Register your application with Slack](https://api.slack.com/apps/new) and obtain credentials, if your team already has a custom Slack App you can use it too
2. **Subscribe to Events, choose permissions**: Choose which events your application wants to receive and choose the corresponding permissions
3. **Set up Event Endpoint**: Implement an event endpoint on your server to handle incoming events (you can use [ngrok](https://ngrok.com/) to test it locally)
4. **Verify Slack Requests**: You will need some code to [verify that Slack requests](https://api.slack.com/authentication/verifying-requests-from-slack) trully come from Slack
5. **Implement your custom flow logic**: copy / paste the code of the flow you want to implement
6. **Add your slack app to #tiny-chat channel**: tag the slack app name on a new message on #tiny-chat channel, this will prompt a window to add the slack app to the channel