// fill here your choices and Slack channels IDs.
const CHOICES = [
    { name: "Finance", channel: "XXXX" },
    { name: "Marketing", channel: "YYYY" },
    { name: "Other", channel: "" }, // leave default Slack channel
];

// triggered after user has made a choice
const onUserChoice = (button) => {
    window.tinyChat.setSendButtonEnabled(true);
    const channel = button.dataset.channel;
    if (channel) {
        window.tinyChat.setSlackChannelID(channel);
    }
    window.tinyChat.sendBotMessage({
        text: "How can we help on this topic? Write your message to us.",
        id: "post-routing",
    });
};

// make it available anywhere within the page
window.onUserChoice = onUserChoice;

// build your own HTML for the choices
const choicesOptionsHTML = CHOICES.map(
    (choice) =>
        `
    <div 
        class="tc-message" 
        style="cursor:pointer;" 
        data-channel="${choice.channel}"
        onClick="window.onUserChoice(this)"
    >
        • ${choice.name}
    </div>
    `
).join("\n");

const choicesHTML = `
    <div class="tc-message" style="margin-bottom:8px;">Hello ! Which topic do you want to talk about?</div>
    <div style="font-size:11px;color:var(--grey-widget-normal);margin-bottom:16px;font-style:italic;">Click on your choice.</div>
    <div style="display:flex;flex-direction:column;gap:16px;align-items:start;">
        ${choicesOptionsHTML}
    </div>
`;

// Message to send to the Slack thread
const choicesNames = CHOICES.map((choice) => choice.name);
const message = `Hello ! Which topic do you want to talk about? Options : ${choicesNames}`;

// wait for tinychat:ready event before using window.tinyChat
document.addEventListener("tinychat:ready", () => {
    window.tinyChat.disableAutomaticFlow = true;

    // disable the send button, the user must choose a topic before writing a new message
    window.tinyChat.setSendButtonEnabled(false);

    // send your own html for the choices
    window.tinyChat.sendCustomInteraction({
        html: choicesHTML,
        text: message,
        id: "routing",
    });
});
