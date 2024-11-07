### Customizing Tiny Chat Widget Styles

In some cases, the appearance settings on the Tiny Chat dashboard may not fully align with your brand’s unique identity. To enable more precise customization, you can apply custom CSS by overriding Tiny Chat’s styling.

### How Tiny Chat Manages Styles

The Tiny Chat widget is encapsulated within a shadow DOM to prevent your page's CSS from affecting its styling. To customize Tiny Chat, you can add a `<template>` tag with your CSS rules, which Tiny Chat will read and apply within the shadow DOM.

### Example: Overriding Tiny Chat CSS Variables

Here is a basic example to modify Tiny Chat’s CSS variables, enabling you to adjust colors, fonts, and images.

```html
<template id="css-for-tiny-chat">
    <style>
        #tc-container {
            --main-color: red !important;
            --bubble-image: url("your_image_url") !important;
            --font-family: "Nunito, Mulish, Arial" !important;
        }
    </style>
</template>
```

> **Note:** Be sure to include `!important` after each rule to ensure your custom styles override the defaults.

The `<template>` tag must have the ID `css-for-tiny-chat`. You can place this `<template>` tag in your header, ideally right before the Tiny Chat import script line.

#### Tip: Access CSS Variables

To view the complete list of available CSS variables, inspect the Tiny Chat widget in your browser. Most variables are located in `#tc-container`.

### Example: Customizing the Chat Button Shape

You can also override specific styles to modify the widget’s appearance, such as making the chat button square:

```html
<template id="css-for-tiny-chat">
    <style>
        #tc-bubble {
            width: 150px !important;
            height: 50px !important;
            border-radius: 8px !important;
        }

        #tc-bubble #close-svg {
            width: 30px !important;
        }
    </style>
</template>
```

### Setting a Custom Bubble Image

To apply a custom bubble image, make sure you’ve uploaded one in the Tiny Chat dashboard. If no image is set, the default icon will display even if you include an override in your CSS.

### What if I cannot use templates?

In some cases it's not possible for you to use `<template>`, it has happened for a customer who uses webstudio for his website.
In this case you can remove the `<template>`, it will also work.

```html
<style id="css-for-tiny-chat">
    #tc-container {
        --main-color: red !important;
        --bubble-image: url("your_image_url") !important;
        --font-family: "Nunito, Mulish, Arial" !important;
    }
</style>
```

> **Note:** Using a template is better to be sure that the style will not be applied to your website.
