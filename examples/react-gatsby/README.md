# Stoplight Elements - Gatsby Example

Stoplight Elements provides components that can be used in any React application.
This example project demonstrates usage with Gatsby.

## Table Of Contents

* [Try the example locally](#try-the-example)
* [Set up Elements in your own Gatsby app](#elements-in-your-gatsby-app)
  * [Step 1 - Install Elements](#step-1---install-elements)
  * [Step 2 - Include the styles](#step-2---include-the-styles)
  * [Ready to go](#ready-to-go)

## Try the example

Clone the [@stoplight/elements-starter-gatsby](https://github.com/stoplightio/elements-starter-gatsby) and install dependencies.

```bash
git clone https://github.com/stoplightio/elements-starter-gatsby.git

cd elements-starter-gatsby

yarn
```

Alternatively install it as a Gatsby starter using `gatsby-cli`.

```bash
yarn global add gatsby-cli

gatsby new elements-starter-gatsby https://github.com/stoplightio/elements-starter-gatsby

cd elements-starter-gatsby

yarn
```

If the above was successful, you can launch the example project using `yarn start`.

Now if you open your browser and navigate to `http://localhost:8000/` as instructed, you will see a page with two links to Stoplight Elements components.

![example](https://user-images.githubusercontent.com/14196079/91562747-00453080-e93e-11ea-9e6a-49e6647c594c.png)

## Elements in your own Gatsby app

### Step 1 - Install Elements

Install Elements and it's peer dependencies:

```bash
yarn add @stoplight/elements @stoplight/prism-http mobx
```

### Step 2 - Include the styles

You can import the CSS file directly into your component files

```jsx
import '@stoplight/elements/styles/elements.min.css';
```

or into your CSS

```css
@import '~@stoplight/elements/styles/elements.min.css';
```

### Ready to go

Congratulations! At this point, you are ready to use *Stoplight Elements* in your Gatsby application.
