# Blockers

1. **Native Dependencies:** `better-sqlite3` and `playwright` require post-install builds that are restricted (ERR_PNPM_IGNORED_BUILDS).
2. **Environment:** Headed browser automation requires X11/Display which is unavailable in the current container environment.
