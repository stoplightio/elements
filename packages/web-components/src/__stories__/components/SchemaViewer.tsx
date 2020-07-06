import '../../index';

export default { title: 'Schema Viewer' };

export const defaultState = () => '<stoplight-component-schema-viewer/>';

export const withSchemaAsAttribute = () =>
  `<stoplight-component-schema-viewer 
    schema='{ 
      "type": "object", 
      "properties": { 
          "firstName": { "type": "string" }, 
          "lastName": { "type": "string" } 
      }, 
      "required": ["firstName"] 
    }'/>`;
