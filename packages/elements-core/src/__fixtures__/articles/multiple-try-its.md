---
title: Using the TODO API
---

1. Create a TODO

```json http
{
  "method": "post",
  "url": "/todos",
  "baseUrl": "https://todos.stoplight.io",
  "headers": {},
  "query": {
    "api_key": ["123"],
  },
  "body": {
    "name": "Fetch this TODO",
    "completed": false
  }
}
```

2. Use the "id" from the previous response to fetch the TODO


```json http
{
  "method": "get",
  "url": "/todos/{id}",
  "baseUrl": "https://todos.stoplight.io",
  "headers": {},
  "query": {
    "api_key": ["123"],
  }
}
```

3. Update the TODO to be completed

```json http
{
  "method": "put",
  "url": "/todos/{id}",
  "baseUrl": "https://todos.stoplight.io",
  "headers": {},
  "query": {
    "api_key": ["123"],
  },
  "body": {
    "name": "[Completed] Fetch this TODO",
    "completed": true
  }
}
```