export const schemaWithRefs = `---
title: Schema with refs
---

# Schema with refs (Swr)

### Schema

This is bundled schema with refs

\`\`\`json jsonSchema
{
  "title": "DerefTest",
  "type": "object",
  "description": "Dereferencing test object",
  "properties": {
    "id": {
      "type": "string"
    },
    "inner": {
      "description": "Inner object",
      "title": "Inner",
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "referencedObject": {
          "$ref": "#/properties/referencedObject",
          "description": "Inner referenced object"
        }
      },
      "required": [
        "id",
        "bookingRate"
      ]
    },
    "referencedObject": {
      "description": "Referenced object",
      "title": "ReferencedObject",
      "type": "object",
      "required": [
        "property1",
        "property2",
        "property3"
      ],
      "properties": {
        "property1": {
          "type": "integer",
          "description": "Property 1"
        },
        "property2": {
          "type": "string",
          "description": "Property 2"
        },
        "property3": {
          "type": "boolean",
          "description": "Property 3"
        },
        "property4": {
          "type": "string",
          "enum": [
            "BUSINESS",
            "PERSONAL",
            "OTHER"
          ],
          "x-enum-descriptions": {
            "BUSINESS": "Enum description for BUSINESS",
            "PERSONAL": "Enum description for PERSONAL",
            "OTHER": "Enum description for OTHER"
          }
        }
      }
    }
  },
  "required": [
    "id",
    "inner",
    "referencedObject"
  ]
}
\`\`\``;
