---
title: Stoplight Flavored Markdown
---

# Stoplight Flavored Markdown (smd)

### The Two Laws

1. smd is human readable. A human with a simple text editor can easily read and comprehend smd.
2. smd degrades gracefully. An smd document rendered on `github.com` should be readable and clean.

### The Approach

1. Stoplight flavored markdown extends github flavor markdown with inline comment annotations.
2. The value inside of the annotations is a yaml object, and the annotation affects the following markdown block.

By leveraging comments to store annotations, Stoplight flavored markdown degrades gracefully to any other markdown renderer (Github, for example).

> [MDX](https://github.com/mdx-js/mdx) is an interesting project that might allow our users to add more interactivity to their docs, at the cost of complexity (this is a more advanced use case). We would have to figure out a way to introduce this WITHOUT impacting those users that do not need the feature.

## Tabs

A smd tab container is a `tab` annotation, followed by the tab content, and closed by a final `tab-end` annotation.

Tab containers cannot be nested.

<!--
type: tab
title: My First Tab
-->

The contents of tab 1.

<!--
type: tab
title: My Second Tab
-->

The contents of tab 2.

<!-- type: tab-end -->

#### Markdown Sample

```md
<!--
type: tab
title: My First Tab
-->

The contents of tab 1.

<!--
type: tab
title: My Second Tab
-->

The contents of tab 2.

<!-- type: tab-end -->
```

## Callouts

A callout is a md block quote with an optional annotation that indicates intent.

<!-- theme: danger -->

> ### Danger Will Robinson!
>
> Here is my danger callout!

<!-- theme: warning -->

> ### Watch Out!
>
> Here is my warning callout!

<!-- theme: success -->

> ### Mission Accomplished!
>
> Here is my success callout!

<!-- theme: info -->

> ### A thing to know
>
> Here is my info callout

#### Markdown Sample

```md
<!-- theme: danger -->

> ### Danger Will Robinson!
>
> Here is my danger callout!

<!-- theme: warning -->

> ### Watch Out!
>
> Here is my warning callout!

<!-- theme: success -->

> ### Mission Accomplished!
>
> Here is my success callout!

<!-- theme: info -->

> ### A thing to know
>
> Here is my info callout
```

## Code Blocks

A smd code block is md code fence with an optional annotation to tweak the presentation of the code block.

<!--
title: "Fibonacci In Javascript"
lineNumbers: false
highlightLines: [[1,2], [4,5]]
-->

```javascript
function fibonacci(num) {
  var a = 1,
    b = 0,
    temp;

  while (num >= 0) {
    temp = a;
    a = a + b;
    b = temp;
    num--;
  }

  return b;
}
```

## JSON Schema

A smd json schema block is a smd code block with the `json_schema` language tag. The contents of the code fence should
be the json schema object to be rendered.

<!-- type: json_schema -->

```json
{
  "$ref": "../../reference/common/models/error.v1.yaml"
}
```

## HTTP Try It Out

A smd http try it out block is a smd code block with the `http` language tag. The contents of the code fence should
be the http object to be rendered.

### Raw Http Request

<!-- type: http -->

```json
{
  "method": "get",
  "url": "/gifs/search",
  "baseUrl": "http://api.giphy.com/v1",
  "headers": {},
  "query": {
    "api_key": ["dc6zaTOxFJmzC"],
    "limit": ["1"],
    "q": ["cats"]
  }
}
```

````md
<!-- type: http -->

```json
{
  "method": "get",
  "url": "/gifs/search",
  "baseUrl": "http://api.giphy.com/v1",
  "headers": {},
  "query": {
    "api_key": ["dc6zaTOxFJmzC"],
    "limit": ["1"],
    "q": ["cats"]
  }
}
```
````

### Request from Http Operation

<!-- type: http -->

```json
{
  "$ref": "../../reference/todos/openapi.v1.json/paths/~1todos/get"
}
```

````md
<!-- type: http -->

```json
{
  "$ref": "../../reference/todos/openapi.v1.json/paths/~1todos/get"
}
```
````

### From a remote Http Operation

<!-- type: http -->

```json
{
  "$ref": "https://stoplight.io/api/nodes.raw?srn=gh/stoplightio/sample-specs/reference/giphy/giphy.yaml/paths/~1gifs~1search/get"
}
```

````md
<!-- type: http -->

```json
{
  "$ref": "https://stoplight.io/api/nodes.raw?srn=gh/stoplightio/sample-specs/reference/giphy/giphy.yaml/paths/~1gifs~1search/get"
}
```
````

## Raw HTML

```
<div>Hello world!</div>
```

<div>Hello world!</div>

## Inline Links

[foo], [foo][], [bar][foo].

[foo]: http://example.com 'Example Domain'

## The following will be repeated to mimic a long list of page headers

Here is a lot of information!

## Tabs

A smd tab container is a `tab` annotation, followed by the tab content, and closed by a final `tab-end` annotation.

Tab containers cannot be nested.

<!--
type: tab
title: My First Tab
-->

The contents of tab 1.

<!--
type: tab
title: My Second Tab
-->

The contents of tab 2.

<!-- type: tab-end -->

#### Markdown Sample

```md
<!--
type: tab
title: My First Tab
-->

The contents of tab 1.

<!--
type: tab
title: My Second Tab
-->

The contents of tab 2.

<!-- type: tab-end -->
```

## Callouts

A callout is a md block quote with an optional annotation that indicates intent.

<!-- theme: danger -->

> ### Danger Will Robinson!
>
> Here is my danger callout!

<!-- theme: warning -->

> ### Watch Out!
>
> Here is my warning callout!

<!-- theme: success -->

> ### Mission Accomplished!
>
> Here is my success callout!

<!-- theme: info -->

> ### A thing to know
>
> Here is my info callout

#### Markdown Sample

```md
<!-- theme: danger -->

> ### Danger Will Robinson!
>
> Here is my danger callout!

<!-- theme: warning -->

> ### Watch Out!
>
> Here is my warning callout!

<!-- theme: success -->

> ### Mission Accomplished!
>
> Here is my success callout!

<!-- theme: info -->

> ### A thing to know
>
> Here is my info callout
```

## Code Blocks

A smd code block is md code fence with an optional annotation to tweak the presentation of the code block.

<!--
title: "Fibonacci In Javascript"
lineNumbers: false
highlightLines: [[1,2], [4,5]]
-->

```javascript
function fibonacci(num) {
  var a = 1,
    b = 0,
    temp;

  while (num >= 0) {
    temp = a;
    a = a + b;
    b = temp;
    num--;
  }

  return b;
}
```

## JSON Schema

A smd json schema block is a smd code block with the `json_schema` language tag. The contents of the code fence should
be the json schema object to be rendered.

<!-- type: json_schema -->

```json
{
  "$ref": "../../reference/common/models/error.v1.yaml"
}
```

## HTTP Try It Out

A smd http try it out block is a smd code block with the `http` language tag. The contents of the code fence should
be the http object to be rendered.

### Raw Http Request

<!-- type: http -->

```json
{
  "method": "get",
  "url": "/gifs/search",
  "baseUrl": "http://api.giphy.com/v1",
  "headers": {},
  "query": {
    "api_key": ["dc6zaTOxFJmzC"],
    "limit": ["1"],
    "q": ["cats"]
  }
}
```

````md
<!-- type: http -->

```json
{
  "method": "get",
  "url": "/gifs/search",
  "baseUrl": "http://api.giphy.com/v1",
  "headers": {},
  "query": {
    "api_key": ["dc6zaTOxFJmzC"],
    "limit": ["1"],
    "q": ["cats"]
  }
}
```
````

### Request from Http Operation

<!-- type: http -->

```json
{
  "$ref": "../../reference/todos/openapi.v1.json/paths/~1todos/get"
}
```

````md
<!-- type: http -->

```json
{
  "$ref": "../../reference/todos/openapi.v1.json/paths/~1todos/get"
}
```
````

### From a remote Http Operation

<!-- type: http -->

```json
{
  "$ref": "https://stoplight.io/api/nodes.raw?srn=gh/stoplightio/sample-specs/reference/giphy/giphy.yaml/paths/~1gifs~1search/get"
}
```

````md
<!-- type: http -->

```json
{
  "$ref": "https://stoplight.io/api/nodes.raw?srn=gh/stoplightio/sample-specs/reference/giphy/giphy.yaml/paths/~1gifs~1search/get"
}
```
````

## Raw HTML

```
<div>Hello world!</div>
```

<div>Hello world!</div>

## Inline Links

[foo], [foo][], [bar][foo].

[foo]: http://example.com 'Example Domain'

## Tabs

A smd tab container is a `tab` annotation, followed by the tab content, and closed by a final `tab-end` annotation.

Tab containers cannot be nested.

<!--
type: tab
title: My First Tab
-->

The contents of tab 1.

<!--
type: tab
title: My Second Tab
-->

The contents of tab 2.

<!-- type: tab-end -->

#### Markdown Sample

```md
<!--
type: tab
title: My First Tab
-->

The contents of tab 1.

<!--
type: tab
title: My Second Tab
-->

The contents of tab 2.

<!-- type: tab-end -->
```

## Callouts

A callout is a md block quote with an optional annotation that indicates intent.

<!-- theme: danger -->

> ### Danger Will Robinson!
>
> Here is my danger callout!

<!-- theme: warning -->

> ### Watch Out!
>
> Here is my warning callout!

<!-- theme: success -->

> ### Mission Accomplished!
>
> Here is my success callout!

<!-- theme: info -->

> ### A thing to know
>
> Here is my info callout

#### Markdown Sample

```md
<!-- theme: danger -->

> ### Danger Will Robinson!
>
> Here is my danger callout!

<!-- theme: warning -->

> ### Watch Out!
>
> Here is my warning callout!

<!-- theme: success -->

> ### Mission Accomplished!
>
> Here is my success callout!

<!-- theme: info -->

> ### A thing to know
>
> Here is my info callout
```

## Code Blocks

A smd code block is md code fence with an optional annotation to tweak the presentation of the code block.

<!--
title: "Fibonacci In Javascript"
lineNumbers: false
highlightLines: [[1,2], [4,5]]
-->

```javascript
function fibonacci(num) {
  var a = 1,
    b = 0,
    temp;

  while (num >= 0) {
    temp = a;
    a = a + b;
    b = temp;
    num--;
  }

  return b;
}
```

## JSON Schema

A smd json schema block is a smd code block with the `json_schema` language tag. The contents of the code fence should
be the json schema object to be rendered.

<!-- type: json_schema -->

```json
{
  "$ref": "../../reference/common/models/error.v1.yaml"
}
```

## HTTP Try It Out

A smd http try it out block is a smd code block with the `http` language tag. The contents of the code fence should
be the http object to be rendered.

### Raw Http Request

<!-- type: http -->

```json
{
  "method": "get",
  "url": "/gifs/search",
  "baseUrl": "http://api.giphy.com/v1",
  "headers": {},
  "query": {
    "api_key": ["dc6zaTOxFJmzC"],
    "limit": ["1"],
    "q": ["cats"]
  }
}
```

````md
<!-- type: http -->

```json
{
  "method": "get",
  "url": "/gifs/search",
  "baseUrl": "http://api.giphy.com/v1",
  "headers": {},
  "query": {
    "api_key": ["dc6zaTOxFJmzC"],
    "limit": ["1"],
    "q": ["cats"]
  }
}
```
````

### Request from Http Operation

<!-- type: http -->

```json
{
  "$ref": "../../reference/todos/openapi.v1.json/paths/~1todos/get"
}
```

````md
<!-- type: http -->

```json
{
  "$ref": "../../reference/todos/openapi.v1.json/paths/~1todos/get"
}
```
````

### From a remote Http Operation

<!-- type: http -->

```json
{
  "$ref": "https://stoplight.io/api/nodes.raw?srn=gh/stoplightio/sample-specs/reference/giphy/giphy.yaml/paths/~1gifs~1search/get"
}
```

````md
<!-- type: http -->

```json
{
  "$ref": "https://stoplight.io/api/nodes.raw?srn=gh/stoplightio/sample-specs/reference/giphy/giphy.yaml/paths/~1gifs~1search/get"
}
```
````

## Raw HTML

```
<div>Hello world!</div>
```

<div>Hello world!</div>

## Inline Links

[foo], [foo][], [bar][foo].

[foo]: http://example.com 'Example Domain'

## Tabs

A smd tab container is a `tab` annotation, followed by the tab content, and closed by a final `tab-end` annotation.

Tab containers cannot be nested.

<!--
type: tab
title: My First Tab
-->

The contents of tab 1.

<!--
type: tab
title: My Second Tab
-->

The contents of tab 2.

<!-- type: tab-end -->

#### Markdown Sample

```md
<!--
type: tab
title: My First Tab
-->

The contents of tab 1.

<!--
type: tab
title: My Second Tab
-->

The contents of tab 2.

<!-- type: tab-end -->
```

## Callouts

A callout is a md block quote with an optional annotation that indicates intent.

<!-- theme: danger -->

> ### Danger Will Robinson!
>
> Here is my danger callout!

<!-- theme: warning -->

> ### Watch Out!
>
> Here is my warning callout!

<!-- theme: success -->

> ### Mission Accomplished!
>
> Here is my success callout!

<!-- theme: info -->

> ### A thing to know
>
> Here is my info callout

#### Markdown Sample

```md
<!-- theme: danger -->

> ### Danger Will Robinson!
>
> Here is my danger callout!

<!-- theme: warning -->

> ### Watch Out!
>
> Here is my warning callout!

<!-- theme: success -->

> ### Mission Accomplished!
>
> Here is my success callout!

<!-- theme: info -->

> ### A thing to know
>
> Here is my info callout
```

## Code Blocks

A smd code block is md code fence with an optional annotation to tweak the presentation of the code block.

<!--
title: "Fibonacci In Javascript"
lineNumbers: false
highlightLines: [[1,2], [4,5]]
-->

```javascript
function fibonacci(num) {
  var a = 1,
    b = 0,
    temp;

  while (num >= 0) {
    temp = a;
    a = a + b;
    b = temp;
    num--;
  }

  return b;
}
```

## JSON Schema

A smd json schema block is a smd code block with the `json_schema` language tag. The contents of the code fence should
be the json schema object to be rendered.

<!-- type: json_schema -->

```json
{
  "$ref": "../../reference/common/models/error.v1.yaml"
}
```

## HTTP Try It Out

A smd http try it out block is a smd code block with the `http` language tag. The contents of the code fence should
be the http object to be rendered.

### Raw Http Request

<!-- type: http -->

```json
{
  "method": "get",
  "url": "/gifs/search",
  "baseUrl": "http://api.giphy.com/v1",
  "headers": {},
  "query": {
    "api_key": ["dc6zaTOxFJmzC"],
    "limit": ["1"],
    "q": ["cats"]
  }
}
```

````md
<!-- type: http -->

```json
{
  "method": "get",
  "url": "/gifs/search",
  "baseUrl": "http://api.giphy.com/v1",
  "headers": {},
  "query": {
    "api_key": ["dc6zaTOxFJmzC"],
    "limit": ["1"],
    "q": ["cats"]
  }
}
```
````

### Request from Http Operation

<!-- type: http -->

```json
{
  "$ref": "../../reference/todos/openapi.v1.json/paths/~1todos/get"
}
```

````md
<!-- type: http -->

```json
{
  "$ref": "../../reference/todos/openapi.v1.json/paths/~1todos/get"
}
```
````

### From a remote Http Operation

<!-- type: http -->

```json
{
  "$ref": "https://stoplight.io/api/nodes.raw?srn=gh/stoplightio/sample-specs/reference/giphy/giphy.yaml/paths/~1gifs~1search/get"
}
```

````md
<!-- type: http -->

```json
{
  "$ref": "https://stoplight.io/api/nodes.raw?srn=gh/stoplightio/sample-specs/reference/giphy/giphy.yaml/paths/~1gifs~1search/get"
}
```
````

## Raw HTML

```
<div>Hello world!</div>
```

<div>Hello world!</div>

## Inline Links

[foo], [foo][], [bar][foo].

[foo]: http://example.com 'Example Domain'
