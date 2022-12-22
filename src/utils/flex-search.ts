// @ts-ignore
import Document from 'flexsearch/dist/module/document.js';
import {ServiceChildNode} from "./oas/types";
import {NodeType} from "@stoplight/types";
import {NodeSearchResult} from "../types";
import { stripHtml } from "string-strip-html";

const documents = {};
export const getDocument = (name: string) => {
    if (!documents[name]) {
        documents[name] = new Document({
            tokenize: "full",
            charset: "latin:balance",
            doc: {
                id: "uri",
                field: ["name", "data", "tags"],
                store: true,
            },
        });
    }
    return documents[name];
}

const handleLogo = (desc: string | undefined): { ehrs: string[], content: string | undefined } => {
    if (!desc) {
        return {
            ehrs: [],
            content: desc
        };
    }
    let finalStr = desc, logoSize = {
        "Cerner": "width: 40px;",
        "Epic on FHIR": "width: 40px;",
        "NextGen": "width: 30px;",
        "Athenahealth": "width: 60px;"
    }, ehrs = [], result;
    const pattern = /<img src="[^>]+ title="(Cerner|Epic on FHIR|NextGen|Athenahealth)[^>]+ style="(width[^"]+)[^>]+>/g;
    while ((result = pattern.exec(desc)) != null) {
        const fullStr = result[0];
        const ehr = result[1];
        const widthStr = result[2];
        const newLogo = fullStr.replace(widthStr, logoSize[ehr]);
        finalStr = finalStr.replace(fullStr, newLogo);
        ehrs.push(ehr)
    }
    return {
        ehrs,
        content: finalStr
    };
}

const stripContent = (content: string | undefined) => {
    if (!content) {
        return content;
    }
    return stripHtml(content).result;
}

export const indexDocument = (name: string, node: ServiceChildNode) => {
    let document = getDocument(name);
    if (node.type === NodeType.HttpOperation || node.type === NodeType.Article) {
        let docDescription, tags = node.tags;
        if (node.type === NodeType.HttpOperation) {
            const logoData = handleLogo(node.data.description);
            docDescription = logoData.content;
            tags.push(...logoData.ehrs)
        } else {
            docDescription = node.data
        }
        document.add({
            uri: node.uri,
            data: stripContent(node.type === NodeType.HttpOperation ? node.data.description : node.data?.toString()),
            description: docDescription,
            tags,
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