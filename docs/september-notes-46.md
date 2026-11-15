# Article 46: Private Editorial Evidence

- Read all six original article bodies for 46/47 from the native source content directory; inspected Stable Valeska history read-only.
- Retained only 119537a (August 25 authentication), ea893b7 (August 30 standalone), and bccd700 (August 31 offline-model correction and indexing evidence). Read the standalone installation guide at bccd700 in full.
- Removed September 1 notices (f535fb2) and September 5 PDF/A opt-out (5dbc994) from all public evidence and narrative. Both commit dates were verified.
- bccd700 is dated August 31 at 20:15:51 -0700. Publication is August 31 at 23:59:00-07:00, preserving the Pacific calendar date without preceding the evidence.
- Narrowed offline claims to the recorded disconnected model-loading check; distinguished staging downloads, local end-to-end observations, and non-production evaluation limits. No claim of customer validation or an independent security audit.
- Full paragraph-for-paragraph Spanish and Brazilian Portuguese translations, including title, description, artwork alt text, and evidence footer. Existing identifiers and taxonomy retained; new records use source_revision 1 and published/reviewed flags.
- No blog links, operational recipes, or later-history claims. Only assigned JSON records and private notes were written; publication transport and artwork delivery remain with the parent workflow.
- Validation: all three JSON records parse; English has 622 visible whitespace-delimited words including headings, excluding evidence. Each locale has ten narrative paragraphs, three headings, and one evidence paragraph.
- Parent rendering warning: src/pages/[locale]/[...path].astro:37 formats timestamps in UTC. The required late-Pacific timestamp will display September 1 there even though historicalBasis.date and the explicit offset preserve August 31 locally. Resolve calendar-date presentation in the parent workflow; do not move the publication instant before its evidence. No renderer changes made in this scope.
