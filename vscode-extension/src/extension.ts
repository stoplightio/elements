import * as vscode from 'vscode';
import { openAPI, openApiFiles, previewAPI } from './PreviewWebPanel';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "elemental-preview" is now active!');

  // sets context to show  Preview" button on Editor Title Bar
  function setElementalPreviewContext(document: vscode.TextDocument) {
    console.log('Setting context for elemental.context', document.uri.fsPath);
    vscode.commands.executeCommand('setContext', 'elemental.context', true);
  }

  if (vscode.window.activeTextEditor?.document) {
    setElementalPreviewContext(vscode.window.activeTextEditor.document);
  }

  vscode.window.onDidChangeActiveTextEditor(e => {
    if (e?.document) {
      setElementalPreviewContext(e.document);
    }
  });

  vscode.workspace.onDidSaveTextDocument(document => {
    if (openApiFiles[document.uri.fsPath]) {
      openAPI(context, document.uri);
    }
    if (vscode.window.activeTextEditor?.document) {
      setElementalPreviewContext(vscode.window.activeTextEditor.document);
    }
  });

  context.subscriptions.push(vscode.commands.registerCommand('elemental.preview', previewAPI(context)));
}

export function deactivate() {}
