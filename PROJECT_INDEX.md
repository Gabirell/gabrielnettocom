# gabrielnetto.com - Project Index

**3-Layer Architecture**: Directives → Orchestration (AI) → Execution

Last Updated: 2026-01-09

---

## Quick Start

### Current Status
- ⏳ **Domain**: Waiting for ICANN verification (1-8 hours)
- ✅ **DNS**: Configured correctly (gabrielnetto.com → 163.176.225.87)
- ✅ **Website**: Working via IP address
- ⏳ **Monitoring**: Ready to activate when domain is live

### Check Domain Status
```bash
./execution/monitoring/check_domain.sh
```

### Get Started
- **First time?** Read: [`directives/domain/getting_started.md`](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/directives/domain/getting_started.md)
- **Deploy changes?** Read: [`directives/deployment/frontend_deployment.md`](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/directives/deployment/frontend_deployment.md)
- **Set up monitoring?** Read: [`directives/monitoring/uptime_monitor_setup.md`](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/directives/monitoring/uptime_monitor_setup.md)

---

## Directory Structure

```
gabrielnetto.com/
├── directives/          # Layer 1: What to do (SOPs)
│   ├── domain/          # DNS, domain management
│   ├── deployment/      # Deployment procedures
│   ├── monitoring/      # Uptime monitoring setup
│   └── n8n/             # n8n workflow management
│
├── execution/           # Layer 3: Doing the work (Scripts)
│   ├── deployment/      # Deployment scripts
│   ├── monitoring/      # Monitoring utilities
│   └── n8n/             # n8n utilities
│
├── workflows/           # n8n workflow definitions
│   ├── uptime_monitor_simple.json
│   ├── uptime_monitor_sheets.json
│   ├── ai_chat.json
│   └── archive/         # Old workflow versions
│
├── .tmp/                # Temporary files (gitignored)
│   ├── logs/
│   └── cache/
│
├── src/                 # React source code
├── public/              # Static assets
├── dist/                # Build output
│
├── AGENT.md             # AI agent operating instructions
├── README.md            # Project overview
├── .env.example         # Environment variable template
└── PROJECT_INDEX.md     # This file
```

---

## Layer 1: Directives (What to Do)

### Identity & Bio
| Directive | Purpose |
|---|---|
| [`identity/bio.md`](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/directives/identity/bio.md) | Official identity, bio templates, disambiguation rules |

### Site Structure & Content
| Directive | Purpose |
|---|---|
| [`site/structure.md`](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/directives/site/structure.md) | Complete site architecture: HOME, APPS, GAMES, ARTS, ABOUT, BLOG |
| [`content/educational_games.md`](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/directives/content/educational_games.md) | Educational game series vision, stat tracking, animation pipeline |

### Infrastructure & Rendering
| Directive | Purpose |
|---|---|
| [`rendering/3d_ai_pipeline.md`](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/directives/rendering/3d_ai_pipeline.md) | 3D model creation, image generation, Oracle+GPU integration |
| [`infrastructure/health_monitoring.md`](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/directives/infrastructure/health_monitoring.md) | Real system health check (BIOS-style loading page) |

### Domain Management  
| Directive | Purpose |
|---|---|
| [`domain/dns_management.md`](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/directives/domain/dns_management.md) | DNS configuration, safety procedures, domain protection |
| [`domain/domain_verification.md`](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/directives/domain/domain_verification.md) | ICANN email verification process |
| [`domain/getting_started.md`](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/directives/domain/getting_started.md) | Quick start guide for tomorrow/next session |

### Deployment
| Directive | Purpose |
|---|---|
| [`deployment/frontend_deployment.md`](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/directives/deployment/frontend_deployment.md) | Safe frontend deployment procedures |

### Monitoring
| Directive | Purpose |
|---|---|
| [`monitoring/uptime_monitor_setup.md`](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/directives/monitoring/uptime_monitor_setup.md) | Basic uptime monitor setup (5 min) |
| [`monitoring/uptime_monitor_advanced.md`](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/directives/monitoring/uptime_monitor_advanced.md) | Advanced monitoring features |
| [`monitoring/google_sheets_integration.md`](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/directives/monitoring/google_sheets_integration.md) | Google Sheets OAuth & smart alerts |
| [`monitoring/quick_reference.md`](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/directives/monitoring/quick_reference.md) | Common tasks & troubleshooting |

### n8n
| Directive | Purpose |
|---|---|
| [`n8n/workflow_management.md`](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/directives/n8n/workflow_management.md) | Import/export workflows, credential management |

---

## Layer 2: Orchestration (AI Decision Making)

**You are here!** This layer reads directives, makes intelligent routing decisions, calls execution tools, and handles errors.

Follow: [`AGENT.md`](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/AGENT.md) for operating principles.

---

## Layer 3: Execution (Doing the Work)

### Deployment Scripts
| Script | Purpose | Usage |
|---|---|---|
| [`deployment/deploy_frontend.sh`](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/execution/deployment/deploy_frontend.sh) | Deploy frontend changes safely | `./execution/deployment/deploy_frontend.sh` |

### Monitoring Scripts
| Script | Purpose | Usage |
|---|---|---|
| [`monitoring/check_domain.sh`](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/execution/monitoring/check_domain.sh) | Check DNS & domain status | `./execution/monitoring/check_domain.sh` |

### n8n Utilities
| Script | Purpose | Usage |
|---|---|---|
| [`n8n/list_credentials.js`](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/execution/n8n/list_credentials.js) | List n8n credentials | `node execution/n8n/list_credentials.js` |
| [`n8n/import_workflow.js`](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/execution/n8n/import_workflow.js) | Import n8n workflow | `node execution/n8n/import_workflow.js <file>` |

---

## Workflows

### Active Workflows
| Workflow | Purpose | Status |
|---|---|---|
| [`uptime_monitor_simple.json`](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/workflows/uptime_monitor_simple.json) | Basic uptime monitoring | Ready to import |
| [`uptime_monitor_sheets.json`](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/workflows/uptime_monitor_sheets.json) | Smart monitoring with Google Sheets | Requires HTTPS |
| [`ai_chat.json`](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/workflows/ai_chat.json) | AI chat for website | Working |

### Archived Workflows
Old versions stored in [`workflows/archive/`](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/workflows/archive/)

---

## Configuration

### Environment Variables
Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
# Edit .env with your values
```

### Key Configuration Items:
- **n8n URL**: Currently `http://163.176.225.87/n8n`
- **Domain**: `gabrielnetto.com`
- **Oracle IP**: `163.176.225.87`

### Credentials (Stored in n8n UI):
- Gmail SMTP (for email alerts)
- Telegram Bot (for Telegram notifications)
- Google Sheets API (for smart monitoring - requires HTTPS)
- Groq/Gemini API (for AI chat)

---

## Common Tasks

### Deploy Frontend Changes
```bash
./execution/deployment/deploy_frontend.sh
```
**Safe**: Cannot break DNS or backend services

### Check Domain Status
```bash
./execution/monitoring/check_domain.sh
```
Shows DNS resolution, HTTP/HTTPS connectivity

### Import n8n Workflow
```bash
node execution/n8n/import_workflow.js workflows/uptime_monitor_simple.json
```

### List n8n Credentials
```bash
node execution/n8n/list_credentials.js
```

---

## Emergency Procedures

### Site Down
1. Check domain status: `./execution/monitoring/check_domain.sh`
2. Verify DNS: `dig +short gabrielnetto.com`
3. See: [`directives/domain/dns_management.md`](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/directives/domain/dns_management.md)

### Need to Rollback Deployment
1. See deployment guide: [`directives/deployment/frontend_deployment.md`](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/directives/deployment/frontend_deployment.md)
2. Backend changes handled separately (n8n)

### Lost Access to n8n
- URL: `http://163.176.225.87/n8n`
- Check Oracle instance is running
- Verify firewall rules

---

## System Information

### Infrastructure
- **Hosting**: Oracle Cloud Free Tier
- **Primary IP**: 163.176.225.87 (reserved permanently)
- **Backup IP**: 163.176.171.139
- **Domain Registrar**: Superdominios
- **DNS**: ns1.sdparking.com.br, ns2.sdparking.com.br

### Protection Status
- ✅ Domain Lock: **Enabled** (Trava de Registro)
- ✅ Oracle IP: **Reserved** (won't be released)
- ✅ DNS Records: All pointing to correct IP
- ✅ Backup guides: Complete

### Current Issues (If Any)
- ⏳ Waiting for ICANN email verification (domain reactivation)
- Expected resolution: 1-8 hours from verification
- See: [`directives/domain/domain_verification.md`](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/directives/domain/domain_verification.md)

---

## Next Steps

### When Domain Becomes Active:
1. ✅ Verify domain accessibility (run `check_domain.sh`)
2. Setup SSL certificate (if needed)
3. Activate basic uptime monitor
4. Configure Google Sheets OAuth
5. Upgrade to smart monitoring

### Future Enhancements:
- Additional monitoring metrics
- Automated deployment pipelines
- Performance monitoring
- Analytics integration

---

## Support & Documentation

### Primary Documentation
- **This file**: Project navigation and quick reference
- **AGENT.md**: AI operating principles
- **README.md**: Project overview
- **Directives**: Detailed SOPs for all procedures

### Getting Help
1. Check relevant directive in `directives/`
2. Run diagnostic scripts in `execution/`
3. Review workflow documentation in `directives/n8n/`
4. Consult AI assistant (provide context from directives)

---

**Remember**: Directives define what to do, AI orchestrates decisions, execution scripts do the work. Keep this separation clean!
