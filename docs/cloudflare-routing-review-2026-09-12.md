# Cloudflare routing reconciliation — September 12, 2026

## Email investigation and repair

Dave selected Gmail and Proton as the mailbox destinations and will define
folder/label rules himself. No Gmail/Proton rules, subscriptions or passwords
were changed. Existing Proton routing for avantihealthcare.org stays intact.

Created and verified an ACTIVE explicit Cloudflare rule:
`innovator@avanticomplex.com` → `david.neil.gargan@gmail.com`.
The four existing named rules and catch-all remain active. Previously Innovator
depended on the catch-all. This repair makes its intended destination explicit;
it does not configure outbound send-as or eliminate Gmail's self-test deduplication.

The Cloudflare Activity Log records the original test AAI-20260912-01 as
Forwarded. The "Missing email" message is a same-sender/destination diagnostic,
not a bounce. Earlier external Innovator messages also show Forwarded.

All 27 failed attempts in the inspected seven-day window belong to TWO messages:

| Message | Failed attempts | Final lifecycle outcome (PDT) |
|---|---:|---|
| Google security alert to d@avanticomplex.com | 22 | Forwarded Sep 11, 03:18:23 |
| GitHub product update to d@avanticomplex.com | 5 | Forwarded Sep 8, 10:20:59 |

The first inspected attempt for each reports Gmail SMTP 421 / 4.7.28 temporary
unsolicited-mail rate limiting. Both pass SPF, DKIM and DMARC. The Google alert
was delayed from Sep 8, 20:44 until Sep 11; the GitHub message was delayed about
20 minutes. These counters are failed attempts, not 27 permanently lost messages.
No DNS-authentication change is indicated by these two failures. Do not replace
Cloudflare SPF with GoDaddy's suggested value merely to silence its dashboard.

## Website routing reconciliation

Cloudflare configuration was read directly, including all published application
routes for the five tunnels with routes and the avanticomplex.com DNS table.
No web DNS, tunnel, origin service, or Access policy was changed. The new Astro
site remains local on 3204; this task does not publish it.

| Tunnel | Observed state | Route count | Assessment |
|---|---|---:|---|
| stable-main | Healthy, Stable replica | 13 | Current ingress; includes configuration mismatches below |
| STABLE | Down | 2 | Cannot retire yet: medici DNS still selects this tunnel |
| ubatuba-main | Down | 8 | Still selected by ai, boudoir, intimate, scheduled, fresh, fresh-share DNS |
| AvantiAI | Down | 10 | Overlaps Ubatuba/Santos; retain until references across other zones are checked |
| santos-monitor | Down | 11 | Overlaps legacy routes; its name does not describe its actual Ubatuba-targeted services |
| remotedesktop | Inactive | 0 | No published routes shown; candidate for later retirement |

### Specific discrepancies and required resolution

- `avanticomplex.com`: A record 10.0.0.0, DNS-only/reserved address. Bare-domain
  HTTP check timed out. Choose the approved public site/origin at launch.
- `www.avanticomplex.com`: proxied CNAME back to the bare domain. HEAD returned
  403; this does not prove which edge/origin rule rejected it. It does not point
  to the new local Astro site. Fix alongside the bare domain at launch.
- `ai.avanticomplex.com`: DNS selects down ubatuba-main; route targets
  `http://192.168.1.114:8083`. Public HEAD returns 530. This may be a different
  existing application, so do not silently point it to the new professional site.
- `medici.avanticomplex.com`: DNS selects down STABLE, while both STABLE and
  healthy stable-main define the same service `http://192.168.1.250:5174`.
  Candidate repair: validate origin and access policy, then select stable-main.
  This is a separate application's public ingress; do not assume origin health.
- `catanddaniel.avanticomplex.com`: DNS selects stable-main, but no matching
  hostname appears in its 13 published routes. `storylab.avanticomplex.com`
  exists there and targets localhost:3200. Decide whether catanddaniel should
  alias/redirect to StoryLab in the CatAndDaniel project's scope.
- `demo.avanticomplex.com`: both old STABLE and stable-main define it, with
  different origin addresses (192.168.1.201:3000 versus 192.168.1.250:3000).
  No corresponding demo record was present in the inspected DNS inventory.
  Determine whether this service remains public before selecting an origin.
- `commons.avanticomplex.com`: two routes in stable-main, order 12 to
  localhost:8110 and order 13 to localhost:8120. UI says first matching route
  wins. Port 8110 responds (HEAD 405); port 8120 refuses connections. Review
  whether any path-specific setting exists before removing the second entry.
- ubatuba-main and santos-monitor contain `www.notsoshabby.net`, which differs
  from registered `notsoshabbystayton.net`. Confirm intended hostname before
  replacing it. The expired NotSoShabby variants remain expired per Dave.

### Active Stable service map

| Hostname prefix under avanticomplex.com | Service |
|---|---|
| stable, stable-video | rdp://localhost:3389 |
| demo | http://192.168.1.250:3000 |
| medici | http://192.168.1.250:5174 |
| landscape | http://localhost:3100 |
| storylab | http://localhost:3200 |
| lemedash | http://localhost:3001 |
| academy | http://localhost:3201 |
| rv | http://localhost:8081 |
| clinic | http://localhost:5175 |
| shabbyphone | http://localhost:9000 |
| commons (first) | http://localhost:8110 |
| commons (second) | http://localhost:8120 |

Several legacy Microsoft/GoDaddy DNS aliases remain (autodiscover, email, imap,
pop, smtp, enrollment, registration, SIP). Their existence does not mean mail
arrives in GoDaddy. Inbox consolidation needs an outbound sending plan before
these are removed. No cleanup based solely on a down-tunnel status is safe.

Recorded Dave directive: HECL selection 1c02a63f-6d6e-4fca-830d-892f7c48e5f2,
project avanti-ai-innovators, holding cmha-tbd (unverified placeholder).
