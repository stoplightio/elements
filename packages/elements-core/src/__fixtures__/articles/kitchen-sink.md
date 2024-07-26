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
  "title": "Todo Full",
  "allOf": [
    {
      "title": "Todo Partial",
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "completed": {
          "type": [
            "boolean",
            "null"
          ]
        }
      },
      "required": [
        "name",
        "completed"
      ],
      "x-tags": [
        "Todos"
      ]
    },
    {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "minimum": 0,
          "maximum": 1000000
        },
        "completed_at": {
          "type": [
            "string",
            "null"
          ],
          "format": "date-time"
        },
        "created_at": {
          "type": "string",
          "format": "date-time"
        },
        "updated_at": {
          "type": "string",
          "format": "date-time"
        },
        "user": {
          "title": "User",
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "The user's full name."
            },
            "age": {
              "type": "number",
              "minimum": 0,
              "maximum": 150
            },
            "type": {
              "type": "string",
              "enum": ["STANDARD", "ADMIN"],
              "x-enum-descriptions": {
                "STANDARD": "A standard user",
                "ADMIN": "A user with administrative powers"
              }
            }
          },
          "required": [
            "name",
            "age"
          ],
          "x-tags": [
            "Todos"
          ]
        }
      },
      "required": [
        "id",
        "user"
      ]
    }
  ],
  "x-tags": [
    "Todos"
  ]
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

### From a remote Http Operation

<!-- type: http -->

```json
{
  "$ref": "https://stoplight.io/api/v1/projects/demo/external-api/nodes/zoom.yaml/paths/~1meetings~1%7BmeetingId%7D/get?deref=optimizedBundle"
}
```

````md
<!-- type: http -->

```json
{
  "$ref": "https://stoplight.io/api/v1/projects/demo/external-api/nodes/zoom.yaml/paths/~1meetings~1%7BmeetingId%7D/get?deref=optimizedBundle"
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
