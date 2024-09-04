const PRODUCT_NAME = "Air Jordan 3 Retro";

async function sendTrigger() {
    // this will disable automatic messages
    window.tinyChat.disableAutomaticFlow = true;

    // this will send a custom message from the bot
    await window.tinyChat.sendBotMessage({
        // you can also apply some translation and use window.tinyChat.locale to retrieve the locale of the Tiny Chat widget (which depends on your dashboard settings and language of customer)
        text: `Hello, do you know that we offer free shipping if you buy a new pair of ${PRODUCT_NAME}?`,
        id: "trigger-message",
    });

    // you can also send custom HTML, such as an action button
    await window.tinyChat.sendCustomInteraction({
        html: '<a href="/checkout"><button>I am interested!</button></a>',
        id: "action",
    });

    // open the widget
    window.tinyChat.setIsOpen(true);
}

document.addEventListener("tinychat:ready", () => {
    // trigger a message after 30 seconds
    setTimeout(() => {
        // if there is no interaction (the chat has not started)
        // or if there was only a welcome message (if the user has previously clicked on the widget)
        if (window.tinyChat.interactionIDs.size <= 1) {
            sendTrigger();
        }
    }, 30000);
});
