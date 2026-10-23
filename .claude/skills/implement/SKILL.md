---
name: implement
description: Implements one Task of a fab0 sandbox run in this repo, with its tests. Use when a fab0 attempt brief names it.
---

# implement

You make one Task's change in this repo, on the branch the brief names. Read this repo's `CLAUDE.md` first for its
stack, layout and test command.

## Inputs

The brief gives the Story and the Task, whose **Done when** list says what must hold. This run's spec is
`docs/specs/<run>.md` in this repo when the repo has one: follow its design. On a later revision, the brief says
what the reviewer asked to change.

## Steps

1. Read the Task, the spec and the code the change touches.
2. Make the change, in the repo's existing style. Change only what the Task asks for.
3. Write a test for each item of **Done when**, named after it (`R2.1: …`).
4. Run the repo's tests until they all pass. If a check can't pass, don't weaken the test: say why in your last
   message and stop.
5. On a revision, address every point of the feedback, and nothing else.

Don't commit, push or open a pull request: fab0 does that when you exit. Don't write to GitHub.
