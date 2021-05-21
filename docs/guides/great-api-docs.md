# Great API Documentation

The experience of the user **discovering**, **learning to use**, and finally **integrating** with an API is termed as Developer Experience (DX). 

DX is the equivalent to User Experience (UX) for your APIs, and is the key to a useful, usable API. Good documentation is the first step towards a good DX, because an API could be all-powerful, solving a problem and sublimely implemented, yet it won't matter one bit if users can't figure out how to make it work. 

Users of your API are happier, promote it more, and stay longer when the API has good DX. Your API is a means to an end for the user, and they want to integrate as quickly as possible to move forward in their product development, meaning **they should immediately understand the value and usage of your API**.

### Components of Good DX

We can't stress this enough; **no amount of documentation can make up for a poorly designed API**. If you haven't already, read more about [designing APIs](https://stoplight.io/api-design-guide/basics/#api-design-best-practices). 

#### Your Audience

The users of your APIs are primarily two kinds of people:

The **decision-makers** who discover and decide if your API is a good fit to fulfill their use-case. They can be CEOs, CTOs, Product Managers, or Business Executives. 
 
The **developers** who interact with the API to fulfill the use-case. These developers can be internal or external and novice or experienced. Novice developers would usually require more hand-holding while experienced devs would frequently be using your API docs as a reference. 

Your developer experience must cater to both kinds of consumers. You want them to **decide and integrate with ease**. 

#### API Reference

API Reference Documentation has a couple of simple goals:

- Help developers understand what is possible with an API.

- Show developers how to move from documentation to code.

API Reference Documentation is the main purpose of the API Component (a.k.a the `elements-api` Web Component, or `import { API } from '@stoplight/elements';`).

This documentation focuses on all the endpoints (a.k.a "operations") available in an API, and helps explain potential input and output values that can be in requests and responses. Some API reference documentation will just show an example, but it's more useful to expand upon that and explain not just what those values mean, but what other values could also be valid in various contexts.

Elements groups them by tags and uses their summary in the sidebar, then shows off all the request and response information, like which security schemes might be needed to talk to the endpoint, with example request code showing how users can try talking to it. It will then also show important validations, like maybe a property has to be a number, has a minimum value, has to be an email address, or a date-time. 
### Sample Code

Some folks have built their own API Client code, also known as Software Development Kits ("SDKs"). These are sometimes hand crafted, and sometimes automatically generated from OpenAPI too. 

Elements will generate sample code for you in Curl and various popular programming languages. In the future we would like to integrate [custom SDK templates](https://github.com/stoplightio/elements/discussions/1138) for those who already have their own SDKs, but we wanted to help the majority of folks who are SDK-less first.

### Guides & Tutorials

The API reference with code samples is excellent for developers in the later stage of integration. For a newcomer starting with your API, you want to make it easy for them to navigate to creating their first integration. Developers learn best by doing. Create a "Quick Start Guide" with the minimum steps required to perform the first action with your API. This can be a step-by-step guide on authentication, calling your most straightforward endpoint fulfilling the most common use case. Do not forget the code samples for these steps, and keep it easy.  

Tutorials are similar to getting started guides but are looking to make it easy to perform a particular use case. For example, things like pagination are partially covered in API Reference Documentation. Maybe a query string parameter exists like `?page=1` or `?cursor=s24dfkjfhkdf`, and whilst some developers might understand what to do from that alone, many will not. A tutorial for how pagination works for your API is a great place to explain why you chose your specific pagination approach [of the many that exist](https://www.citusdata.com/blog/2016/03/30/five-ways-to-paginate/), and explain how your users should interact with it. E.g.: [Slack](https://api.slack.com/docs/pagination) and [Stripe](https://stripe.com/docs/api/pagination).

Other common tutorials are "Common Errors" which explain how your [error objects](https://apisyouwonthate.com/blog/creating-good-api-errors-in-rest-graphql-and-grpc/) work, what common status codes mean so you don't need to document 500, 501, 502 on every single operation, and any other useful information that can help users troubleshoot trouble.

_The basic Elements package does not cover Markdown Articles, but [Elements Dev Portal](../getting-started/dev-portal/introduction.md) does._
#### Code Samples

Stack Overflow is a developer's best friend for a reason. Most developers want to jump right into code, so providing them with ready to use samples in their language can lead to happy developers saying wonderful things about you and your API. This also helps avoid mistakes novice developers can make consuming your API - Happy and smaller support teams ;)
<!--
type: tab
title: Python
-->
```python
import http.client

conn = http.client.HTTPConnection("null")

conn.request("GET", "/todos.stoplight.io/todos")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
```
<!--
type: tab
title: Ruby
-->
```ruby
require 'uri'
require 'net/http'

url = URI("/todos.stoplight.io/todos")

http = Net::HTTP.new(url.host, url.port)

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body
```
<!--
type: tab
title: Java
-->
```java
OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("/todos.stoplight.io/todos")
  .get()
  .build();

Response response = client.newCall(request).execute();
```
<!--
type: tab
title: C#
-->
```csharp
var client = new HttpClient();

var request = new HttpRequestMessage
{
    Method = HttpMethod.Get,
    RequestUri = new Uri("/todos.stoplight.io/todos"),
};

using (var response = await client.SendAsync(request))
{
    response.EnsureSuccessStatusCode();
    var body = await response.Content.ReadAsStringAsync();
}
```
<!-- type: tab-end -->

The request samples are good, but a lot of developers just want to see what responses look like, so let's take a look at [Examples](examples.md).
