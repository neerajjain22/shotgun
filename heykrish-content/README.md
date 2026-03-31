# HeyKrish Content Generator

Automated SEO article generation pipeline for heykrish.ai.

## What it does

- Reads the next pending article from `articles.json`
- Runs two Anthropic calls per article:
  - brief generation (JSON)
  - full article generation (Markdown)
- Writes outputs to `output/{slug}/`
- Publishes article Markdown into `../content/blog/{slug}.md`
- Updates article status in `articles.json`
- Logs every run to `logs/run.log`

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment:

```bash
cp .env.example .env
```

3. Set `ANTHROPIC_API_KEY` in `.env`.

## Commands

Run once (recommended for scheduler jobs):

```bash
npm run run-once
```

Start local cron worker:

```bash
npm start
```

Check queue status:

```bash
npm run status
```

## Queue lifecycle

Statuses:
- `pending`
- `brief_done`
- `done`
- `error`

The generator only processes articles with `status === "pending"`.

## Scheduling on GitHub Actions (recommended)

Use a scheduled workflow to run `npm run run-once` once per day, commit changed content files and queue status, and let Vercel deploy automatically.
