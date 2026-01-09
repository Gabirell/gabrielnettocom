# Deployment Guide for gabrielnetto.com

**CRITICAL**: This guide ensures you can make visual changes WITHOUT breaking your site!

---

## 🎯 Quick Start (Most Common)

### Making Visual/UI Changes

When you want to change **colors, layout, text, components** (anything in `/src`):

```bash
# 1. Make your changes in src/
# 2. Test locally
npm run dev  # Visit http://localhost:5173

# 3. Deploy
./deploy-frontend.sh
```

**That's it!** Your site updates in ~30 seconds without touching n8n.

---

## 🏗️ Architecture Overview

Your site has TWO separate layers:

```
┌─────────────────────────────────┐
│  FRONTEND (React Terminal UI)  │  ← Change this often
│  Files: src/, public/           │
│  Deploys to: /var/www/.../dist  │
└────────────┬────────────────────┘
             │ /api/chat
┌────────────▼────────────────────┐
│  BACKEND (n8n AI Workflows)    │  ← Change this rarely
│  Docker: n8n-n8n-1              │
│  Credentials: In n8n UI only!   │
└─────────────────────────────────┘
```

**Key Insight**: Frontend changes do NOT require n8n restarts!

---

## 📋 Deployment Scenarios

### Scenario 1: Visual Changes (CSS, Components, Layout)

**Files Affected**: `src/components/`, `src/styles/`, `index.html`, etc.

**Steps**:
1. Edit files locally
2. `npm run dev` to test
3. `./deploy-frontend.sh`

**n8n**: ✅ Keeps running, no reconfiguration needed

---

### Scenario 2: AI Behavior Changes (Rare)

**What**: Changing AI prompts, adding new models, modifying workflow logic

**Steps**:
1. Log in to [https://gabrielnetto.com/n8n](https://gabrielnetto.com/n8n)
2. Edit workflow visually in the UI
3. Click "Test Workflow" to verify
4. Save
5. **DO NOT export/import** - this preserves credentials!

**Frontend**: ✅ Unaffected, stays online

---

### Scenario 3: Adding New API Keys (One-Time per Key)

**When**: First time setup, or adding a new AI provider

**Steps**:
1. Go to [https://gabrielnetto.com/n8n](https://gabrielnetto.com/n8n) → Credentials
2. Click "Add Credential"
3. Select credential type (e.g., "Groq API")
4. Name it EXACTLY as workflow expects:
   - Groq: `Groq account`
   - Gemini: `Google Gemini account`
5. Paste API key
6. Save

**Important**: Credentials persist in n8n's database. You only do this ONCE!

---

## 🚫 What NOT to Do

### ❌ NEVER: Re-import workflow JSON
- **Why**: Loses credential references
- **Result**: Site breaks, API calls fail
- **Fix**: Edit workflows in n8n UI instead

### ❌ NEVER: Put credentials in JSON files
- **Why**: Security risk, gets overwritten
- **Result**: Credentials lost on next import
- **Fix**: Always use n8n UI credentials

### ❌ NEVER: Deploy without testing locally
- **Why**: Untested changes may break production
- **Result**: Site goes offline
- **Fix**: Always run `npm run dev` first

### ❌ NEVER: Restart n8n for frontend changes
- **Why**: Unnecessary, causes downtime
- **Result**: Site temporarily offline
- **Fix**: Use `./deploy-frontend.sh` instead

---

## 🔧 Manual Deployment (Advanced)

If you can' t use the script:

```bash
# 1. Build
cd /Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom
npm run build

# 2. Deploy
scp -i ~/.gemini/antigravity/scratch/oracle.key -r dist/* \
  ubuntu@163.176.225.87:/var/www/gabrielnettocom/dist/

# 3. Verify
curl -I https://163.176.225.87/
```

---

## 🐛 Troubleshooting

### Problem: Site shows old version after deployment

**Solution**:
```bash
# Clear browser cache (Cmd+Shift+R) or:
ssh -i ~/.gemini/antigravity/scratch/oracle.key ubuntu@163.176.225.87 \
  "sudo nginx -s reload"
```

### Problem: AI chat returns error 404

**Cause**: Workflow not active or credentials missing

**Solution**:
1. Log in to n8n UI
2. Check workflow is "Active" (green toggle)
3. Verify credentials exist in Credentials menu
4. Test workflow with "Execute Workflow" button

### Problem: Terminal loads but AI doesn't respond

**Cause**: Missing API credentials

**Solution**:
1. Check browser console (F12) for errors
2. In n8n, verify credentials are configured
3. Test workflow manually in n8n UI

---

## 📊 Current Status

**VPS**: Oracle Cloud ARM (24GB RAM)  
**IP**: `163.176.225.87`  
**Domain**: `gabrielnetto.com` (update DNS to point to IP)

**Frontend**:
- Location: `/var/www/gabrielnettocom/dist`
- Served by: Nginx on port 443 (HTTPS)
- Local dev: `npm run dev` on port 5173

**Backend (n8n)**:
- Docker container: `n8n-n8n-1`
- Port: 5678 (proxied via Nginx)
- Editor: [https://gabrielnetto.com/n8n](https://gabrielnetto.com/n8n)
- Database: SQLite at `/home/node/.n8n` (Docker volume)

**Nginx Proxies**:
- `/api/chat` → n8n webhook at `http://127.0.0.1:5678/webhook/chat`
- `/n8n/` → n8n editor at `http://127.0.0.1:5678/`

---

## 🎓 Best Practices

1. **Version Control**: Commit to Git before deploying
   ```bash
   git add .
   git commit -m "Update terminal UI colors"
   git push
   ```

2. **Test First**: Always test locally before deploying
   ```bash
   npm run dev  # Check localhost:5173
   ```

3. **Deploy Often**: Small, frequent deploys are safer than big changes

4. **Monitor**: Keep n8n logs visible during testing
   ```bash
   ssh -i ~/.gemini/antigravity/scratch/oracle.key ubuntu@163.176.225.87 \
     "docker logs -f n8n-n8n-1"
   ```

5. **Backup**: n8n data is in Docker volume `n8n_data`
   ```bash
   # Backup command (run on VPS):
   docker run --rm -v n8n_data:/data -v $(pwd):/backup \
     ubuntu tar czf /backup/n8n-backup.tar.gz /data
   ```

---

## 🔗 Important Links

- **Site**: https://163.176.225.87/ (or gabrielnetto.com after DNS)
- **n8n Editor**: https://163.176.225.87/n8n/
- **GitHub**: https://github.com/Gabirell/gabrielnettocom
- **Local Dev**: http://localhost:5173

**Login**: `admin@gabrielnetto.com` / `GabirellNetto123!`

---

## 📞 Need Help?

**Safe to try**: Frontend changes (use `./deploy-frontend.sh`)  
**Ask first**: Backend/n8n changes, Docker modifications, Nginx config changes

Remember: **Frontend changes should NEVER break the backend!**
