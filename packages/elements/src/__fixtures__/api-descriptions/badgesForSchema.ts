export const badgesForSchema = /* language=yaml */ `
openapi: 3.1.0
info:
  title: Schema Badges Sample
  description: 'Sample with deprecated and internal badges on schema component'
  contact:
    url: 'https://example.com'
    email: example@example.com
    name: John Johnson
  version: 0.0.0
components:
  schemas:
    ValidationParams:
      description: Validation parameters
      deprecated: true
      properties:
        groupName:
          type: string
        version:
          type: string
          enum:
            - ok
            - error
    ValidationReport:
      description: Validation report
      deprecated: true
      x-internal: true
      properties:
        validationId:
          type: string
        status:
          type: string
          enum:
            - ok
            - error
`;
