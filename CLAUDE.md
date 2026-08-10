# tammy-site rules

- **This code belongs to Tammy. The canonical repo is `tammysh3112-ops/tammy-site` (her GitHub), branch `main`.** `origin` points there on both the mac and her VPS, so a bare `git push` is correct. Never make Peleg's account the home of this code.
  - Her repo is PUBLIC: no credential ever gets committed. `api/subscribe.js` reads Rav Messer creds from `process.env` and it stays that way.
  - `peleg-backup` (mac) / `peleg-deploy` (VPS) point at `peleg-jpg/tammy-site`. That copy is private and exists for two reasons only: a safety net, and because Vercel is still git-linked to it so it is the thing that triggers a deploy. It is NOT where the code lives. Once the Vercel project moves onto Tammy's own account, drop the mirror push.
  - Histories converged at a461f2d, so pushes to her repo are ordinary fast-forwards. Never `--force` either remote.
- Footer credit on EVERY page (existing and new, no exceptions): `נבנה באהבה על ידי <a href="https://pelegdror.com" target="_blank" rel="noopener" style="color:inherit;font-weight:600;text-decoration:underline;text-underline-offset:3px">פלג דרור</a>. כל הזכויות שמורות לתמי שני.`
- The day-to-sunset-to-brown sky world (gradient + fixed scenery layers, deepest brown landing on the final CTA) is a LOCKED brand element on the homepage. No sun or moon disc, the horizon glow carries the sunset. Never remove or restyle it.
- That sky drives the type colors: sections up to `proof` are ink-on-light (`.panel-day`), `course` onward is cream-on-brown (`.panel-dusk`). Change the sky ramp and you must flip the matching section colors, header `on-light` threshold, and logo swap in `render()`.
- Display font is always Discovery Fs (assets/fonts/), body Heebo. RTL from first line, punctuation after text, no em/en dashes anywhere.
- Guide funnel: forms POST to /api/subscribe -> Rav Messer v2 API (graph.responder.live, JWT from client_credentials; see .claude/skills/tammy-new-guide). Rav Messer credentials are Tammy's account only.
- CTAs: course https://tammyshani.ravpage.co.il/tammybabysleep · consult https://ig.me/m/baby.tammy.time
