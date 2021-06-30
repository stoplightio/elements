# Layout

The following section applies both to API and Stoplight Project components. We will focus on API as an example.

When you render the API component on your page without any additional styling, it behaves like a regular `div` element. In particular this means that it will grow in height indefinitely, depending on how much content it has inside. We did this because we wanted the component to behave as predictably as possible.

There exists however a second layout option, which we recommend. API has two scrollable areas built-in inside - one on Table of Contents and one on the actual content. This makes scrolling through massive API docs much more pleasant.

In order to achieve that effect, you just have to limit the height of API component. 

For example if you have an empty page displaying *only* the API component, you can limit the height of `body` container:

```html
<body style="height: 100vh;">
    <stoplight-api />
</body>
```

If you have some additional components above and/or below API, you can use a flexbox layout. This is in fact the layout that we use in majority of our examples:

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

Note that those are only our recommendations. You can use any other HTML/CSS approaches to limit the height of API component.

Also, you don't *have to* limit the height. The API component without any additional styling will still work 100% correctly and look aesthetic. You just won't get the "two scrollbars" functionality.
