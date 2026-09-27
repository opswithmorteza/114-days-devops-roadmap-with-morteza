# Day 012 — Advanced Storage: LVM and RAID

> Track: **Linux foundation** · Suggested study time: **90–150 minutes**

## Why this matters

Advanced Storage: LVM and RAID is part of the operational path from a developer commit to a reliable production service. Today's goal is to understand the system, practise the normal workflow, deliberately observe one failure, and leave reproducible evidence in Git.

## In plain English

Storage work is about the complete data lifecycle: allocation, permissions, persistence, consistency, capacity, backup and tested restoration—not merely creating a disk or database.

```mermaid
flowchart LR
    A[physical/logical volumes] --> B[RAID levels]
    B --> C[resizing]
    C --> D[recovery]
    D --> E[Evidence and feedback]
```

## Learning outcomes

By the end of the day you should be able to:

- describe physical/logical volumes and RAID levels in plain language;
- use resizing and recovery in a small working lab;
- validate the result with evidence instead of assuming success;
- recognise one common failure and return safely to the previous state.

## Core ideas

- **physical and logical volumes** — an observability signal: it turns internal behaviour into evidence that operators can query, correlate, and alert on. In the lab, observe it before and after one controlled change so the idea is tied to real evidence.
- **RAID levels** — a data-lifecycle mechanism: it controls where data lives, how it survives restarts, and how it is recovered. In the lab, observe it before and after one controlled change so the idea is tied to real evidence.
- **resizing** — a core operating concept in Advanced Storage: LVM and RAID: understand its purpose, inputs, outputs, owner, normal signal, and failure signal. In the lab, observe it before and after one controlled change so the idea is tied to real evidence.
- **recovery** — a reliability concern: it defines how an unhealthy state is detected, contained, explained, and reversed. In the lab, observe it before and after one controlled change so the idea is tied to real evidence.

The useful mental model is **desired state → action → observed state → evidence**. Write down what you expect before each change. After the change, check the service from both the operator's view and the user's view. A command returning zero is useful evidence, but a real request, metric, log entry, or restored file is stronger.

## Lab setup and safety

Use one Ubuntu or Debian VM. Take a snapshot first and keep a second terminal open so you can recover from permission, network, or storage mistakes.

1. Record the starting state and tool versions.
2. Make the smallest possible change.
3. Run a syntax or dry-run check where the tool supports it.
4. Apply the change and observe logs/events while it happens.
5. Test the happy path and one negative path.
6. Revert or clean up, then repeat from the README to prove reproducibility.

## Worked example

Run the following as a starting point, adapting names and addresses to your lab:

```bash
pvs
vgs
lvs
cat /proc/mdstat
```

Before running privileged or destructive operations, read the help page and confirm the target. Save relevant output in a text file under an `evidence/` directory, but redact tokens, passwords, private keys, public IPs, and personal data.

The project directory includes a safe helper. It checks tools and prints the plan, but never runs infrastructure-changing commands automatically:

```bash
bash project/lab.sh check
bash project/lab.sh plan
bash project/lab.sh verify
```

## Practical workflow

- **Discover:** inspect the current state without modifying it.
- **Plan:** state the intended result, risks, and rollback.
- **Implement:** keep configuration declarative and version-controlled where possible.
- **Verify:** test syntax, behaviour, logs, and the user-facing endpoint.
- **Break safely:** introduce one controlled error related to physical/logical volumes or resizing.
- **Recover:** use the evidence to diagnose, roll back, and document the root cause.

## Project 1 — Guided build: Storage: LVM and RAID

Build a clean lab that demonstrates all four concepts: **physical/logical volumes**, **RAID levels**, **resizing**, **recovery**.

**Required deliverables**

- a short architecture diagram or request-flow sketch;
- version-controlled configuration or automation;
- a README with prerequisites, exact run steps, validation, and cleanup;
- captured evidence showing a successful result;
- a troubleshooting note for one mistake you actually tested.

**Acceptance test:** another person can start from a clean machine, follow only your README, run the validation command, and get the documented result.

## Project 2 — Production challenge: Storage: LVM and RAID

Turn the first lab into an operations exercise. Add automation, deliberately create a failure around **RAID levels**, and diagnose it without random changes. Add a health check or measurable signal, a rollback step, and a short incident timeline.

**Definition of done**

- secrets and machine-specific values are not committed;
- repeated execution is safe or its side effects are clearly documented;
- the negative test fails for the expected reason;
- rollback restores the original service;
- cleanup leaves no unexpected process, container, cloud resource, mount, or credential.

## Review questions

1. How would you explain physical/logical volumes to a developer who has not operated production systems?
2. Which signal proves RAID levels is healthy?
3. What is the safest rollback if resizing fails halfway through?
4. Which part should be automated next, and what new risk would that automation introduce?

## Completion checklist

- [ ] I can explain the four core ideas without reading the notes.
- [ ] I ran the worked example and saved redacted evidence.
- [ ] Project 1 passes from a clean start.
- [ ] Project 2 includes failure, diagnosis, recovery, and cleanup.
- [ ] I committed notes using a meaningful message and linked the evidence.

## Further reading

- Use the official documentation for the named tool or service as the source of truth.
- Use local manual pages (`man`, `--help`) for the exact installed version.
- Re-check cloud pricing, security guidance, and release notes before using the lab in production.
