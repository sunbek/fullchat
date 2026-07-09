// Fullchat — Claude chat exporter (readable source).
// Run on an open claude.ai chat page (claude.ai/chat/<id>). Downloads the FULL
// conversation JSON — the model's thinking + every tool input and output, all the
// parts Claude's "Share" link strips out. It works because it runs in your own
// logged-in browser: native cookies + Cloudflare are handled automatically. No
// server, nothing leaves your machine.
//
// The paste-ready one-liners are generated from this file:
//   bookmarklet.public.min.txt  — javascript: bookmarklet (drag to your bookmarks bar)
//   console.public.min.txt      — same logic, for the DevTools console (fallback)
(async () => {
  try {
    const p = location.pathname;
    // conversation id = the /chat/<uuid> segment, else the last uuid in the path
    const uuids = p.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi);
    const conv = (p.match(/\/chat\/([0-9a-f-]{36})/i) || [])[1] || (uuids && uuids[uuids.length - 1]);
    if (!conv) { alert('Open a specific Claude chat first (the URL should look like claude.ai/chat/...), then click again.'); return; }
    const org = (document.cookie.match(/lastActiveOrg=([^;]+)/) || [])[1];
    if (!org) { alert('No active Claude workspace found — sign in to claude.ai and try again.'); return; }
    const url = `/api/organizations/${org}/chat_conversations/${conv}?tree=True&rendering_mode=messages&render_all_tools=true&consistency=strong`;
    const r = await fetch(url, { headers: { 'anthropic-client-platform': 'web_claude_ai' }, credentials: 'include' });
    if (!r.ok) { alert('Could not fetch the chat (status ' + r.status + '). Refresh the page, make sure you are signed in, and try again.'); return; }
    const txt = await r.text();
    let slug = '';
    try { slug = (document.title || '').replace(/\s*[\\|·—-]\s*Claude.*$/i, '').trim().replace(/[^\p{L}\p{N}]+/gu, '-').slice(0, 40).replace(/^-|-$/g, ''); } catch (e) {}
    const name = 'claude-chat-' + (slug ? slug + '-' : '') + conv.slice(0, 8) + '.json';
    const b = new Blob([txt], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(b);
    a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    alert('✓ Saved ' + name);
  } catch (e) { alert('Error: ' + e.message); }
})();
