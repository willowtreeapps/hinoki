import * as path from 'path';
import {AutoLanguageClient} from 'atom-languageclient';

class BrightScriptLanguageClient extends AutoLanguageClient {
  getGrammarScopes () { return [ 'source.brightscript' ]; }
  getLanguageName () { return 'BrightScript'; }
  getServerName () { return 'WillowTreeApps'; }

  startServerProcess () {
    const args = [ 'node_modules/brightscript-languageserver/lib/bin/cli' ];
    return super.spawnChildNode(args, { cwd: path.join(__dirname, '..') });
  }
}

module.exports = new BrightScriptLanguageClient();