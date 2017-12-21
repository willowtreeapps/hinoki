#!/usr/bin/env node

import { createServer } from '../server';

process.stdin.on('close', () => {
    process.exit(0);
});

createServer().listen();