# Upload Instructions

## Review locally

1. Open `COMPLETE_114_DAY_GUIDE.md` and follow links for several early, middle, and advanced days.
2. Search the repository for secrets and private information.
3. Check `git status` and inspect the diff before committing.
4. Run any Markdown/link checks configured for your repository.

## Commit and publish

```bash
git add .
git diff --cached --stat
git commit -m "complete 114-day DevOps roadmap with two projects per day"
git push origin main
```

If the default branch is not `main`, push the current branch instead. Do not force-push. The included `.git` directory is intentionally excluded from the downloadable ZIP, so copy the ZIP contents into your existing clone or upload the files through a normal branch and pull request.

## Suggested release

After the repository is reviewed, create a release named `Complete 114-Day DevOps Roadmap v1.0`. Attach the ZIP only if you want an offline download; GitHub already provides source archives for each release.
