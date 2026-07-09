# Fullchat

**Export the _complete_ Claude conversation — the model's thinking and every tool's input and output — that Claude's "Share" link strips out.** Downloads as a single JSON file. 100% local: it runs in your own logged-in browser, with no server and nothing leaving your machine.

Claude's built-in **Share** produces a rendered, gutted snapshot — no thinking, and almost none of the tool input/output. Fullchat grabs the full conversation instead, so you keep what actually happened.

## What you get

| | Claude "Share" | Fullchat |
|---|:---:|:---:|
| Messages | ✓ | ✓ |
| Thinking | — | ✓ |
| Tool inputs | — | ✓ |
| Tool outputs | — | ✓ |

## Why keep the whole thing

- **See what actually happened** — the reasoning and tool calls behind an answer, not just the reply.
- **Keep a real backup** — the full conversation as portable JSON.
- **Hand over full context** — give a teammate or another agent everything, not a summary.
- **Sharpen prompts & agents** — study exactly how a run unfolded.

## Install

It's a bookmarklet — a bookmark that runs a small script.

1. Open the [homepage](site/index.html) and **drag the button to your bookmarks bar**, or create a new bookmark and paste the contents of [`bookmarklet/bookmarklet.public.min.txt`](bookmarklet/bookmarklet.public.min.txt) as the URL.
2. Open any Claude chat (`claude.ai/chat/...`).
3. Click the bookmark. The full conversation downloads as `claude-chat-<title>-<id>.json`.

**Fallback:** if your browser blocks bookmarklets, open DevTools → Console, paste [`bookmarklet/console.public.min.txt`](bookmarklet/console.public.min.txt), and press Enter.

## How it works

The bookmarklet reads the current chat's id from the URL and your active workspace from a cookie, then fetches Claude's own conversation endpoint (`/chat_conversations/{id}?tree=True&rendering_mode=messages&render_all_tools=true`) and saves the response as JSON. Because it runs in your already-authenticated browser tab, cookies and Cloudflare are handled natively — no server, no credentials, no impersonation.

You can only export **your own** conversations: the endpoint is owner-only, so this exports chats you already have access to, one at a time, from the same session — nothing you couldn't already open yourself.

The readable, commented source is [`bookmarklet/bookmarklet.readable.js`](bookmarklet/bookmarklet.readable.js); the minified files are generated from it.

## Privacy

Everything happens in your browser. The JSON is built from Claude's response and saved straight to your machine — no third-party server, no analytics, no upload.

## The website

The `site/` folder is a **static website** — plain HTML with inline CSS/JS, no build step. Serve `site/` on any static host (GitHub Pages, Vercel, Cloudflare Pages) with no build command.

## Roadmap

- ChatGPT and Gemini exporters (different endpoints per provider).

## Contributing

Issues and pull requests are welcome — bug reports, browser-compatibility notes, and new-provider exporters especially.

## License

[MIT](LICENSE).
