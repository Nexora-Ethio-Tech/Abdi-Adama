// CJS wrapper for LiteSpeed's lsnode.js which uses require()
// .cjs extension forces CommonJS regardless of package.json "type":"module"
// Dynamic import() works in CJS to load ESM modules
import('./dist/index.js').catch(err => {
  console.error('Failed to start app:', err);
  process.exit(1);
});
