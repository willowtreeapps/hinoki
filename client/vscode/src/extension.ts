'use strict';

import * as path from 'path';

import { ExtensionContext } from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient';

export function activate(context: ExtensionContext) {
	const serverPath = ['node_modules', 'brightscript-languageserver', 'lib', 'bin', 'cli.js'];
	const serverModule = context.asAbsolutePath(path.join(...serverPath));
	const debugOptions = { execArgv: ['--nolazy', '--debug=6009'] };
	
	const serverOptions: ServerOptions = {
		run : { module: serverModule, transport: TransportKind.stdio },
		debug: { module: serverModule, transport: TransportKind.stdio, options: debugOptions }
	}
	
	const clientOptions: LanguageClientOptions = {
		documentSelector: [{ scheme: 'file', language: 'brightscript' }]
	}
	
	const disposable = new LanguageClient('brightscript-languageserver', 'BrightScript Language Server', serverOptions, clientOptions).start();
	
	context.subscriptions.push(disposable);
}