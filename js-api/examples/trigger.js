const PRODUCT_NAME = "Air Jordan 3 Retro";

async function trigger() {
    // this will disable automatic messages
    window.tinyChat.disableAutomaticFlow = true;

    // this will send a custom message from the bot
    await window.tinyChat.sendBotMessage({
        // you can also apply some translation and use window.tinyChat.locale to retrieve the locale of the Tiny Chat widget (which depends on your dashboard settings and language of customer)
        text: `Hello, do you know that we offer free shipping if you buy a new pair of ${PRODUCT_NAME}?`,
        id: "trigger-message",
    });

    // show the message in a notification
    window.tinyChat.showNotification();
}

document.addEventListener("tinychat:ready", () => {
    // trigger a message after 5 seconds
    setTimeout(() => {
        // if there is no interaction (the chat has not started)
        if (window.tinyChat.interactionIDs.size == 0) {
            trigger();
        }
    }, 5000);
});
