# UI-KIT

[![Maintainability](https://api.codeclimate.com/v1/badges/f0df5b38120a6471be33/maintainability)](https://codeclimate.com/repos/5bdb489c9a98842d0a00d211/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/f0df5b38120a6471be33/test_coverage)](https://codeclimate.com/repos/5bdb489c9a98842d0a00d211/test_coverage)

Stoplight UI-Kit is a shared component library that contains basic components built using [Blueprint](https://blueprintjs.com/docs/), [Tailwind](https://next.tailwindcss.com/), and [SCSS](https://sass-lang.com/guide) All custom components should support overridable theming from a theme object, and also come with default styling from our prepackaged theme.

- Explore the components: [Storybook](https://stoplightio.github.io/ui-kit/)
- View the changelog: [Releases](https://github.com/stoplightio/ui-kit/releases)

### Installation

```bash
# latest stable + required dependencies
yarn add @stoplight/ui-kit
```

## Important Commands

- `yarn storybook`: Starts the storybook playground
- `yarn build`: Builds the package.
- `yarn build.styles`: Builds and copies over the appropriate scss related files to dist.
- `yarn build.tw`: Generates the tailwind scss file from the config (needs to be rerun everytime `tailwind.config` is updated).
- `yarn build.bp`: Generates the blueprint icons scss file (should not need to run often)

## Important Files/Folders

#### [./src/styles/blueprint](./src/styles/blueprint)

- [\_base.scss](./src/styles/blueprint/_base.scss):
  Contains a remapping of stoplight variables to blueprint variables. This file should rarely be edited directly and require minimal maintenance. Any updates to variables in here should be updated through [\_variables.scss](./src/styles/common/_variables.scss)

- [\_icons.scss](./src/styles/blueprint/_icons.scss): Auto generated file of blueprint icon fonts. Created with the `yarn build.bp` command and should not be updated directly

- [icons directory](./src/styles/blueprint/icons): Icon fonts used by \_icons.scss

#### [./src/styles/tailwind](./src/styles/tailwind)

- [\_base.scss](./src/styles/tailwind/_base.scss): Auto generated tailwind classnames that utilize our stoplight scss variables. This file should NEVER be updated directly and is created using `yarn build.tw`

- [tailwind.config.js](./src/styles/tailwind/tailwind.config.js): Tailwind config object. Note two special features. A few properties, like colors, map to scss [utility function](./src/styles/common/_utils.scss) strings so that we can properly convert to our scss theme variable during the compile process. And the inclusing of a `.dark` plugin that adds extra dark classes so we can do things like `className="text-success dark:text-danger"`

#### [./src/styles/common](./src/styles/common)

- [\_variables.scss](./src/styles/common/_variables.scss): Contains three major variables used for style consistency:

  - `$sl-defaults`: app wide defaults, this where we define defaults for things we might want an end consumer to overwrite. This should never be used outside of this file. Notice that it extends the defaults/variables from specific components like "code"

  - `$sl-config`: This is an empy variable with a default value of `()`, think of it as an empty representation of what a consumer might pass to ui-kit. It is needed since scss `map-merge` does not deep merge, so we cannot explicity overwrite `$sl-defaults`. For more information on this see [example usage below](#example-usage). This should never be used elsewhere within this repo

  - `$sl-variables`: A map that equals a deep merge of consumer passed in `$sl-config` and internally defined `$sl-defaults`. This is the actual variable map that our theme with be using. and should only every be used in [\_theme]()./src/styles/common/\_theme.scss)

- [\_theme.scss](./src/styles/common/_theme.scss): Contains our SCSS Theme `$sl-theme` and helpful theme getters!! Includes any values that we think might be valuable to other components. Notice that colors uses `$sl-variables` because we allow that value to be overwritten by a consumer. It's set up in such a way that that we will have complete control over how these properties behave. (colors can be changed but font sizes for example cannot). The theme will also include any fields from \$sl-variables that are not explicity defined in the main `$sl-theme` map. So for example, although `code-editor` does not appear in `$sl-theme` directly it's still included because we extend the fields \$sl-variables that are missing. If you want to access the theme in any other scss files just import @stoplight/ui-kit/src/styles/common/theme

- [\_utils.scss](./src/styles/common/_utils.scss): Has some helpful utils around map functions. Includes map-deep-get, map-safe-get, and map-extend

#### [./src/styles/ui-kit.scss](./src/styles/ui-kit.scss): This is the scss file that will be imported by the end consumer and contains everything else!

## Creating a Component

1. Add a folder with you component name to the `./src/components` directory
2. Add a `{Component}.tsx` under `./src/components/{component}`
3. Add a `__tests__` folder under `./src/components/{component}`
4. If this component requires special styling or a unique class name create `./src/components/{component}/styles/_base.scss` and `./src/components/{component}/styles/class.ts` respectively

   - Rules for styling:
     - **Class Name**: If the component does not follow under one of the blueprint class names, create one for this component using the name space variable, we need to use namespacing so we keep our classes unique, the NS variable will always be the same
     ```javascript
     const NS = process.env.BLUEPRINT_NAMESPACE || 'bp3';
     export const CODE_EDITOR = `${NS}-code-editor`;
     ```
     -**SCSS**: Every component using custom scss should support both light an dark styling. Dark selectors will look something like `.{$ns}-dark .{$ns}-code-editor` look at [tailwind](./src/styles/tailwind/_base.scss) for examples on how this is done. If a component requires themable variables (think really just colors), they should be defined in an adjacent file named `_variables.scss`. The variables should NEVER be used directly. Instead they get injected back into the theme and should be used by using the `get-theme` function in your `_base.scss`. Lastly avoid created separate variables for light and dark. So don't create `$sl-var: red` and `$sl-var-dark: blue`, instead be creative and use different shades of the same color. So `$sl-var: red` then do something like `.{$ns}-dark .{$ns}-code-editor (color: lighten($sl-var, 10%))`

5. If this component requires specific types or utils include them in this component folder as well. We want to keep everything really independent

## Example Usage

Want to use ui-kit in another repo? Simple.

```bash
# latest stable + required dependencies
yarn add @stoplight/ui-kit
```

Then in your main `scss` file

```scss
/*main.scss*/
@import '~@stoplight/ui-kit/src/styles/ui-kit';
```

Lastly make sure compile your scss to css during your build process. This can be done using the scss-loader in webpack, or even just straight node-sass if so desired.

Okay its working, but you decided you're really not a fan of the theming :( well luckily its easily overwrittable to whatever you want! In the same file as your import include an `$sl-config` variable ABOVE the import. If its after the import it wont work. Compile after as you normally would as see the updates.

```scss
/*main.scss*/
$sl-config: (
  colors: (
    info: rgba(10, 25, 40, 1),
    primary: yellow,
    secondary: #805ad5,
  ),
);

@import '~@stoplight/ui-kit/src/styles/ui-kit';
```
