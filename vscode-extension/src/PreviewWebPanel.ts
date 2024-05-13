import * as vscode from 'vscode';
import * as path from 'path';

let position: { x: 0; y: 0 } = {
  x: 0,
  y: 0,
};

export function previewAPI(context: vscode.ExtensionContext) {
  return async (uri: vscode.Uri) => {
    uri = uri || ((await promptForApiFile()) as vscode.Uri);
    if (uri) {
      console.log('Opening file', uri.fsPath);
      openAPI(context, uri);
    }
  };
}

export const openApiFiles: { [id: string]: vscode.WebviewPanel } = {}; // vscode.Uri.fsPath => vscode.WebviewPanel

export function openAPI(context: vscode.ExtensionContext, uri: vscode.Uri) {
  const localResourceRoots = [
    vscode.Uri.file(path.dirname(uri.fsPath)),
    vscode.Uri.joinPath(context.extensionUri, 'dist/node_modules/@jpmorganchase/elemental'),
    vscode.Uri.joinPath(context.extensionUri, 'dist/node_modules/@jpmorganchase/elemental/styles.min.css'),
  ];
  if (vscode.workspace.workspaceFolders) {
    vscode.workspace.workspaceFolders.forEach(folder => {
      localResourceRoots.push(folder.uri);
    });
  }
  const panel: vscode.WebviewPanel =
    openApiFiles[uri.fsPath] ||
    vscode.window.createWebviewPanel('elemental-preview', '', vscode.ViewColumn.Two, {
      enableScripts: true,
      retainContextWhenHidden: true,
      localResourceRoots,
    });

  panel.title = path.basename(uri.fsPath);
  panel.webview.html = getWebviewContent(context, panel.webview, uri, position);

  panel.webview.onDidReceiveMessage(
    message => {
      switch (message.type) {
        case 'position': {
          position = {
            x: message.scrollX,
            y: message.scrollY,
          };
        }
      }
    },
    undefined,
    context.subscriptions
  );

  panel.onDidDispose(() => {
    delete openApiFiles[uri.fsPath];
  });
  openApiFiles[uri.fsPath] = panel;
}

async function promptForApiFile() {
  //tood add in prompt again
  return vscode.window.activeTextEditor?.document.uri;
}

function getWebviewContent(context: vscode.ExtensionContext, webview: vscode.Webview, apiFile: vscode.Uri, position: { x: 0; y: 0 }) {
  const apiComponentJs = webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, 'dist/node_modules/@jpmorganchase/elemental/web-components.min.js')
  );
  const apiComponentCss = webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, 'dist/node_modules/@jpmorganchase/elemental/styles.min.css')
  );
  const apiWebviewUri = webview.asWebviewUri(apiFile);
  const apiBasePath = apiWebviewUri.toString().replace('%2B', '+'); // this is loaded by a different library so it requires unescaping the + character
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
    <link rel="stylesheet" href="${apiComponentCss}">
    <style> 
    html{
      scroll-behavior: smooth;
    }
    body {
      color: #121212;
      background-color: #fff;
      word-wrap: break-word;
    }

    </style>
    </head>
    <body x-timestamp="${Date.now()}">
        
      <script src="${apiComponentJs}"></script>
      <elements-api id="docs" router="hash" layout="drawer" apiDescriptionUrl="${apiBasePath}" hideInternal />
    </body>
  </html>
    `;
  return html;
}
