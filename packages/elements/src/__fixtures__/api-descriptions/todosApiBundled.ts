export const todosApiBundled = `
openapi: 3.0.0
info:
  title: To-dos
  version: 1.0.0
  description: "![](https://i.ibb.co/v3Yt03v/todo-api-background.png)\n\n## \U0001F4AB Overview\n\nTo Do API provides a simple way for people to manage their tasks and plan their day. This API can be used to create mobile and web applications.This API is documented using **OpenAPI 3.0**. The implementation lives in this [GitHub repo](https://github.com/stoplightio/studio-demo/blob/master/reference/todos/todo.v1.yaml).\n\n### \U0001F9F0 Cross-Origin Resource Sharing\nThis API features Cross-Origin Resource Sharing (CORS) implemented in compliance with  [W3C spec](https://www.w3.org/TR/cors/). CORS support is necessary to make calls from the request maker within the API docs.\n\n### \U0001F3C1 Trying out your own API Specification\nElements can be used to generate API docs for any OpenAPI document. Replace this OpenAPI with a URL to your own OpenAPI document to get started. "
  contact:
    name: Stoplight Support
    email: support@stoplight.io
    url: 'https://www.stoplight.io'
  license:
    name: MIT
    url: 'https://spdx.org/licenses/MIT'
  termsOfService: 'https://stoplight.io/terms/'
servers:
  - url: 'https://todos.stoplight.io'
    description: Production
  - description: Sandbox
    url: 'https://todos-sandbox.stoplight.io'
paths:
  /todos:
    get:
      summary: List Todos
      responses:
        '200':
          description: Returns a list of Todos
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Todos'
              examples:
                List of Todos:
                  $ref: '#/components/examples/multiple-todos'
        '403':
          $ref: '#/components/responses/Unauthorized'
        '404':
          $ref: '#/components/responses/NotFound'
      operationId: get-todos
      description: >-
        Returns a list of todos


        *Markdown is supported in descriptions. Add information here for users
        to get accustomed to endpoints*
      parameters:
        - $ref: '#/components/parameters/limit'
        - $ref: '#/components/parameters/contentType'
      security: []
    post:
      summary: Create Todo
      operationId: post-todos
      responses:
        '201':
          description: New Todo Created
          content:
            multipart/form-data:
              schema:
                $ref: '#/components/schemas/Todos'
              examples:
                Example Todo:
                  $ref: '#/components/examples/todo'
        '403':
          $ref: '#/components/responses/Unauthorized'
        '404':
          $ref: '#/components/responses/NotFound'
      description: >-
        This creates a Todo object


        *Markdown is supported in descriptions. Add information here for users
        to get accustomed to endpoints*
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Todos'
        description: Name of the Todo
      parameters:
        - $ref: '#/components/parameters/contentType'
      security:
        - API Key: []
  '/todos/{id}':
    get:
      summary: Get Todo
      responses:
        '200':
          description: Returns the Todo for the ID
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Todos'
              examples:
                Example Todo:
                  $ref: '#/components/examples/todo'
        '403':
          $ref: '#/components/responses/Unauthorized'
        '404':
          $ref: '#/components/responses/NotFound'
      operationId: get-todos-id
      description: >-
        Get a single todo using an ID


        *Markdown is supported in descriptions. Add information here for users
        to get accustomed to endpoints*
      parameters: []
      security: []
    put:
      summary: Replace Todo
      operationId: put-todos-id
      responses:
        '200':
          description: Todo Updated
        '403':
          $ref: '#/components/responses/Unauthorized'
        '404':
          $ref: '#/components/responses/NotFound'
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Todos'
        description: ''
      description: >-
        Update a single todo using an ID


        *Markdown is supported in descriptions. Add information here for users
        to get accustomed to endpoints*
      parameters:
        - $ref: '#/components/parameters/contentType'
      security:
        - API Key: []
    delete:
      summary: Delete Todo
      operationId: delete-todos-id
      responses:
        '200':
          description: Todo Deleted
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Todos'
              examples:
                Example Todo:
                  $ref: '#/components/examples/todo'
        '403':
          $ref: '#/components/responses/Unauthorized'
        '404':
          $ref: '#/components/responses/NotFound'
      description: >-
        Delete a todo using an ID


        *Markdown is supported in descriptions. Add information here for users
        to get accustomed to endpoints*
      security:
        - API Key: []
    patch:
      summary: Update Todo
      operationId: patch-todos-id
      responses:
        '200':
          description: Todo Updated
        '403':
          $ref: '#/components/responses/Unauthorized'
        '404':
          $ref: '#/components/responses/NotFound'
      deprecated: true
      description: >-
        Don't use this endpoint. Notice it's deprecated.


        *Markdown is supported in descriptions. Add information here for users
        to get accustomed to endpoints*
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Todos'
      security:
        - API Key: []
    parameters:
      - $ref: '#/components/parameters/ID'
  /users:
    get:
      summary: Get User
      tags:
        - Users
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'
        '404':
          $ref: '#/components/responses/NotFound'
      operationId: get-users
      description: >-
        Get a user by ID


        *Markdown is supported in descriptions. Add information here for users
        to get accustomed to endpoints*
      parameters:
        - $ref: '#/components/parameters/contentType'
      security: []
    parameters: []
    delete:
      summary: Delete User
      operationId: delete-users-userID
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
      description: Delete a user by ID
      tags:
        - Users
      security:
        - API Key: []
    post:
      summary: Create User
      operationId: post-users-userID
      responses:
        '201':
          description: User Created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
              examples:
                Example User:
                  $ref: '#/components/examples/user'
      description: Create a User
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/User'
            examples: {}
      tags:
        - Users
      parameters:
        - $ref: '#/components/parameters/contentType'
      security:
        - API Key: []
components:
  schemas:
    Todos:
      description: I'm a model's description.
      type: object
      x-examples: {}
      title: Todo
      properties:
        id:
          type: number
          minimum: 0
          maximum: 9999
          description: ID of the task
          readOnly: true
        name:
          type: string
          minLength: 1
          maxLength: 100
          description: Name of the task
        completed:
          type: boolean
          default: false
          description: Boolean indicating if the task has been completed or not
        completed_at:
          type: string
          format: date-time
          description: Time when the task was completed
          readOnly: true
        created_at:
          type: string
          format: date-time
          description: Time when the task was created
          readOnly: true
        updated_at:
          type: string
          format: date-time
          description: Time when the task was updated
          readOnly: true
      required:
        - id
        - name
        - completed_at
        - created_at
        - updated_at
    User:
      description: ''
      type: object
      title: User
      properties:
        userId:
          type: number
          description: ID of the user
          readOnly: true
        firstName:
          type: string
          minLength: 1
          description: ''
        lastName:
          type: string
          minLength: 1
          description: ''
        phoneNumber:
          type: string
          minLength: 1
          description: Official Phone Number
        emailAddress:
          type: string
          minLength: 1
          description: Work Email Address
      required:
        - userId
        - firstName
        - lastName
        - phoneNumber
        - emailAddress
  securitySchemes:
    API Key:
      name: apikey
      type: apiKey
      in: query
      description: Just use \`123\`. It's super secure ;)
  parameters:
    limit:
      name: limit
      in: query
      required: false
      schema:
        type: number
      description: >-
        Return a limited set of results *I'm a shared parameter. I can be reused
        in multiple endpoints!*
    contentType:
      name: Content-Type
      in: header
      required: true
      schema:
        type: string
        default: application/json
      description: application/json
    ID:
      name: id
      in: path
      required: true
      schema:
        type: string
      description: ID of the Todo
  responses:
    NotFound:
      description: Resource not found
      content:
        application/json:
          schema:
            title: Error
            type: object
            description: A standard error object.
            x-tags:
              - Common
            properties:
              status:
                type: string
                description: A code.
              error:
                type: string
            required:
              - status
              - error
    Unauthorized:
      description: Action not allowed
      content:
        application/json:
          schema:
            type: object
            properties:
              message:
                type: string
            required:
              - message
  examples:
    todo:
      value:
        id: 0
        name: string
        completed: true
        completed_at: '2019-08-24T14:15:22Z'
        created_at: '2019-08-24T14:15:22Z'
        updated_at: '2019-08-24T14:15:22Z'
    multiple-todos:
      value:
        - id: 0
          name: my todo
          completed: true
          completed_at: '2019-08-24T14:15:22Z'
          created_at: '2019-08-24T14:15:22Z'
          updated_at: '2019-08-24T14:15:22Z'
        - id: 1
          name: another todo
          completed: false
          completed_at: '2019-08-24T14:15:22Z'
          created_at: '2019-08-24T14:15:22Z'
          updated_at: '2019-08-24T14:15:22Z'
        - id: 2
          name: yet another todo
          completed: false
          completed_at: '2019-08-24T14:15:22Z'
          created_at: '2019-08-24T14:15:22Z'
          updated_at: '2019-08-24T14:15:22Z'
    user:
      value:
        userId: 2
        firstName: racks
        lastName: jacson
        phoneNumber: '123456'
        emailAddress: racks.jacson@learningcontainer.com
tags:
  - name: Todos
`;
