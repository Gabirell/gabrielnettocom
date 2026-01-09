# Uptime Monitor - Ready to Deploy

**Status**: ✅ Prepared and ready to import to n8n  
**File**: `workflows/uptime_monitor_simple.json`  
**Last Check**: Domain not yet active (DNS OK, waiting for ICANN)

---

## Quick Deploy Instructions

### When Domain is Active:

1. **Access n8n**:
```bash
# Open in browser
https://163.176.225.87/n8n
```

2. **Import Workflow**:
- Click **Workflows** → **Import from File**
- Select: `/Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/workflows/uptime_monitor_simple.json`
- Click **Import**

3. **Configure** (2 minutes):
```
Update these nodes:
[ ] "Check Website" → URL: https://gabrielnetto.com
[ ] "Email: Site Down" → From/To: gabriel.netto@gmail.com
[ ] "Telegram: Site Down" → Chat ID: YOUR_CHAT_ID
[ ] "Telegram: Site Recovered" → Chat ID: YOUR_CHAT_ID
```

4. **Test**:
- Click **Execute Workflow**
- Verify it runs without errors

5. **Activate**:
- Toggle switch to **ON**
- Monitor runs every 5 minutes automatically!

---

## What It Monitors

- **Target**: https://gabrielnetto.com
- **Frequency**: Every 5 minutes
- **Alerts**:
  - ⚠️ Email when site goes down
  - ⚠️ Telegram notification when site goes down
  - ✅ Email when site recovers
  - ✅ Telegram when site recovers

---

## Credentials Needed

Make sure these are configured in n8n:

- [ ] **Gmail SMTP** (Port 465, App Password)
- [ ] **Telegram Bot** (Bot Token + Chat ID)

---

## After Activation

### Expected Behavior:
- **Site Up**: Silent, no alerts (runs every 5 min in background)
- **Site Down**: Alert every 5 min until recovery
- **Site Recovers**: One recovery notification

### Upgrade Later (Optional):
Add Google Sheets state tracking to eliminate repeated alerts.  
See: `directives/monitoring/google_sheets_integration.md`

---

## Troubleshooting

**No Alerts Received?**
1. Check n8n execution log
2. Verify credentials (Settings → Credentials)
3. Test Telegram bot: Send `/start`
4. Check email spam folder

**Workflow Not Running?**
1. Verify toggle is ON (green)
2. Check schedule trigger (every 5 min)
3. Look at Executions tab for errors

---

## Cost

**R$ 0** - Uses Oracle Cloud (free tier) + n8n (already running)

---

**Ready to import and activate the moment your domain is live!** 🚀
