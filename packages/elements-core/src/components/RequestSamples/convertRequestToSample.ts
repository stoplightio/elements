import { Request as HarFormatRequest } from 'har-format';
import { HTTPSnippet, isValidTargetId } from 'httpsnippet-lite';

export const convertRequestToSample = async (
  language: string,
  library: string | undefined,
  request: HarFormatRequest,
) => {
  if (!isValidTargetId(language)) return null;

  try {
    const snippet = new HTTPSnippet(request);
    let converted = await snippet.convert(language, library);
    if (Array.isArray(converted)) {
      converted = converted[0];
    } else {
      converted = converted || null;
    }
    
    // This code checks if the 'converted' string is a valid string, decodes any URL-encoded curly braces in it, 
    // and then iterates through each query parameter in the request's query string. For any query parameter 
    // containing curly braces, it selectively encodes the characters while preserving the curly braces. 
    // The decoded query string is then replaced with the fully encoded query in the 'converted' string to ensure 
    // proper encoding of the query parameters while keeping curly braces intact.

    if (typeof converted === 'string') {
      converted = converted.replace(/%7B/g, '{').replace(/%7D/g, '}');

      if (request?.queryString?.length) {
          for (const query of request.queryString) {
              if (query?.value.includes('{') || query?.value.includes('}')) {
                let encodeValue = ''
                for(const val of query?.value){
                  if(val !== '{' && val !== '}'){
                    encodeValue += encodeURIComponent(val)
                  } else{
                    encodeValue += val
                  }
                }
                const decodedQuery = `${query?.name}=${encodeValue}`;
                const encodedQuery = `${query?.name}=${encodeURIComponent(query?.value)}`

                converted = converted.replace(decodedQuery, encodedQuery);
              }
          }
      }
    }
  
    return converted;
  } catch (err) {
    console.error(err);
    return null;
  }
};
