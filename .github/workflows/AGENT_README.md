# Repo File Agent

This workflow provides on-demand file listing and retrieval via:
- Slash commands on PRs/issues:
  - `/file-agent list [path] [ref]`
  - `/file-agent show <path/to/file> [ref]`
- Manual runs via "Run workflow" with inputs.

Examples
- List files under src on the PR head:
  ```
  /file-agent list
  ```
- List files under a custom dir on a specific branch:
  ```
  /file-agent list packages/app my-feature-branch
  ```
- Show a file from the PR head:
  ```
  /file-agent show src/main.tsx
  ```
- Manually run:
  - command: list
  - path: src
  - ref: my-feature-branch (optional)

Notes
- Large directories are truncated after 3000 files.
- File previews are capped at ~300KB and skip binary files; full outputs are available as the "file-agent-output" artifact.
- Ignore list (env FILE_AGENT_IGNORE) defaults to: node_modules,.git,.next,dist,build,.turbo,.cache,.vercel,.output

Permissions
The workflow requests contents:read and issues/pull-requests:write to post results as comments.