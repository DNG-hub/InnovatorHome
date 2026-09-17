# Contact mail verification repair — September 16, 2026

The Cloudflare dashboard confirms that `TURNSTILE_SECRET` is a **Secrets Store** binding to `TURNSTILE_SECRET_KEY`, not an ordinary string-valued Worker secret.

The Worker incorrectly passed `env.TURNSTILE_SECRET` directly into `verifyTurnstile()`. URLSearchParams therefore received a binding object instead of the secret value, preventing valid browser challenges from passing server verification.

The targeted repair is:

```js
const verification = await verifyTurnstile(token, await env.TURNSTILE_SECRET.get(), ip);
```

Cloudflare reference: https://developers.cloudflare.com/secrets-store/integrations/workers/

The existing form already distinguishes missing/rejected Turnstile verification from field validation. Earlier assertions that Brave was the sole remaining cause were not established; Dave reproduced the failure in Chrome. The recipient and removal of replyTo were already present when directly inspected. No secret value was viewed or recorded during this repair.

Validation: one exact matching expression replaced in the production dashboard editor; editor reports no problems. Final delivery still requires a fresh human challenge and submission, followed by inbox confirmation. Do not claim end-to-end delivery from a successful deployment alone.

Dave authorized the contact-mail repair and deployment. HECL selection recorded in Valeska as dda2b05a-3d1f-453e-bbe7-acfe9000ca88, scoped to avanti-ai-innovators and holding cmha-tbd (unverified placeholder).

## Delivery confirmed

After deployment 6dc88181, Dave completed a Chrome submission. Gmail connector search confirmed the resulting email with subject `Contact form: David Gargan` arrived at the configured verified Gmail destination at 2026-09-16 23:00:44 UTC (4:00:44 PM PDT). Gmail labels were INBOX and UNREAD (not Spam). This verifies the human form submission through Turnstile, the Worker, and actual inbox delivery. The form delivers to the configured site-owner destination, not the visitor email entered into the form.
