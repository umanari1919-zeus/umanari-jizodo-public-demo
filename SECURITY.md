# Security Policy

## Reporting a vulnerability

Do not disclose vulnerability details in a public issue, discussion, pull request,
or commit.

1. Use GitHub Private Vulnerability Reporting when the repository displays the
   **Report a vulnerability** action.
2. If that action is unavailable, open a public issue containing only a request
   for a private security contact. Do not include vulnerability details, logs,
   credentials, reproduction steps, or affected data in that issue.
3. A maintainer will establish a private channel before accepting technical details.

## Public repository safety rules

- Never commit credentials, tokens, private endpoints, connection strings, or environment files.
- Never commit real race data, prediction assets, private operational documents, or local absolute paths.
- All demo data must be fully synthetic and marked with `"is_demo": true`.
- Security reports should include only the minimum information needed to reproduce the issue.
