# JavaScript API

Tiny Chat has a small but efficient JavaScript API accessible via `window.tinyChat`.

## Events

Tiny Chat sends custom events that you can listen to. All event names are prefixed with `tinychat:`. You can access to the data of the event with `event.detail`.

| Event name                         | Detail data                                                                                  | Description                                             |
| ---------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `tinychat:ready`                   | none                                                                                         | Tiny Chat widget has finished its initialization phase. |
| `tinychat:widget-open`             | none                                                                                         | The widget has been opened.                             |
| `tinychat:widget-close`            | none                                                                                         | The widget has been closed.                             |
| `tinychat:email-validated`         | `email`: string                                                                              | The user has entered a valid email.                     |
| `tinychat:new-interaction-element` | `id`: interaction ID, `ts` : timestamp, `template`: InteractionTemplateEnum, `props`: object | A new interaction has been added to the widget.         |

## Interactions

Interactions are HTML sections in the widget, such as bot messages, email forms, and Slack replies. They are stored in the database and have an ID and a timestamp. Some interactions have custom properties, like the operator's name for the `operator-connected` interaction.

The `InteractionTemplateEnum` includes the following values: `message-bot` \| `message-slack` \| `message-user` \| `operator-connected` \| `email-input` \| `chat-locked` \| `custom`

Using the API, you can create your own interactions with custom HTML.

## Methods

-   `window.tinyChat.setIsOpen(isOpen: boolean)`: Opens or closes the widget.

-   `window.tinyChat.setSlackChannelID(channelID: str)`: Routes the user's message to a different channel ID. Tiny Chat bot must be added to the channel beforehand. The user's message should not have been sent to Slack yet.

-   `window.tinyChat.sendBotMessage({text: str, id: str})`: Sends a new message from the bot. It should have a unique ID to prevent sending it twice.

-   `window.tinyChat.sendCustomInteraction({html: str, id: str, text: str})`: Sends a new custom interaction with your own HTML as a string. The `text` attribute is sent to Slack. It should have a unique ID to prevent sending it twice.

-   `window.tinyChat.setTitle(text: str)`: Sets the title of the widget.

-   `window.tinyChat.setSubtitle(text: str)`: Sets the subtitle of the widget.

-   `window.tinyChat.setSendButtonEnabled(isEnabled: boolean)`: Enables or disables the 'send message' button.

## Logged-in user data

You can set `window.tinyChat.chatData` with identifying information about the user. This must be set before the conversation starts.

`chatData` is an object with the following format:

```javascript
window.tinyChat.chatData = {
    user_id: str,
    title?: str,
    other?: {
        email?: str,
        firstName?: str,
    },
};
```

Fields marked with `?` are optional.

`title`: Sets a custom title for the Slack message for customer support.

If `chatData` is filled, permalinks to past user messages will be appended to the Slack message.

## Other attributes

-   `window.tinyChat.disableAutomaticFlow: boolean`: et to `false` to disable all automatic interactions.

-   `window.tinyChat.locale: str`: Getter only. Retrieves the selected locale (language) of the widget. This is useful if you have enabled multiple languages for your widget, allowing you to send dynamic interactions in the appropriate language.

-   `window.tinyChat.interactionIDs: str[]`: Getter only. Retrieves a list of the interaction IDs present in the widget.

## Examples

-   [Logged-in user](./examples/logged-in-user.js): Use the user's name in interactions
-   [Trigger](./examples/trigger.js): Trigger a bot message after a delay
-   [Custom interaction and routing](./examples/custom-interaction-and-routing.js): Allow the user to pick a topic before sending the message to Slack.
