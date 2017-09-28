'use strict';

import { TextDocument, Diagnostic, Files, DiagnosticSeverity } from 'vscode-languageserver';
import * as bslint from 'bslint';

interface Problem {
	ruleId: string;
	severity: number;
	message: string;
	line: number;
	column: number;
	endLine?: number;
	endColumn?: number;
}

interface DocumentReport {
	filePath: string;
	errorCount: number;
	warningCount: number;
	messages: Problem[];
	output?: string;
}

interface Report {
	results: DocumentReport[];
	errorCount: number;
	warningCount: number;
}

export default function validateDocument(document: TextDocument): Diagnostic[] {
    const diagnostics: Diagnostic[] = [],
        contents = document.getText(),
        filePath = Files.uriToFilePath(document.uri),
        cliEngine = new bslint.CLIEngine(),
        report: Report = cliEngine.executeOnText(contents, filePath);

    if (report && report.results && Array.isArray(report.results) && report.results.length > 0) {
        const docReport = report.results[0];

        if (docReport.messages && Array.isArray(docReport.messages)) {
            docReport.messages.forEach((problem) => {
                if (problem) {
                    const diagnostic = makeDiagnostic(problem);
                    diagnostics.push(diagnostic);
                }
            });
        }
    }
    
    return diagnostics;
}

function makeDiagnostic(problem: Problem): Diagnostic {
    const message = (problem.ruleId != null) ? `${problem.message} (${problem.ruleId})` : `${problem.message}`,
        startLine = Math.max(0, problem.line - 1),
        startChar = Math.max(0, problem.column - 1),
        endLine = problem.endLine != null ? Math.max(0, problem.endLine - 1) : startLine,
        endChar = problem.endColumn != null ? Math.max(0, problem.endColumn - 1) : startChar;
    
	return {
		message: message,
		severity: convertSeverity(problem.severity),
		source: 'bslint',
		range: {
			start: { line: startLine, character: startChar },
			end: { line: endLine, character: endChar }
		},
		code: problem.ruleId
	};
}

function convertSeverity(severity: number): DiagnosticSeverity {
    if (severity === 1) {
        return DiagnosticSeverity.Warning;
    }

    return DiagnosticSeverity.Error;
}