export const zoomApiYaml = `
swagger: '2.0'
schemes:
  - https
host: api.zoom.us
basePath: /v2
info:
  contact:
    email: developer@zoom.us
    name: Zoom Developers
    url: 'https://developer.zoom.us/'
    x-twitter: zoom_us
  description: API Description
  license:
    name: MIT
    url: 'https://opensource.org/licenses/MIT'
  title: Zoom
  version: 2.0.0
  x-apisguru-categories:
    - telecom
  x-logo:
    url: 'https://twitter.com/zoom_us/profile_image?size=original'
  x-origin:
    - format: swagger
      url: 'https://raw.githubusercontent.com/zoom/api/master/openapi.v2.json'
      version: '2.0'
  x-providerName: zoom.us
externalDocs:
  description: Zoom API Documentation
  url: 'https://zoom.github.io/api'
consumes:
  - application/json
  - multipart/form-data
produces:
  - application/json
  - application/xml
securityDefinitions:
  global:
    in: query
    name: access_token
    type: apiKey
security:
  - global: []
parameters:
  AccountId:
    description: The account ID
    in: path
    name: accountId
    required: true
    type: string
  FromDate:
    description: Start Date
    format: date
    in: query
    name: from
    required: true
    type: string
  GroupId:
    description: The group ID
    in: path
    name: groupId
    required: true
    type: string
  LoginType:
    enum:
      - 0
      - 1
      - 99
      - 100
      - 101
    in: query
    name: login_type
    type: string
    x-enum-descriptions:
      - Facebook
      - Google
      - API
      - Zoom
      - SSO
  Mc:
    default: 'false'
    description: 'Query mc '
    in: query
    name: mc
    type: string
  MeetingId:
    description: The meeting ID
    in: path
    name: meetingId
    required: true
    type: integer
  MeetingId4Metrics:
    description: 'The meeting ID or meeting UUID. If given meeting ID, will take the last meeting instance.'
    in: path
    name: meetingId
    required: true
    type: integer
  MeetingId4Recording:
    description: 'The meeting ID or meeting UUID. If given meeting ID, will take the last meeting instance.'
    in: path
    name: meetingId
    required: true
    type: integer
  MeetingIdNumber:
    description: The meeting ID or uuid
    in: path
    name: meetingId
    required: true
    type: string
  MeetingType:
    default: live
    description: The meeting type
    enum:
      - scheduled
      - live
    in: query
    name: type
    type: string
    x-enum-descriptions:
      - all the scheduled meetings
      - all the live meetings
  MeetingTypePast:
    default: live
    description: The meeting type
    enum:
      - past
      - pastOne
      - live
    in: query
    name: type
    type: string
    x-enum-descriptions:
      - past meetings
      - past one user meetings
      - live meetings
  MeetingTypePast2:
    default: live
    description: The meeting type
    enum:
      - past
      - live
    in: query
    name: type
    type: string
    x-enum-descriptions:
      - past meeting
      - live meeting
  MeetingTypePast3:
    default: live
    description: The meeting type
    enum:
      - past
      - pastOne
      - live
    in: query
    name: type
    type: string
    x-enum-descriptions:
      - past meeting
      - past one user meeting
      - live meeting
  MemberId:
    description: The member ID
    in: path
    name: memberId
    required: true
    type: string
  NextPageToken:
    description: 'Next page token, used to paginate through large result sets. A next page token will be returned whenever the set of available result list exceeds page size. The expiration period is 15 minutes.'
    in: query
    name: next_page_token
    type: string
  OccurrenceId:
    description: The meeting occurrence ID
    in: query
    name: occurrence_id
    type: string
  PageNumber:
    default: 1
    description: Current page number of returned records.
    in: query
    name: page_number
    type: integer
  PageSize:
    default: 30
    description: 'The amount of records returns within a single API call. '
    in: query
    maximum: 300
    name: page_size
    type: integer
  PageSize4Qos:
    default: 1
    description: Number of items returned per page
    in: query
    maximum: 10
    name: page_size
    type: integer
  PageToken:
    description: 'Next page token, used to paginate through large result sets. A next page token will be returned whenever the set of available result list exceeds page size. The expiration period is 15 minutes.'
    in: query
    name: next_page_token
    type: string
  ParticipantId:
    description: 'The participant ID, such as 16778240'
    in: path
    name: participantId
    required: true
    type: string
  RecordingDeleteAction:
    default: trash
    description: The recording delete action
    enum:
      - trash
      - delete
    in: query
    name: action
    type: string
    x-enum-descriptions:
      - move recording to trash
      - delete recording permanently
  RecordingId:
    description: The recording ID
    in: path
    name: recordingId
    required: true
    type: string
  RegistrantId:
    description: The registrant ID
    in: path
    name: registrantId
    required: true
    type: string
  RegistrantStatus:
    default: approved
    description: The registrant status
    enum:
      - pending
      - approved
      - denied
    in: query
    name: status
    type: string
    x-enum-descriptions:
      - registrants status is pending
      - registrants status is approved
      - registrants status is denied
  TSPId:
    description: TSP account index
    in: path
    name: tspId
    required: true
    type: string
  ToDate:
    description: End Date
    format: date
    in: query
    name: to
    required: true
    type: string
  Trash:
    default: false
    description: 'Query trash '
    in: query
    name: trash
    type: boolean
  UserId:
    description: The user ID or email address
    in: path
    name: userId
    required: true
    type: string
  WebhookId:
    description: The webhook ID
    in: path
    name: webhookId
    required: true
    type: string
  WebinarId:
    description: The webinar ID
    in: path
    name: webinarId
    required: true
    type: integer
  WebinarId4Metrics:
    description: 'The webinar ID or webinar UUID. If given webinar ID, will take the last webinar instance.'
    in: path
    name: webinarId
    required: true
    type: integer
  WebinarTypePast:
    default: live
    description: The webinar type
    enum:
      - past
      - live
    in: query
    name: type
    type: string
    x-enum-descriptions:
      - past webinars
      - live webinars
  WebinarTypePast2:
    default: live
    description: The webinar type
    enum:
      - past
      - live
    in: query
    name: type
    type: string
    x-enum-descriptions:
      - past webinar
      - live webinar
  ZoomRoomId:
    description: The Zoom Room ID
    in: path
    name: zoomroomId
    required: true
    type: integer
tags:
  - description: Account operations
    name: Accounts
  - description: Billing operations
    name: Billing
  - description: User operations
    name: Users
  - description: Meeting operations
    name: Meetings
  - description: Webinar operations
    name: Webinars
  - description: Group operations
    name: Groups
  - description: IM Group operations
    name: IM Groups
  - description: Cloud Recording operations
    name: Cloud Recording
  - description: Report operations
    name: Reports
  - description: Dashboard operations
    name: Dashboards
  - description: Webhook operations
    name: Webhooks
  - description: TSP operations
    name: TSP
paths:
  /accounts:
    get:
      description: List all the sub accounts under the master account.
      operationId: accounts
      parameters:
        - $ref: '#/parameters/PageSize'
        - $ref: '#/parameters/PageNumber'
      responses:
        '200':
          description: Account list returned
          schema:
            $ref: '#/definitions/AccountList'
      summary: List sub accounts
      tags:
        - Accounts
    post:
      description: 'Create a sub account under the master account <aside>Your account must be a master account and have this privilege to create sub account. Zoom only assign this privilege to trusted partner. The created user will not receive the confirmation email.</aside>'
      operationId: accountCreate
      parameters:
        - description: Account
          in: body
          name: body
          required: true
          schema:
            $ref: '#/definitions/Account'
      responses:
        '201':
          description: Account Created
          headers:
            Content-Location:
              description: Location of created Account
              type: string
          schema:
            properties:
              created_at:
                description: Account created date time
                type: string
              id:
                description: Account ID
                type: string
              owner_email:
                description: Account owner email
                type: string
              owner_id:
                description: Account Owner ID
                type: string
        '409':
          description: Account with that email already exists
      summary: Create a sub account
      tags:
        - Accounts
  '/accounts/{accountId}':
    delete:
      description: Disassociate a sub account from the master account
      operationId: accountDisassociate
      parameters:
        - $ref: '#/parameters/AccountId'
      responses:
        '204':
          description: Account deleted
        '404':
          description: Account not found
      summary: Disassociate an account
      tags:
        - Accounts
    get:
      description: 'Retrieve a sub account under the master account <aside>Your account must be a master account and have this privilege to get sub account. Zoom only assign this privilege to trusted partner</aside>'
      operationId: account
      parameters:
        - $ref: '#/parameters/AccountId'
      responses:
        '200':
          description: Account object returned
          schema:
            properties:
              created_at:
                description: Account creation date/time
                format: date-time
                type: string
              id:
                description: Account ID
                type: string
              options:
                $ref: '#/definitions/AccountOptions'
              owner_email:
                description: Account Owner email
                type: string
              owner_id:
                description: Account Owner ID
                type: string
        '404':
          description: User not found
      summary: Retrieve a sub account
      tags:
        - Accounts
  '/accounts/{accountId}/billing':
    get:
      description: Retrieve billing information for a sub account under the master account
      operationId: accountBilling
      parameters:
        - $ref: '#/parameters/AccountId'
      responses:
        '200':
          description: Account billing contact information returned
          schema:
            $ref: '#/definitions/BillingContactRequired'
        '404':
          description: Account not found
      summary: Retrieve billing information for a sub account
      tags:
        - Billing
    patch:
      description: 'Update billing information for a sub account under the master account <aside>Only for the sub account which is a paid account and paid by master account</aside>'
      operationId: accountBillingUpdate
      parameters:
        - $ref: '#/parameters/AccountId'
        - in: body
          name: body
          required: true
          schema:
            $ref: '#/definitions/BillingContact'
      responses:
        '204':
          description: Account billing contact information updated
        '404':
          description: Account not found
      summary: Update billing information for a sub account
      tags:
        - Billing
  '/accounts/{accountId}/options':
    patch:
      description: "Update a sub account's options under the master account"
      operationId: accountOptionsUpdate
      parameters:
        - $ref: '#/parameters/AccountId'
        - in: body
          name: body
          required: true
          schema:
            $ref: '#/definitions/AccountOptions'
      responses:
        '204':
          description: Account options updated
        '404':
          description: Account not found
      summary: "Update a sub account's options"
      tags:
        - Accounts
  '/accounts/{accountId}/plans':
    get:
      description: 'Retrieve plan information for a sub account under the master account  <aside>Only for the sub account which is paid by master account</aside>'
      operationId: accountPlans
      parameters:
        - $ref: '#/parameters/AccountId'
      responses:
        '200':
          description: Account plans returned
          schema:
            $ref: '#/definitions/AccountPlans'
        '404':
          description: Account not fond
      summary: Retrieve plan information for a sub account
      tags:
        - Billing
    post:
      description: 'Subscribe plans for a sub account of the master account <aside>Can only subscribe plans for the sub account which is a free account and paid by master account</aside>'
      operationId: accountPlanCreate
      parameters:
        - $ref: '#/parameters/AccountId'
        - in: body
          name: body
          required: true
          schema:
            allOf:
              - properties:
                  contact:
                    $ref: '#/definitions/BillingContactRequired'
                type: object
              - $ref: '#/definitions/AccountPlans'
      responses:
        '201':
          description: Account plans updated
          schema:
            $ref: '#/definitions/AccountPlans'
      summary: Subscribe plans for a sub account
      tags:
        - Billing
  '/accounts/{accountId}/plans/addons':
    post:
      description: 'Add an additional plan for sub account <aside>Can only add an Additional plan for the sub account which is a paid account and paid by master account</aside>'
      operationId: accountPlanAddonCreate
      parameters:
        - $ref: '#/parameters/AccountId'
        - in: body
          name: body
          required: true
          schema:
            $ref: '#/definitions/AccountPlanRequired'
      responses:
        '201':
          description: Account plans updated
      summary: Add an additional plan for sub account
      tags:
        - Billing
    put:
      description: 'Update an additional plan for sub account<aside>Can only update an Additional plan for the sub account which is a paid account and paid by master account</aside>'
      operationId: accountPlanAddonUpdate
      parameters:
        - $ref: '#/parameters/AccountId'
        - in: body
          name: body
          required: true
          schema:
            $ref: '#/definitions/AccountPlanRequired'
      responses:
        '204':
          description: Account plans updated
      summary: Update an additional plan for sub account
      tags:
        - Billing
  '/accounts/{accountId}/plans/base':
    put:
      description: 'Update a base plan for a sub account <aside>Can only update a base plan for the sub account which is a paid account and paid by master account</aside>'
      operationId: accountPlanBaseUpdate
      parameters:
        - $ref: '#/parameters/AccountId'
        - in: body
          name: body
          required: true
          schema:
            $ref: '#/definitions/AccountPlanBaseRequired'
      responses:
        '204':
          description: Account plans updated
      summary: Update a base plan for a sub account
      tags:
        - Billing
  '/accounts/{accountId}/settings':
    get:
      description: "Retrieve a sub account's settings under the master account"
      operationId: accountSettings
      parameters:
        - $ref: '#/parameters/AccountId'
      responses:
        '200':
          description: Account settings returned
          schema:
            $ref: '#/definitions/AccountSettings'
        '404':
          description: Account not found
      summary: "Retrieve a sub account's settings"
      tags:
        - Accounts
    patch:
      description: "Update a sub account's settings under the master account"
      operationId: accountSettingsUpdate
      parameters:
        - $ref: '#/parameters/AccountId'
        - in: body
          name: body
          required: true
          schema:
            $ref: '#/definitions/AccountSettings'
      responses:
        '204':
          description: Account settings updated
        '404':
          description: Account not found
      summary: "Update a sub account's settings"
      tags:
        - Accounts
  /groups:
    get:
      description: List groups under your account
      operationId: groups
      parameters: []
      responses:
        '200':
          description: List of groups returned.
          schema:
            $ref: '#/definitions/GroupList'
      summary: List groups
      tags:
        - Groups
    post:
      description: Create a group under your account
      operationId: groupCreate
      parameters:
        - in: body
          name: body
          required: true
          schema:
            properties:
              name:
                description: Group name.
                type: string
      responses:
        '201':
          description: Group created.
          headers:
            Content-Location:
              description: Location of created group
              type: string
          schema:
            properties:
              id:
                description: Group ID
                type: string
              name:
                description: Group name
                type: string
              total_members:
                description: Group member count
                type: integer
      summary: Create a group
      tags:
        - Groups
  '/groups/{groupId}':
    delete:
      description: Delete a group under your account
      operationId: groupDelete
      parameters:
        - $ref: '#/parameters/GroupId'
      responses:
        '204':
          description: Group deleted.
        '404':
          description: Group not found
      summary: Delete a group
      tags:
        - Groups
    get:
      description: Retrieve a group under your account
      operationId: group
      parameters:
        - $ref: '#/parameters/GroupId'
      responses:
        '200':
          description: Group object returned
          schema:
            allOf:
              - properties:
                  id:
                    description: Group ID
                    type: string
              - $ref: '#/definitions/Group'
        '404':
          description: Group not found
      summary: Retrieve a group
      tags:
        - Groups
    patch:
      description: Update a group under your account
      operationId: groupUpdate
      parameters:
        - $ref: '#/parameters/GroupId'
        - in: body
          name: body
          required: true
          schema:
            properties:
              name:
                description: Group name. Must be unique in one account. Character length is less than 128.
                type: string
      responses:
        '204':
          description: Group updated.
        '404':
          description: Group not found
      summary: Update a group
      tags:
        - Groups
  '/groups/{groupId}/members':
    get:
      description: "List a group's members under your account"
      operationId: groupMembers
      parameters:
        - $ref: '#/parameters/GroupId'
        - $ref: '#/parameters/PageSize'
        - $ref: '#/parameters/PageNumber'
      responses:
        '200':
          description: Group member list returned
          schema:
            $ref: '#/definitions/GroupMemberList'
        '404':
          description: Group not found
      summary: "List a group's members"
      tags:
        - Groups
    post:
      description: Add members to a group under your account
      operationId: groupMembersCreate
      parameters:
        - $ref: '#/parameters/GroupId'
        - in: body
          name: body
          required: true
          schema:
            properties:
              members:
                description: List of Group members
                items:
                  properties:
                    email:
                      description: 'User email. If ID given, email is ignored.'
                      type: string
                    id:
                      description: User ID.
                      type: string
                maximum: 30
                type: array
      responses:
        '201':
          description: Member added.
          schema:
            properties:
              added_at:
                format: date-time
                type: string
              ids:
                type: string
        '404':
          description: Group not found
      summary: Add group members
      tags:
        - Groups
  '/groups/{groupId}/members/{memberId}':
    delete:
      description: Delete a member from a group under your account
      operationId: groupMembersDelete
      parameters:
        - $ref: '#/parameters/GroupId'
        - $ref: '#/parameters/MemberId'
      responses:
        '204':
          description: Group member deleted.
        '404':
          description: Group or Group member not found
      summary: Delete a group member
      tags:
        - Groups
  /im/groups:
    get:
      description: List IM groups under your account
      operationId: imGroups
      parameters: []
      responses:
        '200':
          description: List of IM Groups returned.
          schema:
            $ref: '#/definitions/IMGroupList'
      summary: List IM Groups
      tags:
        - IM Groups
    post:
      description: Create a IM Group under your account
      operationId: imGroupCreate
      parameters:
        - in: body
          name: body
          required: true
          schema:
            properties:
              name:
                description: 'Group name, must be unique in one account'
                maxLength: 128
                type: string
              search_by_account:
                description: Members can search others under same account
                type: boolean
              search_by_domain:
                description: Members can search others in the same email domain
                type: boolean
              search_by_ma_account:
                description: 'Members can search others under same master account, including all sub accounts'
                type: boolean
              type:
                default: normal
                description: IM Group type
                enum:
                  - normal
                  - shared
                  - restricted
                type: string
                x-enum-descriptions:
                  - Only members can see the group automatically. Other people can search members in the group
                  - All people in the account can see the group and members automatically
                  - Nobody can see the group or search members except the members in the group
      responses:
        '201':
          description: IM Group created.
          headers:
            Content-Location:
              description: Location of created IM Group
              type: string
          schema:
            properties:
              id:
                description: Group ID
                type: string
              name:
                description: Group name
                type: string
              search_by_account:
                description: Members can search others under same account.
                type: boolean
              search_by_domain:
                description: Members can search others in the same email domain.
                type: boolean
              search_by_ma_account:
                description: 'Members can search others under same master account, including all sub accounts.'
                type: boolean
              total_members:
                description: Group member count
                type: integer
      summary: Create an IM Group
      tags:
        - IM Groups
  '/im/groups/{groupId}':
    delete:
      description: Delete an IM Group under your account
      operationId: imGroupDelete
      parameters:
        - $ref: '#/parameters/GroupId'
      responses:
        '204':
          description: IM Group deleted.
        '404':
          description: IM Group not found
      summary: Delete an IM Group
      tags:
        - IM Groups
    get:
      description: Retrieve an IM Group under your account
      operationId: imGroup
      parameters:
        - $ref: '#/parameters/GroupId'
      responses:
        '200':
          description: IM Group object returned
          schema:
            allOf:
              - properties:
                  id:
                    description: Group ID
                    type: string
              - $ref: '#/definitions/IMGroup'
        '404':
          description: IM Group not found
      summary: Retrieve an IM Group
      tags:
        - IM Groups
    patch:
      description: Update an IM Group under your account
      operationId: imGroupUpdate
      parameters:
        - $ref: '#/parameters/GroupId'
        - in: body
          name: body
          required: true
          schema:
            properties:
              name:
                description: 'Group name, must be unique in one account'
                maxLength: 128
                type: string
              search_by_account:
                description: Members can search others under same account
                type: boolean
              search_by_domain:
                description: Members can search others in the same email domain
                type: boolean
              search_by_ma_account:
                description: 'Members can search others under same master account, including all sub accounts'
                type: boolean
              type:
                description: IM Group type
                enum:
                  - normal
                  - shared
                  - restricted
                type: string
                x-enum-descriptions:
                  - Only members can see the group automatically. Other people can search members in the group
                  - All people in the account can see the group and members automatically
                  - Nobody can see the group or search members except the members in the group
      responses:
        '204':
          description: IM Group updated.
        '404':
          description: IM Group not found
      summary: Update an IM Group
      tags:
        - IM Groups
  '/im/groups/{groupId}/members':
    get:
      description: "List an IM Group's members under your account"
      operationId: imGroupMembers
      parameters:
        - $ref: '#/parameters/GroupId'
        - $ref: '#/parameters/PageSize'
        - $ref: '#/parameters/PageNumber'
      responses:
        '200':
          description: IM Group member list returned
          schema:
            $ref: '#/definitions/GroupMemberList'
        '404':
          description: IM Group not found
      summary: "List an IM Group's members"
      tags:
        - IM Groups
    post:
      description: Add members to an IM Group under your account
      operationId: imGroupMembersCreate
      parameters:
        - $ref: '#/parameters/GroupId'
        - in: body
          name: body
          required: true
          schema:
            properties:
              members:
                description: List of IM Group members
                items:
                  properties:
                    email:
                      description: 'User email. If ID given, email is ignored.'
                      type: string
                    id:
                      description: User ID.
                      type: string
                maximum: 10
                type: array
      responses:
        '201':
          description: Member added.
          schema:
            properties:
              added_at:
                format: date-time
                type: string
              ids:
                type: string
        '404':
          description: IM Group not found
      summary: Add IM Group members
      tags:
        - IM Groups
  '/im/groups/{groupId}/members/{memberId}':
    delete:
      description: Delete a member from an IM Group under your account
      operationId: imGroupMembersDelete
      parameters:
        - $ref: '#/parameters/GroupId'
        - $ref: '#/parameters/MemberId'
      responses:
        '204':
          description: IM Group member deleted.
        '404':
          description: IM Group or IM Group member not found
      summary: Delete an IM Group member
      tags:
        - IM Groups
  '/meetings/{meetingId}':
    delete:
      description: Delete a meeting
      operationId: meetingDelete
      parameters:
        - $ref: '#/parameters/MeetingId'
        - $ref: '#/parameters/OccurrenceId'
      responses:
        '204':
          description: Meeting deleted
        '404':
          description: Meeting not found
      summary: Delete a meeting
      tags:
        - Meetings
    get:
      description: "Retrieve a meeting's details"
      operationId: meeting
      parameters:
        - $ref: '#/parameters/MeetingId'
      responses:
        '200':
          description: Meeting object returned
          schema:
            allOf:
              - properties:
                  host_id:
                    description: ID of the user set as host of meeting
                    type: string
                  id:
                    description: 'Meeting ID, also know as meeting number'
                    type: string
                  uuid:
                    description: Meeting unique ID
                    type: string
                type: object
              - $ref: '#/definitions/MeetingInfo'
        '404':
          description: Meeting not found
      summary: Retrieve a meeting
      tags:
        - Meetings
    patch:
      description: "Update a meeting's details"
      operationId: meetingUpdate
      parameters:
        - $ref: '#/parameters/MeetingId'
        - description: Meeting
          in: body
          name: body
          required: true
          schema:
            $ref: '#/definitions/MeetingUpdate'
      responses:
        '204':
          description: Meeting Updated
        '404':
          description: Meeting not found
      summary: Update a meeting
      tags:
        - Meetings
  '/meetings/{meetingId}/recordings':
    delete:
      description: "Delete a meeting's recordings"
      operationId: recordingDelete
      parameters:
        - $ref: '#/parameters/MeetingId4Recording'
        - $ref: '#/parameters/RecordingDeleteAction'
      responses:
        '204':
          description: Meeting recording deleted
        '404':
          description: Meeting recording not found
      summary: "Delete a meeting's recordings"
      tags:
        - Cloud Recording
    get:
      description: Retrieve a meeting’s all recordings
      operationId: recordingGet
      parameters:
        - $ref: '#/parameters/MeetingId4Recording'
      responses:
        '200':
          description: Recording object returned
          schema:
            allOf:
              - $ref: '#/definitions/Recording'
        '404':
          description: Meeting recording not found
      summary: Retrieve a meeting’s all recordings
      tags:
        - Cloud Recording
  '/meetings/{meetingId}/recordings/status':
    put:
      description: "Recover a meeting's recordings"
      operationId: recordingStatusUpdate
      parameters:
        - $ref: '#/parameters/MeetingId4Recording'
        - in: body
          name: body
          required: true
          schema:
            properties:
              action:
                enum:
                  - recover
                type: string
                x-enum-descriptions:
                  - recover meeting recording
      responses:
        '204':
          description: Meeting recording recover
        '404':
          description: Meeting recording not found
      summary: "Recover a meeting's recordings"
      tags:
        - Cloud Recording
  '/meetings/{meetingId}/recordings/{recordingId}':
    delete:
      description: Delete one meeting recording file
      operationId: recordingDeleteOne
      parameters:
        - $ref: '#/parameters/MeetingId4Recording'
        - $ref: '#/parameters/RecordingId'
        - $ref: '#/parameters/RecordingDeleteAction'
      responses:
        '204':
          description: Meeting recording file deleted
        '404':
          description: Meeting recording file not found
      summary: Delete one meeting recording file
      tags:
        - Cloud Recording
  '/meetings/{meetingId}/recordings/{recordingId}/status':
    put:
      description: Recover a meeting one recording
      operationId: recordingStatusUpdateOne
      parameters:
        - $ref: '#/parameters/MeetingId4Recording'
        - $ref: '#/parameters/RecordingId'
        - in: body
          name: body
          required: true
          schema:
            properties:
              action:
                enum:
                  - recover
                type: string
                x-enum-descriptions:
                  - recover meeting recording
      responses:
        '204':
          description: Meeting recording recover
        '404':
          description: Meeting recording not found
      summary: Recover a meeting one recording
      tags:
        - Cloud Recording
  '/meetings/{meetingId}/registrants':
    get:
      description: List registrants of a meeting
      operationId: meetingRegistrants
      parameters:
        - $ref: '#/parameters/MeetingId'
        - $ref: '#/parameters/OccurrenceId'
        - $ref: '#/parameters/RegistrantStatus'
        - $ref: '#/parameters/PageSize'
        - $ref: '#/parameters/PageNumber'
      responses:
        '200':
          description: Success
          schema:
            $ref: '#/definitions/MeetingRegistrantList'
        '404':
          description: Meeting not found
      summary: "List a meeting's registrants"
      tags:
        - Meetings
    post:
      description: Register a participant for a meeting
      operationId: meetingRegistrantCreate
      parameters:
        - $ref: '#/parameters/MeetingId'
        - description: 'Occurrence IDs, could get this value from Meeting Get API. Multiple value separated by comma.'
          in: query
          name: occurrence_ids
          type: string
        - in: body
          name: body
          required: true
          schema:
            $ref: '#/definitions/MeetingRegistrant'
      responses:
        '201':
          description: Registration created
          schema:
            properties:
              id:
                description: Registrant ID
                type: string
              join_url:
                description: Join URL for this registrant
                type: string
              registrant_id:
                description: Registrant ID
                type: string
              start_time:
                description: Start time
                format: date-time
                type: string
              topic:
                description: Topic
                type: string
            type: object
        '404':
          description: Meeting not found
      summary: Add a meeting registrant
      tags:
        - Meetings
  '/meetings/{meetingId}/registrants/status':
    put:
      description: "Update a meeting registrant's status"
      operationId: meetingRegistrantStatus
      parameters:
        - $ref: '#/parameters/MeetingId'
        - $ref: '#/parameters/OccurrenceId'
        - in: body
          name: body
          required: true
          schema:
            $ref: '#/definitions/RegistrantStatus'
      responses:
        '204':
          description: Registrant status updated
        '404':
          description: Meeting or Registrant not found
      summary: "Update a meeting registrant's status"
      tags:
        - Meetings
  '/meetings/{meetingId}/status':
    put:
      description: "Update a meeting's status"
      operationId: meetingStatus
      parameters:
        - $ref: '#/parameters/MeetingId'
        - in: body
          name: body
          required: true
          schema:
            properties:
              action:
                enum:
                  - end
                type: string
                x-enum-descriptions:
                  - end a meeting
      responses:
        '204':
          description: Meeting updated
        '404':
          description: Meeting not found
      summary: "Update a meeting's status"
      tags:
        - Meetings
  /metrics/crc:
    get:
      description: "Get CRC Port usage hour by hour for a specified time period <aside class='notice'>We will report a maximum of one month. For example, if \"from\" is set to \"2017-08-05\" and \"to\" is \"2017-10-10\" we will adjust \"from\" to \"2017-09-10\"</aside>"
      operationId: dashboardCRC
      parameters:
        - $ref: '#/parameters/FromDate'
        - $ref: '#/parameters/ToDate'
      responses:
        '200':
          description: CRC Usage returned
          schema:
            allOf:
              - properties:
                  from:
                    description: Start date for this report
                    format: date
                    type: string
                  to:
                    description: End date for this report
                    format: date
                    type: string
              - properties:
                  crc_ports_usage:
                    items:
                      properties:
                        crc_ports_hour_usage:
                          items:
                            properties:
                              hour:
                                type: string
                              max_usage:
                                type: integer
                              total_usage:
                                type: integer
                          type: array
                        date_time:
                          description: Date and time
                          type: string
                    type: array
      summary: Retrieve CRC Port Usage
      tags:
        - Dashboards
  /metrics/im:
    get:
      description: Retrieve metrics of Zoom IM
      operationId: dashboardIM
      parameters:
        - $ref: '#/parameters/FromDate'
        - $ref: '#/parameters/ToDate'
        - $ref: '#/parameters/PageSize'
        - $ref: '#/parameters/NextPageToken'
      responses:
        '200':
          description: IM setails returned
          schema:
            allOf:
              - properties:
                  from:
                    description: Start date for this report
                    format: date
                    type: string
                  to:
                    description: End date for this report
                    format: date
                    type: string
              - $ref: '#/definitions/PaginationToken'
              - properties:
                  users:
                    items:
                      properties:
                        calls_receive:
                          type: integer
                        calls_send:
                          type: integer
                        email:
                          description: User email
                          type: string
                        emoji_receive:
                          type: integer
                        emoji_send:
                          type: integer
                        files_receive:
                          type: integer
                        files_send:
                          type: integer
                        group_receive:
                          type: integer
                        group_send:
                          type: integer
                        images_receive:
                          type: integer
                        images_send:
                          type: integer
                        total_receive:
                          type: integer
                        total_send:
                          type: integer
                        user_id:
                          description: User ID
                          type: string
                        user_name:
                          description: User display name
                          type: string
                        videos_receive:
                          type: integer
                        videos_send:
                          type: integer
                        voice_receive:
                          type: integer
                        voice_send:
                          type: integer
                    type: array
      summary: Retrieve IM
      tags:
        - Dashboards
  /metrics/meetings:
    get:
      description: List live meetings or past meetings for a specified period
      operationId: dashboardMeetings
      parameters:
        - $ref: '#/parameters/MeetingTypePast'
        - $ref: '#/parameters/FromDate'
        - $ref: '#/parameters/ToDate'
        - $ref: '#/parameters/PageSize'
        - $ref: '#/parameters/NextPageToken'
      responses:
        '200':
          description: Meetings Returned
          schema:
            allOf:
              - properties:
                  from:
                    description: Start date for this report
                    format: date
                    type: string
                  to:
                    description: End date for this report
                    format: date
                    type: string
              - $ref: '#/definitions/PaginationToken'
              - properties:
                  meetings:
                    description: Array of meeting objects
                    items:
                      $ref: '#/definitions/MeetingMetric'
                    type: array
      summary: List meetings
      tags:
        - Dashboards
  '/metrics/meetings/{meetingId}':
    get:
      description: Retrieve live or past meetings detail
      operationId: dashboardMeetingDetail
      parameters:
        - $ref: '#/parameters/MeetingId4Metrics'
        - $ref: '#/parameters/MeetingTypePast3'
      responses:
        '200':
          description: Meeting Returned
          schema:
            $ref: '#/definitions/MeetingMetric'
      summary: Retrieve meeting detail
      tags:
        - Dashboards
  '/metrics/meetings/{meetingId}/participants':
    get:
      description: Retrieve live or past meetings participants
      operationId: dashboardMeetingParticipants
      parameters:
        - $ref: '#/parameters/MeetingId4Metrics'
        - $ref: '#/parameters/MeetingTypePast3'
        - $ref: '#/parameters/PageSize'
        - $ref: '#/parameters/NextPageToken'
      responses:
        '200':
          description: Meeting Participants Returned
          schema:
            allOf:
              - $ref: '#/definitions/PaginationToken'
              - properties:
                  participants:
                    description: Array of user objects
                    items:
                      properties:
                        device:
                          description: Participant device
                          type: string
                        domain:
                          description: Participant domain
                          type: string
                        harddisk_id:
                          description: Participant hard disk id
                          type: string
                        id:
                          description: Participant UUID
                          format: uuid
                          type: string
                        ip_address:
                          description: Participant IP Address
                          type: string
                        join_time:
                          description: Participant join time
                          format: date-time
                          type: string
                        leave_time:
                          description: Participant leave time
                          format: date-time
                          type: string
                        location:
                          description: Participant location
                          type: string
                        mac_addr:
                          description: Participant MAC Address
                          type: string
                        network_type:
                          description: Participant network type
                          type: string
                        pc_name:
                          description: Participant PC name
                          type: string
                        recording:
                          description: Participant record
                          type: boolean
                        share_application:
                          description: Did participant share application
                          type: boolean
                        share_desktop:
                          description: Did participant share desktop
                          type: boolean
                        share_whiteboard:
                          description: Did participant share whiteboard
                          type: boolean
                        user_id:
                          description: Participant ID
                          format: uuid
                          type: string
                        user_name:
                          description: Participant display name
                          type: string
                        version:
                          description: Participant version
                          type: string
                    type: array
      summary: Retrieve meeting participants
      tags:
        - Dashboards
  '/metrics/meetings/{meetingId}/participants/qos':
    get:
      description: Retrieve list of live or past meetings participants quality of service
      operationId: dashboardMeetingParticipantsQOS
      parameters:
        - $ref: '#/parameters/MeetingId4Metrics'
        - $ref: '#/parameters/MeetingTypePast2'
        - $ref: '#/parameters/PageSize4Qos'
        - $ref: '#/parameters/NextPageToken'
      responses:
        '200':
          description: Meeting Participants Returned
          schema:
            $ref: '#/definitions/QOSParticipantList'
      summary: List meeting participants QOS
      tags:
        - Dashboards
  '/metrics/meetings/{meetingId}/participants/sharing':
    get:
      description: Retrieve sharing/recording details of live or past meetings participant
      operationId: dashboardMeetingParticipantShare
      parameters:
        - $ref: '#/parameters/MeetingId4Metrics'
        - $ref: '#/parameters/MeetingTypePast2'
        - $ref: '#/parameters/PageSize'
        - $ref: '#/parameters/PageToken'
      responses:
        '200':
          description: Meeting Participants Returned
          schema:
            allOf:
              - $ref: '#/definitions/PaginationToken'
              - properties:
                  participants:
                    description: Array of participants
                    items:
                      properties:
                        details:
                          description: Array of sharing and recording details
                          items:
                            properties:
                              content:
                                description: Type of content shared
                                type: string
                              end_time:
                                description: End time of sharing
                                type: string
                              start_time:
                                description: Start time of sharing
                                type: string
                          type: array
                        id:
                          description: Participant UUID
                          type: string
                        user_id:
                          description: Participant ID
                          type: string
                        user_name:
                          description: Participant display name
                          type: string
                    type: array
      summary: Retrieve sharing/recording details of meeting participant
      tags:
        - Dashboards
  '/metrics/meetings/{meetingId}/participants/{participantId}/qos':
    get:
      description: Retrieve live or past meetings participant quality of service
      operationId: dashboardMeetingParticipantQOS
      parameters:
        - $ref: '#/parameters/MeetingId4Metrics'
        - $ref: '#/parameters/ParticipantId'
        - $ref: '#/parameters/MeetingTypePast2'
      responses:
        '200':
          description: Meeting Participant QOS Returned
          schema:
            $ref: '#/definitions/QOSParticipant'
      summary: Retrieve meeting participant QOS
      tags:
        - Dashboards
  /metrics/webinars:
    get:
      description: List live webinars or past webinars for a specified period
      operationId: dashboardWebinars
      parameters:
        - $ref: '#/parameters/WebinarTypePast'
        - $ref: '#/parameters/FromDate'
        - $ref: '#/parameters/ToDate'
        - $ref: '#/parameters/PageSize'
        - $ref: '#/parameters/NextPageToken'
      responses:
        '200':
          description: Meetings Returned
          schema:
            allOf:
              - properties:
                  from:
                    description: Start date for this report
                    format: date
                    type: string
                  to:
                    description: End date for this report
                    format: date
                    type: string
              - $ref: '#/definitions/PaginationToken'
              - properties:
                  webinars:
                    description: Array of webinar objects
                    items:
                      $ref: '#/definitions/WebinarMetric'
                    type: array
      summary: List webinars
      tags:
        - Dashboards
  '/metrics/webinars/{webinarId}':
    get:
      description: Retrieve live  or past webinars detail
      operationId: dashboardWebinarDetail
      parameters:
        - $ref: '#/parameters/WebinarId4Metrics'
        - $ref: '#/parameters/WebinarTypePast2'
      responses:
        '200':
          description: Webinar Returned
          schema:
            $ref: '#/definitions/WebinarMetric'
      summary: Retrieve webinar detail
      tags:
        - Dashboards
  '/metrics/webinars/{webinarId}/participants':
    get:
      description: Retrieve live or past webinar participants
      operationId: dashboardWebinarParticipants
      parameters:
        - $ref: '#/parameters/WebinarId4Metrics'
        - $ref: '#/parameters/WebinarTypePast2'
        - $ref: '#/parameters/PageSize'
        - $ref: '#/parameters/NextPageToken'
      responses:
        '200':
          description: Webinar Participants Returned
          schema:
            allOf:
              - $ref: '#/definitions/PaginationToken'
              - properties:
                  participants:
                    description: Array of user objects
                    items:
                      properties:
                        device:
                          description: Participant device
                          type: string
                        domain:
                          description: Participant domain
                          type: string
                        harddisk_id:
                          description: Participant hard disk id
                          type: string
                        id:
                          description: Participant UUID
                          format: uuid
                          type: string
                        ip_address:
                          description: Participant IP Address
                          type: string
                        join_time:
                          description: Participant join time
                          format: date-time
                          type: string
                        leave_time:
                          description: Participant leave time
                          format: date-time
                          type: string
                        location:
                          description: Participant location
                          type: string
                        mac_addr:
                          description: Participant MAC Address
                          type: string
                        network_type:
                          description: Participant network type
                          type: string
                        pc_name:
                          description: Participant PC name
                          type: string
                        recording:
                          description: Participant record
                          type: boolean
                        share_application:
                          description: Did participant share application
                          type: boolean
                        share_desktop:
                          description: Did participant share desktop
                          type: boolean
                        share_whiteboard:
                          description: Did participant share whiteboard
                          type: boolean
                        user_id:
                          description: Participant ID
                          format: uuid
                          type: string
                        user_name:
                          description: Participant display name
                          type: string
                        version:
                          description: Participant version
                          type: string
                    type: array
      summary: Retrieve webinar participants
      tags:
        - Dashboards
  '/metrics/webinars/{webinarId}/participants/qos':
    get:
      description: Retrieve list of live or past webinar participants quality of service
      operationId: dashboardWebinarParticipantsQOS
      parameters:
        - $ref: '#/parameters/WebinarId4Metrics'
        - $ref: '#/parameters/WebinarTypePast2'
        - $ref: '#/parameters/PageSize4Qos'
        - $ref: '#/parameters/NextPageToken'
      responses:
        '200':
          description: Webinar Participants Returned
          schema:
            $ref: '#/definitions/QOSParticipantList'
      summary: List webinar participant QOS
      tags:
        - Dashboards
  '/metrics/webinars/{webinarId}/participants/sharing':
    get:
      description: Retrieve sharing/recording details of live or past webinar participant
      operationId: dashboardWebinarParticipantShare
      parameters:
        - $ref: '#/parameters/WebinarId4Metrics'
        - $ref: '#/parameters/WebinarTypePast2'
        - $ref: '#/parameters/PageSize'
        - $ref: '#/parameters/PageToken'
      responses:
        '200':
          description: Webinar Participants Returned
          schema:
            allOf:
              - $ref: '#/definitions/PaginationToken'
              - properties:
                  participants:
                    description: Array of participants
                    items:
                      properties:
                        details:
                          description: Array of sharing and recording details
                          items:
                            properties:
                              content:
                                description: Type of content shared
                                type: string
                              end_time:
                                description: End time of sharing
                                type: string
                              start_time:
                                description: Start time of sharing
                                type: string
                          type: array
                        id:
                          description: Participant UUID
                          type: string
                        user_id:
                          description: Participant ID
                          type: string
                        user_name:
                          description: Participant display name
                          type: string
                    type: array
      summary: Retrieve sharing/recording details of webinar participant
      tags:
        - Dashboards
  '/metrics/webinars/{webinarId}/participants/{participantId}/qos':
    get:
      description: Retrieve live or past webinar participant quality of service
      operationId: dashboardWebinarParticipantQOS
      parameters:
        - $ref: '#/parameters/WebinarId4Metrics'
        - $ref: '#/parameters/ParticipantId'
        - $ref: '#/parameters/WebinarTypePast2'
      responses:
        '200':
          description: Webinar Participant QOS Returned
          schema:
            $ref: '#/definitions/QOSParticipant'
      summary: Retrieve webinar participant QOS
      tags:
        - Dashboards
  /metrics/zoomrooms:
    get:
      description: List all zoom rooms on account
      operationId: dashboardZoomRooms
      parameters:
        - $ref: '#/parameters/PageSize'
        - $ref: '#/parameters/PageNumber'
      responses:
        '200':
          description: List of Zoom Rooms returned
          schema:
            $ref: '#/definitions/ZoomRoomList'
      summary: List Zoom Rooms
      tags:
        - Dashboards
  '/metrics/zoomrooms/{zoomroomId}':
    get:
      description: Retrieve zoom room on account
      operationId: dashboardZoomRoom
      parameters:
        - $ref: '#/parameters/ZoomRoomId'
        - $ref: '#/parameters/FromDate'
        - $ref: '#/parameters/ToDate'
        - $ref: '#/parameters/PageSize'
        - $ref: '#/parameters/PageNumber'
      responses:
        '200':
          description: Zoom Room returned
          schema:
            allOf:
              - $ref: '#/definitions/ZoomRoom'
              - properties:
                  live_meeting:
                    $ref: '#/definitions/MeetingMetric'
                  past_meetings:
                    allOf:
                      - properties:
                          from:
                            description: Start date for this report
                            format: date
                            type: string
                          to:
                            description: End date for this report
                            format: date
                            type: string
                      - $ref: '#/definitions/PaginationToken'
                      - properties:
                          meetings:
                            description: Array of meeting objects
                            items:
                              $ref: '#/definitions/MeetingMetric'
                            type: array
                    type: object
      summary: Retrieve Zoom Room
      tags:
        - Dashboards
  /report/daily:
    get:
      description: 'Retrieve daily report for one month, can only get daily report for recent 6 months.'
      operationId: reportDaily
      parameters:
        - description: Year for this report
          in: query
          name: year
          type: integer
        - description: Month for this report
          in: query
          name: month
          type: integer
      responses:
        '200':
          description: Daily Report Returned
          schema:
            properties:
              dates:
                description: Array of date objects
                items:
                  properties:
                    date:
                      description: Date for this object
                      format: date
                      type: string
                    meeting_minutes:
                      description: Number of meeting minutes on this date
                      type: integer
                    meetings:
                      description: Number of meetings on this date
                      type: integer
                    new_users:
                      description: Number of new users on this date
                      type: integer
                    participants:
                      description: Number of participants on this date
                      type: integer
                type: array
              month:
                description: Month for this report
                type: integer
              year:
                description: Year for this report
                type: integer
      summary: Retrieve daily report
      tags:
        - Reports
  '/report/meetings/{meetingId}':
    get:
      description: Retrieve ended meeting details report
      operationId: reportMeetingDetails
      parameters:
        - $ref: '#/parameters/MeetingId4Metrics'
      responses:
        '200':
          description: Meeting detail Returned
          schema:
            properties:
              duration:
                description: Meeting duration
                type: integer
              end_time:
                description: Meeting end time
                format: date-time
                type: string
              id:
                description: Meeting ID
                type: integer
              participants_count:
                description: Number of meeting participants
                type: integer
              start_time:
                description: Meeting start time
                format: date-time
                type: string
              topic:
                description: Meeting topic
                type: string
              total_minutes:
                description: Number of meeting minutes
                type: integer
              type:
                description: Meeting type
                type: integer
              user_email:
                description: User email
                type: string
              user_name:
                description: User display name
                type: string
              uuid:
                description: Meeting UUID
                format: uuid
                type: string
        '404':
          description: Meeting not found
      summary: Retrieve meeting details report
      tags:
        - Reports
  '/report/meetings/{meetingId}/participants':
    get:
      description: Retrieve ended meeting participants report
      operationId: reportMeetingParticipants
      parameters:
        - $ref: '#/parameters/MeetingId4Metrics'
        - $ref: '#/parameters/PageSize'
        - $ref: '#/parameters/NextPageToken'
      responses:
        '200':
          description: Meeting Participants Report Returned
          schema:
            allOf:
              - $ref: '#/definitions/PaginationToken'
              - properties:
                  participants:
                    description: Array of meeting participant objects
                    items:
                      properties:
                        attentiveness_score:
                          description: Participant attentiveness score
                          type: integer
                        duration:
                          description: Participant duration
                          type: integer
                        join_time:
                          description: Participant join time
                          format: date-time
                          type: string
                        leave_time:
                          description: Participant leave time
                          format: date-time
                          type: string
                        name:
                          description: Participant display name
                          type: string
                        user_email:
                          description: Participant email
                          type: string
                    type: array
        '404':
          description: Meeting not found
      summary: Retrieve meeting participants report
      tags:
        - Reports
  /report/telephone:
    get:
      description: "Retrieve telephone report for a specified period <aside>Toll Report API is provided for enabled 'Toll Report' option.</aside>"
      operationId: reportTelephone
      parameters:
        - description: Audio type
          enum:
            - 1
            - 2
          in: query
          name: type
          type: string
          x-enum-descriptions:
            - 'Toll-free Call-in & Call-out'
            - Toll
        - $ref: '#/parameters/FromDate'
        - $ref: '#/parameters/ToDate'
        - $ref: '#/parameters/PageSize'
        - $ref: '#/parameters/PageNumber'
      responses:
        '200':
          description: Telephone Report Returned
          schema:
            allOf:
              - properties:
                  from:
                    description: Start date for this report
                    format: date
                    type: string
                  to:
                    description: End date for this report
                    format: date
                    type: string
              - $ref: '#/definitions/Pagination'
              - properties:
                  telephony_usage:
                    description: Array of telephony objects
                    items:
                      properties:
                        dept:
                          description: User department
                          type: string
                        duration:
                          description: Meeting duration
                          type: integer
                        end_time:
                          description: Meeting end time
                          format: date-time
                          type: string
                        host_email:
                          description: User email
                          type: string
                        host_name:
                          description: User display name
                          type: string
                        meeting_id:
                          description: Meeting ID
                          type: integer
                        phone_number:
                          description: Telephone Number
                          type: string
                        start_time:
                          description: Meeting start time
                          format: date-time
                          type: string
                        total:
                          description: Total
                          type: number
                    type: array
      summary: Retrieve telephone report
      tags:
        - Reports
  /report/users:
    get:
      description: Retrieve active or inactive hosts report for a specified period
      operationId: reportUsers
      parameters:
        - description: Active hosts or inactive hosts
          enum:
            - active
            - inactive
          in: query
          name: type
          type: string
          x-enum-descriptions:
            - Active hosts
            - Inactive hosts
        - $ref: '#/parameters/FromDate'
        - $ref: '#/parameters/ToDate'
        - $ref: '#/parameters/PageSize'
        - $ref: '#/parameters/PageNumber'
      responses:
        '200':
          description: Active/Inactive Hosts Report Returned
          schema:
            allOf:
              - properties:
                  from:
                    description: Start date for this report
                    format: date
                    type: string
                  to:
                    description: End date for this report
                    format: date
                    type: string
              - $ref: '#/definitions/Pagination'
              - properties:
                  total_meeting_minutes:
                    description: Number of meeting minutes for this range
                    type: integer
                  total_meetings:
                    description: Number of meetings for this range
                    type: integer
                  total_participants:
                    description: Number of participants for this range
                    type: integer
                  users:
                    description: Array of user objects
                    items:
                      properties:
                        dept:
                          description: User department
                          type: string
                        email:
                          description: User email
                          type: string
                        id:
                          description: User ID
                          format: uuid
                          type: string
                        meeting_minutes:
                          description: Number of meeting minutes for user
                          type: integer
                        meetings:
                          description: Number of meetings for user
                          type: integer
                        participants:
                          description: Number of participants in meetings for user
                          type: integer
                        type:
                          description: User type
                          type: integer
                        user_name:
                          description: User display name
                          type: string
                    type: array
      summary: Retrieve hosts report
      tags:
        - Reports
  '/report/users/{userId}/meetings':
    get:
      description: Retrieve ended meetings report for a specified period
      operationId: reportMeetings
      parameters:
        - $ref: '#/parameters/UserId'
        - $ref: '#/parameters/FromDate'
        - $ref: '#/parameters/ToDate'
        - $ref: '#/parameters/PageSize'
        - $ref: '#/parameters/NextPageToken'
      responses:
        '200':
          description: Active/Inactive Hosts Report Returned
          schema:
            allOf:
              - properties:
                  from:
                    description: Start date for this report
                    format: date
                    type: string
                  to:
                    description: End date for this report
                    format: date
                    type: string
              - $ref: '#/definitions/PaginationToken'
              - properties:
                  meetings:
                    description: Array of meeting objects
                    items:
                      properties:
                        duration:
                          description: Meeting duration
                          type: integer
                        end_time:
                          description: Meeting end time
                          format: date-time
                          type: string
                        id:
                          description: Meeting ID
                          type: integer
                        participants_count:
                          description: Number of meeting participants
                          type: integer
                        start_time:
                          description: Meeting start time
                          format: date-time
                          type: string
                        topic:
                          description: Meeting topic
                          type: string
                        total_minutes:
                          description: Number of meeting minutes
                          type: integer
                        type:
                          description: Meeting type
                          type: integer
                        user_email:
                          description: User email
                          type: string
                        user_name:
                          description: User display name
                          type: string
                        uuid:
                          description: Meeting UUID
                          format: uuid
                          type: string
                    type: array
        '404':
          description: User not found
      summary: Retrieve meetings report
      tags:
        - Reports
  '/report/webinars/{webinarId}':
    get:
      description: Retrieve ended webinar details report
      operationId: reportWebinarDetails
      parameters:
        - $ref: '#/parameters/WebinarId4Metrics'
      responses:
        '200':
          description: Webinar detail Returned
          schema:
            properties:
              duration:
                description: Meeting duration
                type: integer
              end_time:
                description: Meeting end time
                format: date-time
                type: string
              id:
                description: Meeting ID
                type: integer
              participants_count:
                description: Number of meeting participants
                type: integer
              start_time:
                description: Meeting start time
                format: date-time
                type: string
              topic:
                description: Meeting topic
                type: string
              total_minutes:
                description: Number of meeting minutes
                type: integer
              type:
                description: Meeting type
                type: integer
              user_email:
                description: User email
                type: string
              user_name:
                description: User display name
                type: string
              uuid:
                description: Meeting UUID
                format: uuid
                type: string
        '404':
          description: Webinar not found
      summary: Retrieve webinar details report
      tags:
        - Reports
  '/report/webinars/{webinarId}/participants':
    get:
      description: Retrieve ended webinar participants report
      operationId: reportWebinarParticipants
      parameters:
        - $ref: '#/parameters/WebinarId4Metrics'
        - $ref: '#/parameters/PageSize'
        - $ref: '#/parameters/NextPageToken'
      responses:
        '200':
          description: Meeting Participants Report Returned
          schema:
            allOf:
              - $ref: '#/definitions/PaginationToken'
              - properties:
                  participants:
                    description: Array of webinar participant objects
                    items:
                      properties:
                        attentiveness_score:
                          description: Participant attentiveness score
                          type: string
                        duration:
                          description: Participant duration
                          type: integer
                        join_time:
                          description: Participant join time
                          format: date-time
                          type: string
                        leave_time:
                          description: Participant leave time
                          format: date-time
                          type: string
                        name:
                          description: Participant display name
                          type: string
                        user_email:
                          description: Participant email
                          type: string
                    type: array
        '404':
          description: Webinar not found
      summary: Retrieve webinar participants report
      tags:
        - Reports
  '/report/webinars/{webinarId}/polls':
    get:
      description: Retrieve ended webinar polls report
      operationId: reportWebinarPolls
      parameters:
        - $ref: '#/parameters/WebinarId4Metrics'
      responses:
        '200':
          description: Webinar Polls Report Returned
          schema:
            properties:
              id:
                description: Webinar ID
                type: integer
              questions:
                description: Array of webinar question objects
                items:
                  properties:
                    email:
                      description: Participant email
                      type: string
                    name:
                      description: Participant display name
                      type: string
                    question_details:
                      description: Array of questions from user
                      items:
                        properties:
                          answer:
                            description: Given answer
                            type: string
                          question:
                            description: Asked question
                            type: string
                      type: array
                type: array
              start_time:
                description: Webinar start time
                format: date-time
                type: string
              uuid:
                description: Webinar UUID
                format: uuid
                type: string
        '404':
          description: Webinar not found
      summary: Retrieve webinar polls report
      tags:
        - Reports
  '/report/webinars/{webinarId}/qa':
    get:
      description: 'Retrieve ended webinar Q&A report'
      operationId: reportWebinarQA
      parameters:
        - $ref: '#/parameters/WebinarId4Metrics'
      responses:
        '200':
          description: 'Webinar Q&A Report Returned'
          schema:
            properties:
              id:
                description: Webinar ID
                type: integer
              questions:
                description: Array of webinar question objects
                items:
                  properties:
                    email:
                      description: Participant email
                      type: string
                    name:
                      description: Participant display name
                      type: string
                    question_details:
                      description: Array of questions from user
                      items:
                        properties:
                          answer:
                            description: Given answer
                            type: string
                          question:
                            description: Asked question
                            type: string
                      type: array
                type: array
              start_time:
                description: Webinar start time
                format: date-time
                type: string
              uuid:
                description: Webinar UUID
                format: uuid
                type: string
        '404':
          description: Webinar not found
      summary: 'Retrieve webinar Q&A report'
      tags:
        - Reports
  /tsp:
    get:
      description: List TSP dial-in numbers under account
      operationId: tsp
      parameters: []
      responses:
        '200':
          description: TSP dial-in numbers returned
          schema:
            properties:
              dial_in_numbers:
                items:
                  properties:
                    code:
                      description: Country Code
                      type: string
                    number:
                      description: 'Dial-in number, length is less than 16.'
                      type: string
                    type:
                      type: string
                type: array
              tsp_provider:
                type: string
      summary: List TSP dial-in numbers
      tags:
        - TSP
  /users:
    get:
      description: List users on your account
      operationId: users
      parameters:
        - default: active
          description: User status
          enum:
            - active
            - inactive
            - pending
          in: query
          name: status
          type: string
          x-enum-descriptions:
            - users with active status
            - users with inactive status
            - users with pending status
        - $ref: '#/parameters/PageSize'
        - $ref: '#/parameters/PageNumber'
      responses:
        '200':
          description: User list returned
          schema:
            $ref: '#/definitions/UserList'
      summary: List Users
      tags:
        - Users
    post:
      description: Create a user on your account
      operationId: userCreate
      parameters:
        - description: User
          in: body
          name: body
          required: true
          schema:
            properties:
              action:
                description: Action to take for user creation
                enum:
                  - create
                  - autoCreate
                  - custCreate
                  - ssoCreate
                type: string
                x-enum-descriptions:
                  - 'User will get an email sent from Zoom. There is a confirmation link in this email. User will then need to click this link to activate their account to the Zoom service. The user can set or change their password in Zoom. <br/>'
                  - 'This action is provided for enterprise customer who has a managed domain. This feature is disabled by default because of the security risk involved in creating a user who does not belong to your domain without notifying the user. <br/>'
                  - 'This action is provided for API partner only. User created in this way has no password and is not able to log into the Zoom web site or client. <br/>'
                  - 'This action is provided for enabled "Pre-provisioning SSO User" option. User created in this way has no password. If it is not a basic user, will generate a Personal Vanity URL using user name (no domain) of the provisioning email. If user name or pmi is invalid or occupied, will use random number/random personal vanity URL. <br/>'
              user_info:
                properties:
                  email:
                    description: "User's email address."
                    type: string
                  first_name:
                    description: "User's first name. Cannot contain more than 5 Chinese words."
                    maxLength: 64
                    type: string
                  last_name:
                    description: "User's last name. Cannot contain more than 5 Chinese words."
                    maxLength: 64
                    type: string
                  password:
                    description: 'User’s password. Only for "autoCreate" action.'
                    type: string
                  type:
                    description: "User's type"
                    enum:
                      - 1
                      - 2
                      - 3
                    type: integer
                    x-enum-descriptions:
                      - basic
                      - pro
                      - corp
                required:
                  - email
                  - type
            required:
              - action
            type: object
      responses:
        '201':
          description: User Created
          headers:
            Content-Location:
              description: Location of created User
              type: string
          schema:
            properties:
              email:
                description: "User's email address."
                type: string
              first_name:
                description: "User's first name."
                maxLength: 64
                type: string
              id:
                description: User ID
                type: string
              last_name:
                description: "User's last name."
                maxLength: 64
                type: string
              type:
                description: "User's type"
                enum:
                  - 1
                  - 2
                  - 3
                type: integer
                x-enum-descriptions:
                  - basic
                  - pro
                  - corp
        '409':
          description: User with that email already exists
      summary: Create a user
      tags:
        - Users
  /users/email:
    get:
      description: Check if the user email exists.
      operationId: userEmail
      parameters:
        - description: User email
          in: query
          name: email
          required: true
          type: string
      responses:
        '200':
          description: Success
          schema:
            properties:
              existed_email:
                type: boolean
      summary: "Check a user's email"
      tags:
        - Users
  /users/zpk:
    get:
      description: Check if the zpk is expired. The zpk is used to authenticate a user.
      operationId: userZPK
      parameters:
        - description: User zpk
          in: query
          name: zpk
          required: true
          type: string
      responses:
        '200':
          description: Success
          schema:
            properties:
              expire_in:
                type: integer
      summary: "Verify a user's zpk"
      tags:
        - Users
  '/users/{userId}':
    delete:
      description: Delete a user on your account
      operationId: userDelete
      parameters:
        - $ref: '#/parameters/UserId'
        - default: disassociate
          description: Delete action type
          enum:
            - disassociate
            - delete
          in: query
          name: action
          type: string
          x-enum-descriptions:
            - Disassociate a user
            - Permanently delete a user
      responses:
        '204':
          description: User deleted
        '404':
          description: User not found
      summary: Delete a user
      tags:
        - Users
    get:
      description: Retrieve a user on your account
      operationId: user
      parameters:
        - $ref: '#/parameters/UserId'
        - $ref: '#/parameters/LoginType'
      responses:
        '200':
          description: User object returned
          schema:
            allOf:
              - properties:
                  id:
                    description: User ID
                    type: string
              - $ref: '#/definitions/User'
              - properties:
                  pic_url:
                    type: string
                  vanity_url:
                    type: string
                  verified:
                    type: integer
        '404':
          description: User not found
      summary: Retrieve a user
      tags:
        - Users
    patch:
      description: Update a user on your account
      operationId: userUpdate
      parameters:
        - $ref: '#/parameters/UserId'
        - description: User
          in: body
          name: body
          required: true
          schema:
            $ref: '#/definitions/UserUpdate'
      responses:
        '204':
          description: User updated
        '404':
          description: User not found
      summary: Update a user
      tags:
        - Users
  '/users/{userId}/assistants':
    delete:
      description: "Delete all of a user'sassitants"
      operationId: userAssistantsDelete
      parameters:
        - $ref: '#/parameters/UserId'
      responses:
        '204':
          description: Assitants deleted.
        '404':
          description: User not found
      summary: "Delete a user's assistants"
      tags:
        - Users
    get:
      description: "List a user's assistants"
      operationId: userAssistants
      parameters:
        - $ref: '#/parameters/UserId'
      responses:
        '200':
          description: Success
          schema:
            $ref: '#/definitions/UserAssistantsList'
        '404':
          description: User not found
      summary: "List a user's assistants"
      tags:
        - Users
    post:
      description: Add assistants to a user
      operationId: userAssistantCreate
      parameters:
        - $ref: '#/parameters/UserId'
        - description: User assistant
          in: body
          name: body
          required: true
          schema:
            $ref: '#/definitions/UserAssistantsList'
      responses:
        '201':
          description: Assitant Added
          headers:
            Content-Location:
              description: Location of created assistant
              type: string
          schema:
            properties:
              add_at:
                format: date-time
                type: string
              ids:
                description: User ID
                type: string
        '404':
          description: User not found
      summary: Add assistants
      tags:
        - Users
  '/users/{userId}/assistants/{assistantId}':
    delete:
      description: "Delete one of a user's assistants"
      operationId: userAssistantDelete
      parameters:
        - $ref: '#/parameters/UserId'
        - description: "Assistant's ID"
          in: path
          name: assistantId
          required: true
          type: string
      responses:
        '204':
          description: Assitant deleted.
        '404':
          description: User or Assistant not found
      summary: "Delete a user's assistant"
      tags:
        - Users
  '/users/{userId}/meetings':
    get:
      description: List meetings for a user
      operationId: meetings
      parameters:
        - $ref: '#/parameters/UserId'
        - $ref: '#/parameters/MeetingType'
        - $ref: '#/parameters/PageSize'
        - $ref: '#/parameters/PageNumber'
      responses:
        '200':
          description: List of Meeting objects returned
          schema:
            $ref: '#/definitions/MeetingList'
        '404':
          description: User not found
      summary: List meetings
      tags:
        - Meetings
    post:
      description: Create a meeting for a user
      operationId: meetingCreate
      parameters:
        - $ref: '#/parameters/UserId'
        - description: Meeting object
          in: body
          name: body
          required: true
          schema:
            $ref: '#/definitions/Meeting'
      responses:
        '201':
          description: Meeting Created
          headers:
            Content-Location:
              description: Location of created Meeting
              type: string
          schema:
            allOf:
              - properties:
                  host_id:
                    description: ID of the user set as host of meeting
                    type: string
                  id:
                    description: 'Meeting ID, also known as meeting number'
                    type: string
                  uuid:
                    description: Meeting unique ID
                    type: string
                type: object
              - $ref: '#/definitions/MeetingInfo'
        '404':
          description: User not found
      summary: Create a meeting
      tags:
        - Meetings
  '/users/{userId}/password':
    put:
      description: "Update a user's password"
      operationId: userPassword
      parameters:
        - $ref: '#/parameters/UserId'
        - description: User password
          in: body
          name: body
          required: true
          schema:
            properties:
              password:
                description: User’s password. Character length is less than 32.
                type: string
            required:
              - password
            type: object
      responses:
        '204':
          description: Password updated
        '404':
          description: User not found
      summary: "Update a user's password"
      tags:
        - Users
  '/users/{userId}/picture':
    post:
      description: "Upload a user's profile picture"
      operationId: userPicture
      parameters:
        - $ref: '#/parameters/UserId'
        - description: 'User picture file, must be a jpg/jpeg file'
          in: formData
          name: pic_file
          required: true
          type: file
      responses:
        '201':
          description: Picture Uploaded
          headers:
            Content-Location:
              description: "Location of user's picture"
              type: string
        '404':
          description: User not found
      summary: "Upload a user's picture"
      tags:
        - Users
  '/users/{userId}/recordings':
    get:
      description: List all the recordings
      operationId: recordingsList
      parameters:
        - $ref: '#/parameters/UserId'
        - $ref: '#/parameters/FromDate'
        - $ref: '#/parameters/ToDate'
        - $ref: '#/parameters/PageSize'
        - $ref: '#/parameters/NextPageToken'
        - $ref: '#/parameters/Mc'
        - $ref: '#/parameters/Trash'
      responses:
        '200':
          description: List of Recording objects returned
          schema:
            $ref: '#/definitions/RecordingList'
        '404':
          description: User not found
      summary: List all the recordings
      tags:
        - Cloud Recording
  '/users/{userId}/settings':
    get:
      description: "Retrieve a user's settings"
      operationId: userSettings
      parameters:
        - $ref: '#/parameters/UserId'
        - $ref: '#/parameters/LoginType'
      responses:
        '200':
          description: User settings returned
          schema:
            $ref: '#/definitions/UserSettings'
        '404':
          description: User not found
      summary: "Retrieve a user's settings"
      tags:
        - Users
    patch:
      description: "Update a user's settings"
      operationId: userSettingsUpdate
      parameters:
        - $ref: '#/parameters/UserId'
        - description: User Settings
          in: body
          name: body
          required: true
          schema:
            $ref: '#/definitions/UserSettings'
      responses:
        '204':
          description: "User setting's updated"
        '404':
          description: User not found
      summary: "Update a user's settings"
      tags:
        - Users
  '/users/{userId}/status':
    put:
      description: "Update a user's status"
      operationId: userStatus
      parameters:
        - $ref: '#/parameters/UserId'
        - description: User status
          in: body
          name: body
          required: true
          schema:
            description: The action
            properties:
              action:
                description: The action type
                enum:
                  - activate
                  - deactivate
                type: string
                x-enum-descriptions:
                  - set users status to active
                  - set users status to inactive
            required:
              - action
            type: object
      responses:
        '204':
          description: Status updated
        '404':
          description: User not found
      summary: "Update a user's status"
      tags:
        - Users
  '/users/{userId}/token':
    delete:
      description: "Revoke a user's SSO token"
      operationId: userSSOTokenDelete
      parameters:
        - $ref: '#/parameters/UserId'
      responses:
        '204':
          description: Token deleted
        '404':
          description: User not found
      summary: "Revoke a user's SSO token"
      tags:
        - Users
    get:
      description: "Retrieve a user's token"
      operationId: userToken
      parameters:
        - $ref: '#/parameters/UserId'
        - description: User token type
          enum:
            - token
            - zpk
          in: query
          name: type
          type: string
          x-enum-descriptions:
            - Used for starting meeting with client SDK.
            - Used for generating the start meeting url.
      responses:
        '200':
          description: Token returned
          schema:
            properties:
              token:
                description: User ID
                type: string
        '404':
          description: User not found
      summary: "Retrieve a user's token"
      tags:
        - Users
  '/users/{userId}/tsp':
    get:
      description: "List user's TSP accounts"
      operationId: userTSPs
      parameters:
        - $ref: '#/parameters/UserId'
      responses:
        '200':
          description: TSP Account list returned
          schema:
            properties:
              tsp_accounts:
                items:
                  $ref: '#/definitions/TSP'
                type: array
        '404':
          description: User not found
      summary: "List user's TSP accounts"
      tags:
        - TSP
    post:
      description: "Add a user's TSP account"
      operationId: userTSPCreate
      parameters:
        - $ref: '#/parameters/UserId'
        - description: TSP Account
          in: body
          name: body
          required: true
          schema:
            $ref: '#/definitions/TSP'
      responses:
        '201':
          description: TSP Account added
          schema:
            $ref: '#/definitions/TSP'
      summary: "Add a user's TSP account"
      tags:
        - TSP
  '/users/{userId}/tsp/{tspId}':
    delete:
      description: "Delete a user's TSP account"
      operationId: userTSPDelete
      parameters:
        - $ref: '#/parameters/UserId'
        - $ref: '#/parameters/TSPId'
      responses:
        '204':
          description: TSP Account deleted
      summary: "Delete a user's TSP account"
      tags:
        - TSP
    get:
      description: "Retrieve a user's TSP account"
      operationId: userTSP
      parameters:
        - $ref: '#/parameters/UserId'
        - $ref: '#/parameters/TSPId'
      responses:
        '200':
          description: TSP Account returned
          schema:
            $ref: '#/definitions/TSP'
      summary: "Retrieve a user's TSP account"
      tags:
        - TSP
    patch:
      description: "Update a user's TSP account"
      operationId: userTSPUpdate
      parameters:
        - $ref: '#/parameters/UserId'
        - $ref: '#/parameters/TSPId'
        - description: TSP Account
          in: body
          name: body
          required: true
          schema:
            $ref: '#/definitions/TSP'
      responses:
        '204':
          description: TSP Account updated
      summary: Update a TSP account
      tags:
        - TSP
  '/users/{userId}/webinars':
    get:
      description: List webinars for a user
      operationId: webinars
      parameters:
        - $ref: '#/parameters/UserId'
        - $ref: '#/parameters/PageSize'
        - $ref: '#/parameters/PageNumber'
      responses:
        '200':
          description: List of Webinar objects returned
          schema:
            $ref: '#/definitions/WebinarList'
        '404':
          description: User not found
      summary: List webinars
      tags:
        - Webinars
    post:
      description: Create a webinar for a user
      operationId: webinarCreate
      parameters:
        - $ref: '#/parameters/UserId'
        - description: User
          in: body
          name: body
          required: true
          schema:
            $ref: '#/definitions/Webinar'
      responses:
        '201':
          description: Webinar Created
          headers:
            Content-Location:
              description: Location of created Webinar
              type: string
          schema:
            allOf:
              - properties:
                  host_id:
                    description: ID of the user set as host of Webinar
                    type: string
                  id:
                    description: 'Webinar ID, also known as Webinar number'
                    type: string
                  uuid:
                    description: Webinar unique ID
                    type: string
                type: object
              - $ref: '#/definitions/WebinarInfo'
        '404':
          description: User not found
      summary: Create a webinar
      tags:
        - Webinars
  /webhooks:
    get:
      description: List webhooks for a account
      operationId: webhooks
      parameters: []
      responses:
        '200':
          description: List of Webhook objects returned
          schema:
            $ref: '#/definitions/WebhookList'
        '404':
          description: Webhook not found
      summary: List webhooks
      tags:
        - Webhooks
    post:
      description: Create a webhook for a account
      operationId: webhookCreate
      parameters:
        - description: Webhook
          in: body
          name: body
          required: true
          schema:
            $ref: '#/definitions/Webhook'
      responses:
        '201':
          description: Webhook Created
          headers:
            Content-Location:
              description: Location of created Webhook
              type: string
          schema:
            allOf:
              - properties:
                  webhook_id:
                    description: Webhook Id.
                    type: string
              - $ref: '#/definitions/Webhook'
              - properties:
                  created_at:
                    description: Webhook create time
                    format: date-time
                    type: string
        '404':
          description: Account not found
      summary: Create a webhook
      tags:
        - Webhooks
  /webhooks/options:
    patch:
      description: Switch webhook version
      operationId: webhookSwitch
      parameters:
        - in: body
          name: body
          required: true
          schema:
            properties:
              version:
                enum:
                  - v1
                  - v2
                type: string
                x-enum-descriptions:
                  - Version 1
                  - Version 2
            required:
              - version
      responses:
        '204':
          description: Webhook Subscribe version update
        '404':
          description: Webhook Subscribe not found
      summary: Switch webhook version
      tags:
        - Webhooks
  '/webhooks/{webhookId}':
    delete:
      description: Delete a webhook
      operationId: webhookDelete
      parameters:
        - $ref: '#/parameters/WebhookId'
      responses:
        '204':
          description: Webhook deleted
        '404':
          description: Webhook not found
      summary: Delete a webhook
      tags:
        - Webhooks
    get:
      description: Retrieve a webhook
      operationId: webhook
      parameters:
        - $ref: '#/parameters/WebhookId'
      responses:
        '200':
          description: Webhook object returned
          schema:
            allOf:
              - properties:
                  webhook_id:
                    description: Webhook Id.
                    type: string
              - $ref: '#/definitions/Webhook'
              - properties:
                  created_at:
                    description: Webhook create time
                    format: date-time
                    type: string
        '404':
          description: Webinar not found
      summary: Retrieve a webhook
      tags:
        - Webhooks
    patch:
      description: Update a webhook
      operationId: webhookUpdate
      parameters:
        - $ref: '#/parameters/WebhookId'
        - description: Webhook
          in: body
          name: body
          required: true
          schema:
            $ref: '#/definitions/WebhookUpdate'
      responses:
        '204':
          description: Webhook Updated
        '404':
          description: Webhook not found
      summary: Update a webhook
      tags:
        - Webhooks
  '/webinars/{webinarId}':
    delete:
      description: Delete a webinar
      operationId: webinarDelete
      parameters:
        - $ref: '#/parameters/WebinarId'
        - $ref: '#/parameters/OccurrenceId'
      responses:
        '204':
          description: Webinar deleted
        '404':
          description: Webinar not found
      summary: Delete a webinar
      tags:
        - Webinars
    get:
      description: Retrieve a webinar
      operationId: webinar
      parameters:
        - $ref: '#/parameters/WebinarId'
      responses:
        '200':
          description: Webinar object returned
          schema:
            allOf:
              - properties:
                  host_id:
                    description: ID of the user set as host of webinar
                    type: string
                  id:
                    description: 'Webinar ID, also know as webinar number'
                    type: string
                  uuid:
                    description: Webinar unique ID
                    type: string
                type: object
              - $ref: '#/definitions/WebinarInfo'
        '404':
          description: Webinar not found
      summary: Retrieve a webinar
      tags:
        - Webinars
    patch:
      description: Update a webinar
      operationId: webinarUpdate
      parameters:
        - $ref: '#/parameters/WebinarId'
        - description: Webinar
          in: body
          name: body
          required: true
          schema:
            $ref: '#/definitions/WebinarUpdate'
      responses:
        '204':
          description: Webinar Updated
        '404':
          description: Webinar not found
      summary: Update a webinar
      tags:
        - Webinars
  '/webinars/{webinarId}/panelists':
    delete:
      description: Remove all panelists from a webinar
      operationId: webinarPanelistsDelete
      parameters:
        - $ref: '#/parameters/WebinarId'
      responses:
        '204':
          description: Panelists removed
        '404':
          description: Webinar not found
      summary: "Remove a webinar's panelists"
      tags:
        - Webinars
    get:
      description: List panelists for a webinar
      operationId: webinarPanelists
      parameters:
        - $ref: '#/parameters/WebinarId'
      responses:
        '200':
          description: Success
          schema:
            $ref: '#/definitions/WebinarPanelistList'
        '404':
          description: Webinar not found
      summary: "List a webinar's panelists"
      tags:
        - Webinars
    post:
      description: Add panelist to webinar
      operationId: webinarPanelistCreate
      parameters:
        - $ref: '#/parameters/WebinarId'
        - in: body
          name: body
          required: true
          schema:
            $ref: '#/definitions/WebinarPanelist'
      responses:
        '201':
          description: Panelist created
          schema:
            properties:
              id:
                description: Panelist ID
                type: string
              join_url:
                description: Join URL for this panelist
                type: string
            type: object
        '404':
          description: Webinar not found
      summary: Add a webinar panelist
      tags:
        - Webinars
  '/webinars/{webinarId}/panelists/{panelistId}':
    delete:
      description: Remove a panelist from a webinar
      operationId: webinarPanelistDelete
      parameters:
        - $ref: '#/parameters/WebinarId'
        - description: The panelist ID
          in: path
          name: panelistId
          required: true
          type: integer
      responses:
        '204':
          description: Panelists removed
        '404':
          description: Webinar or Panelist not found
      summary: Remove a webinar panelist
      tags:
        - Webinars
  '/webinars/{webinarId}/registrants':
    get:
      description: List registrants for a webinar
      operationId: webinarRegistrants
      parameters:
        - $ref: '#/parameters/WebinarId'
        - $ref: '#/parameters/OccurrenceId'
        - $ref: '#/parameters/RegistrantStatus'
        - $ref: '#/parameters/PageSize'
        - $ref: '#/parameters/PageNumber'
      responses:
        '200':
          description: Success
          schema:
            $ref: '#/definitions/WebinarRegistrantList'
        '404':
          description: Webinar not found
      summary: "List a webinar's registrants"
      tags:
        - Webinars
    post:
      description: Add a registrant for a webinar
      operationId: webinarRegistrantCreate
      parameters:
        - $ref: '#/parameters/WebinarId'
        - description: 'Occurrence IDs, could get this value from Webinar Get API. Multiple value separated by comma.'
          in: query
          name: occurrence_ids
          type: string
        - in: body
          name: body
          required: true
          schema:
            $ref: '#/definitions/WebinarRegistrant'
      responses:
        '201':
          description: Registration created
          schema:
            properties:
              id:
                description: Registrant ID
                type: string
              join_url:
                description: Join URL for this registrant
                type: string
              registrant_id:
                description: Registrant ID
                type: string
              start_time:
                description: Start time
                format: date-time
                type: string
              topic:
                description: Topic
                type: string
            type: object
        '404':
          description: Webinar not found
      summary: Add a webinar registrant
      tags:
        - Webinars
  '/webinars/{webinarId}/registrants/status':
    put:
      description: "Update a webinar registrant's status"
      operationId: webinarRegistrantStatus
      parameters:
        - $ref: '#/parameters/WebinarId'
        - $ref: '#/parameters/OccurrenceId'
        - in: body
          name: body
          required: true
          schema:
            properties:
              action:
                enum:
                  - approve
                  - cancel
                  - deny
                type: string
                x-enum-descriptions:
                  - Approve registrant
                  - Cancel registrant
                  - Deny registrant
              registrants:
                description: List of registrants
                items:
                  properties:
                    email:
                      type: string
                    id:
                      type: string
                maximum: 30
                type: array
            required:
              - action
      responses:
        '204':
          description: Registrant status updated
        '404':
          description: Webinar or Registrant not found
      summary: "Update a webinar registrant's status"
      tags:
        - Webinars
  '/webinars/{webinarId}/status':
    put:
      description: "Update a webinar's status"
      operationId: webinarStatus
      parameters:
        - $ref: '#/parameters/WebinarId'
        - in: body
          name: body
          required: true
          schema:
            properties:
              status:
                enum:
                  - end
                type: string
                x-enum-descriptions:
                  - end a webinar
      responses:
        '204':
          description: Webinar updated
        '404':
          description: Webinar not found
      summary: "Update a webinar's status"
      tags:
        - Webinars
definitions:
  Account:
    description: "The account object represents an account on zoom. The person who created the account, or who the account was created for, is referred to as the Account owner. You can read more about the Zoom account structure <a href='https://developer.zoom.us/blog/a-brief-look-at-zoom-account-structures/' target='_blank'>here</a>."
    properties:
      email:
        description: "User's email address."
        type: string
      first_name:
        description: "User's first name."
        type: string
      last_name:
        description: "User's last name."
        type: string
      options:
        $ref: '#/definitions/AccountOptions'
      password:
        description: "User's password."
        type: string
    required:
      - email
      - first_name
      - last_name
      - password
    type: object
  AccountList:
    allOf:
      - $ref: '#/definitions/Pagination'
      - $ref: '#/definitions/AccountListItem'
    description: List of Accounts
    title: Account List
    type: object
  AccountListItem:
    description: Account object in account list
    properties:
      accounts:
        description: List of Account objects.
        items:
          properties:
            account_name:
              description: Account name
              type: string
            account_type:
              description: Account type
              type: string
            created_at:
              description: Account creation date/time
              format: date-time
              type: string
            id:
              description: Account ID
              format: uuid
              type: string
            owner_email:
              description: Account owner email
              type: string
            seats:
              description: Account seats
              type: integer
            subscription_end_time:
              description: Account subscription end date/time
              format: date-time
              type: string
            subscription_start_time:
              description: Account subscription start date/time
              format: date-time
              type: string
        type: array
    type: object
  AccountOptions:
    description: Account options object
    properties:
      meeting_connectors:
        description: 'Meeting Connector, multiple value separated by comma.'
        type: string
      pay_mode:
        default: master
        description: Payee
        enum:
          - master
          - sub
        type: string
        x-enum-descriptions:
          - Master Account holder pays
          - Sub Account holders pays
      room_connectors:
        description: 'Virtual Room Connector, multiple value separated by comma.'
        type: string
      share_mc:
        default: false
        description: Enable Share Meeting Connector.
        type: boolean
      share_rc:
        default: false
        description: Enable Share Virtual Room Connector.
        type: boolean
    type: object
  AccountPlan:
    description: Account plan object
    properties:
      hosts:
        description: Account plan number of hosts
        type: integer
      type:
        description: Account plan type
        type: string
    type: object
  AccountPlanBaseRequired:
    description: Account base plan object
    properties:
      hosts:
        description: 'Account base plan number of hosts. For a Pro Plan, please select a value between 1 and 9. For a Business Plan, please select a value between 10 and 49. For a Education Plan, please select a value between 20 and 149. For a Free Trial Plan, please select a value between 1 and 9999.'
        type: integer
      type:
        description: Account base plan type
        type: string
    required:
      - type
      - hosts
    type: object
  AccountPlanRequired:
    description: Account plan object
    properties:
      hosts:
        description: Account plan number of hosts.
        type: integer
      type:
        description: 'Account <a href="#plans">plan type</a>'
        type: string
    required:
      - type
      - hosts
    type: object
  AccountPlans:
    description: Account Plans object
    properties:
      plan_audio:
        description: Additional Audio Conferencing Plan type
        properties:
          callout_countries:
            description: 'Call-out countries, multiple value separated by comma'
            type: string
          ddi_numbers:
            description: Dedicated Dial-In Numbers
            type: integer
          premium_countries:
            description: 'Premium countries, multiple value separated by comma'
            type: string
          tollfree_countries:
            description: 'Toll-free countries, multiple value separated by comma'
            type: string
          type:
            description: Additional Audio Conferencing Plan type
            type: string
        type: object
      plan_base:
        $ref: '#/definitions/AccountPlanBaseRequired'
      plan_large_meeting:
        description: Additional Large Meeting Plans
        items:
          $ref: '#/definitions/AccountPlan'
        type: array
      plan_recording:
        description: Additional Cloud Recording Plan
        type: string
      plan_room_connector:
        $ref: '#/definitions/AccountPlan'
      plan_webinar:
        description: Additional Webinar Plans
        items:
          $ref: '#/definitions/AccountPlan'
        type: array
      plan_zoom_rooms:
        $ref: '#/definitions/AccountPlan'
    type: object
  AccountSettings:
    properties:
      email_notification:
        $ref: '#/definitions/AccountSettingsEmailNotification'
      feature:
        $ref: '#/definitions/AccountSettingsFeature'
      in_meeting:
        $ref: '#/definitions/AccountSettingsInMeeting'
      integration:
        $ref: '#/definitions/AccountSettingsIntegration'
      recording:
        $ref: '#/definitions/AccountSettingsRecording'
      schedule_meting:
        $ref: '#/definitions/AccountSettingsScheduleMeeting'
      security:
        $ref: '#/definitions/AccountSettingsSecurity'
      telephony:
        $ref: '#/definitions/AccountSettingsTelephony'
      zoom_rooms:
        $ref: '#/definitions/AccountSettingsZoomRooms'
    title: Account settings
    type: object
  AccountSettingsEmailNotification:
    description: 'Account Settings: Notification'
    properties:
      alternative_host_reminder:
        description: When an alternative host is set or removed from a meeting
        type: boolean
      cancel_meeting_reminder:
        description: When a meeting is cancelled
        type: boolean
      cloud_recording_avaliable_reminder:
        description: Allow keep recording from being automatically deleted
        type: boolean
      jbh_reminder:
        description: When attendees join meeting before host
        type: boolean
      low_host_count_reminder:
        description: When host licenses are running low
        type: boolean
    type: object
  AccountSettingsFeature:
    description: 'Account Settings: Feature'
    properties:
      meeting_capacity:
        default: 100
        description: Meeting capacity
        type: integer
    type: object
  AccountSettingsInMeeting:
    description: 'Account Settings: In Meeting'
    properties:
      alert_guest_join:
        description: Identify guest participants in the meeting/webinar
        type: boolean
      allow_show_zoom_windows:
        description: Allow to share Zoom windows in desktop sharing
        type: boolean
      annotation:
        description: Annotation
        type: boolean
      anonymous_question_answer:
        description: 'Allow Anonymous Q&A in Webinar'
        type: boolean
      attendee_on_hold:
        description: Allow host to put attendee on hold
        type: boolean
      attention_tracking:
        description: Attention tracking
        type: boolean
      auto_answer:
        description: Enable Auto Answer Group
        type: boolean
      auto_saving_chat:
        description: Auto Saving Chats
        type: boolean
      breakout_room:
        description: Breakout room
        type: boolean
      chat:
        description: Chat
        type: boolean
      closed_caption:
        description: Closed caption
        type: boolean
      co_host:
        description: Co-Host
        type: boolean
      dscp_audio:
        description: DSCP Audio
        maximum: 63
        minimum: 1
        type: integer
      dscp_marking:
        description: DSCP marking
        type: boolean
      dscp_video:
        description: DSCP Video
        maximum: 63
        minimum: 1
        type: integer
      e2e_encryption:
        description: End-to-End Encryption
        type: boolean
      far_end_camera_control:
        description: Far end camera control
        type: boolean
      feedback:
        description: Feedback to Zoom
        type: boolean
      file_transfer:
        description: File transfer
        type: boolean
      group_hd:
        description: Group HD video
        type: boolean
      original_audio:
        description: Allow users to select original sound in their client settings
        type: boolean
      p2p_connetion:
        description: Peer to Peer connection while only 2 people in a meeting
        type: boolean
      p2p_ports:
        description: Listening ports range
        type: boolean
      polling:
        description: Polling
        type: boolean
      ports_range:
        default: ''
        description: 'Listening ports range, separated by comma (ex 55,56). The ports range is between 1 to 65535'
        type: string
      post_meeting_feedback:
        description: Display end-of-meeting experience feedback survey
        type: boolean
      private_chat:
        description: Private Chat
        type: boolean
      remote_control:
        description: Remote control
        type: boolean
      screen_sharing:
        description: Screen sharing
        type: boolean
      sending_default_email_invites:
        description: Only show default email when sending email invites
        type: boolean
      show_meeting_control_toolbar:
        description: Always show meeting control toolbar
        type: boolean
      stereo_audio:
        description: Allow users to select stereo audio in their client settings
        type: boolean
      use_html_format_email:
        description: Use HTML format email for Outlook plugin
        type: boolean
      virtual_background:
        description: Virtual background
        type: boolean
      watermark:
        description: Add watermark when viewing shared screen
        type: boolean
      webinar_question_answer:
        description: 'Q&A in webinar'
        type: boolean
      whiteboard:
        description: Whiteboard
        type: boolean
    type: object
  AccountSettingsIntegration:
    description: 'Account Settings: Integration'
    properties:
      box:
        description: Box
        type: boolean
      dropbox:
        description: Dropbox
        type: boolean
      google_calendar:
        description: Google Calendar
        type: boolean
      google_drive:
        description: Google Drive
        type: boolean
      kubi:
        description: Kubi
        type: boolean
      microsoft_one_drive:
        description: Microsoft OneDrive
        type: boolean
    type: object
  AccountSettingsRecording:
    description: 'Account Settings: Recording'
    properties:
      account_user_access_recording:
        description: Only users on my account can access cloud recordings
        type: boolean
      auto_delete_cmr:
        description: Auto delete cloud recordings after days
        type: boolean
      auto_delete_cmr_days:
        description: A specified number of days of auto delete cloud recordings
        type: integer
      auto_recording:
        description: Automatic recording
        enum:
          - local
          - cloud
          - none
        type: string
        x-enum-descriptions:
          - Record on local
          - Record on cloud
          - Disabled
      cloud_recording:
        description: Cloud recording
        type: boolean
      cloud_recording_download:
        description: Cloud Recording Downloads
        type: boolean
      cloud_recording_download_host:
        description: Only the host can download cloud recordings
        type: boolean
      local_recording:
        description: Local recording
        type: boolean
      record_audio_file:
        description: Record an audio only file
        type: boolean
      record_gallery_view:
        description: Record the gallery view
        type: boolean
      record_speaker_view:
        description: Record the active speaker view
        type: boolean
      recording_audio_transcript:
        description: Audio transcript
        type: boolean
      save_chat_text:
        description: Save chat text from the meeting
        type: boolean
      show_timestamp:
        description: Show timestamp on video
        type: boolean
    type: object
  AccountSettingsScheduleMeeting:
    description: 'Account Settings: Schedule Meeting'
    properties:
      audio_type:
        default: both
        description: Audio Type
        enum:
          - both
          - telephony
          - voip
          - thirdParty
        type: string
        x-enum-descriptions:
          - Telephony and VoIP
          - Audio PSTN telephony only
          - VoIP only
          - 3rd party audio conference
      enforce_login:
        description: Only signed-in users can join meetings
        type: boolean
      enforce_login_domains:
        description: Only signed-in users with a specified domains
        type: string
      enforce_login_with_domains:
        description: Only signed-in users with a specified domains can join meetings
        type: boolean
      force_pmi_jbh_password:
        description: Require a password for Personal Meetings if attendees can join before host
        type: boolean
      host_video:
        description: Host Video
        type: boolean
      join_before_host:
        description: Join Before Host
        type: boolean
      not_store_meeting_topic:
        description: 'Always display "Zoom Meeting" as the meeting topic'
        type: boolean
      participant_video:
        description: Participants Video
        type: boolean
    type: object
  AccountSettingsSecurity:
    description: 'Account Settings: Security'
    properties:
      admin_change_name_pic:
        description: "Only account administrators can change user's username and picture"
        type: boolean
      hide_billing_info:
        description: Hide billing information
        type: boolean
      import_photos_from_devices:
        description: "Allow importing of photos from photo library on the user's device"
        type: boolean
    type: object
  AccountSettingsTelephony:
    description: 'Account Settings: Telephony'
    properties:
      audio_conference_info:
        description: 3rd party audio conference info
        type: string
      third_party_audio:
        description: 3rd party audio conference
        type: boolean
    type: object
  AccountSettingsZoomRooms:
    description: 'Account Settings: Zoom Rooms'
    properties:
      auto_start_stop_scheduled_meetings:
        description: Automatic start/stop scheduled meetings
        type: boolean
      cmr_for_instant_meeting:
        description: Cloud recording for instant meetings
        type: boolean
      force_private_meeting:
        description: Transform all meetings to private
        type: boolean
      hide_host_information:
        description: Hide host and meeting ID from private meetings
        type: boolean
      list_meetings_with_calendar:
        description: Display meeting list with calendar integration
        type: boolean
      start_airplay_manually:
        description: Start AirPlay service manually
        type: boolean
      ultrasonic:
        description: Automatic direct sharing using ultrasonic proximity signal
        type: boolean
      upcoming_meeting_alert:
        description: Upcoming meeting alert
        type: boolean
      weekly_system_restart:
        description: Weekly system restart
        type: boolean
      zr_post_meeting_feedback:
        description: Zoom Room post meeting feedback
        type: boolean
    type: object
  BillingContact:
    description: Billing Contact object
    properties:
      address:
        description: "Billing Contact's address."
        type: string
      apt:
        description: "Billing Contact's apartment/suite."
        type: string
      city:
        description: "Billing Contact's city."
        type: string
      country:
        description: "Billing Contact's country."
        type: string
      email:
        description: "Billing Contact's email address."
        type: string
      first_name:
        description: "Billing Contact's first name."
        type: string
      last_name:
        description: "Billing Contact's last name."
        type: string
      phone_number:
        description: "Billing Contact's phone number."
        type: string
      state:
        description: "Billing Contact's state."
        type: string
      zip:
        description: "Billing Contact's zip/postal code."
        type: string
    type: object
  BillingContactRequired:
    description: Billing Contact object
    properties:
      address:
        description: "Billing Contact's address."
        type: string
      apt:
        description: "Billing Contact's apartment/suite."
        type: string
      city:
        description: "Billing Contact's city."
        type: string
      country:
        description: "Billing Contact's country."
        type: string
      email:
        description: "Billing Contact's email address."
        type: string
      first_name:
        description: "Billing Contact's first name."
        type: string
      last_name:
        description: "Billing Contact's last name."
        type: string
      phone_number:
        description: "Billing Contact's phone number."
        type: string
      state:
        description: "Billing Contact's state."
        type: string
      zip:
        description: "Billing Contact's zip/postal code."
        type: string
    required:
      - first_name
      - last_name
      - email
      - phone_number
      - address
      - city
      - state
      - zip
      - country
    type: object
  CustomQuestion:
    description: Custom Question
    properties:
      title:
        type: string
      value:
        type: string
    type: object
  DateTime:
    description: DateTime Object
    properties:
      from:
        description: 'Start Date,'
        format: date
        type: string
      to:
        description: End Date
        format: date
        type: string
    type: object
  Group:
    description: Group object
    properties:
      name:
        description: Group name
        type: string
      total_members:
        description: Total number of members in this group.
        type: integer
    type: object
  GroupList:
    description: List of Groups
    properties:
      groups:
        description: List of Group objects.
        items:
          allOf:
            - properties:
                id:
                  description: Group ID
                  type: string
            - $ref: '#/definitions/Group'
        type: array
      total_records:
        description: Total records
        type: integer
    type: object
  GroupMember:
    description: Group member object
    properties:
      email:
        description: User email
        type: string
      first_name:
        description: User first name
        type: string
      id:
        description: User ID
        type: string
      last_name:
        description: User last name
        type: string
      type:
        description: User type
        type: integer
    type: object
  GroupMemberList:
    allOf:
      - $ref: '#/definitions/Pagination'
      - properties:
          members:
            description: List of Group member objects.
            items:
              $ref: '#/definitions/GroupMember'
            type: array
    description: List of Group Members
    title: Group Member List
    type: object
  IMGroup:
    allOf:
      - $ref: '#/definitions/Group'
      - properties:
          search_by_account:
            description: Members can search others under same account
            type: boolean
          search_by_domain:
            description: Members can search others in the same email domain
            type: boolean
          search_by_ma_account:
            description: 'Members can search others under same master account, including all sub accounts'
            type: boolean
          type:
            default: normal
            description: IM Group type
            enum:
              - normal
              - shared
              - restricted
            type: string
            x-enum-descriptions:
              - Only members can see the group automatically. Other people can search members in the group
              - All people in the account can see the group and members automatically
              - Nobody can see the group or search members except the members in the group
    description: IM Group object
    type: object
  IMGroupList:
    allOf:
      - $ref: '#/definitions/Pagination'
      - properties:
          groups:
            description: List of Group objects.
            items:
              allOf:
                - properties:
                    id:
                      description: IM Group ID
                      type: string
                - $ref: '#/definitions/IMGroup'
            type: array
    description: List of IM Groups
    title: IM Group List
    type: object
  Meeting:
    allOf:
      - $ref: '#/definitions/Session'
    description: Meeting object
    type: object
  MeetingInfo:
    description: Meeting object
    properties:
      agenda:
        description: Agenda
        type: string
      created_at:
        description: Create time
        format: date-time
        type: string
      duration:
        description: Meeting duration
        type: integer
      h323_password:
        description: H.323/SIP room system password
        type: string
      join_url:
        description: Join url
        type: string
      occurrences:
        $ref: '#/definitions/Occurrences'
      password:
        description: Meeting password
        type: string
      settings:
        $ref: '#/definitions/MeetingSettings'
      start_time:
        description: Meeting start time
        format: date-time
        type: string
      start_url:
        description: Start url
        type: string
      timezone:
        description: Timezone to format start_time
        type: string
      topic:
        description: Meeting topic
        type: string
      type:
        default: 2
        description: Meeting Type
        enum:
          - 1
          - 2
          - 3
          - 8
        type: integer
        x-enum-descriptions:
          - Instant Meeting
          - Scheduled Meeting
          - Recurring Meeting with no fixed time
          - Recurring Meeting with fixed time
    type: object
  MeetingList:
    allOf:
      - $ref: '#/definitions/Pagination'
      - properties:
          meetings:
            description: List of Meeting objects.
            items:
              allOf:
                - properties:
                    created_at:
                      description: Create time
                      format: date-time
                      type: string
                    duration:
                      description: Meeting duration
                      type: integer
                    host_id:
                      description: ID of the user set as host of meeting
                      type: string
                    id:
                      description: 'Meeting ID, also know as meeting number'
                      type: string
                    join_url:
                      description: Join url
                      type: string
                    start_time:
                      description: Meeting start time
                      format: date-time
                      type: string
                    timezone:
                      description: Timezone to format start_time
                      type: string
                    topic:
                      description: Meeting topic
                      type: string
                    type:
                      description: Meeting Type
                      enum:
                        - 1
                        - 2
                        - 3
                        - 8
                      type: integer
                      x-enum-descriptions:
                        - Instant Meeting
                        - Scheduled Meeting
                        - Recurring Meeting with no fixed time
                        - Recurring Meeting with fixed time
                    uuid:
                      description: Meeting unique ID
                      type: string
                  type: object
            type: array
    description: List of Meetings
    title: Group List
    type: object
  MeetingMetric:
    description: Meeting metric details
    properties:
      duration:
        description: Meeting duration
        type: string
      email:
        description: User email
        type: string
      end_time:
        description: Meeting end time
        format: date-time
        type: string
      has_3rd_party_audio:
        description: ''
        type: boolean
      has_pstn:
        description: ''
        type: boolean
      has_recording:
        description: ''
        type: boolean
      has_screen_share:
        description: ''
        type: boolean
      has_sip:
        description: ''
        type: boolean
      has_video:
        description: ''
        type: boolean
      has_voip:
        description: ''
        type: boolean
      host:
        description: User display name
        type: string
      id:
        description: Meeting ID
        type: integer
      participants:
        description: Meeting participant count
        type: integer
      start_time:
        description: Meeting start time
        format: date-time
        type: string
      topic:
        description: Meeting topic
        type: string
      user_type:
        description: User type
        type: string
      uuid:
        description: Meeting UUID
        format: uuid
        type: string
    title: Meeting Metrics
    type: object
  MeetingRegistrant:
    allOf:
      - $ref: '#/definitions/Registrant'
    description: Meeting registrant
    type: object
  MeetingRegistrantList:
    allOf:
      - $ref: '#/definitions/RegistrantList'
    description: List of Users
    title: Registration List
    type: object
  MeetingSettings:
    description: Meeting Settings
    properties:
      alternative_hosts:
        description: Alternative hosts emails or IDs. Multiple value separated by comma.
        type: string
      approval_type:
        default: 2
        enum:
          - 0
          - 1
          - 2
        type: integer
        x-enum-descriptions:
          - Automatically Approve
          - Manually Approve
          - No Registration Required
      audio:
        default: both
        description: Meeting audio options
        enum:
          - both
          - telephony
          - voip
        type: string
        x-enum-descriptions:
          - Both Telephony and VoIP
          - Telephony only
          - VoIP only
      auto_recording:
        default: none
        enum:
          - local
          - cloud
          - none
        type: string
        x-enum-descriptions:
          - Record to local device
          - Record to cloud
          - No Recording
      cn_meeting:
        default: false
        description: Host meeting in China
        type: boolean
      enforce_login:
        description: Only signed-in users can join this meeting
        type: boolean
      enforce_login_domains:
        description: Only signed-in users with specified domains can join meetings
        type: string
      host_video:
        description: Start video when host join meeting
        type: boolean
      in_meeting:
        default: false
        description: Host meeting in India
        type: boolean
      join_before_host:
        default: false
        description: Join meeting before host start the meeting. Only used for scheduled or recurring meetings
        type: boolean
      mute_upon_entry:
        default: false
        description: Mute participants upon entry
        type: boolean
      participant_video:
        description: Start video when participants join meeting
        type: boolean
      registration_type:
        default: 1
        description: Registration type. Used for recurring meeting with fixed time only.
        enum:
          - 1
          - 2
          - 3
        type: integer
        x-enum-descriptions:
          - Attendees register once and can attend any of the occurrences
          - Attendees need to register for each occurrence to attend
          - Attendees register once and can choose one or more occurrences to attend
      use_pmi:
        default: false
        description: Use Personal Meeting ID. Only used for scheduled meetings and recurring meetings with no fixed time
        type: boolean
      watermark:
        default: false
        description: Enable watermark when viewing the shared screen
        type: boolean
    type: object
  MeetingUpdate:
    allOf:
      - $ref: '#/definitions/SessionUpdate'
    description: Meeting object
    type: object
  Occurrence:
    description: Occurence object
    properties:
      duration:
        description: Duration
        type: integer
      occurrence_id:
        description: Occurrence Id
        type: integer
      start_time:
        description: Start time
        format: date-time
        type: string
      status:
        description: Occurrence status
        type: string
    type: object
  Occurrences:
    description: Array of occurrence objects
    items:
      $ref: '#/definitions/Occurrence'
    type: array
  Pagination:
    description: Pagination Object
    properties:
      page_count:
        description: The number of items returned on this page.
        type: integer
      page_number:
        default: 1
        description: The page number of current results.
        type: integer
      page_size:
        default: 30
        description: The amount of records returns within a single API call.
        maximum: 300
        type: integer
      total_records:
        description: The number of all records available across pages.
        type: integer
    type: object
  PaginationToken:
    description: Pagination Object
    properties:
      next_page_token:
        description: 'Next page token, used to paginate through large result sets. A next page token will be returned whenever the set of available result list exceeds page size. The expiration period is 15 minutes.'
        type: string
      page_count:
        description: The number of items returned on this page.
        type: integer
      page_size:
        default: 30
        description: 'The amount of records returns within a single API call. '
        maximum: 300
        type: integer
      total_records:
        description: The number of all records available across pages.
        type: integer
    type: object
  PaginationToken4Qos:
    description: Pagination Object
    properties:
      next_page_token:
        description: 'Next page token, used to paginate through large result sets. A next page token will be returned whenever the set of available result list exceeds page size. The expiration period is 15 minutes.'
        type: string
      page_count:
        description: The number of items returned on this page.
        format: int64
        type: integer
      page_size:
        default: 1
        description: The number of items per page.
        maximum: 10
        type: integer
      total_records:
        description: The number of all records available across pages.
        format: int64
        type: integer
    type: object
  Panelist:
    description: Panelist base object
    properties:
      email:
        description: "Panelist's email"
        type: string
      name:
        description: "Panelist's full name"
        type: string
    type: object
  PanelistList:
    description: List of Panelist
    properties:
      panelists:
        description: List of Panelist objects.
        items:
          allOf:
            - properties:
                id:
                  description: "Panelist's ID"
                  type: string
            - $ref: '#/definitions/Panelist'
            - properties:
                join_url:
                  description: Join url
                  type: string
        type: array
      total_records:
        description: Total records.
        type: integer
    title: Panelist List
    type: object
  QOSAudio:
    description: Quality of Service object
    properties:
      avg_loss:
        description: Average Loss
        type: string
      bitrate:
        description: Bitrate
        type: string
      jitter:
        description: Jitter
        type: string
      latency:
        description: Latency
        type: string
      max_loss:
        description: Max Loss
        type: string
    title: QOS Object
    type: object
  QOSParticipant:
    description: Participant QOS
    properties:
      device:
        description: Participant device
        type: string
      domain:
        description: Participant domain
        type: string
      harddisk_id:
        description: Participant hard disk id
        type: string
      ip_address:
        description: Participant IP Address
        type: string
      join_time:
        description: Participant join time
        format: date-time
        type: string
      leave_time:
        description: Participant leave time
        format: date-time
        type: string
      location:
        description: Participant location
        type: string
      mac_addr:
        description: Participant MAC Address
        type: string
      pc_name:
        description: Participant PC name
        type: string
      user_id:
        description: Participant ID
        format: uuid
        type: string
      user_name:
        description: Participant display name
        type: string
      user_qos:
        description: User quality of service
        properties:
          as_input:
            $ref: '#/definitions/QOSVideo'
          as_output:
            $ref: '#/definitions/QOSVideo'
          audio_input:
            $ref: '#/definitions/QOSAudio'
          audio_output:
            $ref: '#/definitions/QOSAudio'
          cpu_usage:
            properties:
              system_max_cpu_usage:
                description: System Maximum CPU Usage
                type: string
              zoom_avg_cpu_usage:
                description: Zoom Average CPU Usage
                type: string
              zoom_max_cpu_usage:
                description: Zoom Maximum CPU Usage
                type: string
              zoom_min_cpu_usage:
                description: Zoom Minimum CPU Usage
                type: string
          date_time:
            description: Datetime of QOS
            format: date-time
            type: string
          video_input:
            $ref: '#/definitions/QOSVideo'
          video_output:
            $ref: '#/definitions/QOSVideo'
        type: object
      version:
        description: Participant version
        type: string
    title: Participant QOS
    type: object
  QOSParticipantList:
    allOf:
      - $ref: '#/definitions/PaginationToken4Qos'
      - properties:
          participants:
            description: Array of user objects
            items:
              $ref: '#/definitions/QOSParticipant'
            type: array
    description: Participant QOS List
    title: Participant QOS List
    type: object
  QOSVideo:
    allOf:
      - $ref: '#/definitions/QOSAudio'
      - properties:
          frame_rate:
            description: Frame Rate
            type: string
          resolution:
            description: Resolution
            type: string
    description: Quality of Service object
    title: QOS Object
    type: object
  Recording:
    allOf:
      - properties:
          account_id:
            description: ID of the user account
            type: string
          duration:
            description: Meeting duration
            type: integer
          host_id:
            description: ID of the user set as host of meeting
            type: string
          id:
            description: 'Meeting ID, also know as meeting number'
            type: string
          recording_count:
            description: Recording count
            type: string
          start_time:
            description: Meeting start time
            format: date-time
            type: string
          topic:
            description: Meeting topic
            type: string
          total_size:
            description: Total size
            type: string
          uuid:
            description: Meeting unique ID
            type: string
      - $ref: '#/definitions/RecordingFileList'
    description: The recording meeting object
    type: object
  RecordingFile:
    description: RecordingFile Object
    properties:
      deleted_time:
        description: The recording delete time.Response in trash query
        type: string
      download_url:
        description: The recording download url.Response in general query
        type: string
      file_size:
        description: The recording file size.
        type: number
      file_type:
        description: The recording file type.
        type: string
      id:
        description: The recording file ID.Response in general query
        type: string
      meeting_id:
        description: 'The meeting ID. '
        type: string
      play_url:
        description: The recording file play url.Response in general query
        type: string
      recording_end:
        description: The recording end time.Response in general query
        type: string
      recording_start:
        description: The recording start time.
        type: string
      status:
        description: The recording status.Response in general query
        type: string
    type: object
  RecordingFileList:
    allOf:
      - properties:
          recording_files:
            description: List of Recording file
            items:
              allOf:
                - $ref: '#/definitions/RecordingFile'
            title: Recording file List
            type: array
    description: List of Recording file
    title: Recording file List
    type: object
  RecordingList:
    allOf:
      - $ref: '#/definitions/DateTime'
      - $ref: '#/definitions/PaginationToken'
      - properties:
          meetings:
            description: List of Recording
            items:
              allOf:
                - $ref: '#/definitions/Recording'
            title: Recording List
            type: array
    description: List of Recording
    title: Recording List
    type: object
  Recurrence:
    description: Recurrence object
    properties:
      end_date_time:
        description: 'Recurrence Meeting End Date. Should be UTC time, such as 2017-11-25T12:00:00Z.'
        format: date-time
        type: string
      end_times:
        default: 1
        description: Recurrence Meeting End occurrences times
        maximum: 50
        type: integer
      monthly_day:
        description: Recurrence Meeting Occurs on a month day. The value range is from 1 to 31
        type: integer
      monthly_week:
        description: Recurrence Meeting Occurs on the week of a month.
        enum:
          - -1
          - 1
          - 2
          - 3
          - 4
        type: integer
        x-enum-descriptions:
          - Last week
          - First week
          - Second week
          - Third week
          - Fourth week
      monthly_week_day:
        description: Recurrence Meeting Occurs on the week day of a month
        enum:
          - 1
          - 2
          - 3
          - 4
          - 5
          - 6
          - 7
        type: integer
        x-enum-descriptions:
          - Sunday
          - Monday
          - Tuesday
          - Wednesday
          - Thursday
          - Friday
          - Saturday
      repeat_interval:
        description: 'Recurrence meeting repeat interval. For a Daily Meeting, max of 90. For a Weekly Meeting, max of 12. For a Monthly Meeting, max of 3.'
        type: integer
      type:
        description: Recurrence meeting type
        enum:
          - 1
          - 2
          - 3
        type: integer
        x-enum-descriptions:
          - Daily
          - Weekly
          - Monthly
      weekly_days:
        description: 'Recurrence Meeting Occurs on week days, multiple value separated by comma'
        enum:
          - 1
          - 2
          - 3
          - 4
          - 5
          - 6
          - 7
        type: integer
        x-enum-descriptions:
          - Sunday
          - Monday
          - Tuesday
          - Wednesday
          - Thursday
          - Friday
          - Saturday
    type: object
  Registrant:
    description: Registrant base object
    properties:
      address:
        description: Address
        type: string
      city:
        description: City
        type: string
      comments:
        description: 'Questions & Comments'
        type: string
      country:
        description: Country
        type: string
      custom_questions:
        description: Custom Questions
        items:
          $ref: '#/definitions/CustomQuestion'
        type: array
      email:
        description: A valid email address
        type: string
      first_name:
        description: User’s first name
        type: string
      industry:
        description: Industry
        type: string
      job_title:
        description: Job Title
        type: string
      last_name:
        description: User’s last name
        type: string
      no_of_employees:
        description: Number of Employees
        enum:
          - 1-20
          - 21-50
          - 51-100
          - 101-500
          - '500-1,000'
          - '1,001-5,000'
          - '5,001-10,000'
          - 'More than 10,000'
        type: string
      org:
        description: Organization
        type: string
      phone:
        description: Phone
        type: string
      purchasing_time_frame:
        description: Purchasing Time Frame
        enum:
          - Within a month
          - 1-3 months
          - 4-6 months
          - More than 6 months
          - No timeframe
        type: string
      role_in_purchase_process:
        description: Role in Purchase Process
        enum:
          - Decision Maker
          - Evaluator/Recommender
          - Influencer
          - Not involved
        type: string
      state:
        description: State/Province
        type: string
      zip:
        description: Zip/Postal Code
        type: string
    required:
      - email
      - first_name
      - last_name
    type: object
  RegistrantList:
    allOf:
      - $ref: '#/definitions/PaginationToken'
      - properties:
          registrants:
            description: List of Registrant objects.
            items:
              allOf:
                - properties:
                    id:
                      type: string
                - $ref: '#/definitions/MeetingRegistrant'
                - properties:
                    create_time:
                      format: date-time
                      type: string
                    status:
                      type: string
            type: array
    description: List of Users
    title: Registration List
    type: object
  RegistrantStatus:
    description: Registrant Status
    properties:
      action:
        enum:
          - approve
          - cancel
          - deny
        type: string
        x-enum-descriptions:
          - Approve registrant
          - Cancel registrant
          - Deny registrant
      registrants:
        description: List of registrants
        items:
          properties:
            email:
              type: string
            id:
              type: string
        maximum: 30
        type: array
    required:
      - action
    type: object
  Session:
    description: Base object for sessions
    properties:
      agenda:
        description: Meeting description
        type: string
      duration:
        description: Meeting duration (minutes). Used for scheduled meeting only.
        type: integer
      password:
        description: 'Password to join the meeting. Password may only contain the following characters: [a-z A-Z 0-9 @ - _ *]. Max of 10 characters.'
        type: string
      recurrence:
        $ref: '#/definitions/Recurrence'
      settings:
        $ref: '#/definitions/MeetingSettings'
      start_time:
        description: "Meeting start time, in the format \"yyyy-MM-dd'T'HH:mm:ss'Z'\", should be GMT time. In the format \"yyyy-MM-dd'T'HH:mm:ss\", should be local time, need to specify the time zone. Only used for scheduled meeting and recurring meeting with fixed time."
        format: date-time
        type: string
      timezone:
        description: 'Timezone to format start_time, like "America/Los_Angeles". For scheduled meeting only. For this parameter value please refer to the id value in [timezone](#timezones) list.'
        type: string
      topic:
        description: Meeting topic
        type: string
      type:
        default: 2
        description: Meeting Type
        enum:
          - 1
          - 2
          - 3
          - 8
        type: integer
        x-enum-descriptions:
          - Instant Meeting
          - Scheduled Meeting
          - Recurring Meeting with no fixed time
          - Recurring Meeting with fixed time
    type: object
  SessionUpdate:
    description: Base object for sessions
    properties:
      agenda:
        description: Meeting description
        type: string
      duration:
        description: Meeting duration (minutes). Used for scheduled meeting only.
        type: integer
      password:
        description: 'Password to join the meeting. Password may only contain the following characters: [a-z A-Z 0-9 @ - _ *]. Max of 10 characters.'
        type: string
      recurrence:
        $ref: '#/definitions/Recurrence'
      settings:
        allOf:
          - $ref: '#/definitions/MeetingSettings'
          - properties:
              registrants_confirmation_email:
                description: Send confirmation Email to Registrants
                type: boolean
      start_time:
        description: "Meeting start time, in the format \"yyyy-MM-dd'T'HH:mm:ss'Z'\", should be GMT time. In the format \"yyyy-MM-dd'T'HH:mm:ss\", should be local time, need to specify the time zone. Only used for scheduled meeting and recurring meeting with fixed time."
        format: date-time
        type: string
      timezone:
        description: 'Timezone to format start_time, like "America/Los_Angeles". For scheduled meeting only. For this parameter value please refer to the id value in [timezone](#timezones) list.'
        type: string
      topic:
        description: Meeting topic
        type: string
      type:
        default: 2
        description: Meeting Type
        enum:
          - 1
          - 2
          - 3
          - 8
        type: integer
        x-enum-descriptions:
          - Instant Meeting
          - Scheduled Meeting
          - Recurring Meeting with no fixed time
          - Recurring Meeting with fixed time
    type: object
  SessionWebinar:
    description: Base webinar object for sessions
    properties:
      agenda:
        description: Webinar description
        type: string
      duration:
        description: Webinar duration (minutes). Used for scheduled webinar only.
        type: integer
      password:
        description: 'Webinar password. Password may only contain the following characters: [a-z A-Z 0-9 @ - _ *]. Max of 10 characters.'
        type: string
      recurrence:
        $ref: '#/definitions/Recurrence'
      settings:
        $ref: '#/definitions/WebinarSettings'
      start_time:
        description: "Webinar start time, in the format \"yyyy-MM-dd'T'HH:mm:ss'Z'\", should be GMT time. In the format \"yyyy-MM-dd'T'HH:mm:ss\", should be local time, need to specify the time zone. Only used for scheduled webinar and recurring webinar with fixed time."
        format: date-time
        type: string
      timezone:
        description: 'Timezone to format start_time, like "America/Los_Angeles". For scheduled webinar only. For this parameter value please refer to the id value in [timezone](#timezones) list.'
        type: string
      topic:
        description: Webinar topic
        type: string
      type:
        default: 5
        description: Webinar Type
        enum:
          - 5
          - 6
          - 9
        type: integer
        x-enum-descriptions:
          - Webinar
          - Recurring Webinar with no fixed time
          - Recurring Webinar with fixed time
    type: object
  SessionWebinarUpdate:
    description: Base webinar object for sessions
    properties:
      agenda:
        description: Webinar description
        type: string
      duration:
        description: Webinar duration (minutes). Used for scheduled webinar only.
        type: integer
      password:
        description: 'Webinar password. Password may only contain the following characters: [a-z A-Z 0-9 @ - _ *]. Max of 10 characters.'
        type: string
      recurrence:
        $ref: '#/definitions/Recurrence'
      settings:
        allOf:
          - $ref: '#/definitions/WebinarSettings'
          - properties:
              registrants_confirmation_email:
                description: Send confirmation Email to Registrants
                type: boolean
      start_time:
        description: "Webinar start time, in the format \"yyyy-MM-dd'T'HH:mm:ss'Z'\", should be GMT time. In the format \"yyyy-MM-dd'T'HH:mm:ss\", should be local time, need to specify the time zone. Only used for scheduled webinar and recurring webinar with fixed time."
        format: date-time
        type: string
      timezone:
        description: 'Timezone to format start_time, like "America/Los_Angeles". For scheduled webinar only. For this parameter value please refer to the id value in [timezone](#timezones) list.'
        type: string
      topic:
        description: Webinar topic
        type: string
      type:
        default: 5
        description: Webinar Type
        enum:
          - 5
          - 6
          - 9
        type: integer
        x-enum-descriptions:
          - Webinar
          - Recurring Webinar with no fixed time
          - Recurring Webinar with fixed time
    type: object
  TSP:
    description: TSP Account object
    properties:
      conference_code:
        description: 'Conference code, numeric value, length is less than 16.'
        type: string
      dial_in_numbers:
        description: Dial In Numbers object
        properties:
          code:
            description: Country Code
            type: string
          number:
            description: 'Dial-in number, length is less than 16.'
            type: string
        required:
          - code
          - number
        type: object
      leader_pin:
        description: 'Leader PIN, numeric value, length is less than 16.'
        type: string
    required:
      - conference_code
      - leader_pin
    type: object
  User:
    description: The user object represents a User on Zoom.
    properties:
      created_at:
        description: User create time
        format: date-time
        type: string
      dept:
        description: Department
        type: string
      email:
        description: "User's email address."
        type: string
      first_name:
        description: "User's first name."
        maxLength: 64
        type: string
      last_client_version:
        description: User last login client version
        type: string
      last_login_time:
        description: User last login time
        format: date-time
        type: string
      last_name:
        description: "User's last name."
        maxLength: 64
        type: string
      pmi:
        description: Personal Meeting ID
        type: string
      timezone:
        description: Time Zone
        type: string
      type:
        description: "User's type"
        enum:
          - 1
          - 2
          - 3
        type: integer
        x-enum-descriptions:
          - basic
          - pro
          - corp
    required:
      - email
      - type
    type: object
  UserAssistantsList:
    description: "List of User's assistants"
    properties:
      assistants:
        description: "List of User's assistants."
        items:
          properties:
            email:
              description: 'User email address. Must have id or email, if given id, the email is ignored.'
              type: string
            id:
              description: User ID
              type: string
        maximum: 30
        type: array
    title: User assistants List
    type: object
  UserList:
    allOf:
      - $ref: '#/definitions/Pagination'
      - properties:
          users:
            description: List of User objects.
            items:
              allOf:
                - properties:
                    id:
                      description: User ID
                      type: string
                - $ref: '#/definitions/User'
            type: array
    description: List of Users
    title: User List
    type: object
  UserSettings:
    properties:
      email_notification:
        $ref: '#/definitions/UserSettingsEmailNotification'
      feature:
        $ref: '#/definitions/UserSettingsFeature'
      in_meeting:
        $ref: '#/definitions/UserSettingsInMeeting'
      recording:
        $ref: '#/definitions/UserSettingsRecording'
      scheduled_meeting:
        $ref: '#/definitions/UserSettingsScheduledMeeting'
      telephony:
        $ref: '#/definitions/UserSettingsTelephony'
    title: User settings
    type: object
  UserSettingsEmailNotification:
    description: ''
    properties:
      alternative_host_reminder:
        default: false
        description: When an alternative host is set or removed from a meeting
        type: boolean
      cancel_meeting_reminder:
        default: false
        description: When a meeting is cancelled
        type: boolean
      jbh_reminder:
        default: false
        description: When attendees join meeting before host
        type: boolean
    title: 'User settings: Notification settings'
    type: object
  UserSettingsFeature:
    description: ''
    properties:
      large_meeting:
        description: Large meting feature
        type: boolean
      large_meeting_capacity:
        description: 'Large meeting capacity, can be 100, 200, 300 or 500, depends on if having related large meeting capacity plan subscription or not.'
        type: integer
      meeting_capacity:
        description: User’s meeting capacity.
        type: integer
      webinar:
        description: Webinar feature
        type: boolean
      webinar_capacity:
        description: 'Webinar capacity, can be 100, 500, 1000, 3000, 5000 or 10000, depends on if having related webinar capacity plan subscription or not.'
        type: integer
    title: 'User settings: Feature settings'
    type: object
  UserSettingsInMeeting:
    description: ''
    properties:
      annotation:
        default: false
        description: Annotation
        type: boolean
      attendee_on_hold:
        default: false
        description: Allow host to put attendee on hold
        type: boolean
      attention_tracking:
        default: false
        description: Attention tracking
        type: boolean
      auto_saving_chat:
        default: false
        description: Auto saving chats
        type: boolean
      breakout_room:
        default: false
        description: Breakout room
        type: boolean
      chat:
        default: false
        description: Chat
        type: boolean
      closed_caption:
        default: false
        description: Closed caption
        type: boolean
      co_host:
        default: false
        description: Co-host
        type: boolean
      e2e_encryption:
        description: End-to-end encryption
        type: boolean
      entry_exit_chime:
        description: Play sound on join/leave
        enum:
          - host
          - all
          - none
        type: string
        x-enum-descriptions:
          - when host joins/leaves
          - when any participant joins/leaves
          - no join/leave sound
      far_end_camera_control:
        default: false
        description: Far end camera control
        type: boolean
      feedback:
        default: false
        description: Feedback to Zoom
        type: boolean
      file_transfer:
        default: false
        description: File transfer
        type: boolean
      group_hd:
        default: false
        description: Group HD video
        type: boolean
      non_verbal_feedback:
        default: false
        description: Non-verbal feedback
        type: boolean
      polling:
        default: false
        description: Polling
        type: boolean
      private_chat:
        default: false
        description: Private chat
        type: boolean
      record_play_voice:
        description: Record and play their own voice
        type: boolean
      remote_control:
        default: false
        description: Remote control
        type: boolean
      remote_support:
        default: false
        description: Remote support
        type: boolean
      share_dual_camera:
        default: false
        description: Share dual camera
        type: boolean
      virtual_background:
        default: false
        description: Virtual background
        type: boolean
      waiting_room:
        default: false
        description: Waiting room
        type: boolean
    title: 'User settings: Meeting settings'
    type: object
  UserSettingsRecording:
    description: ''
    properties:
      auto_delete_cmr:
        default: false
        description: Auto delete cloud recordings
        type: boolean
      auto_delete_cmr_days:
        description: A specified number of days of auto delete cloud recordings
        type: integer
      auto_recording:
        default: local
        description: Automatic recording
        enum:
          - local
          - cloud
          - none
        type: string
        x-enum-descriptions:
          - Record on local
          - Record on cloud
          - Disabled
      cloud_recording:
        default: false
        description: Cloud recording
        type: boolean
      local_recording:
        description: Local recording
        type: boolean
      record_audio_file:
        default: false
        description: Record an audio only file
        type: boolean
      record_gallery_view:
        default: false
        description: Record the gallery view
        type: boolean
      record_speaker_view:
        default: false
        description: Record the active speaker view
        type: boolean
      recording_audio_transcript:
        description: Audio transcript
        type: boolean
      save_chat_text:
        default: false
        description: Save chat text from the meeting
        type: boolean
      show_timestamp:
        default: false
        description: Show timestamp on video
        type: boolean
    title: 'User settings: Recording settings'
    type: object
  UserSettingsScheduledMeeting:
    description: ''
    properties:
      audio_type:
        default: voip
        description: Meeting audio
        enum:
          - both
          - telephony
          - voip
          - thirdParty
        type: string
        x-enum-descriptions:
          - Telephony and VoIP
          - Audio PSTN telephony only
          - VoIP only
          - 3rd party audio conference
      force_pmi_jbh_password:
        description: Require a password for Personal Meetings if attendees can join before host
        type: boolean
      host_video:
        description: Host video
        type: boolean
      join_before_host:
        description: Join before host
        type: boolean
      participants_video:
        description: Participants video
        type: boolean
      pstn_password_protected:
        description: Generate and require password for participants joining by phone
        type: boolean
    title: 'User settings: Meeting settings'
    type: object
  UserSettingsTelephony:
    description: ''
    properties:
      audio_conference_info:
        default: ''
        description: 3rd party audio conference info
        type: string
      show_international_numbers_link:
        description: Show international numbers link on the invitation email
        type: boolean
      third_party_audio:
        description: 3rd party audio conference
        type: boolean
    title: 'User settings: Meeting settings'
    type: object
  UserUpdate:
    description: The user update object represents a User on Zoom.
    properties:
      cms_user_id:
        description: Kaltura User Id.
        type: string
      dept:
        description: 'Department for user profile, use for report.'
        type: string
      first_name:
        description: "User's first name. Cannot contain more than 5 Chinese words."
        type: string
      host_key:
        description: 'Host Key, should be 6-digit number.'
        type: string
      last_name:
        description: "User's last name. Cannot contain more than 5 Chinese words."
        type: string
      pmi:
        description: 'Personal Meeting ID,length must be 10.'
        type: string
      timezone:
        description: 'The time zone id for user profile. For this parameter value please refer to the id value in [timezone](#timezones) list.'
        format: date-time
        type: string
      type:
        description: "User's type"
        enum:
          - 1
          - 2
          - 3
        type: integer
        x-enum-descriptions:
          - basic
          - pro
          - corp
      vanity_name:
        description: Personal meeting room name.
        type: string
    type: object
  Webhook:
    description: 'Webhook base object, only available for version 2 webhook'
    properties:
      auth_password:
        description: Webhook auth password.
        maxLength: 64
        type: string
      auth_user:
        description: Webhook auth user name.
        maxLength: 128
        type: string
      events:
        description: List of events objects.
        enum:
          - meeting_started
          - meeting_ended
          - meeting_jbh
          - meeting_join
          - recording_completed
          - participant_joined
          - participant_left
        items:
          type: string
        type: array
        x-enum-descriptions:
          - The meeting has started.
          - The meeting has ended.
          - Attendee has joined a meeting before the host.
          - 'Host hasn’t launched the meeting, attendee is waiting.'
          - All the Cloud Recordings have completed processing and is available.
          - Participant has joined the meeting.
          - Participant has leaved the meeting.
      url:
        description: Webhook endpoint
        maxLength: 256
        type: string
    required:
      - url
      - auth_user
      - auth_password
      - events
    type: object
  WebhookList:
    allOf:
      - properties:
          total_records:
            description: The number of all records available across pages.
            type: integer
          webhooks:
            description: List of Webhook objects.
            items:
              allOf:
                - properties:
                    webhook_id:
                      description: Webhook Id.
                      type: string
                - $ref: '#/definitions/Webhook'
            type: array
    description: List of Webhooks
    title: Webhook List
    type: object
  WebhookUpdate:
    description: Webhook base object
    properties:
      auth_password:
        description: Webhook auth password.
        maxLength: 64
        type: string
      auth_user:
        description: Webhook auth user name.
        maxLength: 128
        type: string
      events:
        description: List of events objects.
        enum:
          - meeting_started
          - meeting_ended
          - meeting_jbh
          - meeting_join
          - recording_completed
          - participant_joined
          - participant_left
        items:
          type: string
        type: array
        x-enum-descriptions:
          - The meeting has started.
          - The meeting has ended.
          - Attendee has joined a meeting before the host.
          - 'Host hasn’t launched the meeting, attendee is waiting.'
          - All the Cloud Recordings has completed processing and is available.
          - Participant has joined the meeting.
          - Participant has leaved the meeting.
      url:
        description: Webhook endpoint.
        maxLength: 256
        type: string
    type: object
  Webinar:
    allOf:
      - $ref: '#/definitions/SessionWebinar'
    description: Webinar object
    type: object
  WebinarInfo:
    description: Webinar object
    properties:
      agenda:
        description: Webinar agenda
        type: string
      created_at:
        description: Create time
        format: date-time
        type: string
      duration:
        description: Webinar duration
        type: integer
      join_url:
        description: Join url
        type: string
      occurrences:
        $ref: '#/definitions/Occurrences'
      settings:
        $ref: '#/definitions/WebinarSettings'
      start_time:
        description: Webinar start time
        format: date-time
        type: string
      start_url:
        description: Start url
        type: string
      timezone:
        description: Timezone to format start_time
        type: string
      topic:
        description: Webinar topic
        type: string
      type:
        default: 5
        description: Webinar Type
        enum:
          - 5
          - 6
          - 9
        type: integer
        x-enum-descriptions:
          - Webinar
          - Recurring Webinar with no fixed time
          - Recurring Webinar with fixed time
    type: object
  WebinarList:
    allOf:
      - $ref: '#/definitions/Pagination'
      - properties:
          webinars:
            description: List of Webinar objects.
            items:
              allOf:
                - properties:
                    created_at:
                      description: Create time
                      format: date-time
                      type: string
                    duration:
                      description: Meeting duration
                      type: integer
                    host_id:
                      description: ID of the user set as host of webinar
                      type: string
                    id:
                      description: 'Webinar ID, also know as webinar number'
                      type: string
                    join_url:
                      description: Join url
                      type: string
                    timezone:
                      description: Timezone to format start_time
                      type: string
                    topic:
                      description: Meeting topic
                      type: string
                    type:
                      description: Meeting Type
                      enum:
                        - 5
                        - 6
                        - 9
                      type: integer
                      x-enum-descriptions:
                        - Webinar
                        - Recurring Webinar with no fixed time
                        - Recurring Webinar with fixed time
                    uuid:
                      description: Webinar unique ID
                      type: string
                  type: object
            type: array
    description: List of Webinars
    title: User List
    type: object
  WebinarMetric:
    description: Webinar metric details
    properties:
      duration:
        description: Webinar duration
        type: string
      email:
        description: User email
        type: string
      end_time:
        description: Webinar end time
        format: date-time
        type: string
      has_3rd_party_audio:
        description: ''
        type: boolean
      has_pstn:
        description: ''
        type: boolean
      has_recording:
        description: ''
        type: boolean
      has_screen_share:
        description: ''
        type: boolean
      has_sip:
        description: ''
        type: boolean
      has_video:
        description: ''
        type: boolean
      has_voip:
        description: ''
        type: boolean
      host:
        description: User display name
        type: string
      id:
        description: Webinar ID
        type: integer
      participants:
        description: Webinar participant count
        type: integer
      start_time:
        description: Webinar start time
        format: date-time
        type: string
      topic:
        description: Webinar topic
        type: string
      user_type:
        description: User type
        type: string
      uuid:
        description: Webinar UUID
        format: uuid
        type: string
    title: Webinar Metrics
    type: object
  WebinarPanelist:
    description: Webinar panelist
    properties:
      panelists:
        description: List of Panelist objects.
        items:
          allOf:
            - $ref: '#/definitions/Panelist'
        type: array
    type: object
  WebinarPanelistList:
    allOf:
      - $ref: '#/definitions/PanelistList'
    description: Webinar panelist
    type: object
  WebinarRegistrant:
    allOf:
      - $ref: '#/definitions/Registrant'
    description: Webianr registrant
    type: object
  WebinarRegistrantList:
    allOf:
      - $ref: '#/definitions/RegistrantList'
    description: List of Users
    title: Registration List
    type: object
  WebinarSettings:
    description: Webinar Settings
    properties:
      allow_multiple_devices:
        description: Allow attendees to join from multiple devices.
        type: boolean
      alternative_hosts:
        description: Alternative hosts emails or IDs. Multiple value separated by comma.
        type: string
      approval_type:
        default: 2
        enum:
          - 0
          - 1
          - 2
        type: integer
        x-enum-descriptions:
          - Automatically Approve
          - Manually Approve
          - No Registration Required
      audio:
        default: both
        description: Meeting audio options
        enum:
          - both
          - telephony
          - voip
        type: string
        x-enum-descriptions:
          - Both Telephony and VoIP
          - Telephony only
          - VoIP only
      auto_recording:
        default: none
        enum:
          - local
          - cloud
          - none
        type: string
        x-enum-descriptions:
          - Record to local device
          - Record to cloud
          - No Recording
      close_registration:
        description: Close registration after event date.
        type: boolean
      enforce_login:
        description: Only signed-in users can join this meeting
        type: boolean
      enforce_login_domains:
        description: Only signed-in users with specified domains can join meetings
        type: string
      hd_video:
        default: false
        description: Default to HD Video
        type: boolean
      host_video:
        description: Start video when host join webinar
        type: boolean
      panelists_video:
        description: Start video when panelists join webinar
        type: boolean
      practice_session:
        default: false
        description: Enable Practice Session
        type: boolean
      registration_type:
        default: 1
        description: Registration type. Used for recurring webinar with fixed time only.
        enum:
          - 1
          - 2
          - 3
        type: integer
        x-enum-descriptions:
          - Attendees register once and can attend any of the occurrences
          - Attendees need to register for each occurrence to attend
          - Attendees register once and can choose one or more occurrences to attend
      show_share_button:
        description: Show social share buttons on registration page.
        type: boolean
    type: object
  WebinarUpdate:
    allOf:
      - $ref: '#/definitions/SessionWebinarUpdate'
    description: Webinar object
    type: object
  ZoomRoom:
    description: Zoom Room
    properties:
      account_type:
        description: Zoom Room email type
        type: string
      camera:
        description: Zoom Room camera
        type: string
      device_ip:
        description: Zoom Room device IP
        type: string
      email:
        description: Zoom Room email
        type: string
      id:
        description: Zoom Room ID
        type: string
      last_start_time:
        description: Zoom Room last start time
        type: string
      microphone:
        description: Zoom Room microphone
        type: string
      room_name:
        description: Zoom Room name
        type: string
      speaker:
        description: Zoom Room speaker
        type: string
      status:
        description: Zoom Room status
        type: string
    title: Zoom Room
    type: object
  ZoomRoomList:
    allOf:
      - $ref: '#/definitions/Pagination'
      - properties:
          zoom_rooms:
            description: Array of Zoom Rooms
            items:
              $ref: '#/definitions/ZoomRoom'
            type: array
    description: Zoom Room List
    title: Zoom Room List
    type: object
`;
