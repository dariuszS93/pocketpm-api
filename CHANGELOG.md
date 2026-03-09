# File: CHANGELOG.md

All notable changes to this project will be documented in this file.

The format is based on \[Keep a Changelog\]\(https://keepachangelog.com/en/1.1.0/\),
and this project aims to follow \[Semantic Versioning\]\(https://semver.org/\) once it becomes a full product.

## \[Unreleased\]
### Added
- \- simple API for managing tasks (create, read, update, delete)
- \- Prisma ORM for database management
- \- basic database schema with a `Task` model (id, title, completed, createdAt, updatedAt)
- \- database seeding with sample tasks
- \- README with setup instructions and Prisma Studio usage

### Changed
- \-

### Fixed
- \-

### Removed
- \-

## \[1.0.1\] \- 2026-03-09
### Added
- Initial project structure.
- Prisma setup and migrations workflow.
- Basic README instructions (install, run, Prisma Studio).

#### Screenshots
- ![Simple API connected with database](docs/screenshots/1.0.1.png)

---

## How to add entries
- Keep changes in \[Unreleased\] during development.
- When releasing, move items from \[Unreleased\] to a new version section with a date.
- Put screenshots into `docs/screenshots/` and link them like:
    - `\[Some title\]\(docs/screenshots/your-file.png\)`
