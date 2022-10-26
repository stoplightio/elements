// @ts-ignore
import Document from 'flexsearch/dist/module/document.js';
import {ServiceChildNode} from "./oas/types";
import {NodeType} from "@stoplight/types";
import {NodeSearchResult} from "../types";

const documents = {};
export const getDocument = (name: string) => {
    if (!documents[name]) {
        documents[name] = new Document({
            tokenize: "full",
            charset: "latin:balance",
            doc: {
                id: "uri",
                field: ["data"],
                store: true,
            }
        });
    }
    return documents[name];
}

const modifyEhrLogo = (desc: string | undefined) => {
    if (!desc) {
        return desc;
    }
    let finalStr = desc, result;
    const pattern = /<img src="[^>]+" alt="[Cerner|Epic on FHIR|NextGen Healthcare]{1}[^>]+ style="(width[^"]+)[^>]+>/g;
    while ((result = pattern.exec(desc)) != null) {
        const fullStr = result[0];
        const widthStr = result[1];
        const newLogo = fullStr.replace(widthStr, "width: 40px;")
        finalStr = finalStr.replace(fullStr, newLogo);
    }

    const athenaPattern = /<img src="[^>]+" alt="[Athenahealth]{1}[^>]+ style="(width[^"]+)[^>]+>/g;
    while ((result = athenaPattern.exec(desc)) != null) {
        const fullStr = result[0];
        const widthStr = result[1];
        const newLogo = fullStr.replace(widthStr, "width: 60px;")
        finalStr = finalStr.replace(fullStr, newLogo);
    }
    return finalStr;
}

export const indexDocument = (name: string, node: ServiceChildNode) => {
    let document = getDocument(name);
    if (node.type === NodeType.HttpOperation) {
        document.add({
            uri: node.uri,
            data: `${node.data.summary} ${node.data.path} ${modifyEhrLogo(node.data.description)}`,
            name: node.name,
            type: NodeType.HttpOperation
        });
    }
    if (node.type === NodeType.Article) {
        document.add({
            uri: node.uri,
            data: node.data,
            name: node.name,
            type: NodeType.Article
        })
    }
}

export const searchDocument = (name: string, term: string) : NodeSearchResult[] => {
    let document = getDocument(name);
    console.log(document.search(term, { enrich: true, suggest: true }));
    let searchResult = document.search(term, { enrich: true, suggest: true });
    return searchResult
        .flatMap((byField: any) => byField.result)
        .map((sResult: { id: string, doc: NodeSearchResult }) => sResult.doc);
}