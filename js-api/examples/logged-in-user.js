document.addEventListener("tinychat:ready", () => {
    // Provide your own user
    const user = {
        email: "john@example.com",
        firstName: "John",
        id: 123,
    };

    // custom flow for connected user
    if (user) {
        // this will disable automatic messages
        window.tinyChat.disableAutomaticFlow = true;

        // this will give user information in the slack thread
        window.tinyChat.chatData = {
            title: `New message from ${user.email}`,
            user_id: user.id,
            other: {
                email: user.email,
                firstName: user.firstName,
            },
        };

        // this will send a welcome message from the bot
        window.tinyChat.sendBotMessage({
            // you can also apply some translation and use window.tinyChat.locale to retrieve the locale of the Tiny Chat widget (which depends on your dashboard settings and language of customer)
            text: `Hello ${user.firstName}, how can we help you today?`,
            // ID is necessary to prevent duplication of messages
            id: "welcome",
        });

        // react to the first message of the user
        document.addEventListener(
            "tinychat:new-interaction-element",

            // use our debounce helper to not reply immediatly but after a short period if there was no new message
            window.tinyChat.debounceAnswer((event) => {
                // new interaction in the widget, it is a message from user
                if (event.detail.template == "message-user") {
                    window.tinyChat.sendBotMessage({
                        text: `Thank you ${user.firstName}, please wait a bit for a member of our team to join the chat.`,
                        id: "wait-a-bit",
                    });
                }
            })
        );
    }
});
