# Incident_test — AegisOps webhook demo

Tiny Node project that **fails CI on purpose** so you can see **GitHub Actions** and **Jenkins** notify [AegisOps](https://github.com/) (or your fork).

| Command | Simulates |
|---------|-----------|
| `npm run incident:test` | Failing unit test → `failed_test` |
| `npm run incident:peer` | npm `ERESOLVE` text → `dependency_conflict` |
| `npm run incident:env` | Missing env message → `missing_env` |

## GitHub

1. Push this repo to **main**.
2. **Actions → Incident demo CI → Run workflow** → pick an incident, or push any commit to run the default failing test.
3. Point AegisOps at your public URL: **Repository webhook** `workflow_run` → `/api/v1/webhooks/github` + secret, or your Bearer ingress pattern.

## Jenkins

1. **New Item → Pipeline → Pipeline script from SCM**  
   - Repo: `https://github.com/Usmansayed/Incident_test.git`  
   - Script Path: `Jenkinsfile`
2. **Build with Parameters**: set **AEGISOPS_WEBHOOK_URL** to your ngrok/API URL.
3. Credential **Secret text** ID: **`aegisops-webhook-token`** (same value as `AEGISOPS_WEBHOOK_BEARER_TOKEN`).

## Local

```bash
npm install
npm run incident:test
```

## Remote trigger (no password)

From the **scalar** repo use `scripts/run-incident-demo.ps1` with **Jenkins API token** (not your login password): see comment block in that script.
