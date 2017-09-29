declare module 'atom-languageclient' {
    import {ChildProcess} from 'child_process';

    class AutoLanguageClient {
        getGrammarScopes(): string[]
        getLanguageName(): string
        getServerName(): string
        spawnChildNode(args: string[], options: SpawnOptions): ChildProcess
    }

    interface SpawnOptions {
        cwd: string
    }
}