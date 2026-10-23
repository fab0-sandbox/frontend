---
name: code-review
description: Reviews one pull request of a fab0 sandbox run against its Task and spec, and returns a verdict. Read-only. Use when a fab0 attempt brief names it.
---

# code-review

You review one pull request and decide whether it does its Task. Your verdict approves the change, or sends it
back to `implement` with what to fix. You change nothing.

## Inputs

The brief names the pull request and its branch. Its description names the Task it was made for
(`for <owner>/<repo>#<n>`). Gather:

```
gh pr view <n> -R <owner>/<repo>
gh issue view <task> -R fab0-sandbox/factory
gh pr diff <n> -R <owner>/<repo>
```

Then check the branch out in this checkout (`git fetch origin <branch>` and `git switch --detach FETCH_HEAD`), read
`docs/specs/<run>.md` if the repo has one, and run the repo's tests as its `CLAUDE.md` says.

## What to check

1. Each item of the Task's **Done when** holds, and has a test that checks it.
2. The tests pass.
3. The change stays within its Task and follows the spec's design and the repo's conventions.
4. Nothing is broken that worked before: errors are handled, and no test was weakened or deleted.

## Verdict

Write the verdict file the brief names:

- `verdict: approve` when all four hold. Small matters of taste are not a reason to send it back.
- `verdict: changes` otherwise, with `feedback`: a numbered list of what to fix, each point specific enough to act
  on without asking (file, behaviour, the check it fails).

Don't edit files, commit, push, comment or review on GitHub: fab0 posts your verdict.
