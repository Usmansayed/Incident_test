/** Fake peer dependency log line → dependency_conflict heuristic in AegisOps */
console.error("npm error code ERESOLVE");
console.error(
  "npm error ERESOLVE unable to resolve dependency tree — peer @demo/ui-react@^19.0.0 from @demo/app-shell"
);
process.exit(1);
