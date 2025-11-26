#!/usr/bin/env tsx
import { spawn } from 'child_process';
import chokidar from 'chokidar';
import { join } from 'path';

// Watch files and run a debounced build on change
const WATCH_GLOB = [
  'resume-details.yml',
  'cover-letters/**/*.yml',
  'src/**',
  'src/pages/**',
];

let timer: NodeJS.Timeout | null = null;
const DEBOUNCE_MS = 300;

function run(cmd: string, args: string[] = []) {
  console.log(`\n⏳ Running: ${cmd} ${args.join(' ')}`);
  const proc = spawn(cmd, args, { stdio: 'inherit', shell: true });
  proc.on('exit', (code) => {
    if (code === 0) console.log('✅ Build completed successfully');
    else console.warn(`⚠️  Build exited with code ${code}`);
  });
}

function scheduleBuild() {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    // Validate first, then build HTML; PDFs are optional (set PDFs env)
    run('npm', ['run', 'validate']);
    // Build HTML only to make watch fast
    run('npx', ['astro', 'build']);
    // Optionally generate PDFs if BUILD_PDF set
    if (process.env.BUILD_PDF === '1') {
      run('npm', ['run', 'build']);
    }
  }, DEBOUNCE_MS);
}

console.log('🔭 Watching for changes...', WATCH_GLOB.join(', '));
const watcher = chokidar.watch(WATCH_GLOB, {
  ignoreInitial: true,
  persistent: true,
});

watcher.on('all', (event, path) => {
  console.log(`
  🔁 ${event}: ${path}`);
  scheduleBuild();
});

process.on('SIGINT', async () => {
  console.log('Stopping watcher...');
  await watcher.close();
  process.exit(0);
});
