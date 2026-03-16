# DEVELOPMENT_WORKFLOW.md

## Purpose
Defines the expected development workflow for human and AI contributors so changes remain safe, focused, and maintainable.

## Mandatory Confirmation Gate
Before modifying any repository files, always perform and present:
1. Step 1 - Analysis: explain the request and impacted areas.
2. Step 2 - Proposed changes: list intended file edits and what each edit will do.
3. Step 3 - Confirmation request: ask for explicit confirmation.

Required proposal format:

Proposed changes:
- File path: description of modification
- File path: description of modification

No files should be changed until explicit confirmation is received.

## Core Workflow Rules
- Prefer small, isolated changes.
- Do not modify unrelated files.
- Follow existing folder architecture and naming conventions.
- Update relevant documentation when introducing new patterns.

## Task Execution Sequence
1. Understand request scope and impacted areas.
2. Read only the minimum required files for context.
3. Present proposed file changes and request confirmation.
4. Implement focused changes after confirmation.
5. Run validation checks.
6. Summarize what changed and why.

## Validation Requirements
Run before final handoff when code changes are made:
- `npm run lint`
- `npm run typecheck`
- `npm run format:check`

If any command cannot run, document why and what remains unchecked.

## Dependency Policy
- Avoid adding new dependencies unless required.
- Prefer native/platform features or existing utilities first.
- When adding a dependency, explain necessity and impact.

## Editing Safety Rules
- Do not delete or rewrite broad areas without explicit request.
- Preserve unrelated local changes.
- Keep edits reversible and easy to review.
- Do not perform destructive git operations unless requested.

## Architecture Compliance
- Keep config values centralized in `config/`.
- Keep SEO logic centralized in `seo/`.
- Keep reusable UI in `components/`.
- Keep route-level concerns in `app/`.

## Documentation Maintenance
When project structure or architecture changes:
- Update `ARCHITECTURE.md`.
- Update affected file in `docs/`.
- Keep `AGENTS.md` index aligned with current docs.

## Documentation Synchronization Trigger
After significant changes, perform a documentation review and update as needed.

Significant changes include:
- New features
- New components
- New architecture patterns
- New folders or project structure
- SEO architecture changes
- Configuration system changes
- New development workflows

Self-check question:
"Did this change introduce new architecture, patterns, or workflows?"

If yes, update relevant docs in the same task before handoff.

## Pull Request / Handoff Notes Template
Use this structure in summaries:
- Scope
- Files changed
- Validation status
- Risks or follow-ups
