# Project 2 — Production challenge: Mail Services Basics

## Scenario

A working Mail Services Basics lab now needs production-style failure handling, repeatability, and evidence.

## Requirements

- start from Project 1 and automate the repeatable steps;
- introduce a controlled failure involving **DNS records**;
- diagnose using logs, status, events, metrics, or packet/process evidence;
- add a health check, rollback, cleanup, and short incident timeline;
- rerun the recovery to prove it was not accidental.

## Suggested sequence

1. Write the expected outcome and a simple diagram.
2. Capture the starting state and versions.
3. Implement one small change at a time.
4. Validate syntax before applying where supported.
5. Verify from the operator and user perspectives.
6. Remove the lab and rebuild it from the README.

## Acceptance criteria

- [ ] A clean machine or namespace can reproduce the result.
- [ ] Validation is objective and includes the relevant command output.
- [ ] No password, token, private key, or personal data is committed.
- [ ] Failure and rollback behaviour are documented.
- [ ] Cleanup is safe and complete.

## Reflection

Record what failed, the evidence that led to the cause, the final fix, and what you would monitor in production.
