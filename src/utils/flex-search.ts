// @ts-ignore
import Document from 'flexsearch/dist/module/document.js';
import {ServiceChildNode} from "./oas/types";
import {NodeType} from "@stoplight/types";
import {NodeSearchResult} from "../types";

const documents = {};
export const getDocument = (name: string) => {
    if (!documents[name]) {
        documents[name] = new Document({
            tokenize: "reverse",
            charset: "latin:balance",
            doc: {
                id: "uri",
                field: ["name", "data"],
                store: true,
            },
        });
    }
    return documents[name];
}

const modifyEhrLogo = (desc: string | undefined) => {
    if (!desc) {
        return desc;
    }
    let finalStr = desc, logoSize = {
        "Cerner": "width: 40px;",
        "Epic on FHIR": "width: 40px;",
        "NextGen Healthcare": "width: 30px;",
        "Athenahealth": "width: 60px;"
    }, result;
    const pattern = /<img src="[^>]+" alt="(Cerner|Epic on FHIR|NextGen Healthcare|Athenahealth)[^>]+ style="(width[^"]+)[^>]+>/g;
    while ((result = pattern.exec(desc)) != null) {
        const fullStr = result[0];
        const ehr = result[1];
        const widthStr = result[2];
        const newLogo = fullStr.replace(widthStr, logoSize[ehr]);
        finalStr = finalStr.replace(fullStr, newLogo);
    }
    return finalStr;
}

export const indexDocument = (name: string, node: ServiceChildNode) => {
    let document = getDocument(name);
    if (node.type === NodeType.HttpOperation || node.type === NodeType.Article) {
        document.add({
            uri: node.uri,
            data: node.type === NodeType.HttpOperation ? `${modifyEhrLogo(node.data.description)}` : node.data,
            name: node.name,
            type: node.type
        });
    }
}

export const searchDocument = (name: string, term: string) : NodeSearchResult[] => {
    let document = getDocument(name);
    let searchResult = document.search(term, { enrich: true });
    const result: NodeSearchResult[] = [], resultId: any[] = [];
    searchResult.forEach((byField: any) => {
        byField.result.forEach((r: { id: string, doc: NodeSearchResult }) => {
            if (resultId.indexOf(r.id) === -1) {
                resultId.push(r.id);
                result.push(r.doc);
            }
        });
    });
    return result;
}