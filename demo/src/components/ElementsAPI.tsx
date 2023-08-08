import '@stoplight/elements-core/styles.css';

import { API } from '@stoplight/elements';
import { Box } from '@stoplight/mosaic';
import React from 'react';

const spec = `openapi: 3.0.0
info:
  title: Callback Example
  version: 1.0.0
paths:
  /streams:
    post:
      parameters:
        - name: callbackUrl
          in: query
          required: true
          description: |
            the location where data will be sent.  Must be network accessible
            by the source server
            **The below table defines the HTTP Status codes that this API may return**

            | Status Code      | Description | Reason                             |
            | ---------------- | ------------| -----------------------------------|
            | 201              | CREATED     | If a pet is created successfuly.   |
            | 400              | BAD REQUEST | If the request is not valid.       |
            | 401              | UNAUTHORIZED| If the credentials are invalid.    |
          schema:
            type: string
            format: uri
            example: https://tonys-server.com
      responses:
        '201':
          description: subscription successfully created
          content:
            application/json:
              schema:
                description: subscription information
                required:
                  - subscriptionId
                properties:
                  subscriptionId:
                    description: this unique identifier allows management of the subscription
                    type: string
                    example: 2531329f-fb09-4ef7-887e-84e648214436
      callbacks:
        # the name onData is a convenience locator
        onData:
          # when data is sent, it will be sent to the callbackUrl provided
          # when making the subscription PLUS the suffix / data
          '{$request.query.callbackUrl}/data':
            post:
              requestBody:
                description: subscription payload
                content:
                  application/json:
                    schema:
                      type: object
                      properties:
                        timestamp:
                          type: string
                          format: date-time
                        userData:
                          type: string
              responses:
                '201':
                  description: subscription successfully created
                  content:
                    application/json:
                      schema:
                        description: subscription information
                        required:
                          - subscriptionId
                        properties:
                          subscriptionId:
                            description: this unique identifier allows management of the subscription
                            type: string
                            example: 2531329f-fb09-4ef7-887e-84e648214436
                '204':
                  description: |
                    Your server should return this HTTP status code if no longer interested
                    in further updates
          '{$request.query.callbackUrl}/data2':
            post:
              requestBody:
                description: subscription payload
                content:
                  application/json:
                    schema:
                      type: object
                      properties:
                        timestamp:
                          type: string
                          format: date-time
                        userData:
                          type: string
              responses:
                '202':
                  description: |
                    Your server implementation should return this HTTP status code
                    if the data was received successfully
                '204':
                  description: |
                    Your server should return this HTTP status code if no longer interested
                    in further updates                    `;

const paymentsSpec = `openapi: 3.0.0
servers:
  - url: 'https://apigatewaycat.jpmorgan.com/tsapi/v1'
    description: UAT/CAT
  - url: 'https://apigateway.jpmorgan.com/tsapi/v1'
    description: PROD
  - url: 'https://api-mtls-pci-uat.jpmorgan.com/tsapi/v1'
    description: PCI UAT/CAT - Domain to be used for Push To Card payments only
  - url: 'https://api-mtls.merchant.jpmorgan.com/tsapi/v1'
    description: PCI PROD - Domain to be used for Push To Card payments only
  - url: 'https://jpmorgan-awesome-server'
    description: JPM Sandbox
info:
  title: Global Payments
  version: 1.1.5
  description: The Global Payments API is a unified API solution for multiple payment types across global markets.
  contact:
    name: JPMC Technical Services Support
tags:
  - name: Payment Initiation
    description: API to initiate a payment
  - name: Payment Information Retrieval
    description: APIs to retrieve status and details of a payment
paths:
  /payments:
    post:
      summary: Payments Initiation API
      operationId: initiatePayments
      description: |
        This API can be used to initiate payments. The following rails are supported:

        Real time Payments : 

        * Singapore   
        * Australia  
        * UK  
        * Hong Kong  
        * Malaysia
        * SEPA
        * Brazil
        * US
        * Mexico
        * Indonesia


        Alternate Payments:

            Push To Card :-

                  US
                  Canada


        ACH Payments:

                  Chile


        Blockchain JPM Coin Payments: 

                  United States 
                  Singapore 
                  Hong Kong 
                  Frankfurt
                  Luxembourg
                  London 


        References made to other markets/instruments in the specification are for internal development purposes only.
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PaymentInitationDetails'
            examples:
              Payment Initiation - UK FPS:
                $ref: '#/components/examples/PaymentInitiationUKFPS'
              Payment Initiation - Singapore RTP:
                $ref: '#/components/examples/PaymentInitiationSingaporeRTP'
              Payment Initiation - Australia FPS:
                $ref: '#/components/examples/PaymentInitiationAustraliaFPS'
              Payment Initiation - Hong Kong FPS:
                $ref: '#/components/examples/PaymentInitiationHongKongFPS'
              Payment Initiation - Malaysia FPS:
                $ref: '#/components/examples/PaymentInitiationMalaysiaFPS'
              Payment Initiation - SEPA Instant:
                $ref: '#/components/examples/PaymentInitiationSEPAInstant'
              Payment Initiation - Brazil PIX RTP:
                $ref: '#/components/examples/PaymentInitiationBrazilPIXRTP'
              Payment Initiation - US RTP:
                $ref: '#/components/examples/PaymentInitiationUSRTP'
              Payment Initiation - Mexico SPIE:
                $ref: '#/components/examples/PaymentInitiationMexicoSPIE'
              Payment Initiation - Indonesia RTP:
                $ref: '#/components/examples/PaymentInitiationIndonesiaRTP'
              Payment Initiation - Push To Card (P2C):
                $ref: '#/components/examples/PushToCardUSD'
              Payment Initiation - ACH - Chile:
                $ref: '#/components/examples/ACHChile'
              Payment Initiation - Australia FPS 400 Failure:
                $ref: '#/components/examples/PaymentInitiationAustraliaFPS400Failure'
              Payment Initiation - JPM COIN:
                $ref: '#/components/examples/JPMCoin'
        required: true
      callbacks:
        paymentInitiationStatus:
          '{client-url}/status':
            post:
              requestBody:
                content:
                  application/json:
                    schema:
                      type: object
                      properties:
                        callbacks:
                          $ref: '#/components/schemas/callbacks'
                required: true
              responses:
                '200':
                  description: OK
      x-examples:
        - name: Payment Initiation - UK FPS
          description: Initiate a UK faster payment
          parameters:
            body:
              payments:
                paymentIdentifiers:
                  endToEndId: AD202109311354152
                requestedExecutionDate: '2023-04-22T00:00:00.000Z'
                transferType: CREDIT
                paymentCurrency: GBP
                paymentAmount: 650
                paymentType: RTP
                debtor:
                  debtorAccount:
                    accountId: '12311871'
                    accountCurrency: GBP
                    accountType: DDA
                  ultimateDebtor:
                    ultimateDebtorName: Wayne Thompson
                    postalAddress:
                      addressType: ADDR
                      streetName: Lennon Road
                      buildingNumber: '22'
                      townName: Liverpool
                      country: GB
                    countryOfResidence: GB
                    organizationId:
                      bic: CHASGB2L
                      id: '40025916'
                debtorAgent:
                  financialInstitutionId:
                    bic: CHASGB2L
                creditorAgent:
                  financialInstitutionId:
                    clearingSystemId:
                      id: '185008'
                creditor:
                  creditorName: David Burn
                  postalAddress:
                    addressType: ADDR
                    streetName: Fratton Park
                    buildingNumber: '411'
                    postalCode: PO48RA
                    townName: Portsmouth
                    country: GB
                    countrySubDvsn: Hampshire
                  countryOfResidence: GB
                  creditorAccount:
                    accountId: '87654321'
                  ultimateCreditor:
                    ultimateCreditorName: Clint Hall
                    individualId:
                      id: '87654321'
                    postalAddress:
                      addressType: ADDR
                      streetName: Fratton Park
                      buildingNumber: '411'
                      postalCode: PO48RA
                      townName: Portsmouth
                      country: GB
                      countrySubDvsn: Hampshire
                purpose:
                  code: GDDS
                  type: CODE
                remittanceInformation:
                  unstructuredInformation:
                    - 'Payment for Macbook batteries Receipt #AXF23-LGG'
        - name: Payment Initiation - Singapore RTP
          description: Initiate a Singapore faster payment
          parameters:
            body:
              payments:
                paymentIdentifiers:
                  endToEndId: 112021092023FG35T4152
                requestedExecutionDate: '2023-08-03T00:00:00.000Z'
                transferType: CREDIT
                paymentType: RTP
                paymentCurrency: SGD
                paymentAmount: 10.01
                debtor:
                  debtorAccount:
                    accountId: '888000000'
                    accountCurrency: SGD
                    accountType: DDA
                debtorAgent:
                  financialInstitutionId:
                    bic: CHASSGSG
                creditorAgent:
                  financialInstitutionId:
                    bic: OCBCSGSG
                creditor:
                  creditorName: Chad Gasly
                  postalAddress:
                    addressType: ADDR
                    streetName: Adam Drive
                    buildingNumber: '23'
                    postalCode: '289963'
                    townName: Singapore
                    country: SG
                  dateAndPlaceOfBirth:
                    birthDate: '1991-05-02T00:00:00.000Z'
                    cityOfBirth: Singapore
                    countryOfBirth: SG
                  countryOfResidence: SG
                  creditorAccount:
                    accountId: '999000000'
                purpose:
                  code: GDDS
                  type: CODE
                remittanceInformation:
                  unstructuredInformation:
                    - 'Payment for Furniture. Invoice #93100AC'
        - name: Payment Initiation - Australia FPS
          description: Initiate an Australia faster payment
          parameters:
            body:
              payments:
                paymentIdentifiers:
                  endToEndId: XR202109202311354152
                requestedExecutionDate: '2022-06-02T00:00:00.000Z'
                transferType: CREDIT
                paymentType: RTP
                paymentCurrency: AUD
                paymentAmount: 3000
                debtor:
                  debtorAccount:
                    accountId: '711000000'
                    accountCurrency: AUD
                    accountType: DDA
                debtorAgent:
                  financialInstitutionId:
                    bic: CHASAU2X
                creditorAgent:
                  financialInstitutionId:
                    bic: BOFAAUSX
                creditor:
                  creditorName: Chris Cairns
                  postalAddress:
                    addressType: ADDR
                    streetName: Spencer Street
                    buildingNumber: '11'
                    postalCode: '3003'
                    townName: Melbourne
                    country: AU
                  dateAndPlaceOfBirth:
                    birthDate: '1998-05-21T00:00:00.000Z'
                    cityOfBirth: Melbourne
                    countryOfBirth: AU
                  countryOfResidence: AU
                  creditorAccount:
                    accountId: '111000000'
                  ultimateCreditor:
                    ultimateCreditorName: Claudia Mitchelle
                    postalAddress:
                      addressType: ADDR
                      streetName: Kings Street
                      buildingNumber: '664'
                      postalCode: '3901'
                      townName: Melbourne
                      country: AU
                    dateAndPlaceOfBirth:
                      birthDate: '1999-04-01T00:00:00.000Z'
                      cityOfBirth: Melbourne
                      countryOfBirth: AU
                    countryOfResidence: AU
                    organizationId:
                      id: '111940881'
                      schemeName:
                        proprietary: USI
                purpose:
                  code: GDDS
                  type: CODE
                remittanceInformation:
                  unstructuredInformation:
                    - Superannuation Payment receipt 1198RE2
        - name: Payment Initiation - Hong Kong FPS
          description: Payout to a Hong Kong beneficiary
          parameters:
            body:
              payments:
                paymentIdentifiers:
                  endToEndId: WQ20G1096231V13C552
                requestedExecutionDate: '2023-05-15T00:00:00.000Z'
                transferType: CREDIT
                paymentType: RTP
                paymentCurrency: HKD
                paymentAmount: 750
                debtor:
                  debtorAccount:
                    accountId: '6700000001'
                    accountCurrency: HKD
                  ultimateDebtor:
                    ultimateDebtorName: Hong Kong Subsidiary Limited
                    postalAddress:
                      addressType: ADDR
                      streetName: Central Street
                      buildingNumber: '01, 1/F'
                      postalCode: '999077'
                      townName: Central
                      country: HK
                    dateAndPlaceOfBirth:
                      birthDate: '1950-12-31T00:00:00.000Z'
                      cityOfBirth: Hong Kong
                      countryOfBirth: HK
                debtorAgent:
                  financialInstitutionId:
                    bic: CHASHKHH
                creditorAgent:
                  financialInstitutionId:
                    clearingSystemId:
                      id: '004'
                creditor:
                  creditorName: Public Inc.
                  postalAddress:
                    addressType: ADDR
                    streetName: Connaught Road
                    buildingNumber: '02, 2/F'
                    postalCode: '999077'
                    townName: Wan Chai
                    country: HK
                    countrySubDvsn: Wan Chai
                  dateAndPlaceOfBirth:
                    birthDate: '1980-10-20T00:00:00.000Z'
                    cityOfBirth: Hong Kong
                    countryOfBirth: HK
                  creditorAccount:
                    accountId: '1232261890'
                    accountType: BBAN
                  ultimateCreditor:
                    ultimateCreditorName: John Smith
                    postalAddress:
                      addressType: ADDR
                      streetName: Connaught Road
                      buildingNumber: '02, 2/F'
                      postalCode: '999077'
                      townName: Wan Chai
                      country: HK
                      countrySubDvsn: Wan Chai
                    dateAndPlaceOfBirth:
                      birthDate: '1960-05-15T00:00:00.000Z'
                      cityOfBirth: Hong Kong
                      countryOfBirth: HK
                categoryPurpose:
                  proprietary: CXBSNS
                remittanceInformation:
                  unstructuredInformation:
                    - Invoice number 11. Paid by HK Ltd B/O HK Sub Ltd. Pay to Public Inc for John Smith
        - name: Payment Initiation - Malaysia FPS
          description: Initiate a Malaysia faster payment
          parameters:
            body:
              payments:
                paymentIdentifiers:
                  endToEndId: A12Y092G0231T1354BB2
                transferType: CREDIT
                paymentType: RTP
                paymentCurrency: MYR
                paymentAmount: 1500
                debtor:
                  debtorDevice:
                    ipAddress: 123.45.67.890
                  debtorAccount:
                    accountId: '0987654321'
                debtorAgent:
                  financialInstitutionId:
                    bic: CHASMYKX
                creditorAgent:
                  financialInstitutionId:
                    bic: CITIMYKL
                creditor:
                  creditorName: Rajan Lee
                  countryOfResidence: MY
                  creditorAccount:
                    accountId: '987654321'
                    accountType: SVGS
                purpose:
                  code: '17080'
                  type: PROPRIETARY
                remittanceInformation:
                  structuredInformation:
                    - creditReference: 1252ACV-096
        - name: Payment Initiation - SEPA Instant
          description: Initiate a SEPA Instant payment
          parameters:
            body:
              payments:
                paymentIdentifiers:
                  endToEndId: 20SP21I092S02T31T152
                requestedExecutionDate: '2023-02-06T00:00:00.000Z'
                transferType: CREDIT
                paymentType: RTP
                paymentCurrency: EUR
                paymentAmount: 4550
                debtor:
                  debtorAccount:
                    accountId: DE40501108006169009120
                    accountCurrency: EUR
                  ultimateDebtor:
                    ultimateDebtorName: Donatella Kimmich
                    postalAddress:
                      addressType: ADDR
                      country: DE
                      addressLine:
                        - Platz Des 4
                        - 14167 Berlin
                    organizationId:
                      bic: CHASDEFX
                      id: DE88501108006231400596
                      schemeName:
                        code: IBAN
                      issuer: Deutsche Bundesbank
                    dateAndPlaceOfBirth:
                      birthDate: '2000-10-07T00:00:00.000Z'
                      cityOfBirth: Hamburg
                      countryOfBirth: DE
                debtorAgent:
                  financialInstitutionId:
                    bic: CHASDEFX
                creditorAgent:
                  financialInstitutionId:
                    bic: CHASDEFX
                creditor:
                  creditorName: Joshua Klose
                  countryOfResidence: DE
                  postalAddress:
                    addressType: ADDR
                    country: DE
                    addressLine:
                      - Hansastr 39
                      - 81373 Munich
                  dateAndPlaceOfBirth:
                    birthDate: '1989-12-01T00:00:00.000Z'
                    cityOfBirth: Munich
                    countryOfBirth: DE
                  creditorAccount:
                    accountId: DE39501108006169009138
                    accountType: IBAN
                purpose:
                  code: '113'
                  type: PROPRIETARY
                remittanceInformation:
                  unstructuredInformation:
                    - Payment for equipment supply
        - name: Payment Initiation - Brazil PIX RTP
          description: Initiate a Brazilian Real Time Payment
          parameters:
            body:
              payments:
                paymentIdentifiers:
                  endToEndId: d2c0210920B23R14152
                requestedExecutionDate: '2023-02-07T00:00:00.000Z'
                transferType: CREDIT
                paymentType: RTP
                paymentCurrency: BRL
                paymentAmount: 9540
                debtor:
                  debtorAccount:
                    accountId: '1000304'
                debtorAgent:
                  financialInstitutionId:
                    bic: CHASBRSP
                creditorAgent:
                  financialInstitutionId:
                    clearingSystemId:
                      id: '33172537'
                      branchNumber: '1'
                creditor:
                  creditorName: Alison Becker
                  creditorAccount:
                    accountId: '0012902678'
                    accountType: CACC
                taxInformation:
                  creditorTaxInformation:
                    taxId: '00044967012'
                    taxpayerCategory: INDIVIDUAL
        - name: Payment Initiation - US RTP
          description: Initiate a US Real Time Payment
          parameters:
            body:
              payments:
                paymentIdentifiers:
                  endToEndId: pl210g9t231r13541130
                requestedExecutionDate: '2022-10-15T00:00:00.000Z'
                transferType: CREDIT
                paymentType: RTP
                paymentCurrency: USD
                paymentAmount: 500
                debtor:
                  debtorName: Paula Smitty
                  debtorAccount:
                    accountId: '000009102574986'
                    accountType: DDA
                  ultimateDebtor:
                    ultimateDebtorName: Christian Jones
                    postalAddress:
                      addressType: ADDR
                      streetName: Hancock Ave
                      buildingNumber: '121'
                      postalCode: '07302'
                      townName: Jersey City
                      country: US
                      countrySubDvsn: Hudson
                    dateAndPlaceOfBirth:
                      birthDate: '1984-01-01T00:00:00.000Z'
                      cityOfBirth: Hull city
                      countryOfBirth: BR
                    individualId:
                      id: '001'
                debtorAgent:
                  financialInstitutionId:
                    clearingSystemId:
                      id: '021000021'
                      idType: USABA
                creditorAgent:
                  financialInstitutionId:
                    clearingSystemId:
                      id: '071000013'
                      idType: USABA
                creditor:
                  creditorName: Clint Davos
                  postalAddress:
                    addressType: ADDR
                    streetName: Cow Hollow
                    buildingNumber: '65'
                    postalCode: '05483'
                    townName: San Francisco
                    country: US
                    countrySubDvsn: SFO
                  dateAndPlaceOfBirth:
                    birthDate: '2001-01-12T00:00:00.000Z'
                    cityOfBirth: London
                    countryOfBirth: UK
                  creditorAccount:
                    accountId: '000000034257284'
                  ultimateCreditor:
                    ultimateCreditorName: Max Payne
                    postalAddress:
                      addressType: ADDR
                      streetName: Flint Ave
                      buildingNumber: '89'
                      postalCode: '88793'
                      townName: Los Angeles
                      country: US
                      countrySubDvsn: LAX
                    dateAndPlaceOfBirth:
                      birthDate: '1999-04-01T00:00:00.000Z'
                      cityOfBirth: Rio
                      countryOfBirth: BR
                    organizationId:
                      id: '003'
                remittanceInformation:
                  unstructuredInformation:
                    - Payment for rustic vintage furniture
        - name: Payment Initiation - Mexico SPIE
          description: Initiate a Mexican Real Time Payment
          parameters:
            body:
              payments:
                paymentIdentifiers:
                  endToEndId: mr202120b231h135
                requestedExecutionDate: '2022-06-30T00:00:00.000Z'
                transferType: CREDIT
                paymentType: RTP
                paymentCurrency: MXN
                paymentAmount: 175
                debtor:
                  debtorAccount:
                    accountId: '0022628001'
                    accountCurrency: MXN
                    accountType: DDA
                  ultimateDebtor:
                    ultimateDebtorName: Enzo Hernandez
                    postalAddress:
                      addressType: ADDR
                      country: MX
                      addressLine:
                        - Papua Lane
                        - Kew Park
                    individualId:
                      id: '002'
                      issuer: Elicia Carvalho
                    additionalIdentifiers:
                      - id: '1234'
                        idType: INDIVIDUAL
                  dateAndPlaceOfBirth:
                    birthDate: '1995-02-10T00:00:00.000Z'
                    cityOfBirth: Luxembourg
                    countryOfBirth: LU
                debtorAgent:
                  financialInstitutionId:
                    bic: CHASMXMX
                creditorAgent:
                  financialInstitutionId:
                    bic: CHASMXMX
                creditor:
                  creditorName: Chavo G
                  countryOfResidence: MX
                  postalAddress:
                    addressType: ADDR
                    country: MX
                    addressLine:
                      - Texmaco Street
                      - Dinho River
                  dateAndPlaceOfBirth:
                    birthDate: '1983-03-01T00:00:00.000Z'
                    cityOfBirth: Mexico City
                    countryOfBirth: MX
                  creditorAccount:
                    accountId: '0077644395'
                    accountType: DDA
                  ultimateCreditor:
                    individualId:
                      id: '0077644395'
                    ultimateCreditorName: Prince Gomez
                    postalAddress:
                      addressType: ADDR
                      country: MX
                      addressLine:
                        - Calicut Avenue
                        - Pacino Street
                    dateAndPlaceOfBirth:
                      birthDate: '1991-04-19T00:00:00.000Z'
                      cityOfBirth: Mexico City
                      countryOfBirth: MX
                remittanceInformation:
                  unstructuredInformation:
                    - Payment for Surfing equipment Invoice 113390C-FF2
        - name: Payment Initiation - Indonesia RTP
          description: Initiate a Real Time Payment in Indonesia
          parameters:
            body:
              payments:
                paymentIdentifiers:
                  endToEndId: XR2021RE023WBG35
                requestedExecutionDate: '2023-06-11T00:00:00.000Z'
                transferType: CREDIT
                paymentType: RTP
                paymentCurrency: IDR
                paymentAmount: 6500
                categoryPurpose:
                  proprietary: INVESTMENT
                debtor:
                  debtorName: Blaise Dox
                  debtorAccount:
                    accountId: '6653331826'
                debtorAgent:
                  financialInstitutionId:
                    bic: CHASIDJX
                creditorAgent:
                  financialInstitutionId:
                    bic: BDINIDJA
                creditor:
                  creditorName: Mary Sutantri
                  creditorAccount:
                    accountId: '003623339944'
                remittanceInformation:
                  unstructuredInformation:
                    - Rental Payment for June 2023
        - name: Push To Card (P2C)
          description: Initiate a Push To Card payment
          parameters:
            body:
              payments:
                requestedExecutionDate: '2022-06-28T00:00:00.000Z'
                transferType: CREDIT
                paymentIdentifiers:
                  endToEndId: 1lv0t92e023g11354100
                paymentCurrency: USD
                paymentAmount: 750
                debtor:
                  debtorName: Colin Hanks
                  debtorAccount:
                    alternateAccountIdentifier: PRU01US
                debtorAgent:
                  financialInstitutionId:
                    bic: CHASUS33
                creditor:
                  creditorName: Karl Eichorn
                  creditorAccount:
                    accountType: CARD
                    alternateAccountIdentifier: '4137110019999999'
                    cardExpiryDate: '2207'
                remittanceInformation:
                  unstructuredInformation:
                    - Credit note from Milestone Music Company NY
        - name: ACH - Chile
          description: Initiate a Chile ACH payment
          parameters:
            body:
              payments:
                paymentIdentifiers:
                  endToEndId: XR20210920CS1131416
                requestedExecutionDate: '2022-12-01T00:00:00.000Z'
                transferType: CREDIT
                paymentCurrency: CLP
                paymentAmount: 300.25
                debtor:
                  debtorAccount:
                    accountId: '2600023565'
                    accountCurrency: CLP
                  debtorName: Lucha Gonzalez
                debtorAgent:
                  financialInstitutionId:
                    bic: CHASCLRM
                creditorAgent:
                  financialInstitutionId:
                    bic: BCHICLRM
                    clearingSystemId:
                      id: '114740179'
                      branchNumber: '0001'
                creditor:
                  creditorName: Marina Simeone
                  creditorAccount:
                    accountId: '101000974'
                    accountType: SVGS
                  postalAddress:
                    country: CL
                paymentType: ACH.TRF
                purpose:
                  code: '0010130000'
                  type: PROPRIETARY
                taxInformation:
                  creditorTaxInformation:
                    taxId: 06703922-K
        - name: Blockchain - JPM Coin payments
          description: Initiate a JPM Coin deposit payment
          parameters:
            body:
              payments:
                paymentIdentifiers:
                  endToEndId: 202E092v021D35E4152
                requestedExecutionDate: 203-06-10
                paymentCurrency: USD
                paymentAmount: 6500
                transferType: CREDIT
                paymentType: BLOCKCHAIN
                debtor:
                  debtorAccount:
                    accountId: '8830699900'
                    accountType: DDA
                debtorAgent:
                  financialInstitutionId:
                    bic: CHASSGSG
                creditorAgent:
                  financialInstitutionId:
                    bic: CHASUS33
                creditor:
                  creditorAccount:
                    accountId: '0070103277'
                    accountType: BDA
                remittanceInformation:
                  unstructuredInformation:
                    - Payment for container shipment
      responses:
        '202':
          description: Payment has been accepted for processing
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/paymentInitiationResponse'
              examples:
                PaymentInitiationResponseDefault:
                  $ref: '#/components/examples/PaymentInitiationResponseDefault'
                PaymentInitiationResponseAU:
                  $ref: '#/components/examples/PaymentInitiationResponseAU'
                PaymentInitiationResponseAU400:
                  $ref: '#/components/examples/PaymentInitiationResponseAU400'
        '400':
          description: |-
            Bad Request.
            List of Error codes and Rule definitions. errorDescription is  dynamically generated hence not shown here.

            | Error Code        |            Rule Definition                          |  
            |-------------------|-----------------------------------------------------|
            | '10001'           | Mandatory field is missing or invalid               | 
            | '10002'           | Minimum length validation failure                   | 
            | '10003'           | Maximum length validation failure                   | 
            | '10004'           | Date validation failure                             |  
            | '10005'           | Amount validation failure ~ value more than maximum |  
            | '10006'           | Amount validation failure ~ value less than minimum |  
            | '10007'           | Amount validation failure ~ value is not a number   |  
            | '10008'           | Validation failure ~ unexpected value provided      |  
            | '10009'           | Invalid Id provided                                 |  
            | '10010'           | Personal information validation failure             |  
            | '12000'           | System error                                        | 
            | '13000'           | Uncategorized error                                 |  


                **** Standard API Gateway Error codes and descriptions **** 

                | Error Code |           Description                              |  
                |----------- |----------------------------------------------------|
                | 'GCA-023'  |Please re-send request in valid format              | 
                | 'GCA-030'  |API Processing Error                                | 
                | 'GCA-148'  |debtor Account id must be provided                  | 
                | 'GCA-149'  |debtorAgent bic or clearingSystemId must be provided|  
                | 'GCA-150'  |debtor account id/bic was not found                 |  
                | 'GCA-154'  |Mandatory field paymentType is invalid or missing   |  
          content:
            application/json:
              schema:
                type: object
                properties:
                  errors:
                    $ref: '#/components/schemas/ErrorsInit'
              examples:
                InvadlidRequest:
                  $ref: '#/components/examples/InvalidDataError'
                MandatoryFieldMissing:
                  $ref: '#/components/examples/MandatoryFieldMissing'
        '403':
          description: |-
            Forbidden. 

                | Error Code |           Description                     |  
                |----------- |-------------------------------------------|
                | 'GCA-001'  |Client is not eligible for the API Service | 
                | 'GCA-003'  |Client is not eligible for the API Service | 
                | 'GCA-145'  |incorrect originator account id provided   | 
                | 'GCA-150'  |debtor account id/bic was not found        |  
          content:
            application/json:
              schema:
                type: object
                properties:
                  errors:
                    $ref: '#/components/schemas/Errors'
              examples:
                ClientIneligible:
                  $ref: '#/components/examples/ClientIneligible'
                DebtorAccountIdNotFound:
                  $ref: '#/components/examples/DebtorAccountNotFound'
        '503':
          description: |-
            Service Unavailable.
            GCA-099 - System Unavailable
          content:
            application/json:
              schema:
                type: object
                properties:
                  errors:
                    $ref: '#/components/schemas/Errors'
              examples:
                SystemUnavailable:
                  $ref: '#/components/examples/SystemUnavailable'
      tags:
        - Payment Initiation
    get:
      summary: Retrieve payment details
      operationId: getPaymentDetails
      tags:
        - Payment Information Retrieval
      description: Retrieve details of your transaction
      parameters:
        - name: endToEndId
          in: query
          description: Customer assigned reference to the transaction. Either endToEndId or firmRootId is required
          required: false
          schema:
            type: string
        - name: firmRootId
          in: query
          description: 'Unique identification, as assigned by the first instructing agent or initiatingParty, to unambiguously identify the transaction that is passed on, unchanged, throughout the entire interbank chain. Either firmRootId or endToEndId is required.'
          required: false
          schema:
            type: string
      x-examples:
        - name: Payment details retrieval - firmRootId
          description: Retrieve payment details using firmRootId
          parameters:
            firmRootId: 686bdc91-554e-446f-81af-0042f5215535
        - name: Payment details retrieval - endToEndId
          description: Retrieve payment details using endToEndId
          parameters:
            endToEndId: 112021092023FG35T4152
          examples:
            PaymentDetailsAU:
              $ref: '#/components/examples/PaymentDetailsAURequest'
            PaymentDetailsAU400:
              $ref: '#/components/examples/PaymentDetailsAURequest400'
      responses:
        '200':
          description: |-
            Response to the details inquiry. In case a payment is rejected, the following errors can be expected.

            List of Error codes and Rule definitions. errorDescription is dynamically generated hence not shown here.

                | Error Code        |           Description                               |  
                |-------------------|-----------------------------------------------------|
                | '10001'           | Mandatory field is missing or invalid               | 
                | '10002'           | Minimum length validation failure                   | 
                | '10003'           | Maximum length validation failure                   | 
                | '10004'           | Date validation failure                             |  
                | '10005'           | Amount validation failure ~ value more than maximum |  
                | '10006'           | Amount validation failure ~ value less than minimum |  
                | '10007'           | Amount validation failure ~ value is not a number   |  
                | '10008'           | Validation failure ~ unexpected value provided      |  
                | '10009'           | Invalid Id provided                                 |  
                | '10010'           | Personal information validation failure             |  
                | '11000'           | Clearing/Regulatory failure                         |  
                | '12000'           | System error                                        | 
                | '13000'           | Uncategorized error                                 |  
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaymentDetailsResponse'
              examples:
                PaymentDetailsQueryByEndToEndId:
                  $ref: '#/components/examples/PaymentDetailsQueryByEndToEndId'
                PaymentDetailsAustraliaNPP:
                  $ref: '#/components/examples/PaymentDetailsAustraliaNPP'
                PaymentDetailsBrazilPIX:
                  $ref: '#/components/examples/PaymentDetailsBrazilPIX'
                PaymentDetailsHongKongFPS:
                  $ref: '#/components/examples/PaymentDetailsHongKongFPS'
                PaymentDetailsIndonesiaRTP:
                  $ref: '#/components/examples/PaymentDetailsIndonesiaRTP'
                PaymentDetailsMalaysiaRPP:
                  $ref: '#/components/examples/PaymentDetailsMalaysiaRPP'
                PaymentDetailsMexicoSPEI:
                  $ref: '#/components/examples/PaymentDetailsMexicoSPEI'
                PaymentDetailsSEPA:
                  $ref: '#/components/examples/PaymentDetailsSEPA'
                PaymentDetailsSingaporeFAST:
                  $ref: '#/components/examples/PaymentDetailsSingaporeFAST'
                PaymentDetailsUKFPS:
                  $ref: '#/components/examples/PaymentDetailsUKFPS'
                PaymentDetailsUSTCH:
                  $ref: '#/components/examples/PaymentDetailsUSTCH'
                PaymentDetailsUSP2C:
                  $ref: '#/components/examples/PaymentDetailsUSP2C'
                PaymentDetailsCanadaP2C:
                  $ref: '#/components/examples/PaymentDetailsCanadaP2C'
                PaymentDetailsChileLowValueACH:
                  $ref: '#/components/examples/PaymentDetailsChileLowValueACH'
                PaymentDetailsJPMCoin:
                  $ref: '#/components/examples/PaymentDetailsJPMCoin'
        '400':
          description: |-
            Bad Request
            GCA-095 - endToEndId or firmRootId is required
          content:
            application/json:
              schema:
                type: object
                properties:
                  errors:
                    type: array
                    items:
                      $ref: '#/components/schemas/Errors'
              examples:
                PaymentDetailsAUResponse400:
                  $ref: '#/components/examples/PaymentDetailsAUResponse400'
        '403':
          description: |-
            Forbidden.
            GCA-001 - Client is not eligible for the API Service
            GCA-003 - Client is not eligible for the API Service
          content:
            application/json:
              schema:
                type: object
                properties:
                  errors:
                    type: array
                    items:
                      $ref: '#/components/schemas/Errors'
              examples:
                ClientIneligible:
                  $ref: '#/components/examples/ClientIneligibleError'
        '503':
          description: |-
            Service Unavailable
            GCA-030 - API Processing Error
            GCA-099 - System Unavailable
          content:
            application/json:
              schema:
                type: object
                properties:
                  errors:
                    type: array
                    items:
                      $ref: '#/components/schemas/Errors'
              examples:
                SystemUnavailable:
                  $ref: '#/components/examples/SystemUnavailableError'
  /payments/status:
    get:
      summary: Retrieve payment status
      description: Retrieve status of your transaction
      operationId: getPaymentStatus
      parameters:
        - name: endToEndId
          in: query
          description: Customer assigned reference to the transaction. Either endToEndId or firmRootId is required
          required: false
          schema:
            type: string
        - name: firmRootId
          in: query
          description: 'Unique identification, as assigned by the first instructing agent or initiatingParty, to unambiguously identify the transaction that is passed on, unchanged, throughout the entire interbank chain. Either firmRootId or endToEndId is required.'
          required: false
          schema:
            type: string
      x-examples:
        - name: Status retrieval - firmRootId
          description: Retrieve payment status using firmRootId
          parameters:
            firmRootId: 596c0f34-7d7a-4f9b-b6f8-91704a63828a
        - name: Status retrieval - endToEndId
          description: Retrieve payment status using endToEndId
          parameters:
            endToEndId: AD202109311354152
          examples:
            PaymentStatusAU:
              $ref: '#/components/examples/PaymentStatusAURequest'
            PaymentStatusAU400:
              $ref: '#/components/examples/PaymentStatusAURequest400'
            PaymentStatusPending:
              $ref: '#/components/examples/PaymentStatusPending'
            PaymentStatusRejected:
              $ref: '#/components/examples/PaymentStatusRejected'
      responses:
        '200':
          description: |-
            Response to the status inquiry
            List of Error codes and Rule definitions. errorDescription is dynamically generated hence not shown here.

                | Error Code        |           Rule Definition                           |  
                |-------------------|-----------------------------------------------------|
                | '10001'           | Mandatory field is missing or invalid               | 
                | '10002'           | Minimum length validation failure                   | 
                | '10003'           | Maximum length validation failure                   | 
                | '10004'           | Date validation failure                             |  
                | '10005'           | Amount validation failure ~ value more than maximum |  
                | '10006'           | Amount validation failure ~ value less than minimum |  
                | '10007'           | Amount validation failure ~ value is not a number   |  
                | '10008'           | Validation failure ~ unexpected value provided      |  
                | '10009'           | Invalid Id provided                                 |  
                | '10010'           | Personal information validation failure             |  
                | '11000'           | Clearing/Regulatory failure                         |  
                | '12000'           | System error                                        | 
                | '13000'           | Uncategorized error                                 |  
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/paymentStatus'
              examples:
                PaymentStatusAUResponse:
                  $ref: '#/components/examples/PaymentStatusAUResponse'
                PaymentStatusCompleted:
                  $ref: '#/components/examples/PaymentStatusCompleted'
                PaymentStatusPending:
                  $ref: '#/components/examples/PaymentStatusPending'
                PaymentStatusRejected:
                  $ref: '#/components/examples/PaymentStatusRejected'
        '400':
          description: |-
            Bad Request
            GCA-095 - endToEndId or firmRootId is required
          content:
            application/json:
              schema:
                type: object
                properties:
                  errors:
                    type: array
                    items:
                      $ref: '#/components/schemas/Errors'
              examples:
                PaymentStatusAUResponse400:
                  $ref: '#/components/examples/PaymentStatusAUResponse400'
        '403':
          description: |-
            Forbidden.
            GCA-001 - Client is not eligible for the API Service
            GCA-003 - Client is not eligible for the API Service
          content:
            application/json:
              schema:
                type: object
                properties:
                  errors:
                    type: array
                    items:
                      $ref: '#/components/schemas/Errors'
              examples:
                SystemUnavailable:
                  $ref: '#/components/examples/ClientIneligibleError'
        '503':
          description: |-
            Service Unavailable.
            GCA-030 - API Processing Error
            GCA-099 - System Unavailable
          content:
            application/json:
              schema:
                type: object
                properties:
                  errors:
                    type: array
                    items:
                      $ref: '#/components/schemas/Errors'
              examples:
                SystemUnavailable:
                  $ref: '#/components/examples/SystemUnavailableError'
      tags:
        - Payment Information Retrieval
components:
  schemas:
    PaymentInitationDetails:
      type: object
      required:
        - payments
      properties:
        payments:
          $ref: '#/components/schemas/payments'
    payments:
      type: object
      required:
        - requestedExecutionDate
        - paymentIdentifiers
        - paymentAmount
        - paymentCurrency
        - debtor
        - debtorAgent
        - creditor
        - transferType
      properties:
        possibleDuplicateMessage:
          type: boolean
          description: Optional field to indicate a duplicate payment
        requestedExecutionDate:
          type: string
          pattern: '[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])'
          maxLength: 10
          description: Requested date on which/by which the transaction should be executed (by Debtor FI). ISO Date format. (YYYY-MM-DD)
        paymentIdentifiers:
          $ref: '#/components/schemas/paymentIdentifiers'
        paymentCurrency:
          type: string
          maxLength: 3
          description: '3- character ISO currency code. E.g. SGD, GBP, AUD, EUR, MXN, CLP'
        paymentAmount:
          type: number
          description: |-
            Amount should be more than 0.01 with maximum of two decimal places allowed
            Maximum amount allowed per market/instrument :-
            UK FPS - GBP 1,000,000
            SEPA Instant  - EUR 100,000
          example: 1000
        paymentType:
          $ref: '#/components/schemas/PaymentType'
        debtor:
          $ref: '#/components/schemas/debtor'
        debtorAgent:
          $ref: '#/components/schemas/debtorAgent'
        creditorAgent:
          $ref: '#/components/schemas/creditorAgent'
        creditor:
          $ref: '#/components/schemas/creditor'
        transferType:
          type: string
          enum:
            - CREDIT
            - DEBIT
          description: |-
            To indicate the transaction is a credit transfer or direct debit transfer. This indicator also determines the originator and receiver is the debit and credit side of this transaction. 
            Supported value per market/instrument :-
            UK Faster Payments - CREDIT
            Singapore Faster Payments - CREDIT
            Australia Faster Payments - CREDIT
            Singapore Faster Payments - CREDIT
            Hong Kong Faster Payments - CREDIT
            Malaysia Faster Payments - CREDIT
            SEPA Instant - CREDIT
            Indonesia RTP - CREDIT
            Brazil RTP - CREDIT
            US RTP - CREDIT
            Push To Card - CREDIT
            ACH Chile Low Value - CREDIT
            Blockchain (coin) Payments - CREDIT
        purpose:
          $ref: '#/components/schemas/purpose'
        categoryPurpose:
          $ref: '#/components/schemas/categoryPurpose'
        remittanceInformation:
          $ref: '#/components/schemas/remittanceInformation'
        taxInformation:
          $ref: '#/components/schemas/taxInformation'
        secureVerification:
          type: array
          description: Applies only for Interac proxy payments
          items:
            $ref: '#/components/schemas/secureVerification'
        paymentExpiryDate:
          type: string
          format: date-time
          description: 'Applies only for Interac proxy Payments. Format expected - YYYY-MM-DDThh:mm:ss+/-time offset to UTC'
        chargeBearer:
          type: string
          enum:
            - CREDITOR
            - DEBTOR
    secureVerification:
      type: object
      properties:
        key:
          type: string
          description: Key identifies the security question
        secret:
          type: string
          description: Authenticate the key using secret answer to the question
    taxInformation:
      type: object
      description: |-
        mandatory for Brazil PIX and Chile Low value ACH payments
        Optional for Mexico RTP
      properties:
        taxAmount:
          type: number
          description: Applicable only for Mexico RTP
          example: 1000
        creditorTaxInformation:
          type: object
          properties:
            taxId:
              type: string
              description: |-
                Maximum lengths allowed per instrument/market :-
                ACH Chile - 35
            taxpayerCategory:
              type: string
              enum:
                - INDIVIDUAL
                - CORPORATE
          required:
            - taxId
            - taxpayerCategory
        debtorTaxInformation:
          type: object
          required:
            - taxId
          properties:
            taxId:
              type: string
    PaymentType:
      type: string
      enum:
        - ACH.TRF
        - RTP
        - BLOCKCHAIN
      description: |-
        Mandatory for RTP, ACH and Coin payments.
        Specify the instrument type. 

        Use RTP for Faster Payments

        ACH.TRF for Chile ACH Payments

        BLOCKCHAIN for Coin Payments
    dateAndPlaceOfBirth:
      type: object
      properties:
        birthDate:
          type: string
          pattern: '[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])'
        cityOfBirth:
          type: string
          maxLength: 35
        countryOfBirth:
          type: string
          maxLength: 2
    callbacks:
      type: array
      description: |-
        List of Error codes and Rule definitions. errorDescription is dynamically generated hence not shown here.

            | Error Code        |            Rule Definition                          |  
            |-------------------|-----------------------------------------------------|
            | '10001'           | Mandatory field is missing or invalid               | 
            | '10002'           | Minimum length validation failure                   | 
            | '10003'           | Maximum length validation failure                   | 
            | '10004'           | Date validation failure                             |  
            | '10005'           | Amount validation failure ~ value more than maximum |  
            | '10006'           | Amount validation failure ~ value less than minimum |  
            | '10007'           | Amount validation failure ~ value is not a number   |  
            | '10008'           | Validation failure ~ unexpected value provided      |  
            | '10009'           | Invalid Id provided                                 |  
            | '10010'           | Personal information validation failure             |  
            | '11000'           | Clearing/Regulatory failure                         |  
            | '12000'           | System error                                        | 
            | '13000'           | Uncategorized error                                 |  
      items:
        type: object
        properties:
          endToEndId:
            type: string
          firmRootId:
            type: string
          createDateTime:
            type: string
          paymentStatus:
            type: string
            enum:
              - PENDING
              - PENDING_POSTING
              - COMPLETED
              - COMPLETED_CREDITED
              - REJECTED
              - RETURNED
              - BLOCKED
            description: |-
              Status of the payment.
              PENDING - Payment is pending processing
              PENDING_POSTING - Payment is yet to be posted in the beneficiary account
              COMPLETED - Payment has successfully completed
              COMPLETED_CREDITED - Status indicating the beneficiary's account has been credited
              REJECTED - Payment has been rejected. Please refer to the exception object for error details
              RETURNED - Payment has been retured to the debtor party
              BLOCKED - Payment blocked due to sanctions issue 



              RTP Flows (All Markets) - 
              PENDING -> COMPLETED  
              PENDING -> REJECTED

              Additional Flows(RTP)-> 
              US  - 
              PENDING -> PENDING_POSTING -> COMPLETED
              PENDING -> BLOCKED

              Hong Kong - 
              PENDING -> COMPLETED -> COMPLETED_CREDITED

              Push To Card Flows - 
              PENDING -> COMPLETED
              PENDING -> REJECTED
              PENDING -> COMPLETED -> RETURNED

              ACH Flows (Chile) - 
              PENDING -> COMPLETED 
              PENDING - REJECTED

              Blockchain (Coin) Flows - 
              PENDING -> PENDING_POSTING -> COMPLETED 
              PENDING -> REJECTED
          exceptions:
            type: array
            items:
              type: object
              properties:
                errorCode:
                  type: string
                errorDescription:
                  type: string
                ruleDefinition:
                  type: string
                externalCode:
                  type: string
          fx:
            $ref: '#/components/schemas/FxApplied'
          clearingSystem:
            $ref: '#/components/schemas/ClearingSystem'
          settlementPaymentType:
            $ref: '#/components/schemas/SettlementPaymentType'
    SettlementPaymentType:
      type: string
      enum:
        - ACH
        - RTP
    ClearingSystem:
      type: object
      properties:
        name:
          type: string
          enum:
            - SPI
            - FPS
            - TIPS
            - TCH
            - FEDNOW
            - BIFAST
            - RPP
            - SPEI
            - NPP
            - RT1
          description: Name of the clearing system
        country:
          type: string
          description: 2 digit country code
    FxApplied:
      type: object
      properties:
        applied:
          type: boolean
          description: States whether or not a foreign exchange was applied to the transaction.
        appliedRate:
          $ref: '#/components/schemas/Decimal'
    paymentStatus:
      type: object
      properties:
        createDateTime:
          type: string
        status:
          type: string
          enum:
            - PENDING
            - PENDING_POSTING
            - COMPLETED
            - COMPLETED_CREDITED
            - REJECTED
            - RETURNED
            - BLOCKED
          description: |-
            Status of the payment.
            PENDING - Payment is pending processing
            PENDING_POSTING - Payment is yet to be posted in the beneficiary account
            COMPLETED - Payment has successfully completed
            COMPLETED_CREDITED - Status indicating the beneficiary's account has been credited
            REJECTED - Payment has been rejected. Please refer to the exception object for error details
            RETURNED - Payment has been retured to the debtor party
            BLOCKED - Payment blocked due to sanctions issue 


            RTP Flows (All Markets) - 
            PENDING -> COMPLETED  
            PENDING -> REJECTED

            Additional Flows(RTP)-> 
            US  - 
            PENDING -> PENDING_POSTING -> COMPLETED
            PENDING -> BLOCKED

            Hong Kong - 
            PENDING -> COMPLETED -> COMPLETED_CREDITED

            Push To Card Flows - 
            PENDING -> COMPLETED
            PENDING -> REJECTED
            PENDING -> COMPLETED -> RETURNED

            Blockchain (Coin) Flows - 
            PENDING -> PENDING_POSTING -> COMPLETED 
            PENDING -> REJECTED
        fx:
          $ref: '#/components/schemas/FxApplied'
        clearingSystem:
          $ref: '#/components/schemas/ClearingSystem'
        settlementPaymentType:
          $ref: '#/components/schemas/SettlementPaymentType'
        exception:
          type: array
          items:
            type: object
            properties:
              errorCode:
                type: string
              errorDescription:
                type: string
              ruleDefinition:
                type: string
              externalCode:
                type: string
    cd:
      type: string
      description: service Level in coded form.
    postalAddress:
      type: object
      description: |-
        Address of the party
        For UK FPS it is recommended that the combined length of all structured fields should be less than 140 characters
        SEPA Instant - Only country and addressLine are applicable
        Push To Card - Include buildingNumber and streetName
      properties:
        addressType:
          type: string
          enum:
            - ADDR
            - BIZZ
            - DLVY
            - HOME
            - MLTO
            - PBOX
          description: enum. Values are ADDR - Postal Address is the complete postal address. BIZZ - Business Address is the business address. DLVY-  DeliveryTo Address is the address to which delivery is to take place. HOME - Residential Address is the home address. MLTO - MailTo Address is the address to which mail is sent. PBOX-  PO Box Address is a postal office (PO) box.
        streetName:
          type: string
          description: |-
            Name of street. Mandatory for US RTP
            Maximum length applicable :-
            Push To Card - 35
          maxLength: 70
        buildingNumber:
          type: string
          description: |-
            Building name or number.
            Maximum length applicable :-
            Push To Card - 35
          maxLength: 16
        postalCode:
          type: string
          description: |-
            Zip code. Mandatory for Wallet Payments and US RTP
            Maximum length applicable :-
            Push To Card - 9
          maxLength: 16
        townName:
          type: string
          description: |-
            Name of the town. Mandatory for US RTP
            Maximum length applicable :-
            Push To Card - 25
          maxLength: 35
        countrySubDvsn:
          type: string
          maxLength: 35
          description: Mandatory for US RTP
        country:
          type: string
          description: |-
            2 character ISO country code.
            Mandatory for Wallet Payments, US RTP, and Interac
          maxLength: 2
        addressLine:
          type: array
          items:
            type: string
          description: |-
            Not applicable to Wallet Payments. Free form text address lines Up
            to 4 lines.


            Maximum number of characters allowed per instrument/market :-

            UK FPS - 4 lines, 140 characters including spaces 
            SEPA Instant - 2 lines, 70 characters each including spaces 
            Brazil RTP - 7 lines, 70 characters
    accountType:
      type: string
      description: |-
        Mandatory for SEPA Instant - Use IBAN
        Mandatory for Blockchain Payments - DDA, BDA (Blockchain Deposit Account)
        Field not applicable to Alternate Payments (Wallet, Cards)
      enum:
        - DDA
        - VAM
        - IBAN
        - BDA
    accountCcy:
      type: string
      description: |-
        Originator account currency. Field not applicable to Alternate Payments (Wallet, Cards)
        UK FPS - GBP only
        SEPA Instant - EUR only 
    acct_identification:
      type: string
      description: |-

        Maximum length supported for each instrument and market :-
        SEPA Instant - 8 (numeric only)

        US RTP - 9 (Routing and Transit Number -> alphabetic characters may be present)

        Brazil RTP - 8 
    countryOfResidence:
      type: string
      description: 2 character ISO country code of residence. Mandatory for Interac payments
      maxLength: 2
    paymentInitiationResponse:
      type: object
      properties:
        paymentInitiationResponse:
          type: object
          properties:
            endToEndId:
              $ref: '#/components/schemas/endToEndId'
            firmRootId:
              $ref: '#/components/schemas/firmRootId'
    endToEndId:
      type: string
    firmRootId:
      type: string
    ErrorsInit:
      type: object
      properties:
        endToEndId:
          type: string
        errorDetails:
          type: array
          items:
            $ref: '#/components/schemas/errorDetails'
    errorDetails:
      type: object
      properties:
        errorCode:
          type: string
        errorDescription:
          type: string
        ruleDefinition:
          type: string
    error:
      type: object
      properties:
        errorCode:
          type: string
        errorDescription:
          type: string
    Errors:
      type: object
      properties:
        errorDetails:
          type: array
          items:
            $ref: '#/components/schemas/error'
    debtorFinancialInstitutionId:
      type: object
      description: Financial institution identifier of debtor
      properties:
        bic:
          type: string
          description: |-
            Not applicable for US RTP 

            Mandatory RTP markets:-
            UK
            India
            Singapore
            Australia
            Malaysia
            Hong Kong
            SEPA Instant
            Brazil
            Mexico
            Alternate Payments:-
            Push To Card - US/Canada
            Interac - Canada

            ACH:- 
            Chile

            Mandatory Blockchain (Coin) Payment markets:-
            US
            SEPA
          enum:
            - CHASGB2L
            - CHASINBX
            - CHASAU2X
            - CHASSGSG
            - CHASUS33
            - CHASMYKX
            - CHASHKHH
            - CHASBRSP
            - CHASDEFX
            - CHASLULX
            - CHASNL2X
            - CHASIE4L
            - CHASMXMX
            - CHASCATT
            - CHASIDJX
            - CHASUS33MCY
            - CHASDEFXONX
            - CHASCLRM
        clearingSystemId:
          type: object
          description: |-
            Not applicable to UK, India, Singapore, Australia, Mexico Faster Payments.
            Mandatory for US RTP
          properties:
            id:
              $ref: '#/components/schemas/acct_identification'
            idType:
              $ref: '#/components/schemas/idType'
    creditorFinancialInstitutionId:
      type: object
      description: |-
        Financial institution identifier of creditor

        **For Mexico RTP use either bic or clearing system id for a bank transfer use case. Length supported 8 or 11
      properties:
        bic:
          type: string
          description: |-
            SWIFT BIC. Applicable and Mandatory for RTP markets :-
            Singapore
            Malaysia

            Optional markets :-
            SEPA Instant
            Mexico

            Mandatory for Blockchain(Coin) Payments:-
            US - CHASUS33
            SEPA - CHASDEFX
          maxLength: 12
        clearingSystemId:
          type: object
          description: |-
            Clearing system identifier. Applicable and Mandatory for Faster/Real-time payment markets :-
            UK
            Australia
            India
            Hong Kong
            US
            Brazil

            ACH :- 
            Chile
          properties:
            id:
              $ref: '#/components/schemas/acct_identification'
            branchNumber:
              type: string
              description: Branch of the bank. Applicable and Mandatory for Brazil PIX only
            idType:
              $ref: '#/components/schemas/idType'
          required:
            - id
    idType:
      type: string
      description: |-
        Creditor Agent -
        Applicable and optional for Low value ACH payments (Chile).
        Applicable and mandatory for US RTP - USABA

        Debtor Agent -
        Applicable and mandatory for US RTP - USABA
    accountId:
      type: string
      description: |-
        Applicable and mandatory for RTP and Blockchain (Coin) Payments only

        This field is to provide the regular account id when it is a pay by
        Account instruction. if pay by proxy this does not need to be filled.


        Maximum length supported for each instrument and market :-

        | Payment Type | Market | Max Length |
        | --- | --- | --- |
        | RTP | UK | 8 (7 digit A/C numbers should be padded with a leading zero) |
        | RTP | Singapore | 35 |
        | RTP | Australia | 35 |
        | RTP | Hong Kong | 35 |
        | RTP | Indonesia | 35 |
        | RTP | Brazil | 34 |
        | RTP | Mexico | 16 |
        | RTP | US | 31 |
        | Push To Card | US/Canada | 16 |
        | INTERAC | Canada | 35 |
        | ACH | Chile | 34 |
        | SEPA |  | 34 (IBAN) |
        | COIN |  | 34 |
    alternateAccountIdentifier:
      type: string
      description: |-
        Alternate Account Identifier eg. email, program id, card number.

        Mandatory for Push To Card :-
        Use program id while specifying the debtor details
        Use card number while specifying the creditor details
    debtorAgent:
      type: object
      description: ''
      properties:
        financialInstitutionId:
          $ref: '#/components/schemas/debtorFinancialInstitutionId'
        additionalInstitutions:
          type: array
          description: |-

            Only applicable to UK Faster Payments. Instructing agent of the ultimate debtor. 
          items:
            $ref: '#/components/schemas/additionalInstitution'
      required:
        - financialInstitutionId
    additionalInstitution:
      type: object
      description: Only applicable to UK Faster Payments and Mexico RTP (foreign remittances)
      properties:
        bic:
          type: string
        name:
          type: string
        isForeignParty:
          type: boolean
        postalAddress:
          $ref: '#/components/schemas/postalAddress'
    creditor:
      type: object
      properties:
        creditorAccount:
          $ref: '#/components/schemas/creditorAccount'
        creditorName:
          type: string
          description: |-
            Mandatory for RTP Markets :- 

            UK FPS 

            SEPA Instant

            US RTP

            Singapore, Australia, Mexico, Hong Kong, Brazil Faster Payments - mandatory for Pay to Account transactions.

            Mandatory For Alternate Payments :- 
            Push To Card - US, Canada

            Mandatory for ACH Payments :-
            Chile

            Maximum length supported per instrument/market :-

            UK FPS:      40  
            SEPA Instant: 140
            Singapore FPS:     140   
            Austrailia FPS:     140   
            Hong Kong FPS:     140   
            Indonesia IMPS:    140   
            Push To Card US &amp; Canada: 30   
            Mexico SPIE:    40
            ACH Chile: 70
        postalAddress:
          $ref: '#/components/schemas/postalAddress'
        dateAndPlaceOfBirth:
          $ref: '#/components/schemas/dateAndPlaceOfBirth'
        countryOfResidence:
          $ref: '#/components/schemas/countryOfResidence'
        ultimateCreditor:
          $ref: '#/components/schemas/ultimateCreditor'
        additionalCreditors:
          type: array
          items:
            $ref: '#/components/schemas/additionalCreditor'
      required:
        - creditorName
        - creditorAccount
    creditorAccount:
      allOf:
        - $ref: '#/components/schemas/accountIdWrapper'
        - type: object
          properties:
            accountType:
              type: string
              enum:
                - VENMO
                - PAYPAL
                - INTERAC
                - CARD
                - DDA
                - LOAN
                - ODFT
                - NREX
                - OTHER
                - CACC
                - SVGS
                - TRAN
                - CLABE
                - VOSTRO
                - IBAN
                - BBAN
                - DFLT
                - SLRY
                - BDA
                - ZELLE
              description: |-
                Mandatory for :
                  1. Card Payments
                  2. Venmo/Paypal wallets
                  3. Interac 
                  4. India IMPS
                  6. Malaysia RTP 
                  8. Brazil RTP (Pay to account only)
                  9. Blockchain Payments 
                  

                Not supported for United States RTP
                  
                India IMPS - 

                LOAN - Loan account
                ODFT - Overdraft
                NREX - NonResidentExternal
                OTHER - For Book and cross branch with VRN accounts
                CACC - Cash Credit/Current account
                DDA - DDA account
                SVGS - Savings account

                SEPA Instant - 
                IBAN

                Hong Kong RTP -
                BBAN

                Malaysia RTP - 
                LOAN
                DFLT
                SVGS
                CACC

                Brazil RTP - 
                CACC
                SLRY
                TRAN
                SVGS

                Mexico RTP - 
                CLABE
                VOSTRO
                DDA

                Alternate Payments - 

                VENMO - Push to wallet
                PAYPAL - Push to wallet
                INTERAC - Interac canada payments
                CARD - Push to card payments
                ZELLE - Zelle Payments



                Blockchain Payments - 
                DDA
                BDA - Blockchain Deposit Account
            schemeName:
              type: object
              description: |-
                Mandatory for pay by proxy -
                RTP :- Singapore, Australia, Hong Kong, Malaysia, Brazil, Mexico
                Alternate Payments :- Push To Wallet
              properties:
                proprietary:
                  type: string
                  enum:
                    - MSIDN
                    - NRIC
                    - UEN
                    - VPA
                    - EMAL
                    - ORGN
                    - TELI
                    - AUBN
                    - PSPT
                    - BREG
                    - MBNO
                    - ARMN
                    - MOBN
                    - SVID
                    - CPF
                    - CNPJ
                    - EVP
                    - QRCD
                    - ACCN
                    - ALIS
                  description: |-
                    Specifies the type of Proxy account. Mandatory if creditorAccount.alternateAccountIdentifier is present
                    Proprietary types applicable per market and instrument:

                    RTP - Singapore :-
                    MSIDN - Mobile number 
                    UEN - Unique Entity Number
                    VPA - Virtual Payment Address
                    NRIC - IC number 

                    RTP - Australia :-
                    EMAL - Email Address
                    TELI - Telephone Number
                    AUBN - Australia Business number
                    ORGN - Organization Id

                    RTP - Malaysia :-
                    MBNO - Mobile number
                    NRIC - IC number 
                    PSPT - Passport number 
                    ARMN - Army or Police Number 
                    BREG - Business registration number

                    RTP - Hong Kong :-
                    EMAL - Email Address
                    MOBN - Mobile Number (or fixed-line number)
                    SVID - FPS Identifier

                    RTP - Brazil :-
                    CPF - Tax ID of Individual
                    CNPJ - Tax ID of Corporate
                    EVP - Random Key
                    QRCD - QR Code
                    EMAL - Email id 
                    MOBN - Mobile number 

                    RTP - Mexico :-
                    MOBN - Mobile number
                    BANK - Transfer to a Bank identifier 
                    CARD - Transfer to a debit card number

                    RTP - Indonesia :-
                    MOBN - Mobile number
                    EMAL - Email id 
                    CARD - Transfer to a debit card number   
                    ALIS - eMoney transfer

                    Alternate Payments - Wallet (For Zelle only EMAL and TELI are applicable) :-
                    EMAL - Email Address 
                    TELI - Telephone Number
                    ACCN - Alternate account number
                    ALIS - Alias identification
            cardExpiryDate:
              type: string
              description: Mandatory for Push to Card. Acceptable format - YYMM
    additionalCreditor:
      type: object
      properties:
        name:
          type: string
    accountIdWrapper:
      oneOf:
        - type: object
          title: Account ID
          required:
            - accountId
          properties:
            accountId:
              $ref: '#/components/schemas/accountId'
        - type: object
          title: Alternate ID
          required:
            - alternateAccountIdentifier
          properties:
            alternateAccountIdentifier:
              $ref: '#/components/schemas/alternateAccountIdentifier'
    creditorAgent:
      type: object
      description: |-
        Not applicable for Push To Card, Push To Wallet and Interac
        Mandatory for pay by account and optional for pay by proxy.
        Mandatory for Mexico RTP if the creditor is a bank 
      properties:
        financialInstitutionId:
          $ref: '#/components/schemas/creditorFinancialInstitutionId'
        additionalInstitutions:
          type: array
          description: |-

            Only applicable to UK Faster Payments. Instructing agent of the ultimate debtor. 
          items:
            $ref: '#/components/schemas/additionalInstitution'
      required:
        - financialInstitutionId
    debtor:
      type: object
      properties:
        debtorAccount:
          $ref: '#/components/schemas/debtorAccount'
        debtorName:
          type: string
          description: |-
            Mandatory and Supported for :-

            ACH Chile
            Push To Card
            US RTP
            US FedNow
            SARIE IPS
            INTERAC
            Push To Wallet
            Maximum length supported per instrument/market :-

            US RTP: 140
            Push To Card US &amp; Canada: 30   
            ACH Chile - 140
        debtorDevice:
          $ref: '#/components/schemas/debtorDevice'
        ultimateDebtor:
          $ref: '#/components/schemas/ultimateDebtor'
      required:
        - debtorAccount
    debtorAccount:
      allOf:
        - $ref: '#/components/schemas/accountIdWrapper'
        - type: object
          description: account details of the debtor party
          properties:
            accountType:
              $ref: '#/components/schemas/accountType'
            accountCurrency:
              $ref: '#/components/schemas/accountCcy'
    paymentIdentifiers:
      type: object
      description: Payment Id
      required:
        - endToEndId
      properties:
        endToEndId:
          type: string
          description: |-
            Customer assigned reference to the transaction.
            Maximum length supported for each instrument and market :-

            |Payment Type| Market       | Max Length |Format
            |------------|--------------|------------|-------------
            | RTP        | UK           | 31         |letters and numbers only
            | RTP        | Singapore    | 35         |letters and numbers only
            | RTP        | Australia    | 35         |letters and numbers only
            | RTP        | Hong Kong    | 35         |letters and numbers only
            | RTP        | Indonesia    | 35         |letters and numbers only
            | RTP        | Brazil       | 34         |letters and numbers only
            | RTP        | Mexico       | 16         |letters and numbers only
            | RTP        | US           | 31         |letters and numbers only
            | RTP        | SEPA          | 35         |letters and numbers only
            | Push To Card| US/Canada    | 16         |letters and numbers only
            | ACH        | Chile        | 35         |
            | BLOCKCHAIN  | JPM COIN markets  | 16         |letters and numbers only
        otherPaymentReferences:
          type: object
          description: |-
            The object becomes MANDATORY for below instrument &amp; market when
            transferType = 'DEBIT' :-  Maximum length supported for each
            instrument and market :-     
            Singapore RTP - 35 (letters and numbers only)
            Austrailia RTP - 35 (letters and numbers only)
          properties:
            paymentReferenceValue:
              type: string
              description: Mandate id to be provided for Singapore direct debits
    ultimateDebtor:
      allOf:
        - $ref: '#/components/schemas/partyIdWrapper'
        - type: object
          description: The ultimate party whose account is being debited or charged for
          properties:
            ultimateDebtorName:
              type: string
              maxLength: 140
              description: |-
                Mandatory for US RTP
                Maximum length supported :-
                Push To Card  - 25
            dateAndPlaceOfBirth:
              $ref: '#/components/schemas/dateAndPlaceOfBirth'
            countryOfResidence:
              $ref: '#/components/schemas/countryOfResidence'
            postalAddress:
              $ref: '#/components/schemas/postalAddress'
            additionalIdentifiers:
              type: array
              items:
                $ref: '#/components/schemas/additionalIdentifier'
    ultimateCreditor:
      allOf:
        - $ref: '#/components/schemas/partyIdWrapper'
        - type: object
          description: ultimate creditor party details
          properties:
            ultimateCreditorName:
              type: string
              maxLength: 140
              description: Mandatory for US RTP &amp; US FedNow
            dateAndPlaceOfBirth:
              $ref: '#/components/schemas/dateAndPlaceOfBirth'
            countryOfResidence:
              $ref: '#/components/schemas/countryOfResidence'
            postalAddress:
              $ref: '#/components/schemas/postalAddress'
    partyIdWrapper:
      oneOf:
        - type: object
          title: Organization ID
          required:
            - organizationId
          properties:
            organizationId:
              $ref: '#/components/schemas/organizationId'
        - type: object
          title: Individual ID
          required:
            - individualId
          properties:
            individualId:
              $ref: '#/components/schemas/individualId'
    purpose:
      type: object
      description: |-
        This field is mandatory for Singapore Faster Payments. Underlying reason for the payment transaction, eg., a charity payment, or  a commercial agreement between the creditor and the debtor. 
        Not applicable for :-
         UK FPS
         Push To Card
      properties:
        code:
          $ref: '#/components/schemas/cd'
        type:
          type: string
          enum:
            - CODE
            - PROPRIETARY
    categoryPurpose:
      type: object
      description: |-
        Mandatory RTP markets :-

        Hong Kong - Mandatory
      properties:
        code:
          type: string
          enum:
            - SALA
            - PENS
            - TAXS
            - SUPP
          description: 'Not applicable for Hong Kong '
        proprietary:
          type: string
          enum:
            - CXSALA
            - CXBSNS
            - CXMRCH
            - CXTOPU
            - WEALTH_TRANSFER
            - INVESTMENT
            - PURCHASE
            - OTHER
          description: |-
            Coded form
            Hong Kong RTP
            For credit transfers -
            "CXSALA" - Salary and Benefits Payment
            "CXBSNS" - General Business Payment
            "CXMRCH" - FPS Merchant Payment
            "CXTOPU" - Account Top-up Payment

            Indonesia RTP 
            WEALTH_TRANSFER
            INVESTMENT
            PURCHASE
            OTHER
            CXSALA
    remittanceInformation:
      type: object
      description: 'Mandatory for Malaysia Faster Payments, optional for other markets'
      properties:
        unstructuredInformation:
          type: array
          description: |-
            Maximum number of lines and characters supported per
            market/instrument :-

            UK FPS      - 1 line, 140 characters   
            Singapore RTP     - 1 line, 140 characters   
            Australia RTP     - 2 lines, 140 characters  
            Hong Kong RTP     - 1 line, 140 characters   
            SEPA Instant - 1 line, 140 characters
            India IMPS    - 1 line, 140 characters   
            Brazil RTP     - 1 line, 140 characters   
            Mexico RTP    - 210 characters   
            Indonesia RTP - 1 line, 140 characters
            US RTP - 1 line, 140 charaters
            Push To Card US &amp; Canada - 1 line, 16 characters (Numbers, alphabets, SPACE and special chars  -./,$@&amp; allowed)   
            Blockchain (Coin) Payments - 1 line, 140 characters
          items:
            type: string
        structuredInformation:
          type: array
          description: |-
            Applicable Faster Payment Markets -
            Malaysia
            US
          items:
            $ref: '#/components/schemas/structuredInformation'
        foreignCurrency:
          type: string
          description: Only applicable for Mexico Faster Payments
        fx:
          $ref: '#/components/schemas/FxApplied'
    structuredInformation:
      type: object
      properties:
        creditReference:
          type: string
          description: Unique reference to unambiguously refer to the payment transaction.
          maxLength: 140
        additionalRemittanceInformation:
          type: string
          description: |-
            Applicable Faster Payment Markets -

            Malaysia
            Max length supported - 250 characters

            US - mandatory if structuredInformation object is used      
    debtorDevice:
      type: object
      description: Applicable and mandatory for Malaysia Faster Payments
      properties:
        ipAddress:
          type: string
    organizationId:
      type: object
      required:
        - id
      description: |-

        Can be used when the underlying payer is a Legal Entity. It should be used together with Ultimate Debtor Name and address, and it should contain the payment account number of the underlying payer. In case the transfer has not been initiated from a payment account, the value populated should be a unique transaction identifier of the underlying payer which permits the traceability of the transaction back to them.

        Applicable markets and rules 

        Can be used for ultimateDebtor and ultimateCreditor for the following

        RTP markets :-
          
        SEPA 

        Mexico 

        UK

        US

          ***Australia Faster Payments - Only to be used for ultimateCreditor.
          For Australia Faster Payments, only id and schemeName.proprietary fields
          are applicable
          
          
        ACH markets :- 
        Chile
      properties:
        id:
          type: string
          description: 'For AU Superannuation payment (category payment), populate with USI number for the Superannuation fund'
        bic:
          type: string
        issuer:
          type: string
        schemeName:
          description: type of scheme
          type: object
          minProperties: 1
          maxProperties: 1
          properties:
            code:
              $ref: '#/components/schemas/code'
            proprietary:
              $ref: '#/components/schemas/proprietary'
    code:
      type: string
    proprietary:
      type: string
      description: 'For AU Superannuation payment (category payment), populate "USI"'
    individualId:
      type: object
      description: |-

        Can be used if organization ID is not populated, when the underlying payer is an Individual. It should be used together with Ultimate Debtor Name and address, and it should contain the payment account number of the underlying payer. In case the transfer has not been initiated from a payment account, the value populated should be a unique transaction identifier of the underlying payer which permits the traceability of the transaction back to them

        applicable RTP markets :-
        SEPA 

        Mexico 

        UK

        US

        ACH markets :- 
        Chile
      properties:
        id:
          type: string
        issuer:
          type: string
        schemeName:
          description: type of scheme
          type: object
          minProperties: 1
          maxProperties: 1
          properties:
            code:
              $ref: '#/components/schemas/code'
            proprietary:
              $ref: '#/components/schemas/proprietary'
      required:
        - id
    additionalIdentifier:
      type: object
      properties:
        id:
          type: string
        idType:
          type: string
          enum:
            - ORGANIZATION
            - INDIVIDUAL
        issuer:
          type: string
        schemeName:
          description: type of scheme
          type: object
          minProperties: 1
          maxProperties: 1
          properties:
            code:
              $ref: '#/components/schemas/code'
            proprietary:
              $ref: '#/components/schemas/proprietary'
      required:
        - idType
        - id
    PaymentDetailsResponse:
      type: object
      properties:
        payments:
          $ref: '#/components/schemas/payments'
        paymentStatus:
          $ref: '#/components/schemas/paymentStatus'
        firmRootId:
          $ref: '#/components/schemas/firmRootId'
    Decimal:
      description: A String representation of a (potentially) decimal positive number.
      type: string
      minLength: 1
      maxLength: 40
      pattern: ^\d+(\.\d+)?$
  examples:
    PaymentInitiationUKFPS:
      summary: Initiate a UK faster payment
      value:
        payments:
          possibleDuplicateMessage: false
          paymentIdentifiers:
            endToEndId: AD202109311354152
          requestedExecutionDate: '2023-04-22T00:00:00.000Z'
          transferType: CREDIT
          paymentCurrency: GBP
          paymentAmount: 650
          paymentType: RTP
          debtor:
            debtorAccount:
              accountId: '12311871'
              accountCurrency: GBP
              accountType: DDA
            ultimateDebtor:
              ultimateDebtorName: Wayne Thompson
              postalAddress:
                addressType: ADDR
                streetName: Lennon Road
                buildingNumber: '22'
                townName: Liverpool
                country: GB
              countryOfResidence: GB
              organizationId:
                bic: CHASGB2L
                id: '40025916'
          debtorAgent:
            financialInstitutionId:
              bic: CHASGB2L
          creditorAgent:
            financialInstitutionId:
              clearingSystemId:
                id: '185008'
          creditor:
            creditorName: David Burn
            postalAddress:
              addressType: ADDR
              streetName: Fratton Park
              buildingNumber: '411'
              postalCode: PO48RA
              townName: Portsmouth
              country: GB
              countrySubDvsn: Hampshire
            countryOfResidence: GB
            creditorAccount:
              accountId: '87654321'
            ultimateCreditor:
              ultimateCreditorName: Clint Hall
              individualId:
                id: '87654321'
              postalAddress:
                addressType: ADDR
                streetName: Fratton Park
                buildingNumber: '411'
                postalCode: PO48RA
                townName: Portsmouth
                country: GB
                countrySubDvsn: Hampshire
          purpose:
            code: GDDS
            type: CODE
          remittanceInformation:
            unstructuredInformation:
              - 'Payment for Macbook batteries Receipt #AXF23-LGG'
    PaymentInitiationSingaporeRTP:
      summary: Initiate a Singapore faster payment
      value:
        payments:
          possibleDuplicateMessage: false
          paymentIdentifiers:
            endToEndId: 112021092023FG35T4152
          requestedExecutionDate: '2023-08-03T00:00:00.000Z'
          transferType: CREDIT
          paymentType: RTP
          paymentCurrency: SGD
          paymentAmount: 10.01
          debtor:
            debtorAccount:
              accountId: '888000000'
              accountCurrency: SGD
              accountType: DDA
          debtorAgent:
            financialInstitutionId:
              bic: CHASSGSG
          creditorAgent:
            financialInstitutionId:
              bic: OCBCSGSG
          creditor:
            creditorName: Chad Gasly
            postalAddress:
              addressType: ADDR
              streetName: Adam Drive
              buildingNumber: '23'
              postalCode: '289963'
              townName: Singapore
              country: SG
            dateAndPlaceOfBirth:
              birthDate: '1991-05-02T00:00:00.000Z'
              cityOfBirth: Singapore
              countryOfBirth: SG
            countryOfResidence: SG
            creditorAccount:
              accountId: '999000000'
          purpose:
            code: GDDS
            type: CODE
          remittanceInformation:
            unstructuredInformation:
              - 'Payment for Furniture. Invoice #93100AC'
    PaymentInitiationAustraliaFPS:
      summary: Initiate an Australia faster payment
      value:
        payments:
          paymentIdentifiers:
            endToEndId: XR202109202311354152
          requestedExecutionDate: '2022-06-02T00:00:00.000Z'
          transferType: CREDIT
          paymentType: RTP
          paymentCurrency: AUD
          paymentAmount: 3000
          debtor:
            debtorAccount:
              accountId: '711000000'
              accountCurrency: AUD
              accountType: DDA
          debtorAgent:
            financialInstitutionId:
              bic: CHASAU2X
          creditorAgent:
            financialInstitutionId:
              bic: BOFAAUSX
          creditor:
            creditorName: Chris Cairns
            postalAddress:
              addressType: ADDR
              streetName: Spencer Street
              buildingNumber: '11'
              postalCode: '3003'
              townName: Melbourne
              country: AU
            dateAndPlaceOfBirth:
              birthDate: '1998-05-21T00:00:00.000Z'
              cityOfBirth: Melbourne
              countryOfBirth: AU
            countryOfResidence: AU
            creditorAccount:
              accountId: '111000000'
            ultimateCreditor:
              ultimateCreditorName: Claudia Mitchelle
              postalAddress:
                addressType: ADDR
                streetName: Kings Street
                buildingNumber: '664'
                postalCode: '3901'
                townName: Melbourne
                country: AU
              dateAndPlaceOfBirth:
                birthDate: '1999-04-01T00:00:00.000Z'
                cityOfBirth: Melbourne
                countryOfBirth: AU
              countryOfResidence: AU
              organizationId:
                id: '111940881'
                schemeName:
                  proprietary: USI
          purpose:
            code: GDDS
            type: CODE
          remittanceInformation:
            unstructuredInformation:
              - Superannuation Payment receipt 1198RE2
    PaymentInitiationAustraliaFPS400Failure:
      summary: Initiate an Australia faster payment
      value:
        payments:
          paymentIdentifiers:
            endToEndId: XR20210920231135415222222222222222222222
          requestedExecutionDate: '2022-06-02T00:00:00.000Z'
          transferType: CREDIT
          paymentType: RTP
          paymentCurrency: AUD
          paymentAmount: 3000
          debtor:
            debtorAccount:
              accountId: '711000000'
              accountCurrency: AUD
              accountType: DDA
          debtorAgent:
            financialInstitutionId:
              bic: CHASAU2X
          creditorAgent:
            financialInstitutionId:
              bic: BOFAAUSX
          creditor:
            creditorName: Chris Cairns
            postalAddress:
              addressType: ADDR
              streetName: Spencer Street
              buildingNumber: '11'
              postalCode: '3003'
              townName: Melbourne
              country: AU
            dateAndPlaceOfBirth:
              birthDate: '1998-05-21T00:00:00.000Z'
              cityOfBirth: Melbourne
              countryOfBirth: AU
            countryOfResidence: AU
            creditorAccount:
              accountId: '111000000'
            ultimateCreditor:
              ultimateCreditorName: Claudia Mitchelle
              postalAddress:
                addressType: ADDR
                streetName: Kings Street
                buildingNumber: '664'
                postalCode: '3901'
                townName: Melbourne
                country: AU
              dateAndPlaceOfBirth:
                birthDate: '1999-04-01T00:00:00.000Z'
                cityOfBirth: Melbourne
                countryOfBirth: AU
              countryOfResidence: AU
              organizationId:
                id: '111940881'
                schemeName:
                  proprietary: USI
          purpose:
            code: GDDS
            type: CODE
          remittanceInformation:
            unstructuredInformation:
              - Superannuation Payment receipt 1198RE2
    PaymentInitiationHongKongFPS:
      summary: Payout to a Hong Kong beneficiary
      value:
        payments:
          paymentIdentifiers:
            endToEndId: WQ20G1096231V13C552
          requestedExecutionDate: '2023-05-15T00:00:00.000Z'
          transferType: CREDIT
          paymentType: RTP
          paymentCurrency: HKD
          paymentAmount: 750
          debtor:
            debtorAccount:
              accountId: '6700000001'
              accountCurrency: HKD
          debtorAgent:
            financialInstitutionId:
              bic: CHASHKHH
          creditorAgent:
            financialInstitutionId:
              clearingSystemId:
                id: '004'
          creditor:
            creditorName: Public Inc.
            postalAddress:
              addressType: ADDR
              streetName: Connaught Road
              buildingNumber: '02, 2/F'
              postalCode: '999077'
              townName: Wan Chai
              country: HK
              countrySubDvsn: Wan Chai
            dateAndPlaceOfBirth:
              birthDate: '1980-10-20T00:00:00.000Z'
              cityOfBirth: Hong Kong
              countryOfBirth: HK
            creditorAccount:
              accountId: '1232261890'
              accountType: BBAN
          categoryPurpose:
            proprietary: CXBSNS
          remittanceInformation:
            unstructuredInformation:
              - Invoice number 11. Paid by HK Ltd B/O HK Sub Ltd. Pay to Public Inc for John Smith
    PaymentInitiationMalaysiaFPS:
      summary: Initiate a Malaysia faster payment
      value:
        payments:
          paymentIdentifiers:
            endToEndId: A12Y092G0231T1354BB2
          requestedExecutionDate: '2023-02-06T00:00:00.000Z'
          transferType: CREDIT
          paymentType: RTP
          paymentCurrency: MYR
          paymentAmount: 1500
          debtor:
            debtorDevice:
              ipAddress: 123.45.67.890
            debtorAccount:
              accountId: '0987654321'
          debtorAgent:
            financialInstitutionId:
              bic: CHASMYKX
          creditorAgent:
            financialInstitutionId:
              bic: CITIMYKL
          creditor:
            creditorName: Rajan Lee
            countryOfResidence: MY
            creditorAccount:
              accountId: '987654321'
              accountType: SVGS
          purpose:
            code: '17080'
            type: PROPRIETARY
          remittanceInformation:
            structuredInformation:
              - creditReference: 1252ACV-096
    PaymentInitiationSEPAInstant:
      summary: Initiate a SEPA Instant payment
      value:
        payments:
          paymentIdentifiers:
            endToEndId: 20SP21I092S02T31T152
          requestedExecutionDate: '2023-02-06T00:00:00.000Z'
          transferType: CREDIT
          paymentType: RTP
          paymentCurrency: EUR
          paymentAmount: 4550
          debtor:
            debtorAccount:
              accountId: DE40501108006169009120
              accountCurrency: EUR
            ultimateDebtor:
              ultimateDebtorName: Donatella Kimmich
              postalAddress:
                addressType: ADDR
                country: DE
                addressLine:
                  - Platz Des 4
                  - 14167 Berlin
              organizationId:
                bic: CHASDEFX
                id: DE88501108006231400596
                schemeName:
                  code: IBAN
                issuer: Deutsche Bundesbank
              dateAndPlaceOfBirth:
                birthDate: '2000-10-07T00:00:00.000Z'
                cityOfBirth: Hamburg
                countryOfBirth: DE
          debtorAgent:
            financialInstitutionId:
              bic: CHASDEFX
          creditorAgent:
            financialInstitutionId:
              bic: CHASDEFX
          creditor:
            creditorName: Joshua Klose
            countryOfResidence: DE
            postalAddress:
              addressType: ADDR
              country: DE
              addressLine:
                - Hansastr 39
                - 81373 Munich
            dateAndPlaceOfBirth:
              birthDate: '1989-12-01T00:00:00.000Z'
              cityOfBirth: Munich
              countryOfBirth: DE
            creditorAccount:
              accountId: DE39501108006169009138
              accountType: IBAN
          purpose:
            code: '113'
            type: PROPRIETARY
          remittanceInformation:
            unstructuredInformation:
              - Payment for equipment supply
    PaymentInitiationBrazilPIXRTP:
      summary: Initiate a Brazilian Real Time Payment
      value:
        payments:
          paymentIdentifiers:
            endToEndId: d2c0210920B23R14152
          requestedExecutionDate: '2023-02-07T00:00:00.000Z'
          transferType: CREDIT
          paymentType: RTP
          paymentCurrency: BRL
          paymentAmount: 9540
          debtor:
            debtorAccount:
              accountId: '1000304'
          debtorAgent:
            financialInstitutionId:
              bic: CHASBRSP
          creditorAgent:
            financialInstitutionId:
              clearingSystemId:
                id: '33172537'
                branchNumber: '1'
          creditor:
            creditorName: Alison Becker
            creditorAccount:
              accountId: '0012902678'
              accountType: CACC
          taxInformation:
            creditorTaxInformation:
              taxId: '00044967012'
              taxpayerCategory: INDIVIDUAL
    PaymentInitiationUSRTP:
      summary: Initiate a US RTP Payment
      value:
        payments:
          paymentIdentifiers:
            endToEndId: pl210g9t231r13541130
          requestedExecutionDate: '2022-10-15T00:00:00.000Z'
          transferType: CREDIT
          paymentType: RTP
          paymentCurrency: USD
          paymentAmount: 500
          debtor:
            debtorName: Paula Smitty
            debtorAccount:
              accountId: '000009102574986'
              accountType: DDA
            ultimateDebtor:
              ultimateDebtorName: Christian Jones
              postalAddress:
                addressType: ADDR
                streetName: Hancock Ave
                buildingNumber: '121'
                postalCode: '07302'
                townName: Jersey City
                country: US
                countrySubDvsn: Hudson
              dateAndPlaceOfBirth:
                birthDate: '1984-01-01T00:00:00.000Z'
                cityOfBirth: Hull city
                countryOfBirth: BR
              individualId:
                id: '001'
          debtorAgent:
            financialInstitutionId:
              clearingSystemId:
                id: '021000021'
                idType: USABA
          creditorAgent:
            financialInstitutionId:
              clearingSystemId:
                id: '071000013'
                idType: USABA
          creditor:
            creditorName: Clint Davos
            postalAddress:
              addressType: ADDR
              streetName: Cow Hollow
              buildingNumber: '65'
              postalCode: '05483'
              townName: San Francisco
              country: US
              countrySubDvsn: SFO
            dateAndPlaceOfBirth:
              birthDate: '2001-01-12T00:00:00.000Z'
              cityOfBirth: London
              countryOfBirth: UK
            creditorAccount:
              accountId: '000000034257284'
            ultimateCreditor:
              ultimateCreditorName: Max Payne
              postalAddress:
                addressType: ADDR
                streetName: Flint Ave
                buildingNumber: '89'
                postalCode: '88793'
                townName: Los Angeles
                country: US
                countrySubDvsn: LAX
              dateAndPlaceOfBirth:
                birthDate: '1999-04-01T00:00:00.000Z'
                cityOfBirth: Rio
                countryOfBirth: BR
              organizationId:
                id: '003'
          remittanceInformation:
            unstructuredInformation:
              - Payment for rustic vintage furniture
    PaymentInitiationMexicoSPIE:
      summary: Initiate a Mexico SPIE Payment
      value:
        payments:
          paymentIdentifiers:
            endToEndId: mr202120b231h135
          requestedExecutionDate: '2022-06-30T00:00:00.000Z'
          transferType: CREDIT
          paymentType: RTP
          paymentCurrency: MXN
          paymentAmount: 175
          debtor:
            debtorAccount:
              accountId: '0022628001'
              accountCurrency: MXN
              accountType: DDA
            ultimateDebtor:
              ultimateDebtorName: Enzo Hernandez
              postalAddress:
                addressType: ADDR
                country: MX
                addressLine:
                  - Papua Lane
                  - Kew Park
              individualId:
                id: '002'
                issuer: Elicia Carvalho
              additionalIdentifiers:
                - id: '1234'
                  idType: INDIVIDUAL
            dateAndPlaceOfBirth:
              birthDate: '1995-02-10T00:00:00.000Z'
              cityOfBirth: Luxembourg
              countryOfBirth: LU
          debtorAgent:
            financialInstitutionId:
              bic: CHASMXMX
          creditorAgent:
            financialInstitutionId:
              bic: CHASMXMX
          creditor:
            creditorName: Chavo G
            countryOfResidence: MX
            postalAddress:
              addressType: ADDR
              country: MX
              addressLine:
                - Texmaco Street
                - Dinho River
            dateAndPlaceOfBirth:
              birthDate: '1983-03-01T00:00:00.000Z'
              cityOfBirth: Mexico City
              countryOfBirth: MX
            creditorAccount:
              accountId: '0077644395'
              accountType: DDA
            ultimateCreditor:
              individualId:
                id: '0077644395'
              ultimateCreditorName: Prince Gomez
              postalAddress:
                addressType: ADDR
                country: MX
                addressLine:
                  - Calicut Avenue
                  - Pacino Street
              dateAndPlaceOfBirth:
                birthDate: '1991-04-19T00:00:00.000Z'
                cityOfBirth: Mexico City
                countryOfBirth: MX
          remittanceInformation:
            unstructuredInformation:
              - Payment for Surfing equipment Invoice 113390C-FF2
    PaymentInitiationIndonesiaRTP:
      summary: Initiate an Indonesia Real-Time Payment
      value:
        payments:
          paymentIdentifiers:
            endToEndId: XR2021RE023WBG35
          requestedExecutionDate: '2023-06-11T00:00:00.000Z'
          transferType: CREDIT
          paymentType: RTP
          paymentCurrency: IDR
          paymentAmount: 6500
          categoryPurpose:
            proprietary: INVESTMENT
          debtor:
            debtorName: Blaise Dox
            debtorAccount:
              accountId: '6653331826'
          debtorAgent:
            financialInstitutionId:
              bic: CHASIDJX
          creditorAgent:
            financialInstitutionId:
              bic: BDINIDJA
          creditor:
            creditorName: Mary Sutantri
            creditorAccount:
              accountId: '003623339944'
          remittanceInformation:
            unstructuredInformation:
              - Rental Payment for June 2023
    PushToCardUSD:
      summary: Initiate a Push To Card payment
      value:
        payments:
          requestedExecutionDate: '2022-06-28T00:00:00.000Z'
          transferType: CREDIT
          paymentIdentifiers:
            endToEndId: 1lv0t92e023g11354100
          paymentCurrency: USD
          paymentAmount: 750
          debtor:
            debtorName: Colin Hanks
            debtorAccount:
              alternateAccountIdentifier: PRU01US
          debtorAgent:
            financialInstitutionId:
              bic: CHASUS33
          creditor:
            creditorName: Karl Eichorn
            creditorAccount:
              accountType: CARD
              alternateAccountIdentifier: '4137110019999999'
              cardExpiryDate: '2207'
          remittanceInformation:
            unstructuredInformation:
              - Credit note from Milestone Music Company NY
    ACHChile:
      summary: Initiate a Chile ACH payment
      value:
        payments:
          paymentIdentifiers:
            endToEndId: XR20210920CS1131416
          requestedExecutionDate: '2022-12-01T00:00:00.000Z'
          transferType: CREDIT
          paymentCurrency: CLP
          paymentAmount: 300.25
          debtor:
            debtorAccount:
              accountId: '2600023565'
              accountCurrency: CLP
            debtorName: Lucha Gonzalez
          debtorAgent:
            financialInstitutionId:
              bic: CHASCLRM
          creditorAgent:
            financialInstitutionId:
              bic: BCHICLRM
              clearingSystemId:
                id: '114740179'
                branchNumber: '0001'
          creditor:
            creditorName: Marina Simeone
            creditorAccount:
              accountId: '101000974'
              accountType: SVGS
            postalAddress:
              country: CL
          paymentType: ACH.TRF
          purpose:
            code: '0010130000'
            type: PROPRIETARY
          taxInformation:
            creditorTaxInformation:
              taxId: 06703922-K
              taxpayerCategory: INDIVIDUAL
    JPMCoin:
      summary: Initiate a JPM Coin payment
      value:
        payments:
          paymentIdentifiers:
            endToEndId: 202E092v021D35E4152
          requestedExecutionDate: '2033-06-10T00:00:00.000Z'
          paymentCurrency: USD
          paymentAmount: 6500
          transferType: CREDIT
          paymentType: BLOCKCHAIN
          debtor:
            debtorAccount:
              accountId: '8830699900'
              accountType: DDA
          debtorAgent:
            financialInstitutionId:
              bic: CHASSGSG
          creditorAgent:
            financialInstitutionId:
              bic: CHASUS33
          creditor:
            creditorName: Coin Hodler
            creditorAccount:
              accountId: '0070103277'
              accountType: BDA
          remittanceInformation:
            unstructuredInformation:
              - Payment for container shipment
    PaymentDetailsQueryByEndToEndId:
      summary: Payment Details Query Using End To End Id
      value:
        payments:
          paymentIdentifiers:
            endToEndId: 112021092023FG35T4152
          requestedExecutionDate: '2023-08-03T00:00:00.000Z'
          transferType: CREDIT
          paymentType: RTP
          paymentCurrency: SGD
          paymentAmount: 10.01
          debtor:
            debtorAccount:
              accountId: '888000000'
              accountCurrency: SGD
              accountType: DDA
          debtorAgent:
            financialInstitutionId:
              bic: CHASSGSG
          creditorAgent:
            financialInstitutionId:
              bic: OCBCSGSG
          creditor:
            creditorName: Chad Gasly
            postalAddress:
              addressType: ADDR
              streetName: Adam Drive
              buildingNumber: '23'
              postalCode: '289963'
              townName: Singapore
              country: SG
            dateAndPlaceOfBirth:
              birthDate: '1991-05-02T00:00:00.000Z'
              cityOfBirth: Singapore
              countryOfBirth: SG
            countryOfResidence: SG
            creditorAccount:
              accountId: '999000000'
          purpose:
            code: GDDS
            type: CODE
          remittanceInformation:
            unstructuredInformation:
              - 'Payment for Furniture. Invoice #93100AC'
        paymentStatus:
          createDateTime: '2023-08-03T08:15:01.000Z'
          status: COMPLETED
        firmRootId: xatv-12522a-cqvf-991
    PaymentDetailsAustraliaNPP:
      summary: Payment Details For Australia NPP
      value:
        payments:
          paymentIdentifiers:
            endToEndId: XR202109202311354152
          requestedExecutionDate: '2022-06-02T00:00:00.000Z'
          transferType: CREDIT
          paymentType: RTP
          paymentCurrency: AUD
          paymentAmount: 3000
          debtor:
            debtorAccount:
              accountId: '711000000'
              accountCurrency: AUD
              accountType: DDA
          debtorAgent:
            financialInstitutionId:
              bic: CHASAU2X
          creditorAgent:
            financialInstitutionId:
              bic: BOFAAUSX
          creditor:
            creditorName: Chris Cairns
            postalAddress:
              addressType: ADDR
              streetName: Spencer Street
              buildingNumber: '11'
              postalCode: '3003'
              townName: Melbourne
              country: AU
            dateAndPlaceOfBirth:
              birthDate: '1998-05-21T00:00:00.000Z'
              cityOfBirth: Melbourne
              countryOfBirth: AU
            countryOfResidence: AU
            creditorAccount:
              accountId: '111000000'
            ultimateCreditor:
              ultimateCreditorName: Claudia Mitchelle
              postalAddress:
                addressType: ADDR
                streetName: Kings Street
                buildingNumber: '664'
                postalCode: '3901'
                townName: Melbourne
                country: AU
              dateAndPlaceOfBirth:
                birthDate: '1999-04-01T00:00:00.000Z'
                cityOfBirth: Melbourne
                countryOfBirth: AU
              countryOfResidence: AU
              organizationId:
                id: '111940881'
                schemeName:
                  proprietary: USI
          purpose:
            code: GDDS
            type: CODE
          remittanceInformation:
            unstructuredInformation:
              - Superannuation Payment receipt 1198RE2
        paymentStatus:
          createDateTime: '2022-06-02T08:15:01.000Z'
          status: COMPLETED
        firmRootId: xatv-12522a-cqvf-991
    PaymentInitiationResponseAU:
      summary: Payment Initiation Response AU NPP
      value:
        paymentInitiationResponse:
          firmRootId: xatv-12522a-cqvf-991
          endToEndId: XR202109202311354152
    PaymentInitiationResponseAU400:
      summary: Payment Initiation Response AU NPP
      value:
        errors:
          endToEndId: XR20210920231135415222222222222222222222
          errorDetails:
            errorCode: '10001'
            errorDescription: Error occurred on '/paymentIdentifiers.endToEndId'
            ruleDefinition: Mandatory field is missing or invalid
    PaymentInitiationResponseDefault:
      summary: Payment Initiation Default Response
      value:
        paymentInitiationResponse:
          endToEndId: ALL0210920231136
          firmRootId: 596c0f34-7d7a-4f9b-b6f8-91704a63828a
    PaymentStatusPending:
      summary: Payment Status - PENDING
      value:
        paymentStatus:
          createDateTime: '2023-06-13T00:00:12.145Z'
          status: PENDING
    PaymentStatusCompleted:
      summary: Payment Status - COMPLETED
      value:
        paymentStatus:
          createDateTime: '2023-06-13T00:00:12.145Z'
          status: COMPLETED
    PaymentStatusAURequest:
      summary: Payment Status - Request using firm root id
      value:
        firmRootId: xatv-12522a-cqvf-991
    PaymentStatusAURequest400:
      summary: Payment Status - Request using firm root id
      value:
        firmRootId: ''
    PaymentStatusAUResponse400:
      summary: Payment Status - Request using firm root id
      value:
        errors:
          - errorDetails:
              - errorCode: GCA-095
                errorDescription: endToEndId or firmRootId is required
    PaymentDetailsAURequest:
      summary: Payment Status - Request using firm root id
      value:
        firmRootId: xatv-12522a-cqvf-991
    PaymentDetailsAURequest400:
      summary: Payment Status - Request using firm root id
      value:
        firmRootId: ''
    PaymentDetailsAUResponse400:
      summary: Payment Details - Request using firm root id
      value:
        errors:
          - errorDetails:
              - errorCode: GCA-095
                errorDescription: endToEndId or firmRootId is required
    PaymentStatusAUResponse:
      summary: Payment Status - PENDING
      value:
        paymentStatus:
          createDateTime: '2022-06-02T00:00:12.145Z'
          status: PENDING
    PaymentStatusRejected:
      summary: Payment Status - REJECTED
      value:
        paymentStatus:
          createDateTime: '2023-06-12T09:30:27.000Z'
          status: REJECTED
          exception:
            - errorCode: '10004'
              errorDescription: Error occurred on /requestedExecutionDate
              ruleDefinition: Date validation failure
    InvalidDataError:
      summary: Invalid Data Error
      value:
        errors:
          errorDetails:
            - errorCode: GCA-154
              errorDescription: Mandatory field paymentType is invalid or missing
    ClientIneligible:
      summary: Client is not eligible for the API Service
      value:
        errors:
          errorDetails:
            - errorCode: GCA-001
              errorDescription: Client is not eligible for the API Service
    ClientIneligibleError:
      summary: Client is not eligible for the API Service
      value:
        errors:
          - errorDetails:
              - errorCode: GCA-001
                errorDescription: Client is not eligible for the API Service
    SystemUnavailable:
      summary: System Unavailable
      value:
        errors:
          errorDetails:
            - errorCode: GCA-099
              errorDescription: System Unavailable
    SystemUnavailableError:
      summary: System Unavailable
      value:
        errors:
          - errorDetails:
              - errorCode: GCA-099
                errorDescription: System Unavailable
    MandatoryFieldMissing:
      summary: Mandatory field missing
      value:
        errors:
          errorDetails:
            - errorCode: GCA-148
              errorDescription: debtor Account id must be provided
    DebtorAccountNotFound:
      summary: Debtor Account ID not found
      value:
        errors:
          errorDetails:
            - errorCode: GCA-150
              errorDescription: debtor Account id/bic was not found
    PaymentDetailsSingaporeFAST:
      summary: Payment Details - Singapore FAST
      value:
        payments:
          paymentIdentifiers:
            endToEndId: 112021092023FG35T4152
          requestedExecutionDate: '2023-08-03T00:00:00.000Z'
          transferType: CREDIT
          paymentType: RTP
          paymentCurrency: SGD
          paymentAmount: 10.01
          debtor:
            debtorAccount:
              accountId: '888000000'
              accountCurrency: SGD
              accountType: DDA
          debtorAgent:
            financialInstitutionId:
              bic: CHASSGSG
          creditorAgent:
            financialInstitutionId:
              bic: OCBCSGSG
          creditor:
            creditorName: Chad Gasly
            postalAddress:
              addressType: ADDR
              streetName: Adam Drive
              buildingNumber: '23'
              postalCode: '289963'
              townName: Singapore
              country: SG
            dateAndPlaceOfBirth:
              birthDate: '1991-05-02T00:00:00.000Z'
              cityOfBirth: Singapore
              countryOfBirth: SG
            countryOfResidence: SG
            creditorAccount:
              accountId: '999000000'
          purpose:
            code: GDDS
            type: CODE
          remittanceInformation:
            unstructuredInformation:
              - 'Payment for Furniture. Invoice #93100AC'
        paymentStatus:
          createDateTime: '2023-08-03T08:15:01.000Z'
          status: COMPLETED
        firmRootId: xatv-12522a-cqvf-991
    PaymentDetailsBrazilPIX:
      summary: Payment Details - BRAZIL PIX
      value:
        paymentStatus:
          createDateTime: '2023-02-07T00:00:03.000Z'
          status: PENDING
        payments:
          paymentIdentifiers:
            endToEndId: d2c0210920B23R14152
          requestedExecutionDate: '2023-02-07T00:00:00.000Z'
          transferType: CREDIT
          paymentType: RTP
          paymentCurrency: BRL
          paymentAmount: 9540
          debtor:
            debtorAccount:
              accountId: '1000304'
          debtorAgent:
            financialInstitutionId:
              bic: CHASBRSP
          creditorAgent:
            financialInstitutionId:
              clearingSystemId:
                id: '33172537'
                branchNumber: '1'
          creditor:
            creditorName: Alison Becker
            creditorAccount:
              accountId: '41143'
              accountType: CACC
          taxInformation:
            creditorTaxInformation:
              taxId: '1207818'
              taxpayerCategory: INDIVIDUAL
        firmRootId: 98275a2d-1e88-beed-6938-
    PaymentDetailsHongKongFPS:
      summary: Payment Details - Hong Kong FPS
      value:
        paymentStatus:
          createDateTime: '2023-05-15T08:15:01.000Z'
          status: PENDING
        payments:
          paymentIdentifiers:
            endToEndId: WQ20G1096231V13C552
          requestedExecutionDate: '2023-05-15T00:00:00.000Z'
          transferType: CREDIT
          paymentType: RTP
          paymentCurrency: HKD
          paymentAmount: 750
          debtor:
            debtorAccount:
              accountId: '6700000001'
              accountCurrency: HKD
          debtorAgent:
            financialInstitutionId:
              bic: CHASHKHH
          creditorAgent:
            financialInstitutionId:
              clearingSystemId:
                id: '004'
          creditor:
            creditorName: Public Inc.
            postalAddress:
              addressType: ADDR
              streetName: Connaught Road
              buildingNumber: '02, 2/F'
              postalCode: '999077'
              townName: Wan Chai
              country: HK
              countrySubDvsn: Wan Chai
            dateAndPlaceOfBirth:
              birthDate: '1980-10-20T00:00:00.000Z'
              cityOfBirth: Hong Kong
              countryOfBirth: HK
            creditorAccount:
              accountId: '1232261890'
              accountType: BBAN
          categoryPurpose:
            proprietary: CXBSNS
          remittanceInformation:
            unstructuredInformation:
              - Invoice number 11. Paid by HK Ltd B/O HK Sub Ltd. Pay to Public Inc for John Smith
        firmRootId: 98275a2d-1e88-beed-6938-0521a7e0aedb
    PaymentDetailsIndonesiaRTP:
      summary: Payment Details - Indonesia RTP
      value:
        paymentStatus:
          createDateTime: '2023-06-11T00:00:12.145Z'
          status: PENDING
        payments:
          paymentIdentifiers:
            endToEndId: XR2021RE023WBG35
          requestedExecutionDate: '2023-06-11T00:00:00.000Z'
          transferType: CREDIT
          paymentType: RTP
          paymentCurrency: IDR
          paymentAmount: 6500
          categoryPurpose:
            proprietary: INVESTMENT
          debtor:
            debtorName: Blaise Dox
            debtorAccount:
              accountId: '6653331826'
          debtorAgent:
            financialInstitutionId:
              bic: CHASIDJX
          creditorAgent:
            financialInstitutionId:
              bic: BDINIDJA
          creditor:
            creditorName: Mary Sutantri
            creditorAccount:
              accountId: '003623339944'
          remittanceInformation:
            unstructuredInformation:
              - Rental Payment for June 2023
        firmRootId: 98275a2d-1e88-beed-6938-0521a7e0aind
    PaymentDetailsMalaysiaRPP:
      summary: Payment Details - Malaysia RPP
      value:
        paymentStatus:
          createDateTime: '2023-02-06T08:15:01.000Z'
          status: PENDING
        payments:
          paymentIdentifiers:
            endToEndId: A12Y092G0231T1354BB2
          requestedExecutionDate: '2023-02-06T00:00:00.000Z'
          transferType: CREDIT
          paymentType: RTP
          paymentCurrency: MYR
          paymentAmount: 1500
          debtor:
            debtorDevice:
              ipAddress: 123.45.67.890
            debtorAccount:
              accountId: '0987654321'
          debtorAgent:
            financialInstitutionId:
              bic: CHASMYKX
          creditorAgent:
            financialInstitutionId:
              bic: CITIMYKL
          creditor:
            creditorName: Rajan Lee
            countryOfResidence: MY
            creditorAccount:
              accountId: '987654321'
              accountType: SVGS
          purpose:
            code: '17080'
            type: PROPRIETARY
          remittanceInformation:
            structuredInformation:
              - creditReference: 1252ACV-096
        firmRootId: 98275a2d-1e88-beed-6938-0521a7e0asap
    PaymentDetailsMexicoSPEI:
      summary: Payment Details - Mexico SPEI
      value:
        paymentStatus:
          createDateTime: '2022-06-30T08:15:01.000Z'
          status: PENDING
        payments:
          paymentIdentifiers:
            endToEndId: mr202120b231h135
          requestedExecutionDate: '2022-06-30T00:00:00.000Z'
          transferType: CREDIT
          paymentType: RTP
          paymentCurrency: MXN
          paymentAmount: 175
          debtor:
            debtorAccount:
              accountId: '0022628001'
              accountCurrency: MXN
              accountType: DDA
            ultimateDebtor:
              ultimateDebtorName: Enzo Hernandez
              postalAddress:
                addressType: ADDR
                country: MX
                addressLine:
                  - Papua Lane
                  - Kew Park
              individualId:
                id: '002'
                issuer: Elicia Carvalho
              additionalIdentifiers:
                - id: '1234'
                  idType: INDIVIDUAL
              dateAndPlaceOfBirth:
                birthDate: '1995-02-10T00:00:00.000Z'
                cityOfBirth: Luxembourg
                countryOfBirth: LU
          debtorAgent:
            financialInstitutionId:
              bic: CHASMXMX
          creditorAgent:
            financialInstitutionId:
              bic: CHASMXMX
          creditor:
            creditorName: Chavo G
            countryOfResidence: MX
            postalAddress:
              addressType: ADDR
              country: MX
              addressLine:
                - Texmaco Street
                - Dinho River
            dateAndPlaceOfBirth:
              birthDate: '1983-03-01T00:00:00.000Z'
              cityOfBirth: Mexico City
              countryOfBirth: MX
            creditorAccount:
              accountId: '0077644395'
              accountType: DDA
          ultimateCreditor:
            individualId:
              id: 77644395
          ultimateCreditorName: Prince Gomez
          postalAddress:
            addressType: ADDR
            country: MX
            addressLine:
              - Calicut Avenue
              - Pacino Street
            dateAndPlaceOfBirth:
              birthDate: '1991-04-19T00:00:00.000Z'
              cityOfBirth: Mexico City
              countryOfBirth: MX
          remittanceInformation:
            unstructuredInformation:
              - Payment for Surfing equipment Invoice 113390C-FF2
        firmRootId: 98275a2d-1e88-beed-6938-0521a7e01mex
    PaymentDetailsSEPA:
      summary: Payment Details - SEPA
      value:
        paymentStatus:
          createDateTime: '2023-02-06T00:00:12.145Z'
          status: PENDING
        payments:
          paymentIdentifiers:
            endToEndId: 20SP21I092S02T31T152
          requestedExecutionDate: '2023-02-06T00:00:00.000Z'
          transferType: CREDIT
          paymentType: RTP
          paymentCurrency: EUR
          paymentAmount: 4550
          debtor:
            debtorAccount:
              accountId: DE40501108006169009120
              accountCurrency: EUR
            ultimateDebtor:
              ultimateDebtorName: Donatella Kimmich
              postalAddress:
                addressType: ADDR
                country: DE
                addressLine:
                  - Platz Des 4
                  - 14167 Berlin
              organizationId:
                bic: CHASDEFX
                id: DE88501108006231400596
                schemeName:
                  code: IBAN
                issuer: Deutsche Bundesbank
              dateAndPlaceOfBirth:
                birthDate: '2000-10-07T00:00:00.000Z'
                cityOfBirth: Hamburg
                countryOfBirth: DE
          debtorAgent:
            financialInstitutionId:
              bic: CHASDEFX
          creditorAgent:
            financialInstitutionId:
              bic: CHASDEFX
          creditor:
            creditorName: Joshua Klose
            countryOfResidence: DE
            postalAddress:
              addressType: ADDR
              country: DE
              addressLine:
                - Hansastr 39
                - 81373 Munich
            dateAndPlaceOfBirth:
              birthDate: '1989-12-01T00:00:00.000Z'
              cityOfBirth: Munich
              countryOfBirth: DE
            creditorAccount:
              accountId: DE39501108006169009138
              accountType: IBAN
          purpose:
            code: '113'
            type: PROPRIETARY
          remittanceInformation:
            unstructuredInformation:
              - Payment for equipment supply
        firmRootId: 98275a2d-1e88-beed-6938-0521a7e0xatt
    PaymentDetailsUKFPS:
      summary: Payment Details - UK FPS
      value:
        paymentStatus:
          createDateTime: '2023-04-22T00:00:12.145Z'
          status: PENDING
        payments:
          possibleDuplicateMessage: false
          paymentIdentifiers:
            endToEndId: AD202109311354152
          requestedExecutionDate: '2023-04-22T00:00:00.000Z'
          transferType: CREDIT
          paymentCurrency: GBP
          paymentAmount: 650
          paymentType: RTP
          debtor:
            debtorAccount:
              accountId: '12311871'
              accountCurrency: GBP
              accountType: DDA
            ultimateDebtor:
              ultimateDebtorName: Wayne Thompson
              postalAddress:
                addressType: ADDR
                streetName: Lennon Road
                buildingNumber: '22'
                townName: Liverpool
                country: GB
              countryOfResidence: GB
              organizationId:
                bic: CHASGB2L
                id: '40025916'
          debtorAgent:
            financialInstitutionId:
              bic: CHASGB2L
          creditorAgent:
            financialInstitutionId:
              clearingSystemId:
                id: '185008'
          creditor:
            creditorName: David Burn
            postalAddress:
              addressType: ADDR
              streetName: Fratton Park
              buildingNumber: '411'
              postalCode: PO48RA
              townName: Portsmouth
              country: GB
              countrySubDvsn: Hampshire
            countryOfResidence: GB
            creditorAccount:
              accountId: '87654321'
            ultimateCreditor:
              ultimateCreditorName: Clint Hall
              individualId:
                id: '87654321'
              postalAddress:
                addressType: ADDR
                streetName: Fratton Park
                buildingNumber: '411'
                postalCode: PO48RA
                townName: Portsmouth
                country: GB
                countrySubDvsn: Hampshire
          purpose:
            code: GDDS
            type: CODE
          remittanceInformation:
            unstructuredInformation:
              - 'Payment for Macbook batteries Receipt #AXF23-LGG'
        firmRootId: 98275a2d-1e88-beed-6938-0521a7e0aejp
    PaymentDetailsUSTCH:
      summary: Payment Details - US TCH
      value:
        paymentStatus:
          createDateTime: '2022-10-15T00:00:12.145Z'
          status: PENDING
        payments:
          paymentIdentifiers:
            endToEndId: pl210g9t231r13541130
          requestedExecutionDate: '2022-10-15T00:00:00.000Z'
          transferType: CREDIT
          paymentType: RTP
          paymentCurrency: USD
          paymentAmount: 500
          debtor:
            debtorName: Paula Smitty
            debtorAccount:
              accountId: '000009102574986'
              accountType: DDA
            ultimateDebtor:
              ultimateDebtorName: Christian Jones
              postalAddress:
                addressType: ADDR
                streetName: Hancock Ave
                buildingNumber: '121'
                postalCode: '07302'
                townName: Jersey City
                country: US
                countrySubDvsn: Hudson
              dateAndPlaceOfBirth:
                birthDate: '1984-01-01T00:00:00.000Z'
                cityOfBirth: Hull city
                countryOfBirth: BR
              individualId:
                id: '001'
          debtorAgent:
            financialInstitutionId:
              clearingSystemId:
                id: '021000021'
                idType: USABA
          creditorAgent:
            financialInstitutionId:
              clearingSystemId:
                id: '071000013'
                idType: USABA
          creditor:
            creditorName: Clint Davos
            postalAddress:
              addressType: ADDR
              streetName: Cow Hollow
              buildingNumber: '65'
              postalCode: '05483'
              townName: San Francisco
              country: US
              countrySubDvsn: SFO
            dateAndPlaceOfBirth:
              birthDate: '2001-01-12T00:00:00.000Z'
              cityOfBirth: London
              countryOfBirth: UK
            creditorAccount:
              accountId: '000000034257284'
            ultimateCreditor:
              ultimateCreditorName: Max Payne
              postalAddress:
                addressType: ADDR
                streetName: Flint Ave
                buildingNumber: '89'
                postalCode: '88793'
                townName: Los Angeles
                country: US
                countrySubDvsn: LAX
              dateAndPlaceOfBirth:
                birthDate: '1999-04-01T00:00:00.000Z'
                cityOfBirth: Rio
                countryOfBirth: BR
              organizationId:
                id: '003'
          remittanceInformation:
            unstructuredInformation:
              - Payment for rustic vintage furniture
        firmRootId: 98275a2d-1e88-beed-6938-0521a7e0aesf
    PaymentDetailsUSP2C:
      summary: Payment Details - US Push To Card (P2C)
      value:
        paymentStatus:
          createDateTime: '2022-06-28T00:00:01.000Z'
          status: PENDING
        payments:
          requestedExecutionDate: '2022-06-28T00:00:00.000Z'
          paymentIdentifiers:
            endToEndId: 1lv0t92e023g11354100
          transferType: CREDIT
          paymentCurrency: USD
          paymentAmount: 750
          debtor:
            debtorName: Colin Hanks
            debtorAccount:
              alternateAccountIdentifier: PRU01US
          debtorAgent:
            financialInstitutionId:
              bic: CHASUS33
          creditor:
            creditorName: Karl Eichorn
            creditorAccount:
              accountType: CARD
              alternateAccountIdentifier: '4137110019999999'
              cardExpiryDate: '2207'
          remittanceInformation:
            unstructuredInformation:
              - Credit note from Milestone Music Company NY
        firmRootId: 98275a2d-1e88-beed-6938-0521a7e0uptc
    PaymentDetailsCanadaP2C:
      summary: Payment Details - Canada Push To Card(P2C)
      value:
        paymentStatus:
          createDateTime: '2022-06-28T00:00:01.000Z'
          status: PENDING
        payments:
          requestedExecutionDate: '2022-06-28T00:00:00.000Z'
          paymentIdentifiers:
            endToEndId: 1lv0t92e023g11354102
          transferType: CREDIT
          paymentCurrency: CAD
          paymentAmount: 250
          debtor:
            debtorName: Bruce Jack
            debtorAccount:
              alternateAccountIdentifier: PRU01CAD
          debtorAgent:
            financialInstitutionId:
              bic: CHASCATT
          creditor:
            creditorName: Karl Eichorn
            creditorAccount:
              accountType: CARD
              alternateAccountIdentifier: '4137110019999999'
              cardExpiryDate: '2207'
          remittanceInformation:
            unstructuredInformation:
              - Credit note from Discovery Picture Company Toronto
        firmRootId: 98275a2d-1e88-beed-6938-0521a7e0cptc
    PaymentDetailsChileLowValueACH:
      summary: Payment Details - Chile Low-Value ACH
      value:
        paymentStatus:
          createDateTime: '2022-12-01T00:00:12.145Z'
          status: PENDING
        payments:
          paymentIdentifiers:
            endToEndId: XR20210920CS1131416
          requestedExecutionDate: '2022-12-01T00:00:00.000Z'
          transferType: CREDIT
          paymentCurrency: CLP
          paymentAmount: 300.25
          debtor:
            debtorAccount:
              accountId: '2600023565'
              accountCurrency: CLP
            debtorName: Lucha Gonzalez
          debtorAgent:
            financialInstitutionId:
              bic: CHASCLRM
          creditorAgent:
            financialInstitutionId:
              bic: BCHICLRM
              clearingSystemId:
                id: '114740179'
                branchNumber: '0001'
          creditor:
            creditorName: Marina Simeone
            creditorAccount:
              accountId: '101000974'
              accountType: SVGS
            postalAddress:
              country: CL
          paymentType: ACH.TRF
          purpose:
            code: '0010130000'
            type: PROPRIETARY
          taxInformation:
            creditorTaxInformation:
              taxId: 06703922-K
              taxpayerCategory: INDIVIDUAL
    PaymentDetailsJPMCoin:
      summary: Payment Details - JPM Coin
      value:
        paymentStatus:
          createDateTime: '2023-06-10T00:00:01.000Z'
          status: PENDING
        payments:
          paymentIdentifiers:
            endToEndId: 202E092v021D35E4152
          requestedExecutionDate: '2023-06-10T00:00:00.000Z'
          paymentCurrency: USD
          paymentAmount: 6500
          transferType: CREDIT
          paymentType: BLOCKCHAIN
          debtor:
            debtorAccount:
              accountId: '8830699900'
              accountType: DDA
          debtorAgent:
            financialInstitutionId:
              bic: CHASSGSG
          creditorAgent:
            financialInstitutionId:
              bic: CHASUS33
          creditor:
            creditorName: Coin Hodler
            creditorAccount:
              accountId: '0070103277'
              accountType: BDA
          remittanceInformation:
            unstructuredInformation:
              - Payment for container shipment
        firmRootId: 98275a2d-1e88-beed-6938-0521a7e0oinc
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
security:
  - bearerAuth: []
`;

const merchantSpec = `openapi: 3.0.1
info:
  title: Merchant Payments API
  description: Payments API for processing consumer payments
  version: 2.0.51
  contact:
    name: Merchant Payments API Support
    url: 'https://developer.jpmorgan.com/support'
    email: developer_help@jpmorgan.com
x-jpmc-info: xxxxx//External///Product/00001//External///Product/00001
x-jpmc-seal: xxxxx//External///Product/00001
x-jpmc-securityDefinitions:
  JPMC-OAuth2:
    jpmc-claims:
      jpmc-roles: []
x-jpmc-security:
  - JPMC-OAuth2:
      jpmc-claims:
        jpmc-roles: []
servers:
  - url: 'https://api-ms.payments.jpmorgan.com/api/v2'
    description: Production Environment
  - url: 'https://cat-api.merchant.jpmorgan.com/api/v2'
    description: Test Environment
tags:
  - name: Transactions
    description: Initiating and processing a payment
  - name: Health Check
    description: Check if a particular service is available
  - name: Fraud
    description: Fraud check for a payment
paths:
  /payments:
    post:
      summary: Create a payment
      operationId: V2PaymentPost
      tags:
        - Transactions
      description: Create a payment request with a specified payment instrument. Authorization and Sale (Authorization and capture).
      parameters:
        - name: request-id
          in: header
          required: true
          schema:
            type: string
            example: 10cc0270-7bed-11e9-a188-1763956dd7f6
            maxLength: 40
          description: Merchant identifier for the request. The value must be unique.
          example: 10cc0270-7bed-11e9-a188-1763956dd7f6
        - name: merchant-id
          in: header
          required: true
          schema:
            type: string
            example: '991234567890'
            minLength: 8
            maxLength: 12
          description: Identifier for the merchant account
          examples:
            merchant-id-example:
              value: '998482157632'
        - name: minorVersion
          in: header
          schema:
            type: string
            example: '1'
          description: Identifier for the minor release version
      requestBody:
        description: Payment request information
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/payment'
            examples:
              Approved Auth Basic:
                value:
                  captureMethod: NOW
                  amount: 1234
                  currency: USD
                  merchant:
                    merchantSoftware:
                      companyName: Payment Company
                      productName: Application Name
                      version: '1.235'
                    merchantCategoryCode: '4899'
                  paymentMethodType:
                    card:
                      accountNumber: '4012000033330026'
                      expiry:
                        month: 5
                        year: 2027
                      isBillPayment: true
                  initiatorType: CARDHOLDER
                  accountOnFile: NOT_STORED
                  isAmountFinal: true
              Approved Auth CIT Onetime Stored:
                value:
                  captureMethod: NOW
                  amount: 10000
                  currency: USD
                  merchant:
                    merchantSoftware:
                      companyName: Payment Company
                      productName: Application Name
                    merchantCategoryCode: '4899'
                  paymentMethodType:
                    card:
                      accountNumber: '4012000033330026'
                      expiry:
                        month: 10
                        year: 2040
                  initiatorType: CARDHOLDER
                  accountOnFile: TO_BE_STORED
                  originalTransactionId: '16444'
                  accountHolder:
                    referenceId: '1245'
                    fullName: John Doe
                    email: john.doe@gmail.com
                    IPAddress: 104.18.127.1
                    billingAddress:
                      line1: 123 main street
                      line2: Apartment 2
                      city: Tampa
                      state: FL
                      postalCode: '33785'
                  shipTo:
                    shippingAddress:
                      line1: 123 main street
                      line2: Apartment 2
                      city: Tampa
                      state: FL
                      postalCode: '33785'
              Approved Auth MIT Subsequent Stored:
                value:
                  captureMethod: NOW
                  amount: 10000
                  currency: USD
                  merchant:
                    merchantSoftware:
                      companyName: Payment Company
                      productName: Application Name
                  paymentMethodType:
                    card:
                      accountNumber: '4012000033330026'
                      expiry:
                        month: 4
                        year: 2025
                      cvv: '100'
                  initiatorType: MERCHANT
                  accountOnFile: STORED
                  originalTransactionId: '16'
                  isAmountFinal: true
                  recurring:
                    recurringSequence: FIRST
                    agreementId: '1235'
                    paymentAgreementExpiryDate: '2040-10-30'
                  accountHolder:
                    referenceId: '1245'
                    consumerIdCreationDate: '2021-09-01'
                    fullName: John Doe
                    email: john.doe@gmail.com
                    IPAddress: 104.18.127.1
                    billingAddress:
                      line1: 123 main street
                      line2: Apartment 3b
                      city: Tampa
                      state: FL
                      postalCode: '33626'
                  shipTo:
                    shippingDescription: Personal Item shipping to my home
                    shippingAddress:
                      line1: 123 main street
                      line2: Apartment 3b
                      city: Tampa
                      state: FL
                      postalCode: '33626'
                    fullName: John Doe
                    email: john.doe@gmail.com
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/paymentResponse'
              examples:
                Approved Auth Basic:
                  value:
                    transactionId: cdf62f90-6440-496f-817c-c05dd3b7b01a
                    requestId: 5e720ee0-0192-4f7f-82d9-6248096832a0
                    transactionState: CLOSED
                    responseStatus: SUCCESS
                    responseCode: APPROVED
                    responseMessage: Transaction approved by Issuer
                    paymentMethodType:
                      card:
                        expiry:
                          month: 5
                          year: 2027
                        cardType: VI
                        cardTypeName: VISA
                        isBillPayment: true
                        maskedAccountNumber: 411234XXXXXX4113
                        cardTypeIndicators:
                          issuanceCountryCode: USA
                          isDurbinRegulated: false
                          cardProductTypes:
                            - PINLESS_DEBIT
                        networkResponse:
                          addressVerificationResult: NOT_REQUESTED
                          addressVerificationResultCode: ''
                          cardVerificationResultCode: ''
                    captureMethod: NOW
                    isCapture: true
                    initiatorType: CARDHOLDER
                    accountOnFile: NOT_STORED
                    transactionDate: '2022-05-04T16:04:27.027Z'
                    approvalCode: tst269
                    hostMessage: Approved
                    amount: 1234
                    currency: USD
                    remainingRefundableAmount: 1234
                    remainingAuthAmount: 1234
                    hostReferenceId: NjKmDGcGYAJ6wsedRnMCj4
                    merchant:
                      merchantId: '17904369'
                      merchantSoftware:
                        companyName: Payment Company
                        productName: Application Name
                        version: '1.235'
                      merchantCategoryCode: '4899'
                Approved Auth CIT Onetime Stored:
                  value:
                    transactionId: c9d21e9e-9263-4c6e-a6b7-ef60cbceeb49
                    requestId: 3f4628c8-43b1-4753-9d0d-6e31a47d6077
                    transactionState: AUTHORIZED
                    responseStatus: SUCCESS
                    responseCode: APPROVED
                    responseMessage: Transaction approved by Issuer
                    paymentMethodType:
                      card:
                        expiry:
                          month: 10
                          year: 2040
                        cardType: VI
                        cardTypeName: VISA
                        maskedAccountNumber: 401200XXXXXX0026
                        cardTypeIndicators:
                          issuanceCountryCode: USA
                          isDurbinRegulated: false
                          cardProductTypes:
                            - PINLESS_DEBIT
                        networkResponse:
                          addressVerificationResult: NOT_REQUESTED
                          addressVerificationResultCode: ''
                          cardVerificationResultCode: M
                          networkTransactionId: '012125692162451'
                    isCapture: true
                    captureMethod: NOW
                    initiatorType: CARDHOLDER
                    accountOnFile: TO_BE_STORED
                    transactionDate: '2022-05-04T20:04:25.025Z'
                    approvalCode: tst904
                    hostMessage: Approved
                    amount: 10000
                    currency: USD
                    remainingRefundableAmount: 1500
                    hostReferenceId: sGD8MSXuJan0ytfXIJAP57
                    merchant:
                      merchantId: '17904369'
                      merchantSoftware:
                        companyName: Payment Company
                        productName: Application Name
                      merchantCategoryCode: '4899'
                    recurring: null
                    accountHolder:
                      referenceId: '1245'
                      IPAddress: 104.18.127.1
                    shipTo: null
                Approved Auth MIT Subsequent Stored:
                  value:
                    transactionId: d461bd0c-2f6d-4b85-9ce7-552651d0edea
                    requestId: ca20dfe6-2861-41fa-ae1d-c037978635e8
                    transactionState: AUTHORIZED
                    responseStatus: SUCCESS
                    responseCode: APPROVED
                    responseMessage: Transaction approved by Issuer
                    paymentMethodType:
                      card:
                        expiry:
                          month: 4
                          year: 2025
                        cardType: VI
                        cardTypeName: VISA
                        maskedAccountNumber: 411234XXXXXX4113
                        cardTypeIndicators:
                          issuanceCountryCode: USA
                          isDurbinRegulated: false
                          cardProductTypes:
                            - PINLESS_DEBIT
                        networkResponse:
                          addressVerificationResult: NOT_REQUESTED
                          addressVerificationResultCode: ''
                          cardVerificationResultCode: M
                    initiatorType: MERCHANT
                    accountOnFile: STORED
                    transactionDate: '2022-05-04T20:04:25.025Z'
                    approvalCode: tst982
                    hostMessage: Approved
                    amount: 10000
                    currency: USD
                    hostReferenceId: G0i19bLbf0L02Z9g1GiEz4
                    merchant:
                      merchantSoftware:
                        companyName: Payment Company
                        productName: Application Name
                    recurring:
                      recurringSequence: FIRST
                      agreementId: '1235'
                      paymentAgreementExpiryDate: '2040-10-30'
                    shipTo:
                      shippingDescription: Personal Item shipping to my home
        '400':
          description: Badly formatted request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/messages'
        '401':
          description: Unauthorized
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/messages'
        '403':
          description: Forbidden
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/messages'
        '412':
          description: Precondition failed
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/messages'
        '500':
          description: Unexpected error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/messages'
        '503':
          description: Service Unavailable
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/messages'
        '504':
          description: Timeout
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/messages'
    get:
      summary: Get a specific payment transaction by request Id
      operationId: V2PaymentGet
      tags:
        - Transactions
      description: Request Original Authorization Transaction details
      parameters:
        - name: request-id
          in: header
          required: true
          schema:
            type: string
            example: 10cc0270-7bed-11e9-a188-1763956dd7f6
            maxLength: 40
          description: Merchant identifier for the request. The value must be unique.
          examples:
            Success:
              value: 10cc0270-7bed-11e9-a188-1763956dd7f6
            Error:
              value: 11cc0270-7bed-11e9-a188-1763956dd7f6
        - name: requestIdentifier
          in: query
          required: true
          schema:
            type: string
            example: 12cc0270-7bed-11e9-a188-1763956dd7f6
            maxLength: 40
          description: The request identifier for the previous attempted transaction to query by.
          examples:
            Success:
              value: 14cc0270-7bed-11e9-a188-1763956dd7f6
            Error:
              value: 15cc0270-7bed-11e9-a188-1763956dd7f6
        - name: authorization
          in: header
          required: true
          schema:
            type: string
          description: This is used for specifying individual parameters under API endpoint methods.
          examples:
            Success:
              value: |-
                Bearer
                    eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkpKRmRuSURYTngtTERNUWIzR3V4eVpSaC1xZyJ9.eyJhdWQiOiCBde1DOlVSSTpSUy0xMDMyNTctMjQ5NDEtQ29ubmVjdFBheW1lbnRzVWF0QXBwLVVBVCIsImlzcyI6Imh0dHA6Ly9pZGEuanBtb3JnYW5jaGFzZS5jb20vYWRmcy9zZXJ2aWNldy90cnVzdCIsImlhdCI6MTU2NTc5Mjk1NCwiZXhwIjoxNTY1ODIxNzU0LCJKUE1DSWRlbnRpZmllciI6Ik83MjI2NjAiLCJDbGllbnRJUEFkZHJlc3MiOiIxNjkuOTIuOC42OSIsImF1dGhtZXRob2QiOlsiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2F1dGhlbnRpY2F0aW9ubWV0aG9kL3Rsc2NsaWVudCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9hdXRoZW50aWNhdGlvbm1ldGhvZC94NTA5Il0sImFwcHR5cGUiOiJDb25maWRlbnRpYWwiLCJhcHBpZCI6IkNDLTEwMzI1Ny1PNzIyNjYwLTI3NzA5LVVBVCIsImF1dGhfdGltZSI6IjIwMTktMDgtMTRUMTQ6Mjk6MTQuMzY5WiIsInZlciI6IjEuake9.MlhM5J5LeFcquqCf8ZRn690eOOACedmEmakaHxRXD9nulYssakcyeAdTKCg19WV5loLWZtGCgkMaeriDtlA0oLKBoGyNkENgqpdfhTklzMEOBnrw042ShsksCLLD3xD4B30BInHbnUps-2vEzDza4JQFCukJWablkJg0RURQ4VNcgijifGVnGtyk8ps21gYOt-e3LqUNbhZs_Kc6JIDNKa4LQ_wQxhIKBHgyrbWd1QRTHP-ZX4UfGDTvKseTn8vc39LQPJyhvIMyvtic9SKoKJlxhirLRtvr0ygaVTVcreAPGo7nzamWD7W0CueUC8Gav_87EZai6dam7gAR4abQIZ_a
            Error:
              value: |-
                Bearer
                          eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkpKRmRuSURYTngtTERNUWIzR3V4eVpSaC1xZyJ9.eyJhdWQiOiCBde1DOlVSTpSUy0xMDMyNTctMjQ5NDEtQ29ubmVjdFBheW1lbnRzVWF0QXBwLVVBVCIsImlzcyI6Imh0dHA6Ly9pZGEuanBtb3JnYW5jaGFzZS5jb20vYWRmcy9zZXJ2aWNldy90cnVzdCIsImlhdCI6MTU2NTc5Mjk1NCwiZXhwIjoxNTY1ODIxNzU0LCJKUE1DSWRlbnRpZmllciI6Ik83MjI2NjAiLCJDbGllbnRJUEFkZHJlc3MiOiIxNjkuOTIuOC42OSIsImF1dGhtZXRob2QiOlsiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2F1dGhlbnRpY2F0aW9ubWV0aG9kL3Rsc2NsaWVudCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9hdXRoZW50aWNhdGlvbm1ldGhvZC94NTA5Il0sImFwcHR5cGUiOiJDb25maWRlbnRpYWwiLCJhcHBpZCI6IkNDLTEwMzI1Ny1PNzIyNjYwLTI3NzA5LVVBVCIsImF1dGhfdGltZSI6IjIwMTktMDgtMTRUMTQ6Mjk6MTQuMzY5WiIsInZlciI6IjEuake9.MlhM5J5LeFcquqCf8ZRn690eOOACedmEmakaHxRXD9nulYssakcyeAdTKCg19WV5loLWZtGCgkMaeriDtlA0oLKBoGyNkENgqpdfhTklzMEOBnrw042ShsksCLLD3xD4B30BInHbnUps-2vEzDza4JQFCukJWablkJg0RURQ4VNcgijifGVnGtyk8ps21gYOt-e3LqUNbhZs_Kc6JIDNKa4LQ_wQxhIKBHgyrbWd1QRTHP-ZX4UfGDTvKseTn8vc39LQPJyhvIMyvtic9SKoKJlxhirLRtvr0ygaVTVcreAPGo7nzamWD7W0CueUC8Gav_87EZai6dam7gAR4abQIZ_a
        - name: merchant-id
          in: header
          required: true
          schema:
            type: string
            example: '991234567890'
            minLength: 8
            maxLength: 12
          description: Identifier for the merchant account
          examples:
            Success:
              value: '998482157632'
            Error:
              value: '991234567890'
        - name: minorVersion
          in: header
          schema:
            type: string
            example: '1'
          description: Identifier for the minor release version
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/paymentResponse'
        '400':
          description: Badly formatted request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/messages'
        '401':
          description: Unauthorized
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/messages'
        '403':
          description: Forbidden
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/messages'
        '404':
          description: Not Found
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/messages'
        '412':
          description: Precondition failed
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/messages'
        '500':
          description: Unexpected error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/messages'
        '503':
          description: Service Unavailable
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/messages'
        '504':
          description: Timeout
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/messages'
  schemas:
    accountUpdater:
      description: Contains response information related to account updater request
      type: object
      properties:
        requestAccountUpdater:
          $ref: '#/components/schemas/requestAccountUpdater'
        accountNumber:
          description: 'The Card Number is a number recognized by various payment systems to route debit card, ATM and credit Card transactions to an issuer and to identify the underlying account to which each transaction should be applied. Transactions may be initiated from physical or non-physical devices (e.g. debit card, ATM, credit card, Single Use Account (SUA), Near Field Communication (NFC), etc.).'
          x-chase-dataelem: HIGHPI/197/N/N
          type: string
          readOnly: true
        newAccountExpiry:
          $ref: '#/components/schemas/panExpiry'
        accountUpdaterResponse:
          description: Status of account updater request received from the network
          x-chase-dataelem: INTL/MSDATAENG2-4218/N/N
          type: string
          readOnly: true
          enum:
            - NEW_ACCOUNT
            - NEW_EXPIRY
            - NEW_ACCOUNT_AND_EXPIRY
            - CLOSED_ACCOUNT
            - PROVIDED_EXPIRY_NEWER
            - CONTACT_CARDHOLDER
            - MATCH_NO_UPDATE
            - NO_MATCH_NON_PARTICIPATING_BIN
            - NO_MATCH_PARTICIPATING_BIN
            - ISSUER_NOT_PARTICIPATING
            - CARDHOLDER_OPT_OUT
            - PORTFOLIO_CONVERSION
        accountUpdaterReasonCode:
          description: indicates whether Account Updater service was successfully evoked or if there was an error
          x-chase-dataelem: INTL/MSDATAENG2-4219/N/N
          type: string
          readOnly: true
        accountUpdaterReasonMessage:
          description: long description of account updater results
          x-chase-dataelem: INTL/MSDATAENG2-4220/N/N
          type: string
          readOnly: true
    payment:
      description: Request information for payment endpoint
      type: object
      required:
        - amount
        - currency
        - merchant
        - paymentMethodType
      properties:
        isCapture:
          $ref: '#/components/schemas/isCapture'
        captureMethod:
          $ref: '#/components/schemas/captureMethod'
        amount:
          $ref: '#/components/schemas/amount'
        currency:
          $ref: '#/components/schemas/currency'
        merchant:
          $ref: '#/components/schemas/merchant'
        paymentMethodType:
          $ref: '#/components/schemas/paymentMethodType'
        initiatorType:
          $ref: '#/components/schemas/initiatorType'
        accountOnFile:
          $ref: '#/components/schemas/accountOnFile'
        originalTransactionId:
          $ref: '#/components/schemas/originalTransactionId'
        isAmountFinal:
          $ref: '#/components/schemas/isAmountFinal'
        merchantOrderNumber:
          $ref: '#/components/schemas/merchantOrderNumber'
        recurring:
          $ref: '#/components/schemas/recurring'
        installment:
          $ref: '#/components/schemas/installment'
        accountHolder:
          $ref: '#/components/schemas/accountHolder'
        shipTo:
          $ref: '#/components/schemas/shipTo'
        risk:
          $ref: '#/components/schemas/risk'
        retailAddenda:
          $ref: '#/components/schemas/retailAddenda'
        statementDescriptor:
          $ref: '#/components/schemas/statementDescriptor'
        partialAuthorizationSupport:
          $ref: '#/components/schemas/partialAuthorizationSupport'
        transactionRoutingOverrideList:
          $ref: '#/components/schemas/transactionRoutingOverrideList'
    paymentResponse:
      description: Response information for payment API calls
      type: object
      required:
        - transactionId
        - requestId
        - transactionState
        - responseStatus
        - responseCode
        - responseMessage
        - paymentMethodType
      properties:
        transactionId:
          $ref: '#/components/schemas/transactionId'
        requestId:
          $ref: '#/components/schemas/requestId'
        transactionState:
          $ref: '#/components/schemas/transactionState'
        responseStatus:
          $ref: '#/components/schemas/responseStatus'
        responseCode:
          $ref: '#/components/schemas/responseCode'
        responseMessage:
          $ref: '#/components/schemas/responseMessage'
        paymentMethodType:
          $ref: '#/components/schemas/paymentMethodType'
        captureMethod:
          $ref: '#/components/schemas/captureMethod'
        isCapture:
          $ref: '#/components/schemas/isCapture'
        captureTime:
          description: 'Designates the hour (hh), minute (mm), seconds (ss) and date (if timestamp) or year (YYYY), month (MM), and day (DD) (if date) when the authorization is complete and the transaction is ready for settlement. The transaction can no longer be edited but can be voided.'
          x-chase-dataelem: INTL/208104/N/N
          type: string
        initiatorType:
          $ref: '#/components/schemas/initiatorType'
        accountOnFile:
          $ref: '#/components/schemas/accountOnFile'
        originalTransactionId:
          $ref: '#/components/schemas/originalTransactionId'
        isVoid:
          $ref: '#/components/schemas/isVoid'
        transactionDate:
          $ref: '#/components/schemas/transactionTimestamp'
        approvalCode:
          $ref: '#/components/schemas/approvalCode'
        hostMessage:
          $ref: '#/components/schemas/hostMessage'
        isAmountFinal:
          $ref: '#/components/schemas/isAmountFinal'
        amount:
          $ref: '#/components/schemas/amount'
        currency:
          $ref: '#/components/schemas/currency'
        remainingRefundableAmount:
          $ref: '#/components/schemas/remainingRefundableAmount'
        remainingAuthAmount:
          description: 'Monetary value of uncaptured, approved authorizations currently being held against the card for this transaction by a given Merchant.'
          x-chase-dataelem: CNFD/MSDATAENG2-4319/N/N
          type: integer
          minimum: 1
          maximum: 999999999999
          format: int64
          example: 1234
        totalAuthorizedAmount:
          description: Specifies the monetary value of authorizations currently being held against the Card.
          x-chase-dataelem: CNFD/160546/N/N
          type: integer
          minimum: 1
          maximum: 999999999999
          format: int64
          example: 1234
        risk:
          $ref: '#/components/schemas/risk'
        merchantOrderNumber:
          $ref: '#/components/schemas/merchantOrderNumber'
        hostReferenceId:
          $ref: '#/components/schemas/hostReferenceId'
        statementDescriptor:
          $ref: '#/components/schemas/statementDescriptor'
        information:
          $ref: '#/components/schemas/information'
        merchant:
          $ref: '#/components/schemas/merchant'
        recurring:
          $ref: '#/components/schemas/recurring'
        installment:
          $ref: '#/components/schemas/installment'
        accountHolder:
          $ref: '#/components/schemas/accountHolder'
        shipTo:
          $ref: '#/components/schemas/shipTo'
        retailAddenda:
          $ref: '#/components/schemas/retailAddenda'
        partialAuthorizationSupport:
          $ref: '#/components/schemas/partialAuthorizationSupport'
        transactionRoutingOverrideList:
          $ref: '#/components/schemas/transactionRoutingOverrideList'
        balanceAuthorizationAmount:
          description: 'Specifies the monetary value of the sum requested to validate and ensure there are enough funds required to make a purchase. The amount is usually identical to the cost of the goods or services charged for a single transaction. It can be a smaller amount in cases where a transaction is split into multiple payments. It can also be a small amount or estimated amount to ensure the payment method is valid and has sufficient funds available when the final transaction amount is not known at authorization. In the case of a reversal, this represents the sum originally requested. In this context, this is the balanced authorized amount left on the card.'
          x-chase-dataelem: CNFD/140130/N/N
          type: integer
          format: int64
          example: 12785
        partialAuthorization:
          description: Indicates that the issuer has provided the merchant an authorization for a portion of the amount requested. This service provides an alternative to receiving a decline when the available card balance is not sufficient to approve a transaction in full.
          x-chase-dataelem: INTL/203048/N/N
          type: boolean
        paymentRequest:
          $ref: '#/components/schemas/paymentRequest'
        sourceAccountInformation:
          $ref: '#/components/schemas/sourceAccountInformation'
        externalOrderReferenceNumber:
          description: The identifier that payment method returns after the order placed in their system.
          x-chase-dataelem: INTL/MSDATAENG2-9878/N/N
          type: string
        transactionProcessor:
          $ref: '#/components/schemas/transactionProcessor'
        multiCapture:
          $ref: '#/components/schemas/multiCapture'
    paymentPatch:
      description: Payment Update
      type: object
      properties:
        isCapture:
          $ref: '#/components/schemas/isCapture'
        captureMethod:
          $ref: '#/components/schemas/captureMethod'
        isVoid:
          $ref: '#/components/schemas/isVoid'
        amount:
          $ref: '#/components/schemas/amount'
        isTaxable:
          $ref: '#/components/schemas/isTaxable'
        taxAmount:
          $ref: '#/components/schemas/taxAmount'
        gratuityAmount:
          $ref: '#/components/schemas/gratuityAmount'
    transactionState:
      description: 'Codifies the current state a transaction may be in. The transaction can only be in one state at a time. The state is based on the current phase a transaction could be in. For example, a transaction that has been received but not captured would be in the A'
      x-chase-dataelem: INTL/181594/N/N
      type: string
      readOnly: true
      enum:
        - AUTHORIZED
        - VOIDED
        - PENDING
        - DECLINED
        - COMPLETED
        - CLOSED
        - ERROR
    refund:
      description: Input information for refund API calls
      type: object
      required:
        - merchant
      properties:
        merchant:
          $ref: '#/components/schemas/merchant'
        amount:
          $ref: '#/components/schemas/amount'
        currency:
          $ref: '#/components/schemas/currency'
        initiatorType:
          $ref: '#/components/schemas/initiatorType'
        accountOnFile:
          $ref: '#/components/schemas/accountOnFile'
        merchantOrderNumber:
          $ref: '#/components/schemas/merchantOrderNumber'
        statementDescriptor:
          $ref: '#/components/schemas/statementDescriptor'
        accountHolder:
          $ref: '#/components/schemas/accountHolder'
        paymentMethodType:
          $ref: '#/components/schemas/refundPaymentMethodType'
        retailAddenda:
          $ref: '#/components/schemas/retailAddenda'
    refundResponse:
      description: Response information for refund API calls
      type: object
      required:
        - requestId
        - transactionState
        - amount
        - currency
        - responseStatus
        - responseCode
        - responseMessage
      properties:
        transactionId:
          $ref: '#/components/schemas/transactionId'
        requestId:
          $ref: '#/components/schemas/requestId'
        transactionState:
          $ref: '#/components/schemas/transactionState'
        amount:
          $ref: '#/components/schemas/amount'
        currency:
          $ref: '#/components/schemas/currency'
        responseStatus:
          $ref: '#/components/schemas/responseStatus'
        responseCode:
          $ref: '#/components/schemas/responseCode'
        responseMessage:
          $ref: '#/components/schemas/responseMessage'
        transactionReferenceId:
          $ref: '#/components/schemas/transactionReferenceId'
        remainingRefundableAmount:
          $ref: '#/components/schemas/remainingRefundableAmount'
        approvalCode:
          $ref: '#/components/schemas/approvalCode'
        hostMessage:
          $ref: '#/components/schemas/hostMessage'
        initiatorType:
          $ref: '#/components/schemas/initiatorType'
        accountOnFile:
          $ref: '#/components/schemas/accountOnFile'
        transactionDate:
          $ref: '#/components/schemas/transactionTimestamp'
        merchant:
          $ref: '#/components/schemas/merchant'
        statementDescriptor:
          $ref: '#/components/schemas/statementDescriptor'
        merchantOrderNumber:
          $ref: '#/components/schemas/merchantOrderNumber'
        accountHolder:
          $ref: '#/components/schemas/accountHolder'
        paymentMethodType:
          $ref: '#/components/schemas/refundPaymentMethodType'
        retailAddenda:
          $ref: '#/components/schemas/retailAddenda'
        information:
          $ref: '#/components/schemas/information'
        hostReferenceId:
          $ref: '#/components/schemas/hostReferenceId'
        paymentRequest:
          $ref: '#/components/schemas/paymentRequest'
        transactionRoutingOverrideList:
          $ref: '#/components/schemas/transactionRoutingOverrideList'
    verification:
      description: Input verification information for API call
      type: object
      required:
        - merchant
        - currency
        - paymentMethodType
      properties:
        merchant:
          $ref: '#/components/schemas/merchant'
        currency:
          $ref: '#/components/schemas/currency'
        paymentMethodType:
          $ref: '#/components/schemas/verificationPaymentMethodType'
        initiatorType:
          $ref: '#/components/schemas/initiatorType'
        accountOnFile:
          $ref: '#/components/schemas/accountOnFile'
        merchantOrderNumber:
          $ref: '#/components/schemas/merchantOrderNumber'
        recurringSequence:
          $ref: '#/components/schemas/recurringSequence'
        websiteShortMerchantUniversalResourceLocatorText:
          description: Provides textual information about data for the protocol for specifying addresses on the Internet (Universal Resource Locator - URL) for the merchant's organization.
          x-chase-dataelem: INTL/201653/N/N
          type: string
        accountHolder:
          $ref: '#/components/schemas/accountHolder'
        transactionRoutingOverrideList:
          $ref: '#/components/schemas/transactionRoutingOverrideList'
    verificationResponse:
      description: Response information for verification API calls
      type: object
      required:
        - transactionId
        - requestId
        - currency
        - responseStatus
        - responseCode
        - responseMessage
        - hostMessage
        - paymentMethodType
      properties:
        transactionId:
          $ref: '#/components/schemas/transactionId'
        requestId:
          $ref: '#/components/schemas/requestId'
        currency:
          $ref: '#/components/schemas/currency'
        responseStatus:
          $ref: '#/components/schemas/responseStatus'
        responseCode:
          $ref: '#/components/schemas/responseCode'
        responseMessage:
          $ref: '#/components/schemas/responseMessage'
        hostMessage:
          $ref: '#/components/schemas/hostMessage'
        paymentMethodType:
          $ref: '#/components/schemas/verificationPaymentMethodType'
        merchant:
          $ref: '#/components/schemas/merchant'
        merchantOrderNumber:
          $ref: '#/components/schemas/merchantOrderNumber'
        transactionDate:
          $ref: '#/components/schemas/transactionTimestamp'
        initiatorType:
          $ref: '#/components/schemas/initiatorType'
        accountOnFile:
          $ref: '#/components/schemas/accountOnFile'
        recurringSequence:
          $ref: '#/components/schemas/recurringSequence'
        risk:
          $ref: '#/components/schemas/risk'
        information:
          $ref: '#/components/schemas/information'
        accountHolder:
          $ref: '#/components/schemas/accountHolder'
        hostReferenceId:
          $ref: '#/components/schemas/hostReferenceId'
        transactionRoutingOverrideList:
          $ref: '#/components/schemas/transactionRoutingOverrideList'
    transactionReference:
      description: Object for refund transaction reference
      type: object
      required:
        - transactionReferenceId
      properties:
        transactionReferenceId:
          $ref: '#/components/schemas/transactionReferenceId'
    expiry:
      description: Expiration date
      type: object
      writeOnly: true
      required:
        - month
        - year
      properties:
        month:
          $ref: '#/components/schemas/month'
        year:
          $ref: '#/components/schemas/year'
    month:
      description: The month of the expiration date
      x-chase-dataelem: INTL/174941/N/N
      type: integer
      format: int32
      minimum: 1
      maximum: 12
      example: 5
      writeOnly: true
    year:
      description: The year of the expiration date
      x-chase-dataelem: INTL/174942/N/N
      type: integer
      format: int32
      minLength: 4
      maxLength: 4
      minimum: 2018
      maximum: 2999
      example: 2020
      writeOnly: true
    panMonth:
      description: The month of the expiration date
      x-chase-dataelem: INTL/174941/N/N
      type: integer
      format: int32
      minimum: 1
      maximum: 12
      example: 5
      writeOnly: true
    panYear:
      description: The year of the expiration date
      x-chase-dataelem: INTL/174942/N/N
      type: integer
      format: int32
      minLength: 4
      maxLength: 4
      minimum: 2018
      maximum: 2999
      example: 2020
      writeOnly: true
    card:
      description: Card payment instrument
      type: object
      required:
        - accountNumber
      properties:
        accountNumberType:
          description: Codifies the type of payment method account number used for the payment transaction.
          x-chase-dataelem: INTL/MSDATAENG2-8744/N/N
          type: string
          enum:
            - PAN
            - NETWORK_TOKEN
            - DEVICE_TOKEN
            - SAFETECH_TOKEN
            - SAFETECH_ENCRYPTION
            - SAFETECH_PAGE_ENCRYPTION
        accountNumber:
          $ref: '#/components/schemas/accountNumber'
        expiry:
          $ref: '#/components/schemas/expiry'
        walletProvider:
          description: 'Identifies the organization who manages the e-wallet for a consumer. The actual e-wallet management responsibilities may include hosting, accessing, communicating, and/or updating all or some of the customer data associated with the e-wallet.  An E-wallet is an application that is created on the mobile device to interact with the Point of Sale (POS) device as a catalyst for a transaction. This value may be sent to the Firm (as in Visa Tokenization) or created by the Firm.'
          x-chase-dataelem: INTL/193113/N/N
          type: string
          enum:
            - APPLE_PAY
            - GOOGLE_PAY
        cardType:
          $ref: '#/components/schemas/cardType'
        cardTypeName:
          $ref: '#/components/schemas/cardTypeName'
        cvv:
          description: Card verification value (CVV/CV2)
          x-chase-dataelem: INTL/177538/N/N
          type: string
          minLength: 3
          maxLength: 6
          pattern: '^\d{3,6}$'
          writeOnly: true
        originalNetworkTransactionId:
          $ref: '#/components/schemas/originalNetworkTransactionId'
        isBillPayment:
          $ref: '#/components/schemas/isBillPayment'
        maskedAccountNumber:
          $ref: '#/components/schemas/maskedAccountNumber'
        maskedCardNumber:
          description: Identifies a concealed number associated with the card number recognized by the Payment Networks. This is typically concealed by storing only the first 6 and or last 4 digits of the card number or some variation.
          x-chase-dataelem: HICNFD/206979/N/N
          type: string
          readOnly: true
        cardTypeIndicators:
          $ref: '#/components/schemas/cardTypeIndicators'
        accountUpdater:
          $ref: '#/components/schemas/accountUpdater'
        networkResponse:
          $ref: '#/components/schemas/networkResponse'
        authentication:
          $ref: '#/components/schemas/authentication'
        preferredPaymentNetworkNameList:
          $ref: '#/components/schemas/preferredPaymentNetworkNameList'
        merchantSalesChannelName:
          $ref: '#/components/schemas/merchantSalesChannelName'
        merchantPreferredRouting:
          $ref: '#/components/schemas/merchantPreferredRouting'
        paymentTokens:
          type: array
          readOnly: true
          description: List of payment tokens for the transaction
          items:
            $ref: '#/components/schemas/paymentToken'
        encryptionIntegrityCheck:
          $ref: '#/components/schemas/encryptionIntegrityCheck'
    merchant:
      description: Information about the merchant
      type: object
      required:
        - merchantSoftware
      properties:
        merchantId:
          description: Identifier for the merchant account.
          x-chase-dataelem: INTL/193308/N/N
          type: string
          readOnly: true
          minLength: 8
          maxLength: 12
          example: '991234567890'
        merchantSoftware:
          $ref: '#/components/schemas/merchantSoftware'
        merchantCategoryCode:
          $ref: '#/components/schemas/merchantCategoryCode'
        merchantLogoUrl:
          description: 'A reference to a web resource on the internet specifying its location on a computer network and a mechanism for retrieving. This is a pointer to a location containing the merchant''s registered trademark  (e.g. for the Firm, the stylized CHASE followed by the Octagon).'
          x-chase-dataelem: INTL/205718/N/N
          type: string
        softMerchant:
          $ref: '#/components/schemas/softMerchant'
    shipTo:
      description: Object containing information about the recipients
      type: object
      properties:
        shippingDescription:
          description: Description of shipping or delivery method
          type: string
          maxLength: 120
        shippingAddress:
          $ref: '#/components/schemas/address'
        fullName:
          $ref: '#/components/schemas/fullName'
        email:
          $ref: '#/components/schemas/email'
        mobile:
          $ref: '#/components/schemas/phone'
        phone:
          $ref: '#/components/schemas/phone'
    installment:
      description: Object containing information in the file
      type: object
      properties:
        installmentCount:
          $ref: '#/components/schemas/installmentCount'
        numberOfDeferrals:
          $ref: '#/components/schemas/numberOfDeferrals'
        planId:
          $ref: '#/components/schemas/planId'
    amount:
      description: Specifies the monetary value of the transaction performed.
      x-chase-dataelem: CNFD/171880/N/N
      type: integer
      format: int64
      minimum: 0
      maximum: 999999999999
      example: 1234
    isTaxable:
      description: Indicates whether tax should be collected for the item.
      x-chase-dataelem: INTL/MSDATAENG-508/N/N
      type: boolean
    currency:
      description: Describes the currency type of the transaction
      x-chase-dataelem: INTL/180125/N/N
      type: string
      enum:
        - USD
        - EUR
        - GBP
        - AUD
        - NZD
        - SGD
        - CAD
        - JPY
        - HKD
        - KRW
        - TWD
        - MXN
        - BRL
        - DKK
        - NOK
        - ZAR
        - SEK
        - CHF
        - CZK
        - PLN
        - TRY
        - AFN
        - ALL
        - DZD
        - AOA
        - ARS
        - AMD
        - AWG
        - AZN
        - BSD
        - BDT
        - BBD
        - BYN
        - BZD
        - BMD
        - BOB
        - BAM
        - BWP
        - BND
        - BGN
        - BIF
        - BTN
        - XOF
        - XAF
        - XPF
        - KHR
        - CVE
        - KYD
        - CLP
        - CNY
        - COP
        - KMF
        - CDF
        - CRC
        - HRK
        - DJF
        - DOP
        - XCD
        - EGP
        - ETB
        - FKP
        - FJD
        - GMD
        - GEL
        - GHS
        - GIP
        - GTQ
        - GYD
        - HTG
        - HNL
        - HUF
        - ISK
        - INR
        - IDR
        - ILS
        - JMD
        - KZT
        - KES
        - LAK
        - LBP
        - LSL
        - LRD
        - MOP
        - MKD
        - MGA
        - MWK
        - MYR
        - MVR
        - MRU
        - MUR
        - MDL
        - MNT
        - MAD
        - MZN
        - MMK
        - NAD
        - NPR
        - ANG
        - PGK
        - NIO
        - NGN
        - PKR
        - PAB
        - PYG
        - PEN
        - PHP
        - QAR
        - RON
        - RWF
        - SHP
        - WST
        - STN
        - SAR
        - RSD
        - SCR
        - SLL
        - SBD
        - SOS
        - LKR
        - SRD
        - SZL
        - TJS
        - TZS
        - THB
        - TOP
        - TTD
        - UGX
        - UAH
        - AED
        - UYU
        - UZS
        - VUV
        - VND
        - YER
        - ZMW
    recurringSequence:
      description: Codifies the point in the recurring transaction by the consumer to the merchant for products or services.
      type: string
      enum:
        - FIRST
        - SUBSEQUENT
    initiatorType:
      description: Describes the initiator of the transaction for the stored credential framework (MIT/CIT)
      x-chase-dataelem: INTL/MSDATAENG2-512/N/N
      type: string
      default: CARDHOLDER
      example: CARDHOLDER
      enum:
        - CARDHOLDER
        - MERCHANT
    accountHolderReferenceId:
      description: Merchant defined identifier for a consumer
      x-chase-dataelem: INTL/MSDATAENG2-4234/N/N
      type: string
      minLength: 0
      maxLength: 25
      example: AB12345678
      writeOnly: true
    electronicCommerceIndicator:
      description: Describes the Electronic Commerce Indicator used in cardholder authentication on a network token
      x-chase-dataelem: /181506/N/N
      type: string
      pattern: '^\d{1,2}$'
      example: '05'
    transactionId:
      description: Identifier of a resource
      x-chase-dataelem: INTL/161034/N/N
      type: string
      minLength: 4
      maxLength: 40
      example: 5a4c3500-4017-11e9-b649-8de064224186
    originalNetworkTransactionId:
      description: 'Reference to a previous transaction. For merchant initiated transactions (MIT), the network transaction identifier from the original transaction must be sent in this field.'
      type: string
      minLength: 4
      maxLength: 40
      example: 1c4b1100-4017-11e9-b649-8de064224186
    transactionReferenceId:
      description: Reference to an existing payment.
      x-chase-dataelem: INTL/160270/N/N
      type: string
      minLength: 4
      maxLength: 40
      example: 6b4c7800-4017-11e9-b649-8de064224186
    responseCode:
      description: Short explanation for response status
      x-chase-dataelem: /MSDATAENG2-4513/N/N
      type: string
      minLength: 2
      maxLength: 50
    responseMessage:
      description: Long explanation of response code
      x-chase-dataelem: /MSDATAENG2-621/N/N
      type: string
    3dsCode:
      description: 3-D Secure authentication response code
      x-chase-dataelem: /MSDATAENG-1482/N/N
      type: string
      readOnly: true
      minLength: 1
      maxLength: 50
    3dsMessage:
      description: 3-D Secure authentication response message
      x-chase-dataelem: /MSDATAENG-1482/N/N
      type: string
      readOnly: true
    resultCode:
      description: Token result code
      x-chase-dataelem: INTL/MSDATAENG-1494/N/N
      type: string
      readOnly: true
      minLength: 2
      maxLength: 50
    resultMessage:
      description: Token result message
      type: string
    approvalCode:
      description: Approval code provided by the payment issuer
      type: string
      readOnly: true
      maxLength: 50
      example: '54321'
    networkResponse:
      description: Response information from payment network
      type: object
      readOnly: true
      properties:
        addressVerificationResult:
          description: Indicates if address provided matches the billing address
          x-chase-dataelem: PIDIRID/205367/N/N
          type: string
          readOnly: true
          enum:
            - ADDRESS_MATCH
            - ADDRESS_POSTALCODE_MATCH
            - NAME_ADDRESS_MATCH
            - NAME_MATCH
            - NAME_POSTALCODE_MATCH
            - NO_MATCH
            - NOT_AVAILABLE
            - NOT_REQUESTED
            - NOT_VERIFIED
            - POSTALCODE_MATCH
            - SERVICE_NOT_AVAILABLE_RETRY
            - SERVICE_NOT_SUPPORTED
        addressVerificationResultCode:
          description: 'Codifies authentication of the address related to the payment card account at the transaction location during the authorization phase of a payment transaction(e.g. Z = zip code match, A = address match).'
          x-chase-dataelem: INTL/178629/N/N
          type: string
        additionalData:
          $ref: '#/components/schemas/additionalData'
        banknetReferenceNumber:
          description: Identifies the number assigned by MasterCard to each authorization message between a card acceptor and an issuer.
          x-chase-dataelem: INTL/202924/N/N
          type: string
        cardVerificationResult:
          description: Indicates if the card verification values (CVV/CV2) matches
          x-chase-dataelem: INTL/177538/N/N
          type: string
          readOnly: true
          enum:
            - MATCH
            - NOT_PRESENT
            - NOT_PROCESSED
            - NOT_SUPPORTED
            - NO_MATCH
        cardVerificationResultCode:
          description: 'Codifies the results of the cardholder authentication match test within the processor.  Authentication test is based on whether the MasterCard Card Verification Character (CVC) or the Visa Card Verification Value (CVV) presented with the transaction matches what the Firm has on file for the card account (e.g., M = CVV2 matched, N = CVV2 did not match).'
          x-chase-dataelem: INTL/177538/N/N
          type: string
        emailVerificationResult:
          description: Provides the textual detail information of the issuer's authorization response code to a merchant when verifying the cardholder's email address to help authenticate transactions and prevent fraud. This is Amex only field.
          x-chase-dataelem: INTL/202943/N/N
          type: string
          enum:
            - MATCH
            - NO_MATCH
            - NOT_VERIFIED
            - SERVICE_NOT_AVAILABLE_RETRY
            - SERVICE_NOT_SUPPORTED
        emailVerificationResultCode:
          description: Codifies the issuer's authorization response code to a merchant when verifying the cardholder's email address to help authenticate transactions and prevent fraud.This is Amex only field.
          x-chase-dataelem: INTL/202943/N/N
          type: string
        last4CardNumber:
          description: Masked Card Number
          type: string
        networkTransactionId:
          description: 'A unique identifier for the transaction returned by the issuer. For Mastercard, this includes the    BanknetReferenceNumber.'
          x-chase-dataelem: INTL/161034/N/N
          type: string
          readOnly: true
        networkAccountUpdater:
          $ref: '#/components/schemas/networkResponseAccountUpdater'
        paymentAccountReference:
          $ref: '#/components/schemas/par'
        phoneVerificationResult:
          description: Codifies the issuer's authorization response code to a merchant when verifying the cardholder's billing telephone number to help authenticate transactions and prevent fraud. This is Amex only field.
          x-chase-dataelem: INTL/202944/N/N
          type: string
          enum:
            - MATCH
            - NO_MATCH
            - NOT_VERIFIED
            - SERVICE_NOT_AVAILABLE_RETRY
            - SERVICE_NOT_SUPPORTED
        phoneVerificationResultCode:
          description: Provides the textual detail information of the issuer's authorization response code to a merchant when verifying the cardholder's billing telephone number to help authenticate transactions and prevent fraud.This is Amex only field.
          x-chase-dataelem: INTL/202944/N/N
          type: string
        tokenRequestorIdentifier:
          description: Identifier for the merchant given by the token requestor
          x-chase-dataelem: INTL/193872/N/N
          type: string
          example: '98765432101'
        tokenAssuranceScore:
          description: Indicates assurance level associated with the token
          x-chase-dataelem: INTL/203133/N/N
          type: string
          readOnly: true
          example: '0'
        tokenStatus:
          description: 'Indicates the status of the token. For Visa - A= Active for payment, I = Inactive for payment, S= Temporarily suspended for payments, D = Permanently deactivated for payments.'
          x-chase-dataelem: /204487/N/N
          type: string
          readOnly: true
          example: A
        debitTraceNumber:
          description: Identifies a reference number generated at transaction time.
          x-chase-dataelem: INTL/181360/N/N
          type: string
          readOnly: true
    networkResponseAccountUpdater:
      description: Account update information as returned by the network
      type: object
      properties:
        accountStatus:
          description: Contains response information related to Account Updater request
          type: string
          readOnly: true
          enum:
            - A
            - C
            - E
            - Q
        replacementCode:
          description: Indicates if replacement of any information has occurred
          type: boolean
          readOnly: true
        networkResponseCode:
          description: Network provided error or reason code
          type: string
          readOnly: true
    additionalData:
      description: Addition information receives from payment network.
      type: object
      properties:
        acquirerReferenceNumber:
          description: 'Contains identifier generated by the acquirer.  For Visa, this is the ARN.  For Mastercard, this is the ARD.'
          x-chase-dataelem: INTL/205659/N/N
          type: string
          readOnly: true
          maxLength: 30
          example: '1234567890123456'
        acquirerName:
          description: The label of the entity acting as the acquiring bank through the payment processing network during settlement to the cardholders bank (the issuer). This may be different from Firm in Gateway solution such as Stone and Elavon.
          type: string
        authorizationDate:
          description: '''The local date, in MMDD format, on which the transaction occurred'''
          x-chase-dataelem: INTL/171599/N/N
          type: string
          readOnly: true
        downgradeReasonCode:
          $ref: '#/components/schemas/downgradeReasonCode'
        electronicCommerceSecurityLevelCode:
          description: Contains the electronic commerce indicators representing the security level and cardholder authentication associated with the transaction.
          x-chase-dataelem: INTL/181226/N/N
          type: string
          readOnly: true
        electronicCommerceIndicator:
          $ref: '#/components/schemas/electronicCommerceIndicator'
        marketSpecificData:
          description: Codifies Visa's classification of the merchant's industry provided at the time of the authorization.
          x-chase-dataelem: INTL/203153/N/N
          type: string
          readOnly: true
        merchantAdviceCode:
          description: 'Codifies the reason for declining a MasterCard and Visa recurring payment transaction and the actions merchants can take to continue to serve their recurring payment customers.  Valid values:  01 ? New account information available. Obtain new accoun'
          type: string
          readOnly: true
        originalElectronicCommerceIndicator:
          description: Contains the original UCAF Collection Indicator sent by the acquirer in the Authorization Request message before the Identity Check downgrade or MDES SLI modification occurred.
          x-chase-dataelem: INTL/181506/N/N
          type: string
          readOnly: true
        originalElectronicCommerceSecurityLevelCode:
          description: Contains the original Security Level Indicators sent by the acquirer in the Authorization Request message before the Identity Check downgrade or MDES SLI modification occurred.
          x-chase-dataelem: INTL/181226/N/N
          type: string
          readOnly: true
        processingCode:
          description: 'Codifies a constructed data element that is composed of three fields:  1. Transaction type code - describes the specific transaction type;  2. Account type code 1 - describes the account type affected for debits ("from");  3. Account type code 2 - describes the account type affected for credits ("to").  Aligns to ISO 8583 field 3.'
          type: string
          readOnly: true
        productId:
          description: 'Codifies issuer-supplied value assigned by Mastercard and Visa user to track card-level activity by card account number.  Sample Visa values: A - Visa Traditional/NA C - Visa Signature I - Visa Commerce L - Visa Corporate  Sample MasterCard values: MCF - MasterCard Fleet Card MCW - World MasterCard MDS - Debit MasterCard MCO - MasterCard Corporate'
          type: string
          readOnly: true
        posConditionCode:
          description: 'Codifies additional information for the conditions present when the authorization occurred. Examples include Normal Transaction, Card Not Present, Suspicious Transaction.'
          x-chase-dataelem: INTL/171631/N/N
          type: string
          readOnly: true
        posEntryModeChanged:
          description: 'If the entry mode has changed, the Issuer will respond with the 1-byte POS Entry Mode Change (Y)'
          type: boolean
          readOnly: true
        posEnvironment:
          description: 'Codifies th type of periodic billing that the cardholder and merchant have agreed for goods and services, such as utility bills and magazines, or Installment payments. The value in this field indicates that the message is being used for an installment payment. Possible values are: Space - default R - Recurring Payment Transaction I - Installment Payment C - Credential on File'
          type: string
          readOnly: true
        posEntryMode:
          description: Codifies how payment information is captured during the exchange of goods and services at the time of purchase.
          x-chase-dataelem: INTL/200368/N/N
          type: string
          readOnly: true
        retrievalReferenceNumber:
          description: Identifies a unique number assigned to each transaction by the merchant acquiring host and must be used to perform a void transaction.
          x-chase-dataelem: INTL/202969/N/N
          type: string
          readOnly: true
        returnAci:
          description: Codifies the information regarding the authorization that is important to the identification of the actions taken at the time of the authorization to reduce fraud.
          x-chase-dataelem: INTL/203231/N/N
          type: string
          readOnly: true
        responseReasonCode:
          description: Codifies the source that approved or declined the authorization request of a transaction sent to the payment network association.
          type: string
          readOnly: true
        systemTraceAuditNumber:
          description: The System Trace Audit Number (STAN) is assigned by a transaction originator to assist in identifying a card transaction. The STAN remains unchanged for the life of the card transaction.
          type: string
          readOnly: true
        validationCode:
          description: 'CAVV Verification Service enables issuers or VisaNet to validate cardholders'' CAVVs resulting from issuers'' authentication decisions during online Verified by Visa (VbV) purchase sessions. Authentication requests occur when merchants, acquirers, and ssuers participate in VbV. CAVV validation results are in request and response. Field 44.13 contains CAVV validation code. If V.I.P. performs validation, result code is in request V.I.P.forwards to issuer for approval decision. If issuer performs validation, CAVV validation result code is in response.'
          type: string
          readOnly: true
    address:
      description: Address Object
      type: object
      writeOnly: true
      properties:
        line1:
          description: 'A portion of a party''s address which is the line of the unstructured (unparsed) geographic street address containing any of the following: house number, street name, street direction, street type, dwelling type and number, PO Box number, rural delivery route number.'
          x-chase-dataelem: PIDIRID/140029/N/N
          type: string
          maxLength: 40
          pattern: '^[^<>{}]*$'
          example: 123 Some Street
        line2:
          description: 'A portion of a party''s address which is the line of the unstructured (unparsed) geographic street address containing any of the following: house number, street name, street direction, street type, dwelling type and number, PO Box number, rural delivery route number.'
          x-chase-dataelem: PIDIRID/140029/N/N
          type: string
          maxLength: 40
          pattern: '^[^<>{}]*$'
          example: Apartment 3b
        city:
          description: A portion of a party's address which is the geographic area that is a municipality with legal power granted by a state/province charter.
          x-chase-dataelem: CNFDPI/140030/N/N
          type: string
          maxLength: 40
          pattern: '[\p{L}''. ]*'
          example: Nowhere
        state:
          description: 'Classifies a geographic area that represents a first level, legal and political subdivision of a country; for example, Virginia, Bavaria.'
          x-chase-dataelem: CNFDPI/148/N/N
          type: string
          minLength: 2
          maxLength: 3
          pattern: '[A-Za-z]*'
          example: FL
        postalCode:
          description: The portion of a party?s address that is the encoded representation of a geographic area to facilitate mail delivery services.
          x-chase-dataelem: PIDIRID/140031/N/N
          type: string
          minLength: 3
          maxLength: 12
          pattern: '^[a-zA-Z0-9]+(-|\s?)[a-zA-Z0-9]+$'
          example: '99999'
        countryCode:
          description: 'A code that identifies the Country, a Geographic Area, that is recognized as an independent political unit in world affairs. Note: This data element is a child of the Country Code CDE and valid values are based on ISO standards.'
          x-chase-dataelem: CNFDPI/149/N/N
          type: string
          maxLength: 3
          format: '^[A-Za-z]*$'
          example: USA
    responseStatus:
      description: 'The label given to the state of a response to a request submitted by a consumer through the Firm''s Application Program Interface (API) that matches a test case. Valid Values: ERROR,SUCCESS, DENIED'
      x-chase-dataelem: /MSDATAENG2-4514/N/N
      type: string
      enum:
        - SUCCESS
        - DENIED
        - ERROR
    messages:
      description: A list of errors and warnings.
      type: object
      required:
        - responseStatus
        - responseCode
      properties:
        responseStatus:
          $ref: '#/components/schemas/responseStatus'
        responseCode:
          $ref: '#/components/schemas/responseCode'
        responseMessage:
          $ref: '#/components/schemas/responseMessage'
        validationErrors:
          type: array
          description: Information about errors occurred in transaction validation
          items:
            $ref: '#/components/schemas/validationMessage'
        information:
          $ref: '#/components/schemas/information'
    information:
      description: A list of informational messages
      type: object
      properties:
        code:
          description: Codifies the instruction provided in the application
          type: string
          maxLength: 40
        message:
          description: Long explanation of the instruction provided in the application
          type: string
          maxLength: 120
    purchaseOrderNumber:
      description: The Purchase Order Number
      x-chase-dataelem: INTL/178308/N/N
      type: string
      pattern: '^[A-Za-z0-9.$@&amp;/\\-]*$'
      maxLength: 17
    merchantCategoryCode:
      description: MCC or Merchant Category Code
      x-chase-dataelem: INTL/7098/N/N
      type: string
      pattern: '^\d{4}$'
      minLength: 4
      maxLength: 4
      example: '4819'
    agreementId:
      description: System generated value used to uniquely identify a set of statements presented to the customer whom has acknowledged the acceptance in order to use the online systems.
      x-chase-dataelem: INTL/173580/N/N
      type: string
      minLength: 1
      maxLength: 100
    paymentAgreementExpiryDate:
      description: 'Designates the year (YYYY), month (MM), and day (D) at which the agreement with the payer to process payments expires. Used with recurring transaction.'
      x-chase-dataelem: INTL/MSDATAENG-1161/N/N
      type: string
      format: date
      example: '2020-09-20'
    email:
      description: Optional value for merchants to provide for a transaction
      x-chase-dataelem: PIDIRID/140224/N/N
      type: string
      minLength: 6
      maxLength: 60
      example: john.doe@email.xyz
      writeOnly: true
    cardTypeIndicators:
      description: 'The card type indicators provide additional information about the card. For example, if the card is a prepaid card and thus less likely to         support recurring payments or if the card is a healthcare or commercial  card.'
      type: object
      readOnly: true
      properties:
        issuanceCountryCode:
          $ref: '#/components/schemas/countryCodeText'
        isLevel3Eligible:
          description: Whether the card is eligible for Level 3 fields
          x-chase-dataelem: INTL/MSDATAENG2-6422/N/N
          type: boolean
          readOnly: true
        cardTypeCategory:
          $ref: '#/components/schemas/paymentBrandCardTypeCode'
        cardIssuerName:
          $ref: '#/components/schemas/cardIssuerName'
        isDurbinRegulated:
          description: Whether the card is regulated as per the Durbin Amendment
          x-chase-dataelem: INTL/203000/N/N
          type: boolean
          readOnly: true
        cardProductName:
          $ref: '#/components/schemas/cardProductName'
        cardProductTypes:
          type: array
          description: List of card products applicable for the account number.
          items:
            type: string
            enum:
              - COMMERCIAL
              - PAYROLL
              - HEALTHCARE
              - AFFLUENT_CATEGORY
              - SIGNATURE_DEBIT
              - PINLESS_DEBIT
              - PREPAID_RELOADABLE
    maskedAccountNumber:
      description: Identifies a concealed number associated with the card number recognized by various payment systems. This is typically concealed by storing only the first 6 and/or last 4 digits of the payment account number or some variation.
      x-chase-dataelem: HICNFD/206979/N/N
      type: string
      readOnly: true
      example: 123456XXXXXX9876
    authenticationValue:
      description: Base 64 encoded cryptogram received during authorization to verify that the integrity of data contained within a payment request matches what was originally authorized during authentication. This field is specifically used for card authorizations.
      x-chase-dataelem: /MSDATAENG2-1475/N/N
      type: string
      format: base64
      maxLength: 56
      writeOnly: true
    authentication:
      description: The authentication object allows you to opt in to additional security features like 3-D Secure
      type: object
      properties:
        threeDS:
          $ref: '#/components/schemas/threeDS'
        electronicCommerceIndicator:
          $ref: '#/components/schemas/electronicCommerceIndicator'
        authenticationValueResponse:
          $ref: '#/components/schemas/authenticationValueResponse'
        tokenAuthenticationResult:
          $ref: '#/components/schemas/tokenAuthenticationResult'
        tokenAuthenticationValue:
          description: Contains authentication value received from Payment Networks for network token transactions
          x-chase-dataelem: INTL/MSDATAENG2-1481/N/N
          type: string
          maxLength: 40
          format: base64
          writeOnly: true
        SCAExemptionReason:
          description: 'Codifies the justification why a transaction does not have to meet Strong Customer Authentication (SCA) requirements. SCA is a regulatory requirement to reduce fraud and make online payments more secure via two-factor authentication; an authentication based on the use of two or more elements categorized as knowledge (something only the user knows), possession (something only the user possesses) or inherence (something the user is).'
          x-chase-dataelem: INTL/205966/N/N
          type: string
          enum:
            - TRUSTED_MERCHANT
            - SECURE_CORPORATE_PAYMENT
            - TRANSACTION_RISK_ANALYSIS
            - LOW_VALUE_PAYMENT
            - MERCHANT_INITIATED_TRANSACTION
            - RECURRING_PAYMENT
            - SCA_DELEGATION
    threeDS:
      description: Contains information about payer authentication using 3-D Secure authentication
      type: object
      properties:
        authenticationValue:
          $ref: '#/components/schemas/authenticationValue'
        authenticationTransactionId:
          description: Identifier provided by the merchant plug in system (MPI) or scheme directory server during payer authentication using 3-D Secure authentication.
          type: string
        threeDSProgramProtocol:
          description: Indicates 3-D Secure program protocol used in the transaction.
          x-chase-dataelem: INTL/MSDATAENG2-1116/N/N
          type: string
          minLength: 0
          maxLength: 20
          example: '2'
        version1:
          $ref: '#/components/schemas/version1'
        version2:
          $ref: '#/components/schemas/version2'
    version1:
      description: Contains information about payer authentication using 3-D Secure authentication version 1
      type: object
      properties:
        threeDSVEResEnrolled:
          description: Contains value returned in the 'enrolled' field of the Verify Enrollment Response (VERes) message from the card scheme's Directory Server. Y=Authentication successful;  N=Authentication failed; U=Authentication unavailable;  A=Attempted authentication
          x-chase-dataelem: INTL/TBD/N/N
          type: string
          enum:
            - 'Y'
            - 'N'
            - U
            - A
        threeDSPAResStatus:
          description: Contains value returned in the transaction status field of the Payer Authentication Response (PARes) message from the card Issuer's Access Control Server (ACS). Y=Authentication successful ; N=Authentication failed ; U=Authentication unavailable ; A=Attempted authentication
          type: string
          enum:
            - 'Y'
            - 'N'
            - U
            - A
    version2:
      description: Contains information about payer authentication using 3-D Secure authentication version 2
      type: object
      properties:
        threeDSTransactionStatus:
          description: Contains value returned in Authentication Response Message (ARes). Y=Authentication successful ; N=Authentication failed ; U=Authentication unavailable ; A=Attempted authentication ;
          type: string
          enum:
            - 'Y'
            - 'N'
            - U
            - A
        threeDSTransactionStatusReasonCode:
          description: Contains code indicating the reason for the transaction status in threeDSTransactionStatus.
          type: string
          maxLength: 2
          example: '01'
    transactionTimestamp:
      description: 'Designates the hour, minute, seconds and date (if timestamp) or year, month, and date (if date) when the transaction (monetary or non-monetary) occurred.'
      x-chase-dataelem: INTL/175753/N/N
      type: string
    timestampReturned:
      description: 'Provides a timestamp (UTC). Designates the hour (hh), minute (mm), seconds (ss) and date (if timestamp) or year (YYYY), month (MM), and day (DD) (if date)'
      type: string
      readOnly: true
      example: '2018-12-21T09:30:15.987Z'
    requestId:
      description: Merchant identifier for the request. The value must be unique.
      x-chase-dataelem: INTL/MSDATAENG-605/N/N
      type: string
      maxLength: 40
      example: 10cc0270-7bed-11e9-a188-1763956dd7f6
    statementDescriptor:
      description: Provides textual information about charges or payments on statements. Using clear and accurate statement descriptors can reduce chargebacks and disputes.
      x-chase-dataelem: CNFD/206938/N/N
      type: string
      minLength: 4
      maxLength: 100
    ipAddress:
      description: IP Address from where the transaction is originating
      x-chase-dataelem: CNFDPI/180889/N/N
      type: string
      minLength: 0
      maxLength: 40
      example: 127.0.0.1
      writeOnly: true
    merchantReturnUrl:
      description: 'A reference to a web resource on the internet specifying its location on a computer network and a mechanism for retrieving.  In this context, this is the returned URL after payment process completion.'
      x-chase-dataelem: INTL/205718/N/N
      type: string
      readOnly: true
      minLength: 0
      maxLength: 120
      example: 'https://www.merchantecommerce.test'
    redirectUrl:
      description: Information on where consumer needs to be redirected for payment process completion. Ensure that the URL begins with 'https'
      x-chase-dataelem: INTL/205718/N/N
      type: string
      readOnly: true
      minLength: 0
      maxLength: 120
      example: 'https://www.examplebank.test/authentication'
    qrCodeUrl:
      description: Information on where consumer needs to be redirected for payment process completion. Ensure that the URL begins with either 'http' or 'https'
      x-chase-dataelem: INTL/205718/N/N
      type: string
      readOnly: true
      minLength: 0
      maxLength: 120
    barcodeUrl:
      description: 'A reference to a web resource on the internet specifying its location on a computer network and a mechanism for retrieving.  In this context, this is the URL provided by merchant for the barcode. Customer can complete the transaction by paying the transaction amount using barcode from the link.'
      x-chase-dataelem: INTL/205718/N/N
      type: string
      readOnly: true
      minLength: 0
      maxLength: 120
      example: 'https://apac-api.merchant.jpmorgan.com/v1/payments/transactions/tran_DELdydqcVH5vq/barcode'
    pdfUrl:
      description: 'A reference to a web resource on the internet specifying its location on a computer network and a mechanism for retrieving.  In this context, this is the URL provided by merchant for the payment document in PDF format. The document contain payment instruction to pay at store to complete the transaction.'
      x-chase-dataelem: INTL/205718/N/N
      type: string
      readOnly: true
      minLength: 0
      maxLength: 120
      example: 'https://apac-api.merchant.jpmorgan.com/v1/payments/transactions/tran_DELdydqcVH5vq/pdf'
    processorStatus:
      description: 'Codifies the state of the payment status from the payment processor. Examples include COMPLETED ,PAID, OVERPAID,ERRORED'
      type: string
      readOnly: true
      enum:
        - INITIATED
        - COMPLETED
        - REDIRECTED
        - RETURNED
        - UNDERPAID
        - OVERPAID
        - PAID
        - VOIDED
        - ERROR
        - EXPIRED
    paidAmount:
      description: Actual amount paid.
      x-chase-dataelem: CNFD/178290/N/N
      type: string
    paidDate:
      description: Date and time in which the voucher or ticket was paid.
      x-chase-dataelem: INTL/MSDATAENG-1114/N/N
      type: string
      example: '2018-12-21T09:30:15.987Z'
    risk:
      description: Response information for transactions
      type: object
      properties:
        requestFraudScore:
          description: Indicates the true/false value of whether or not the transaction need to be assessed for fraud check.
          x-chase-dataelem: /MSDATAENG2-6637/N/N
          type: boolean
        transactionRiskScore:
          $ref: '#/components/schemas/transactionRiskScore'
        tokenRiskScore:
          $ref: '#/components/schemas/tokenRiskScore'
        riskReasonCode:
          description: Codifies adverse action reason associated with the Risk Index Score for the transaction. This reason can be given with a adverse decision made using the Risk Index Score.
          x-chase-dataelem: CNFD/MSDATAENG2-2624/N/N
          type: string
          readOnly: true
          minLength: 0
          maxLength: 3
          example: '9'
    transactionRiskScore:
      description: Risk score for transaction
      x-chase-dataelem: INTL/MSDATAENG2-1469/N/N
      type: integer
      minimum: 0
      maximum: 100
      example: 42
    tokenRiskScore:
      description: Risk score for token
      x-chase-dataelem: INTL/203133/N/N
      type: integer
      minimum: 0
      maximum: 100
      example: 42
    par:
      description: 'A unique identifier associated with a specific cardholder primary account number (PAN) used to link a payment account represented by that PAN to affiliated payment tokens. This 29 character identification number can be used in place of sensitive consumer identification fields, and transmitted across the payments ecosystem to facilitate consumer identification.'
      x-chase-dataelem: INTL/MSDATAENG2-1474/N/N
      type: string
      minLength: 0
      maxLength: 29
      example: VI019876543210987654321098765
    authenticationValueResponse:
      description: Returned when more information about authentication is received from the  network
      type: object
      readOnly: true
      properties:
        code:
          $ref: '#/components/schemas/3dsCode'
        message:
          $ref: '#/components/schemas/3dsMessage'
    hostMessage:
      description: 'Message received from Issuer, network or processor. Can be blank'
      x-chase-dataelem: INTL/204008/N/N
      type: string
    phone:
      description: Phone number in ITU-T E.164 format. Country code and phone number (subscriber number) are mandatory values
      type: object
      writeOnly: true
      required:
        - phoneNumber
      properties:
        countryCode:
          description: 'The telephone dialing prefix for a member country in the International Telecommunication Union (ITU) that is defined by the ITU-T E.164 standard. The code is a combination of one, two or three digits identifying a specific country, countries in an integrated numbering plan, or a specific geographic area.'
          x-chase-dataelem: CNFDPI/140022/Y/N
          type: integer
          minimum: 1
          maximum: 999
          example: 1
        phoneNumber:
          description: 'A locator whose value identifies the formatted numeric address for routing voice or data communications via telephony, to reach a party. NOTE: Telephone number formats may vary; this field can include domestic and international telephone numbers.'
          x-chase-dataelem: PIDIRID/140004/Y/Y
          type: string
          maxLength: 12
          writeOnly: true
    validationMessage:
      description: Object containing information about transaction validation
      type: object
      properties:
        code:
          $ref: '#/components/schemas/code'
        message:
          $ref: '#/components/schemas/message'
        entity:
          $ref: '#/components/schemas/entity'
    code:
      description: Short informative code about error
      x-chase-dataelem: INTL/TBD/N/N
      type: string
    message:
      description: Long informative message about error
      x-chase-dataelem: INTL/204008/N/N
      type: string
    entity:
      description: The moniker given to the module or program where the error generated.
      type: string
    merchantSoftware:
      description: Contains information related to the merchant software
      type: object
      required:
        - companyName
        - productName
      properties:
        companyName:
          description: 'The label given to a formally organized or incorporated firm known as a legal entity. In this context, this is the company a merchant is sourcing its payment processing software from.'
          x-chase-dataelem: PIDIRID/171993/N/N
          type: string
          maxLength: 256
          pattern: '^[^<>{}]*$'
          example: Payment Company
        productName:
          description: The name of the product used for marketing purposes from a customer perspective. I. e. what the customer would recognize.
          type: string
          maxLength: 256
          pattern: '^[^<>{}]*$'
          example: Application Name
        version:
          description: 'Designates the unique state of computer software as it is developed and released. The version identifier can be a word, or a number, or both.'
          type: string
          maxLength: 50
          pattern: '^[^<>{}]*$'
          example: '1.235'
    panExpiry:
      description: Contains expiry for masked PAN if received from network
      type: object
      readOnly: true
      properties:
        month:
          $ref: '#/components/schemas/panMonth'
        year:
          $ref: '#/components/schemas/panYear'
    accountOnFile:
      description: 'The label given to indicate if the account number is stored, not stored, or is going to be stored by a merchant. Valid values: STORED NOT_STORED TO_BE_STORED'
      x-chase-dataelem: INTL/MSDATAENG2-497/N/N
      type: string
      default: NOT_STORED
      example: NOT_STORED
      enum:
        - NOT_STORED
        - STORED
        - TO_BE_STORED
    isAmountFinal:
      description: Indicates if the amount is final and will not change
      x-chase-dataelem: INTL/MSDATAENG2-502/N/N
      type: boolean
    installmentCount:
      description: Measures the number of recurring payments expected to be made by the customer over a scheduled period of time in order to pay the total amount charged.
      type: integer
      minimum: 1
      maximum: 99
    numberOfDeferrals:
      description: Specifies the number of month an installment payment can be postponed or suspended.
      x-chase-dataelem: INTL/MSDATAENG-1007/N/N
      type: integer
      minimum: 0
      maximum: 99
    planId:
      description: Contains the payment plan identifier.
      x-chase-dataelem: INTL/MSDATAENG-1008/N/N
      type: string
      maxLength: 50
      example: BANORTE_WITHOUT_INTEREST
    cardTypeName:
      description: Card name
      x-chase-dataelem: INTL/194533/N/N
      type: string
      readOnly: true
      maxLength: 40
      example: VISA
      enum:
        - VISA
        - MASTERCARD
        - AMERICAN_EXPRESS
        - HIPERCARD
        - ELO
        - DISCOVER
        - JCB
        - DINERS_CLUB
        - CHINA_UNION_PAY
        - CHASENET_CREDIT
        - CHASENET_SIGNATURE_DEBIT
        - OXXO
        - INTERNATIONAL_MAESTRO
    cardType:
      description: Abbreviation of card name
      x-chase-dataelem: INTL/194533/N/N
      type: string
      readOnly: true
      maxLength: 10
      example: VI
      enum:
        - VI
        - MC
        - AX
        - HC
        - EO
        - DI
        - JC
        - DC
        - CC
        - CZ
        - CR
        - OX
        - IM
    healthCheckResource:
      description: Contains health check information about a resource
      type: object
      properties:
        status:
          description: General status of all resources
          x-chase-dataelem: INTL/MSDATAENG-607/N/N
          type: string
          enum:
            - PASS
            - FAIL
            - WARN
          example: PASS
    dueDate:
      description: Date payment is due by
      type: string
      format: date
      example: '2020-09-20'
    boleto:
      description: Boleto payment information
      type: object
      required:
        - bankCode
        - type
        - uniqueNumber
        - dueDate
        - paidAmount
        - paidDate
        - documentNumber
        - ticketInstructions
      properties:
        bankCode:
          description: Indicates the bank issuing the Boleto
          x-chase-dataelem: INTL/MSDATAENG-1485/N/N
          type: string
          enum:
            - JPM
        type:
          description: Boleto type of Duplicata Mercantil or Boleto de Proposta
          type: string
          enum:
            - DM
            - BDP
        uniqueNumber:
          description: Number that uniquely identifies a Boleto for an account
          x-chase-dataelem: INTL/MSDATAENG-1104/N/N
          type: string
          minLength: 1
          maxLength: 120
        dueDate:
          $ref: '#/components/schemas/dueDate'
        paidAmount:
          $ref: '#/components/schemas/paidAmount'
        paidDate:
          $ref: '#/components/schemas/paidDate'
        documentNumber:
          description: Ticket identifier
          type: string
          minLength: 1
          maxLength: 16
        ticketInstructions:
          description: Ticket instructions
          type: string
          minLength: 1
          maxLength: 256
          example: Pay to maturity
        redirectUrl:
          $ref: '#/components/schemas/redirectUrl'
        qrCodeUrl:
          $ref: '#/components/schemas/qrCodeUrl'
        barcodeUrl:
          $ref: '#/components/schemas/barcodeUrl'
        pdfUrl:
          $ref: '#/components/schemas/pdfUrl'
        status:
          $ref: '#/components/schemas/processorStatus'
        expiryDate:
          description: 'Designates the year, month, and day in which the Convenience Store Payment document will no longer be recognized as a valid payment document to be utilized at the convenience store.'
          x-chase-dataelem: INTL/MSDATAENG2-1005/N/N
          type: string
          format: date
          example: '2020-09-20'
    encryptedPaymentHeader:
      description: header information for Encrypted Data from ApplePay or GooglePay
      type: object
      properties:
        ephemeralPublicKey:
          description: 'Provides textual information about a cipher key for exchanging data via an associated string or byte image. This is a public key generated by the merchant and shared with Firm. In this context, this key is called ephemeral for its short life span.'
          type: string
        publicKeyHash:
          description: This is the hash output using a hash function for the Ephemeral Public Key.
          type: string
          example: MUwkjyUBpyRiZTVMUrIzA6+SIrr9mV8nNct6YO0rGNg=
    encryptedPaymentBundle:
      description: Encrypted Data from ApplePay or GooglePay
      type: object
      writeOnly: true
      properties:
        encryptedPaymentHeader:
          $ref: '#/components/schemas/encryptedPaymentHeader'
        protocolVersion:
          description: 'Identifies a unique variation of an application based on developments or updates to an existing model for the software (a.k.a. Versioning). Version assignments typically include a major and minor category, assigned in an increasing order aligned with the software release dates.  In this context, this is the version number of Elliptic Curve Cryptography (ECC) which is akey-based technique for encrypting data. ECC focuses on pairs of public and private keys for decryption and encryption of web traffic.'
          x-chase-dataelem: INTL/200809/N/N
          type: string
        signature:
          description: This is the virtual signature data of the payment and header data. The signature information let the receiver know that the data is indeed sent by the sender. The signature is created using sender's key pair.
          type: string
        encryptedPayload:
          description: 'The message body of a transmitted message containing the actual data for a specific purpose. This is the essential data that is being carried within a packet or other transmitted unit.  In this context, the message details have been rendered unreadable by general means through the application of a given set of instructions and a key.'
          x-chase-dataelem: HIGHPI/MSDATAENG2-388/Y/Y
          type: string
          example: IzxSm6YWehmlLvk5HY/rsl4hhWuorOG7R6ERP0fqzTokMhS5JtyAU8ajPIu/aHcbOxYQOhvk/K+3n6N7SbEKgSuT100YFmeIKh3IkSLa4u1/1Y4Z9y5bqZFPxd8IcQnuR8HZKgJDHCXQzDDYP4JBMtqZQzRztzsIfa4eoOnGuZCc2s+WxGap4iv92vPj8tAHonvSE9t0ByUCBLgfvu25GR0eJb6UM8nBvxP2/qBSElOuyLo80enrZ6tlp3xtpBEV8oeOc9iLSmalayfD7JQxZXd2cWA/sZPWn4VGIj7Dt05NYE/iFZrw2VOa2hOJ4/4dOGS1KJzhw+RPRufhadAF96k7O3LwbMphcM9sZLN/Y/LSqVFGzIq6ZlrnOwcxzvjNqw4ccNl4v3eehL4TRRgfF3LirV56BeADzJmq0pB3W/vu
    applepay:
      description: Use is for encrypted bundles for web or Internet acceptance of digital device wallets such as Apple Pay
      type: object
      properties:
        latLong:
          $ref: '#/components/schemas/latLong'
        encryptedPaymentBundle:
          $ref: '#/components/schemas/encryptedPaymentBundle'
    latLong:
      description: Identifies the latitude and longitude coordinates of the digital device when it is being provisioned. Information is expressed in the order of latitude then longitude with values rounded to the nearest whole digit.
      x-chase-dataelem: PIDIRID/193844/N/N
      type: string
      minLength: 3
      maxLength: 21
      example: '1,1'
    googlepay:
      description: Use is for encrypted bundles for web or Internet acceptance of digital device wallets such as Google Pay
      type: object
      properties:
        latLong:
          $ref: '#/components/schemas/latLong'
        encryptedPaymentBundle:
          $ref: '#/components/schemas/encryptedPaymentBundle'
    fullName:
      description: Name of accountholder
      x-chase-dataelem: PIDIRID/140103/Y/Y
      type: string
      pattern: '[A-Za-z''''. ]*'
      minLength: 4
      maxLength: 70
      example: Jane Doe
      writeOnly: true
    accountHolderNationalId:
      description: An identifier for the consumer or business assigned by a government authority.
      x-chase-dataelem: GOVTID/194234/N/N
      type: string
      minLength: 1
      maxLength: 30
      writeOnly: true
    fundingStatus:
      description: Specifies the funding status of the transaction
      x-chase-dataelem: INTL/204072/N/N
      type: string
      readOnly: true
    isVoid:
      description: Void a payment
      x-chase-dataelem: INTL/MSDATAENG2-1467/N/N
      type: boolean
      example: false
    preferredLanguage:
      description: Language preference indicated by consumer for pages displayed. Using language tags indicated in RFC5646.
      x-chase-dataelem: HIGHPI/140086/N/N
      type: string
      minLength: 2
      maxLength: 36
    requestAccountUpdater:
      description: Enrolled merchants may request real-time Account Updater service by indicating TRUE for eligible recurring or stored transactions and bypass service by indicating FALSE.
      x-chase-dataelem: INTL/207889/N/N
      type: boolean
      example: true
      writeOnly: true
    countryCodeText:
      description: 'Uniquely represents a firm-recognized geopolitical area, including the ISO 3166 alpha 2-character country codes and other firm-created country codes. In this context, this is the ISO alphabetic country code, e.g. USA = United States'
      x-chase-dataelem: INTL/140034/N/N
      type: string
      readOnly: true
    paymentBrandCardTypeCode:
      description: 'Codifies a high level classification associated with the card account that could indicate how the issuer account is funded or used, e.g. Debit, Credit, Prepaid, Single Use.'
      type: string
      readOnly: true
      enum:
        - CREDIT_CARD
        - DEBIT_CARD
        - PREPAID_CARD
        - CHARGE_CARD
        - DEFERRED_DEBIT
        - NON_MASTERCARD
    cardProductName:
      description: 'Lable given to the primary processing network on which the account can make credit transactions. It also specifies the product types that VISA and MasterCard use to classify accounts for reporting. Note: There are some codes that are used only by Common Profit Book (CPB). Within the CPB, the existing code is replaced based on information from MasterCard and Visa. Formerly known as Association Product Code.'
      x-chase-dataelem: INTL/14/N/N
      type: string
    cardIssuerName:
      description: 'The label given to the issuer of a card-based payment account. The term "issuer" may refer to either the payment brand itself, as for the American Express and Discover payment brands, or the issuer will be a financial institution authorized to issue cards with the payment brand logo, as is the case for Visa and MasterCard.'
      type: string
      readOnly: true
    isBillPayment:
      description: 'Indicates whether or not the transaction is identified as a bill payment, prearranged between the cardholder and the merchant.'
      x-chase-dataelem: INTL/202961/N/N
      type: boolean
    downgradeReasonCode:
      description: Optional field containing the network provided reason code indicating why the authorization did not qualify for CPS
      x-chase-dataelem: INTL/202964/N/N
      type: string
    recurring:
      description: Recurring Payment Object
      type: object
      properties:
        recurringSequence:
          $ref: '#/components/schemas/recurringSequence'
        agreementId:
          $ref: '#/components/schemas/agreementId'
        paymentAgreementExpiryDate:
          $ref: '#/components/schemas/paymentAgreementExpiryDate'
    originalTransactionId:
      description: Identifies a unique occurrence of a transaction.
      x-chase-dataelem: INTL/161034/N/N
      type: string
    paymentMethodType:
      description: paymentType
      type: object
      properties:
        card:
          $ref: '#/components/schemas/card'
        boleto:
          $ref: '#/components/schemas/boleto'
        googlepay:
          $ref: '#/components/schemas/googlepay'
        applepay:
          $ref: '#/components/schemas/applepay'
    merchantOrderNumber:
      description: 'A unique merchant assigned identifier for the confirmation of goods and/or services purchased. The merchant order provides the merchant a reference to the prices, quantity and description of goods and/or services to be delivered for all transactions included in the sale.'
      x-chase-dataelem: INTL/203343/N/N
      type: string
      pattern: '[A-Za-z0-9 .-]*'
      minLength: 1
      maxLength: 40
      example: X1234
    accountNumber:
      description: Identifies a unique occurrence of a payment account.
      x-chase-dataelem: HIGHPI/197/N/N
      type: string
      maxLength: 19
      writeOnly: true
    retailAddenda:
      description: Retail inductry specific attributes.
      type: object
      properties:
        purchaseOrderNumber:
          $ref: '#/components/schemas/purchaseOrderNumber'
        orderDate:
          description: 'Designates the year, month, and day the request to purchase a service(s) or good(s) took place.'
          x-chase-dataelem: INTL/168282/N/N
          type: string
        taxAmount:
          $ref: '#/components/schemas/taxAmount'
        isTaxable:
          $ref: '#/components/schemas/isTaxable'
        level3:
          $ref: '#/components/schemas/level3'
        gratuityAmount:
          $ref: '#/components/schemas/gratuityAmount'
    refundPaymentMethodType:
      description: Object with one of the payment method type applicable for refund processing
      type: object
      properties:
        card:
          $ref: '#/components/schemas/refundCard'
        transactionReference:
          $ref: '#/components/schemas/transactionReference'
    verificationPaymentMethodType:
      description: Object with one of the payment method type applicable for verification processing
      type: object
      properties:
        card:
          $ref: '#/components/schemas/verificationCard'
    taxAmount:
      description: Specifies the monetary value amount assessed to the transaction identified as Tax.
      x-chase-dataelem: CNFD/160253/N/N
      type: integer
      format: int64
      minimum: 0
      maximum: 999999999999
      example: 1234
    tokenAuthenticationResult:
      description: Returned when more information about token authentication is received from the network
      type: object
      readOnly: true
      properties:
        code:
          $ref: '#/components/schemas/resultCode'
        message:
          $ref: '#/components/schemas/resultMessage'
    remainingRefundableAmount:
      description: This is the amount of the transaction that is currently available for refunds.  It takes into account the original transaction amount as well as any previous refunds that were applied to the transaction.
      x-chase-dataelem: CNFD/MSDATAENG-1160/N/N
      type: integer
      format: int64
      minimum: 0
      maximum: 999999999999
      example: 1234
    accountHolder:
      description: Card owner properties
      type: object
      properties:
        referenceId:
          $ref: '#/components/schemas/accountHolderReferenceId'
        consumerIdCreationDate:
          description: 'Designates the century, year, month and day that a merchant''s customer profile has been first defined.'
          x-chase-dataelem: INTL/MSDATAENG2-500/N/N
          type: string
          format: date
          example: '2020-09-20'
        fullName:
          $ref: '#/components/schemas/fullName'
        email:
          $ref: '#/components/schemas/email'
        mobile:
          $ref: '#/components/schemas/phone'
        phone:
          $ref: '#/components/schemas/phone'
        IPAddress:
          $ref: '#/components/schemas/ipAddress'
        billingAddress:
          $ref: '#/components/schemas/address'
        nationalId:
          $ref: '#/components/schemas/accountHolderNationalId'
    redirectedPayment:
      description: Redirected Payment attributes
      type: object
      properties:
        merchantReturnUrl:
          $ref: '#/components/schemas/merchantReturnUrl'
        redirectUrl:
          $ref: '#/components/schemas/redirectUrl'
        timestampReturned:
          $ref: '#/components/schemas/timestampReturned'
    refundCard:
      description: Card payment instrument for refund
      type: object
      required:
        - accountNumber
      properties:
        expiry:
          $ref: '#/components/schemas/expiry'
        cardTypeName:
          $ref: '#/components/schemas/cardTypeName'
        cardType:
          $ref: '#/components/schemas/cardType'
        accountNumber:
          $ref: '#/components/schemas/accountNumber'
        maskedAccountNumber:
          $ref: '#/components/schemas/maskedAccountNumber'
        cardTypeIndicators:
          $ref: '#/components/schemas/cardTypeIndicators'
        networkResponse:
          $ref: '#/components/schemas/networkResponse'
        walletProvider:
          description: 'Identifies the organization who manages the e-wallet for a consumer. The actual e-wallet management responsibilities may include hosting, accessing, communicating, and/or updating all or some of the customer data associated with the e-wallet.  An E-wallet is an application that is created on the mobile device to interact with the Point of Sale (POS) device as a catalyst for a transaction. This value may be sent to the Firm (as in Visa Tokenization) or created by the Firm.'
          x-chase-dataelem: INTL/193113/N/N
          type: string
          enum:
            - APPLE_PAY
            - GOOGLE_PAY
        originalNetworkTransactionId:
          $ref: '#/components/schemas/originalNetworkTransactionId'
        isBillPayment:
          $ref: '#/components/schemas/isBillPayment'
        authentication:
          $ref: '#/components/schemas/refundAuthentication'
        preferredPaymentNetworkNameList:
          $ref: '#/components/schemas/preferredPaymentNetworkNameList'
        merchantSalesChannelName:
          $ref: '#/components/schemas/merchantSalesChannelName'
        merchantPreferredRouting:
          $ref: '#/components/schemas/merchantPreferredRouting'
        paymentTokens:
          type: array
          readOnly: true
          description: List of payment tokens for the transaction
          items:
            $ref: '#/components/schemas/paymentToken'
    refundAuthentication:
      description: The authentication object allows you to opt in to additional security features specific for refund
      type: object
      properties:
        electronicCommerceIndicator:
          $ref: '#/components/schemas/electronicCommerceIndicator'
        tokenAuthenticationResult:
          $ref: '#/components/schemas/tokenAuthenticationResult'
        tokenAuthenticationValue:
          description: Contains authentication value received from Payment Networks for network token transactions
          x-chase-dataelem: INTL/MSDATAENG2-1481/N/N
          type: string
          maxLength: 40
          format: base64
          writeOnly: true
    accountHolderInformation:
      description: Information about the card Account Holder for which fraud checking is performed.
      type: object
      properties:
        deviceIPAddress:
          description: 'A unique string of numbers separated by periods that identifies each device using the Internet Protocol (IP) to communicate over a network.  An IP address is assigned to every single computer, printer, switch, router or any other device that is part of a TCP/IP-based network which allows users to send and receive data. The numerals in an IP address are divided into two parts:  1) The network part specifies which networks this address belongs to and 2) The host part further pinpoints the exact location. In this context, this is the IP address of the devices associated with the transaction.'
          x-chase-dataelem: CNFDPI/180889/N/N
          type: string
        birthDate:
          description: Specifies the year month and day on which the individual was born.
          x-chase-dataelem: CNFDPI/140026/Y/N
          type: string
          format: date
          example: '2000-09-20'
          writeOnly: true
        driverLicenseNumber:
          description: 'A unique identifier assigned by a government agency that is not used by a Tax Authority to administer tax laws or by another government body to administer social and government programs. It may be used in conjunction with the party non tax government issued identifier type code. Examples include Driver''s License number, green card id, and Passport number.'
          x-chase-dataelem: GOVTID/194234/N/N
          type: string
          writeOnly: true
        addressCountryCode:
          description: 'A code that identifies the Country, a Geographic Area, that is recognized as an independent political unit in world affairs. Note: This data element is a child of the Country Code CDE and valid values are based on ISO standards. In this context, this is the country code of the consumer making the purchase.'
          x-chase-dataelem: CNFDPI/149/N/N
          type: string
          readOnly: true
        email:
          $ref: '#/components/schemas/email'
        fullName:
          $ref: '#/components/schemas/fullName'
        referenceId:
          $ref: '#/components/schemas/accountHolderReferenceId'
        consumerIdCreationDate:
          description: 'Designates the century, year, month and day that a merchant''s customer profile has been first defined.'
          x-chase-dataelem: INTL/MSDATAENG2-500/N/N
          type: string
        phone:
          $ref: '#/components/schemas/phone'
        billingAddress:
          $ref: '#/components/schemas/address'
    verificationCard:
      description: Card payment instrument for card verification
      type: object
      properties:
        accountNumberType:
          description: Codifies the type of payment method account number used for the payment transaction.
          x-chase-dataelem: INTL/MSDATAENG2-8744/N/N
          type: string
          enum:
            - PAN
            - NETWORK_TOKEN
            - DEVICE_TOKEN
            - SAFETECH_TOKEN
            - SAFETECH_ENCRYPTION
        cvv:
          description: Card verification value (CVV/CV2)
          x-chase-dataelem: INTL/177538/N/N
          type: string
          minLength: 3
          maxLength: 6
          pattern: '^\d{3,6}$'
          writeOnly: true
        expiry:
          $ref: '#/components/schemas/expiry'
        cardTypeName:
          $ref: '#/components/schemas/cardTypeName'
        cardType:
          $ref: '#/components/schemas/cardType'
        accountNumber:
          $ref: '#/components/schemas/accountNumber'
        maskedAccountNumber:
          $ref: '#/components/schemas/maskedAccountNumber'
        cardTypeIndicators:
          $ref: '#/components/schemas/cardTypeIndicators'
        networkResponse:
          $ref: '#/components/schemas/networkResponse'
        walletProvider:
          description: 'Identifies the organization who manages the e-wallet for a consumer. The actual e-wallet management responsibilities may include hosting, accessing, communicating, and/or updating all or some of the customer data associated with the e-wallet.  An E-wallet is an application that is created on the mobile device to interact with the Point of Sale (POS) device as a catalyst for a transaction. This value may be sent to the Firm (as in Visa Tokenization) or created by the Firm.'
          x-chase-dataelem: INTL/193113/N/N
          type: string
          enum:
            - APPLE_PAY
            - GOOGLE_PAY
        originalNetworkTransactionId:
          $ref: '#/components/schemas/originalNetworkTransactionId'
        isBillPayment:
          $ref: '#/components/schemas/isBillPayment'
        authentication:
          $ref: '#/components/schemas/authentication'
        paymentTokens:
          type: array
          readOnly: true
          description: List of payment tokens for the transaction
          items:
            $ref: '#/components/schemas/paymentToken'
        encryptionIntegrityCheck:
          $ref: '#/components/schemas/encryptionIntegrityCheck'
    hostReferenceId:
      description: Identifies unique identifier generated by the acquirer processing system and return to merchant for reference purposes.
      x-chase-dataelem: INTL/MSDATAENG2-6315/N/N
      type: string
    partialAuthorizationSupport:
      description: 'Indicates that the issuer has provided the merchant an authorization for a portion of the amount requested. This service provides an alternative to receiving a decline when the available card balance is not sufficient to approve a transaction in full.In this context, this indicate if merchant support parial authorization.'
      x-chase-dataelem: INTL/MSDATAENG2-8741/N/N
      type: string
      enum:
        - SUPPORTED
        - NOT_SUPPORTED
    isCapture:
      description: '(Deprecated) For auth only, send isCapture=false. For sale or update an authorized payment to capture, send isCapture=true.'
      x-chase-dataelem: INTL/MSDATAENG2-1121/N/N
      type: boolean
    tokenServiceResponseMessage:
      description: Long explanation of response Message received from token service
      x-chase-dataelem: /MSDATAENG2-621/N/N
      type: string
      readOnly: true
    tokenServiceResponseCode:
      description: Short explanation of response Code
      x-chase-dataelem: /MSDATAENG2-4513/N/N
      type: string
      readOnly: true
    tokenNumber:
      description: 'The token number is a secure surrogate value generated for an account number in a payment transaction. The token is substituted for the card number or primary account number (PAN), Demand Deposit Account (DDA) Number or other payment account and is used to process and identify transactions originating from that account.'
      x-chase-dataelem: INTL/175086/N/N
      type: string
      readOnly: true
    tokenProvider:
      description: The label given to a provider who creates the digital token for cards.
      x-chase-dataelem: INTL/MSDATAENG2-8754/N/N
      type: string
      readOnly: true
      enum:
        - NETWORK
        - SAFETECH
    level3:
      description: Level 3 data provides commercial shoppers with additional information about purchases on their card statements.
      type: object
      properties:
        totalShippingAmount:
          description: Specifies the monetary value to be paid for the postage and related transportation to get a package from the shipping carrier to the consumer for all items purchased.
          x-chase-dataelem: CNFD/300122/N/N
          type: integer
          format: int64
        dutyAmount:
          description: 'Specifies the monetary value for an additional tax levied or tariff charged against the purchase of goods or services imported from another country. Taxes or tariffs (duties) are also charged for some forms of exports. The customs authorities for a country are usually the taxing body, and duties are enforceable by law. Synonyms include but are not limited to: tax, toll, excise, levy, charge, rate, fee, countervail, customs and price list.'
          x-chase-dataelem: INTL/193981/N/N
          type: integer
          format: int64
        shipToAddressPostalCode:
          description: The portion of a party?s address that is the encoded representation of a geographic area to facilitate mail delivery services.
          x-chase-dataelem: PIDIRID/140031/N/N
          type: string
        shipToAddressCountryCode:
          description: 'A code that identifies the Country, a Geographic Area, that is recognized as an independent political unit in world affairs. Note: This data element is a child of the Country Code CDE and valid values are based on ISO standards.'
          x-chase-dataelem: CNFDPI/149/N/N
          type: string
        shipFromAddressPostalCode:
          description: The portion of a party?s address that is the encoded representation of a geographic area to facilitate mail delivery services.
          x-chase-dataelem: PIDIRID/140031/N/N
          type: string
        totalTransactionDiscountAmount:
          description: 'Specifies the monetary value to which the merchant applied a reduction (e.g., percentage or fixed amount) to a single line item of the purchase, the total purchase amount, or the tax portion of the transaction. If the reduction is for the taxable portion of the transaction, then the monetary value of the tax levied becomes a fixed purchase price reduction for the total transaction and the purchaser; yet the tax is still levied and collected against the reduced purchase amount and reported to the taxing body.'
          x-chase-dataelem: CNFD/168267/N/N
          type: integer
          format: int64
        valueAddedTaxAmount:
          description: 'Specifies the monetary value of the Value Added Tax (VAT) charged for either a line item or an entire transaction. VAT is a consumption tax levied on the sale of goods and services (a.k.a. Goods and Services Tax (GST)). VAT is an indirect tax, in that the tax is collected from someone other than the person who actually bears the cost of the tax.'
          x-chase-dataelem: CNFD/181319/N/N
          type: integer
          format: int64
        valueAddedTaxPercent:
          description: 'Specifies the fixed ratio applied to the transaction for Value Added Tax for a line item or an entire transaction. VAT is a consumption tax levied on the sale of goods and services (a.k.a. Goods and Services Tax (GST)). VAT is an indirect tax, in that the tax is collected from someone other than the person who actually bears the cost of the tax.'
          x-chase-dataelem: INTL/181320/N/N
          type: string
        shippingValueAddedTaxPercent:
          description: 'Specifies the fixed ratio applied to the transaction for Value Added Tax for a line item or an entire transaction. VAT is a consumption tax levied on the sale of goods and services (a.k.a. Goods and Services Tax (GST)). VAT is an indirect tax, in that the tax is collected from someone other than the person who actually bears the cost of the tax.'
          x-chase-dataelem: INTL/181320/N/N
          type: string
        orderDiscountTreatmentCode:
          description: Indicates how the merchant is managing discounts.
          x-chase-dataelem: INTL/MSDATAENG2-9983/N/N
          type: string
        valueAddedTaxInvoiceReferenceNumber:
          description: Identifies the additional subelement used to identify the value-added tax (VAT) invoice or tax receipt.
          x-chase-dataelem: INTL/168322/N/N
          type: string
        shippingValueAddedTaxAmount:
          description: 'Specifies the monetary value of the Value Added Tax (VAT) charged for either a line item or an entire transaction. VAT is a consumption tax levied on the sale of goods and services (a.k.a. Goods and Services Tax (GST)). VAT is an indirect tax, in that the tax is collected from someone other than the person who actually bears the cost of the tax.'
          x-chase-dataelem: CNFD/181319/N/N
          type: integer
          format: int64
        partyTaxGovernmentIssuedIdentifier:
          description: An identifier assigned by a government agency that is used by a Tax Authority to administer tax laws or by another government body to administer social and government programs.
          x-chase-dataelem: GOVTID/7124/N/N
          type: string
        alternateTaxAmount:
          description: The amount added to the transaction for taxes.
          x-chase-dataelem: CNFD/207694/N/N
          type: integer
          format: int64
        lineItems:
          type: array
          description: List Of line Items
          items:
            $ref: '#/components/schemas/lineItem'
        transactionAdvices:
          type: array
          description: List of transaction advices from American Express
          items:
            $ref: '#/components/schemas/transactionAdvice'
    lineItem:
      description: Line Item data within the Level 3
      type: object
      properties:
        lineItemDescriptionText:
          description: Provides detailed information regarding specific goods or services that have been procured and for which payment has been requested.
          x-chase-dataelem: INTL/178282/N/N
          type: string
        merchantProductIdentifier:
          description: A unique merchant assigned identifier for an item or service offered for sale by the Merch
          x-chase-dataelem: INTL/300133/N/N
          type: string
        itemComodityCode:
          description: Codifies the category the item being purchased belongs in a standardized commodity group as defined by the card acceptor.
          x-chase-dataelem: INTL/168318/N/N
          type: string
        lineItemUnitQuantity:
          description: 'Enumerates the volume (quantity) of each individual product type included in the transaction. The quantity, unit of measure and the line item price is used to calculate the aggregated purchase amount for each line item. In some cases, quantity can include a fraction or decimal places to allow for items such as hours of service provided, or a pound portion of goods.'
          x-chase-dataelem: INTL/193982/N/N
          type: string
        lineItemUnitofMeasureCode:
          description: 'Codifies the method used for computing the size, length, magnitude or other form of good, service or other measurement, expressed as a number or measure (e.g., drum, box, tote, bucket) or quantity (e.g., KTM = Kilometer, LBR = pound, MIN = minute). It is used in combination with a Line Item Product Type Count and Line Item Price to calculate the purchase amount for that line item in a transaction'
          x-chase-dataelem: INTL/193985/N/N
          type: string
        unitPriceAmount:
          description: Specifies the monetary value of the per-item cost of a good or service.
          x-chase-dataelem: INTL/178337/N/N
          type: integer
          format: int64
        taxInclusiveLineItemTotalAmount:
          description: Specifies the monetary value (inclusive of tax) for the price of the product or service multiplied by the quantity of the items purchased recorded in the transaction addendum data.
          x-chase-dataelem: CNFD/MSDATAENG2-9978/N/N
          type: integer
          format: int64
        transactionDiscountAmount:
          description: 'Specifies the monetary value to which the merchant applied a reduction (e.g., percentage or fixed amount) to a single line item of the purchase, the total purchase amount, or the tax portion of the transaction. If the reduction is for the taxable portion of the transaction, then the monetary value of the tax levied becomes a fixed purchase price reduction for the total transaction and the purchaser; yet the tax is still levied and collected against the reduced purchase amount and reported to the taxing body.'
          x-chase-dataelem: CNFD/168267/N/N
          type: integer
          format: int64
        purchaseTransactionDiscountPercent:
          description: 'Specifies the ratio of the reduction amount applied by the merchant (e.g., based on a percentage or fixed amount) to the purchase amount on a transaction. Discount percentages could be calculated at individual line item, or total transaction levels.'
          x-chase-dataelem: INTL/204399/N/N
          type: string
        lineItemDiscountTreatmentCode:
          description: 'Indicates how the merchant is handling discount at line item level. Valid value:  0 ? No line level discount  1 ? Tax calculated on post-discount line item total  2 ? Tax calculated on pre-discount line item total'
          x-chase-dataelem: INTL/MSDATAENG2-9979/N/N
          type: string
        lineItemDetailCode:
          description: codifies type of line item detail record.
          x-chase-dataelem: INTL/MSDATAENG2-9980/N/N
          type: string
        lineItemTaxIndicator:
          description: Indicates whether tax amount is included in item amount.
          x-chase-dataelem: INTL/MSDATAENG2-9981/N/N
          type: boolean
        lineItemDiscountIndicator:
          description: Indicates whether the amount is discounted.
          x-chase-dataelem: INTL/MSDATAENG2-9982/N/N
          type: boolean
        lineItemTaxes:
          type: array
          description: List Of line Items Tax Information
          items:
            $ref: '#/components/schemas/lineItemTax'
    lineItemTax:
      description: Tax information in the Line Item data within the Level 3.
      type: object
      properties:
        taxTypeCode:
          description: 'Codifies the form of tax applied to a transaction (e.g., 01 = Federal/National Sales Tax, 11 = Goods and Services Tax (GST), VA = Value Added Tax (VAT)).'
          x-chase-dataelem: /193136/N/N
          type: string
        lineItemTaxAmount:
          description: The amount added to the transaction for taxes.
          x-chase-dataelem: CNFD/207694/N/N
          type: integer
          format: int64
        taxPercent:
          description: Specifies the ratio of the tax levied by a governmental authority on a product or service.
          x-chase-dataelem: INTL/300214/N/N
          type: string
    transactionAdvice:
      description: Transaction advice information for Amex transaction
      type: object
      properties:
        transactionAdviceText:
          description: Textual information containing Level 3 data for American Express Advice Addendum
          x-chase-dataelem: INTL/MSDATAENG2-9985/N/N
          type: string
    captureMethod:
      description: 'To capture via separate API call, send captureMethod= ?Manual.? For immediate capture, send captureMethod= ?Now.? For automated delayed capture based on merchant profile setting (default is 120 minutes), send captureMethod= ?Delayed.?'
      x-chase-dataelem: INTL/205836/N/N
      type: string
      enum:
        - NOW
        - DELAYED
        - MANUAL
    gratuityAmount:
      description: Specifies the monetary value paid by the consumer over and above the payment due for service.
      x-chase-dataelem: CNFD/MSDATAENG-1255/N/N
      type: integer
      format: int64
      minimum: 0
      maximum: 999999999999
      example: 234
    softMerchant:
      description: Soft merchant information is passed to the card association along with the transaction. This soft merchant information may also be used for cases where smaller businesses or franchise outlets are making a sale in which a merchant aggregator or payment facilitatorprocesses the payment transaction on their behalf.
      type: object
      properties:
        name:
          description: 'The label given to the merchant name as it appears on the account holder''s statement. This soft merchant name may be used for statement and reporting consistency, and to help reduce disputes because it is more recognizable name to the account holder. The merchant name typically is defaulted to the merchant''s Doing Business as Name (DBA name) as stored in the Firm''s merchant set up system. However, this default DBA name may be overridden on the transaction for certain merchants such as aggregators and petroleum merchants. This override is only allowed when there is a flag set to enable the merchant to send soft merchant information to the Firm. This soft merchant information is passed to the card association along with the transaction. This soft merchant information may also be used for cases where smaller businesses or franchise outlets are making a sale in which a merchant aggregator or payment facilitator processes the payment transaction on their behalf.'
          x-chase-dataelem: INTL/207289/N/N
          type: string
        phone:
          description: Soft Merchant phone number
          x-chase-dataelem: PIDIRID/205356/N/N
          type: string
        email:
          description: Soft merchant email address
          x-chase-dataelem: INTL/207624/N/N
          type: string
        url:
          description: Soft merchant URL
          x-chase-dataelem: PIDIRID/205356/N/N
          type: string
        address:
          $ref: '#/components/schemas/address'
        merchantPurchaseDescription:
          description: 'Provides textual information provided by the merchant that is specific to their internal systems or processing regarding the items, servicing or sourcing related to the transaction.'
          x-chase-dataelem: INTL/160245/N/N
          type: string
    paymentToken:
      description: Token Information for the payment transaction
      type: object
      properties:
        tokenProvider:
          $ref: '#/components/schemas/tokenProvider'
        tokenNumber:
          $ref: '#/components/schemas/tokenNumber'
        responseStatus:
          $ref: '#/components/schemas/responseStatus'
        tokenServiceResponseMessage:
          $ref: '#/components/schemas/tokenServiceResponseMessage'
        tokenServiceResponseCode:
          $ref: '#/components/schemas/tokenServiceResponseCode'
    fraudCheckRequest:
      description: Object for passing fraud check request parameters
      type: object
      required:
        - amount
        - currency
        - paymentMethodType
      properties:
        amount:
          $ref: '#/components/schemas/amount'
        currency:
          $ref: '#/components/schemas/currency'
        fraudScore:
          $ref: '#/components/schemas/fraudScore'
        accountHolder:
          $ref: '#/components/schemas/accountHolderInformation'
        paymentMethodType:
          $ref: '#/components/schemas/fraudCheckPaymentMethodType'
        shipTo:
          $ref: '#/components/schemas/fraudShipTo'
        merchant:
          $ref: '#/components/schemas/merchant'
    fraudCheckResponse:
      description: Responses for the fraud check
      type: object
      properties:
        transactionId:
          $ref: '#/components/schemas/transactionId'
        requestId:
          $ref: '#/components/schemas/requestId'
        riskDecision:
          $ref: '#/components/schemas/riskDecision'
        riskElement:
          $ref: '#/components/schemas/riskElement'
        hostReferenceId:
          description: Identifies unique identifier generated by the acquirer processing system and return to merchant for reference purposes.
          x-chase-dataelem: INTL/MSDATAENG2-6315/N/N
          type: string
        responseStatus:
          $ref: '#/components/schemas/responseStatus'
        responseCode:
          $ref: '#/components/schemas/responseCode'
        responseMessage:
          $ref: '#/components/schemas/responseMessage'
        hostMessage:
          $ref: '#/components/schemas/hostMessage'
        merchant:
          $ref: '#/components/schemas/merchant'
    riskDecision:
      description: Object containing Risk Decision information.
      type: object
      properties:
        fraudRiskScore:
          description: industryType
          x-chase-dataelem: INTL/MSDATAENG2-7111/N/N
          type: string
        fraudRuleAction:
          description: Codifies the next step of the fraud analysis based on the risk rule result as defined by the merchant.
          x-chase-dataelem: INTL/MSDATAENG2-7112/N/N
          type: string
        digitalAlertRuleName:
          description: 'The moniker given to the alert rule used to identify potential fraud online. (e.g. 200Billpay, 300ACH, QPRT Quickpay V005)'
          x-chase-dataelem: INTL/175644/N/N
          type: string
        fraudStatus:
          description: 'Codifies the status of card at time of suspected fraud. Note: Used in conjunction with the Fraud Method Code field. Contains the first character the 2-character alphanumeric Fraud Type entered in the Code1 field of the Work Suspect Fraud screen. Code used to further define an account status. Specifically, the fraud type codes defined by credit card associations. Commonly known as Fraud Type 1 Code.'
          x-chase-dataelem: INTL/160282/N/N
          type: string
        fraudStatusDescription:
          description: 'The label for the status of card at time of suspected fraud. Note: Used in conjunction with the Fraud Method Code field. Contains the first character the 2-character alphanumeric Fraud Type entered in the Code1 field of the Work Suspect Fraud screen. Code used to further define an account status. Specifically, the fraud type codes defined by credit card associations. Commonly known as Fraud Type 1 Code.'
          x-chase-dataelem: INTL/160282/N/N
          type: string
        fraudRiskResponse:
          description: Codifies the success or failure of a request to the fraud engine to assign a risk score to a payment transaction. This request is done prior to the authorization.
          x-chase-dataelem: INTL/MSDATAENG2-7113/N/N
          type: string
    riskElement:
      description: Object containing Risk Element information
      type: object
      properties:
        fraudEvaluatorTransactionId:
          description: 'Identifies a unique occurrence of a transaction. In this context, this is the fraud evaluator provided transaction id.'
          x-chase-dataelem: INTL/161034/N/N
          type: string
        highestRiskCountry:
          description: 'The portion of a party''s address that is the encoded representation of a geographic area representing a country. Tn this context, this represents the country with the highest level of known e-commerce risk, as determined by the US State Department, that has been associated with a particular persona within the last 14 days.'
          x-chase-dataelem: CNFDPI/149/N/N
          type: string
        highestRiskRegion:
          description: 'Codifies a geographic area represented by one or more Countries, States or Provinces. Country, State or Province identifies a geographic area that represents a Firm recognized geopolitical unit. In this context, this is the region which represents the highest level of known e-commerce risk, as determined by the US State Department, that has been associated with a particular persona within the last 14 days.'
          x-chase-dataelem: INTL/173872/N/N
          type: string
        cardType:
          $ref: '#/components/schemas/cardType'
        fourteenDaysTransactionCount:
          description: 'Enumerates the occurrences of any transaction within a given period. In this context, this represent how many times the persona has been seen for the merchant in last 14 days.'
          x-chase-dataelem: INTL/174971/N/N
          type: integer
          format: int32
        sixHoursTransactionCount:
          description: 'Enumerates the occurrences of any transaction within a given period. In this context, this represent how many times the persona has been seen for the merchant in last 6 hours.'
          x-chase-dataelem: INTL/174971/N/N
          type: integer
          format: int32
        fourteenDaysCardRecordCount:
          description: 'Enumerates the quantity of records in a data object that is processed or transmitted. In this context, this is the number of cards associated with transaction that the fraud system has recorded.'
          x-chase-dataelem: INTL/179917/N/N
          type: integer
          format: int32
        fourteenDaysDeviceRecordCount:
          description: 'Enumerates the quantity of records in a data object that is processed or transmitted. In this context, this is the record count of the email associated with the transaction that the fraud system has recorded.'
          x-chase-dataelem: INTL/179917/N/N
          type: integer
          format: int32
        fourteenDaysEmailRecordCount:
          description: 'Enumerates the quantity of records in a data object that is processed or transmitted. In this context, this is the record count of the devices associated with the transaction that the fraud system has recorded.'
          x-chase-dataelem: INTL/179917/N/N
          type: integer
          format: int32
        deviceLayers:
          description: 'Identifies a unique occurrence of an electronic device (and the software) used by the customer to communicate with the Firm or a third party to receive, store, process or send digital information.'
          type: string
        sessionMatchIndicator:
          description: Indicates the Kaptcha session identifier generated by the fraud engine during checkout is validated and matches the session identifier received on the transaction.
          type: boolean
        hashedDigitalDeviceFingerprintIdentifier:
          description: 'Identifies a unique occurrence of an electronic device (and the software) used by the customer to communicate with the Firm or a third party to receive, store, process or send digital information. In this context, this identifier consists of the 5 device layers representing the operating system, browser, JavaScript settings, cookie setting and flash settings.'
          type: string
        deviceTimestamp:
          description: 'Designates the current hour (hh), minute (mm), seconds (ss) and date on the eletronic instrument used by a consumer for a payment authorization during the fraud analysis. This may differ from the actual current time if changed by the device owner.'
          type: string
        deviceLocalTimeZone:
          description: 'Represents a unique code assigned by the firm for a geographical area that observes a uniform standard time for legal, commercial, and social purposes. In this context, this is the local time the device owner has set in the device settings.'
          x-chase-dataelem: INTL/200205/N/N
          type: string
        deviceRegion:
          description: 'Codifies a geographic area represented by one or more Countries, States or Provinces. Country, State or Province identifies a geographic area that represents a Firm recognized geopolitical unit. In this context, this is the region associated to the Device Location.'
          x-chase-dataelem: INTL/173872/N/N
          type: string
        deviceCountry:
          description: 'Codifies the country, a geographic area, that is recognized as an independent political unit in world affairs where the point of sale device was used for a transaction. Null value indicates country code is not provided.'
          x-chase-dataelem: INTL/177584/N/N
          type: string
        deviceProxyServer:
          description: 'Indicates if a device uses a proxy server as an intermediary between an endpoint device, such as a computer or mobile device, and the server from which a user or client is making a purchase.'
          type: boolean
        browserJavaScriptEnabled:
          description: 'Indicates if the device''s application software, used to communicate between users of the Internet''s World Wide Web, allows javascript.'
          type: boolean
        browserAdobeFlashEnabled:
          description: 'Indicates if the device''s application software, used to communicate between users of the Internet''s World Wide Web, allows Adobe flash.'
          type: boolean
        browserCookiesEnabled:
          description: 'Indicates if the device''s application software, used to communicate between users of the Internet''s World Wide Web, allows cookies.'
          type: boolean
        deviceBrowserCountry:
          description: 'Uniquely represents a firm-recognized geopolitical area, including the ISO 3166 alpha 2-character country codes and other firm-created country codes. In this context, this is the country code associated with browser.'
          x-chase-dataelem: INTL/140034/N/N
          type: string
        deviceBrowserLanguage:
          description: 'Codifies the method of communication, either spoken or written, consisting of the use of words in a structured and conventional way. The gold (master) set of values is defined by the International Standards Organization in ISO standard 639-3. In this context, this is the the language the device owner has set in the device settings.'
          x-chase-dataelem: INTL/140070/N/N
          type: string
        mobileDevice:
          description: Indicate if the device placing the order a mobile device.
          type: boolean
        digitalDeviceType:
          description: 'The label given to the type of electronic device that can receive, store, process or send digital information that can be used to communicate with a web page.'
          x-chase-dataelem: INTL/206906/N/N
          type: string
        deviceWirelessCapability:
          description: Indicate if the device placing the order has capability to connect to internet wirelessly.
          type: boolean
        deviceVoiceControlled:
          description: Indicate if the device placing the order voice activated (related to mobile devices).
          type: boolean
        deviceRemotelyControlCapability:
          description: Indicate if the device placing the order is enabled to use PC Remote software.
          type: boolean
        deviceNetworkType:
          description: Codifies the categorization of the internet network using the Internet Protocol (IP) Address associated with the party (consumer). This category is assigned by the fraud engine based on the IP address/domain.
          type: string
    fraudScore:
      description: Object for Fraud Score Information
      type: object
      properties:
        cardholderBrowserInformation:
          description: The label for a web browser which is used to access and view websites for the merchant's products and services by consumer who is making a purchase.
          x-chase-dataelem: INTL/MSDATAENG2-6541/N/N
          type: string
        isFraudRuleReturn:
          description: Indicates the fraud checking rules that flagged the payment transaction as potentially fraudulent are returned to the merchant.
          x-chase-dataelem: INTL/MSDATAENG2-6851/N/N
          type: boolean
        fraudCheckShoppingCart:
          description: 'Provides textual information about the purchase of a product or service via an online retailer that is stored via a digital basket tha enables consumers to select products, review what they selected and make modifications before finalizing the purchase.  Supplemental: In this context, User (merchant) defined information may be included such as fraud rule values. Examples of fraud rules value may be a maximum basket value, a maximum product quantity, etc.'
          x-chase-dataelem: CNFD/MSDATAENG2-6542/N/N
          type: string
        sessionId:
          description: Identifies an interaction between a customer and a representative with the Firm within a given application tool.
          x-chase-dataelem: INTL/180293/N/N
          type: string
        websiteRootDomainName:
          description: The label given to combination of the Web Address Top Level and the Web Address Second Level domain identfiers. This is commonly referred to as the website name.
          x-chase-dataelem: INTL/MSDATAENG2-6852/N/N
          type: string
        fencibleItemAmount:
          description: The monetary value of items that are typically locked or stored behind the counter and aren't available for general selection on store shelves by customers.
          x-chase-dataelem: INTL/MSDATAENG2-6853/N/N
          type: integer
          format: int64
        aNITelephoneNumber:
          description: 'A locator whose value identifies the formatted numeric address for routing voice or data communications via telephony, to reach a party. NOTE: Telephone number formats may vary; this field can include domestic and international telephone numbers.'
          x-chase-dataelem: PIDIRID/140004/Y/Y
          type: string
          writeOnly: true
    fraudCheckPaymentMethodType:
      description: Object with information for Payment Method Type for  Fraud Check
      type: object
      properties:
        card:
          $ref: '#/components/schemas/fraudCard'
    fraudCard:
      description: Card payment instrument for fraud checking
      type: object
      required:
        - accountNumber
      properties:
        expiry:
          $ref: '#/components/schemas/expiry'
        cardTypeName:
          $ref: '#/components/schemas/cardTypeName'
        cardType:
          $ref: '#/components/schemas/cardType'
        accountNumber:
          $ref: '#/components/schemas/accountNumber'
        maskedAccountNumber:
          $ref: '#/components/schemas/maskedAccountNumber'
        cardTypeIndicators:
          $ref: '#/components/schemas/cardTypeIndicators'
        networkResponse:
          $ref: '#/components/schemas/networkResponse'
    fraudShipTo:
      description: Ship To Information used for fraud checking services.
      type: object
      properties:
        shippingAddress:
          $ref: '#/components/schemas/address'
        shippingDescription:
          description: Description of shipping or delivery method
          type: string
          maxLength: 120
        fullName:
          $ref: '#/components/schemas/fullName'
        phone:
          $ref: '#/components/schemas/phone'
        firstName:
          $ref: '#/components/schemas/firstName'
        lastName:
          $ref: '#/components/schemas/lastName'
        middleName:
          $ref: '#/components/schemas/middleName'
    sourceAccountInformation:
      description: Source Account Information
      type: object
      properties:
        fullName:
          $ref: '#/components/schemas/fullName'
        accountNumber:
          $ref: '#/components/schemas/accountNumber'
        internationalBusinessIdentifierCode:
          $ref: '#/components/schemas/internationalBusinessIdentifierCode'
        internationalBankAccountNumber:
          $ref: '#/components/schemas/internationalBankAccountNumber'
        bankName:
          description: 'The label given to a financial institution authorized by a government to accept deposits, make loans, pay interest, clear checks, and provide other financial services to its customers.'
          x-chase-dataelem: PIDIRID/200259/N/N
          type: string
    firstName:
      description: That part of an individual's full name considered a personal name or given name and generally positioned before the last name or family name.
      x-chase-dataelem: PIDIRID/140027/Y/Y
      type: string
      pattern: '[A-Za-z''''. ]*'
      minLength: 1
      maxLength: 70
      writeOnly: true
    lastName:
      description: 'That part of an individual?s name generally placed at the end of the given name. The last name is also known as the surname or family name. (Note: name conventions may be different based on practices in different countries. Some countries use two or more last names; in other countries, the family name is placed before a person?s given name; in some countries, it is common for people to have only one name or a mononym.)'
      x-chase-dataelem: PIDIRID/140025/Y/Y
      type: string
      pattern: '[A-Za-z''''. ]*'
      minLength: 1
      maxLength: 70
      writeOnly: true
    middleName:
      description: 'That part of an individual''s name generally positioned between the first and family names, as a second given name or a maternal surname. (NOTE: in some instances, an individual may have multiple middle names)'
      x-chase-dataelem: PIDIRID/140028/Y/Y
      type: string
      pattern: '[A-Za-z''''. ]*'
      minLength: 1
      maxLength: 70
      writeOnly: true
    paymentRequestId:
      description: 'Identifies a unique occurrence of an payment processing request from merchant that is associated with a purchase of goods and/or services. A payment request consist of authorization, captures and refunds.'
      x-chase-dataelem: INTL/MSDATAENG2-9450/N/N
      type: string
    captureRequest:
      description: Request information for capture a payment
      type: object
      properties:
        captureMethod:
          $ref: '#/components/schemas/captureMethod'
        merchant:
          $ref: '#/components/schemas/merchant'
        recurring:
          $ref: '#/components/schemas/recurring'
        installment:
          $ref: '#/components/schemas/installment'
        paymentMethodType:
          $ref: '#/components/schemas/multiCapturePaymentMethodType'
        shipTo:
          $ref: '#/components/schemas/shipTo'
        initiatorType:
          $ref: '#/components/schemas/initiatorType'
        accountOnFile:
          $ref: '#/components/schemas/accountOnFile'
        originalTransactionId:
          $ref: '#/components/schemas/originalTransactionId'
        isAmountFinal:
          $ref: '#/components/schemas/isAmountFinal'
        amount:
          $ref: '#/components/schemas/amount'
        currency:
          $ref: '#/components/schemas/currency'
        merchantOrderNumber:
          $ref: '#/components/schemas/merchantOrderNumber'
        risk:
          $ref: '#/components/schemas/risk'
        retailAddenda:
          $ref: '#/components/schemas/retailAddenda'
        accountHolder:
          $ref: '#/components/schemas/accountHolder'
        statementDescriptor:
          $ref: '#/components/schemas/statementDescriptor'
        partialAuthorizationSupport:
          $ref: '#/components/schemas/partialAuthorizationSupport'
        paymentRequestId:
          $ref: '#/components/schemas/paymentRequestId'
        multiCapture:
          $ref: '#/components/schemas/multiCapture'
    multiCapturePaymentMethodType:
      description: Multi Capture Payment Method Type contains all the payment method code supported for multi capture payment processing capability
      type: object
      properties:
        card:
          $ref: '#/components/schemas/card'
    multiCapture:
      description: Split Shipment Information
      type: object
      properties:
        multiCaptureSequenceNumber:
          description: Identifies the number indicating the location of this record in the sorting sequence of the specified data.
          x-chase-dataelem: INTL/168040/N/N
          type: string
        multiCaptureRecordCount:
          description: 'Enumerates the quantity of records in a data object that is processed or transmitted. In this context, this is the the total number of expected shipments associated with a single authorization.'
          x-chase-dataelem: INTL/179917/N/N
          type: integer
          format: int32
        isFinalCapture:
          description: Indicates if it is the final shipment associated with a single authorization.
          x-chase-dataelem: INTL/MSDATAENG2-9886/N/N
          type: boolean
    paymentRequest:
      description: Payment request information for multi capture order
      type: object
      properties:
        paymentRequestId:
          $ref: '#/components/schemas/paymentRequestId'
        paymentRequestStatus:
          description: 'Codifies the point in the payment processing request flow from merchant. A payment request consist of authorization, captures and refunds.  Valid Values are : PENDING, OPEN, CLOSED, CANCELLED'
          x-chase-dataelem: INTL/MSDATAENG2-9453/N/N
          type: string
          enum:
            - PENDING
            - OPEN
            - CLOSED
            - CANCELLED
        authorizations:
          type: array
          readOnly: true
          description: List of payment authorization information
          items:
            $ref: '#/components/schemas/paymentAuth'
        captures:
          type: array
          readOnly: true
          description: List of payment capture information
          items:
            $ref: '#/components/schemas/paymentCapture'
        refunds:
          type: array
          description: List of payment refund information
          items:
            $ref: '#/components/schemas/paymentRefund'
    paymentAuth:
      description: Authorization request information for multi capture order
      type: object
      properties:
        authorizationId:
          description: 'Identifies a unique occurrence of an authorization that is associated with a purchase of goods and/or services. More than one authorization can exist for a purchase, as an example in fuel and hotel services a merchant can send multiple authorization requests when the exact amount is unknown until completion of the sale.'
          type: string
        amount:
          $ref: '#/components/schemas/amount'
        transactionStatusCode:
          description: 'Codifies the point in the payment transaction flow of the transaction. For example, a typical transaction is authorized then captured for clearing and settlement; closed is when the transaction is ready for clearing and completed when the transaction is sent to the payment network for clearing.'
          x-chase-dataelem: INTL/181594/N/N
          type: string
        authorizationType:
          description: 'Codifies the type of transaction approval sought by a merchant such as a pre-authorization, final authorization, or undetermined.'
          x-chase-dataelem: INTL/203363/N/N
          type: string
          enum:
            - INITIAL
            - REAUTH
            - INCREMENTAL
    paymentCapture:
      description: Payment capture information for multi capture order
      type: object
      properties:
        captureId:
          $ref: '#/components/schemas/captureId'
        amount:
          $ref: '#/components/schemas/amount'
        transactionStatusCode:
          description: 'Codifies the point in the payment transaction flow of the transaction. For example, a typical transaction is authorized then captured for clearing and settlement; closed is when the transaction is ready for clearing and completed when the transaction is sent to the payment network for clearing.'
          x-chase-dataelem: INTL/181594/N/N
          type: string
        captureRemainingRefundableAmount:
          description: Capture amount available to be refunded
          x-chase-dataelem: CNFD/MSDATAENG-1160/N/N
          type: integer
          format: int64
    paymentRefund:
      description: Payment refund information for multi capture order
      type: object
      properties:
        refundId:
          description: Identifies a unique occurrence of a payment settlement request when the authorization is complete and the transaction is ready for settlement. The transaction can no longer be edited but can be voided.
          x-chase-dataelem: INTL/MSDATAENG2-9451/N/N
          type: string
        amount:
          $ref: '#/components/schemas/amount'
        transactionStatusCode:
          description: 'Codifies the point in the payment transaction flow of the transaction. For example, a typical transaction is authorized then captured for clearing and settlement; closed is when the transaction is ready for clearing and completed when the transaction is sent to the payment network for clearing.'
          x-chase-dataelem: INTL/181594/N/N
          type: string
    captureId:
      description: Identifies a unique occurrence of a payment settlement request when the authorization is complete and the transaction is ready for settlement. The transaction can no longer be edited but can be voided.
      x-chase-dataelem: INTL/MSDATAENG2-9452/N/N
      type: string
    transactionProcessor:
      description: Codifies specific system a client's program operates on within the Firm and through which cardholder transactions are submitted and processed
      x-chase-dataelem: INTL/MSDATAENG2-9884/N/N
      type: string
    internationalBankAccountNumber:
      description: 'Identifies the International Bank Account Number (IBAN) for the account.  IBAN is an internationally agreed system of identifying bank accounts across national borders to facilitate the communication and processing of cross border transactions with a reduced risk of transcription errors. Based on ISO 13616 standards, the IBAN consists of up to 34 alphanumeric characters, comprising a country code, two check digits and a long and detailed bank account-number. The check digits enable a sanity check of the bank account number to confirm its integrity before submitting a transaction.'
      x-chase-dataelem: CNFDPI/181512/N/N
      type: string
      maxLength: 34
      writeOnly: true
    internationalBusinessIdentifierCode:
      description: 'Codifies the unique value that identifies a particular bank in the worldwide economy. The 8 to 11 digit code is based on ISO 9362 standards. This code has several aliases including SWIFT Code, SWIFT Bank Code and Bank Identification Code (BIC). ISO 9362:2014 specifies the elements and structure of a universal identifier code for financial and non-financial institutions where an international identifier is required to facilitate automated processing of information for financial services.  The BIC is used for addressing messages, routing business transactions and identifying business parties. This Standard applies to organizations and excludes individual persons.'
      x-chase-dataelem: INTL/181513/N/N
      type: string
      maxLength: 11
    transactionRoutingOverrideList:
      type: array
      description: List of transaction routing providers where the transaction be routed preferred by the merchant .
      items:
        type: string
        enum:
          - STONE
          - CIELO
          - GETNET
          - REDECARD
    preferredPaymentNetworkName:
      description: The label for primary transactions processing network through which card's (Debit or credit) account transactions are processed.
      x-chase-dataelem: INTL/177371/N/N
      type: string
      enum:
        - STAR_PINLESS
        - PULSE_PINLESS
        - NYCE_PINLESS
        - ACCEL_PINLESS
    preferredPaymentNetworkNameList:
      type: array
      description: Define the list of Payment Network Name preferred by merchant.  Payment Network Name is the label for primary transactions processing network through which card's (Debit or credit) account transactions are processed.
      items:
        $ref: '#/components/schemas/preferredPaymentNetworkName'
    merchantSalesChannelName:
      description: Label given to a merchant client of the Firm's medium for reaching its customers and facilitating and/or performing sales of its merchandise or services.
      x-chase-dataelem: INTL/MSDATAENG2-4180/N/N
      type: string
      enum:
        - MAIL_ORDER_TELEPHONE_ORDER
        - INTERNET
        - INTERACTIVE_VOICE_RESPONSE
    merchantPreferredRouting:
      description: Codifies the routing model used to route the transaction as preferred by merchant.
      x-chase-dataelem: INTL/MSDATAENG2-11236/N/N
      type: string
      enum:
        - PINLESS
        - CREDIT
    encryptionIntegrityCheck:
      description: The alphanumeric string generated by voltage to verify the soundness of the encrypted key used by merchant and payment process. The merchant passed this in the API call. The backend process validates the subscriber id and format matches - between the merchant request for a key and the UPG request
      x-chase-dataelem: INTL/MSDATAENG2-8760/N/N
      type: string
      writeOnly: true
`;

export const ElementsAPI: React.FC = () => {
  return (
    <Box flex={1} overflowY="hidden">
      <API
        apiDescriptionDocument={merchantSpec}
        router="hash"
        //tryItOutDefaultServer={'https://jpmorgan-awesome-server'}
      />
    </Box>
  );
};
