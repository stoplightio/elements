# Layout

The following section applies both to APIs and Stoplight project components. The example focuses on APIs.

When you render the API component on your page without any additional styling, it behaves like a regular `div` element. In particular, this means that it grows in height indefinitely, depending on how much content it has. This was done so that the component behaves as predictably as possible.

A second and recommended layout option exists, however. API has two scrollable areas built-in inside: the Table of Contents and the actual content. This makes scrolling through massive API docs much more pleasant.

To achieve that effect, you just have to limit the height of the API component. 

For example, if you have an empty page displaying *only* the API component, you can limit the height of `body` container:

```html
<body style="height: 100vh;">
    <stoplight-api />
</body>
```

If you have some additional components above and/or below API, you can use a flexbox layout. This is the layout used in most examples:

```html
<body>
    <header>Some header</header>
    <div class="api-container">
        <stoplight-api />
    </div>
    <footer>Some footer</footer>
</body>
<style>
    body {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    .api-container {
        flex: 1 0 0;
        overflow: hidden;
    }
</style>
```

These are just recommendations. You can use any HTML/CSS approach to limit the height of the API component.

Also, you don't *have to* limit the height. The API component without any additional styling works correctly and looks aesthetic. You just won't get the "two scroll bars" functionality.
