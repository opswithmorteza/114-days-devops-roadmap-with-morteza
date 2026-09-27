# 🚀 114-Day DevOps Roadmap

This repository documents a **complete 114-day, project-based journey** from Linux foundations to production-grade DevOps and SRE practices.

> Public by design: every day includes notes, a hands-on lab, and references.  
> Use it as a **learning path** or a **quick reference**.

## 📅 Phases
- **Day 01–14:** Linux (LPIC-1 & LPIC-2 essentials)
- **Day 15–28:** Advanced Linux (LPIC-3 topics)
- **Day 29–68:** DevOps core (Git, automation, containers, CI/CD, IaC, Kubernetes, cloud, observability and security)
- **Day 69–83:** End-to-end production capstone
- **Day 84–114:** Portfolio, GitOps, SRE, platform engineering and production readiness

## 🗂️ Structure
Each day lives in its own folder:
```
Day-001_Linux_Basics/
  ├─ notes.md              # concepts, workflow, example and review
  └─ project/
     ├─ README.md          # project index
     ├─ PROJECT-1.md       # guided implementation
     ├─ PROJECT-2.md       # production failure/recovery challenge
     └─ lab.sh             # safe preflight, plan and validation helper
```
Shared content:
```
Cheatsheets/      # quick reference
roadmap/          # PDF roadmap
assets/           # visuals (cover image)
scripts/          # helper scripts
.github/workflows # CI for linting & link checks
```

## 🧭 Start Here
1. Open **[COMPLETE_114_DAY_GUIDE.md](COMPLETE_114_DAY_GUIDE.md)** or browse **[PROGRESS.md](PROGRESS.md)**.
2. Open the day’s `notes.md` and follow the lab in `project/`.
3. Share learnings publicly (optional).

Every day includes a safe Bash helper. It checks prerequisites and prints commands for review; it does not automatically change infrastructure:

```bash
bash Day-035_Docker_basics/project/lab.sh check
bash Day-035_Docker_basics/project/lab.sh plan
bash Day-035_Docker_basics/project/lab.sh verify
```

## 📝 Notes & Cheatsheets
- Roadmap PDF → [`roadmap/DevOps_114Day_Roadmap.pdf`](roadmap/DevOps_114Day_Roadmap.pdf)
- Quick References → [`Cheatsheets/`](Cheatsheets)

## 🛠️ CI (optional)
This repo ships GitHub Actions for Markdown linting and link checking. You can disable them by removing `.github/workflows`.

## 🔗 Connect
- LinkedIn: [Morteza Rajabi](https://www.linkedin.com/in/morteza-rajabi-devops/)
- GitHub: [opswithmorteza](https://github.com/opswithmorteza)

---

**License:** MIT
