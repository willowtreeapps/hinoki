'use strict';

import { IConnection, TextDocument, TextDocuments, InitializeResult, createConnection } from 'vscode-languageserver';
import validateDocument from './validateDocument';

export function createServer() {
	const connection: IConnection = createConnection(process.stdin, process.stdout);
	const documents: TextDocuments = new TextDocuments();

	connection.onInitialize((): InitializeResult => {
		const validate = function(document: TextDocument) {
			const diagnostics = validateDocument(document);
			connection.sendDiagnostics({ uri: document.uri, diagnostics });
		};

		documents.onDidSave(change => validate(change.document));
		documents.onDidOpen(change => validate(change.document));
		documents.onDidChangeContent(change => validate(change.document));

		connection.onDidChangeConfiguration(() => documents.all().forEach(validate));

		return {
			capabilities: {
				textDocumentSync: documents.syncKind
			}
		}
	});

	return {
		listen() {
			documents.listen(connection);
			connection.listen();
		}
	}
}