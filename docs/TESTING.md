# Test Plan

## Automated tests
Run `npm test`. The tests verify sample lesson data integrity and basic content requirements.

## Manual acceptance test cases

| ID | Test | Steps | Expected result |
|---|---|---|---|
| LL-01 | Dashboard loads | Open the site | Hero, progress summary, categories, and lessons appear |
| LL-02 | Search | Search for “budget” | Monthly budget lesson appears |
| LL-03 | Category filter | Select “Digital & Cyber Safety” | Only digital/cyber safety lessons appear |
| LL-04 | Open lesson | Select “Start lesson” | Lesson modal shows steps and quiz |
| LL-05 | Correct quiz | Select the correct option and check | Correct feedback appears |
| LL-06 | Incorrect quiz | Select a wrong option and check | Helpful explanation appears |
| LL-07 | Complete lesson | Select “Mark lesson complete” | Completed count and percentage update |
| LL-08 | Persist progress | Refresh the page after completion | Completed lesson remains completed in same browser |
| LL-09 | Empty search | Search for a nonexistent phrase | Empty-state message appears |
| LL-10 | Mobile layout | Resize viewport to phone width | Cards stack into one column and controls remain usable |

## Known limits
Automated browser interaction tests are not included; LL-01 through LL-10 are manual browser acceptance tests. Automated tests validate the bundled sample data and are a starting point for extending test coverage.
