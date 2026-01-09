# 🚀 Quick Uptime Monitor Setup (5 Minutes!)

## What You'll Get

✅ **Email alerts** when site goes down/recovers  
✅ **Telegram notifications** for instant mobile alerts  
✅ **Checks every 5 minutes** automatically  
⚠️ **Note**: Without Google Sheets, you'll get alerts every 5 min while down (we can add smart alerts later!)

---

## Prerequisites Checklist

Before starting, verify you have:

- [x] **Gmail SMTP** configured in n8n (Port 465, SSL/TLS, App Password)
- [ ] **Telegram Bot** set up (we'll verify this)
- [x] **n8n** accessible at `https://163.176.225.87/n8n`

---

## Step 1: Verify Telegram Bot (2 min)

### Check if Your Bot is Working:

1. Open Telegram on your phone/computer
2. Search for your bot: `@YourBotName` 
3. Send `/start` to your bot
4. You should get a response

### Get Your Chat ID:

**Option A: Use the Bot API**
1. Open: https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
2. Look for `"chat":{"id":XXXXXXX}`
3. That number is your Chat ID

**Option B: Use @userinfobot**
1. Search for `@userinfobot` in Telegram
2. Start a chat
3. It will show your ID

### In n8n:

1. Go to **Settings** → **Credentials**
2. Find **"Telegram Bot"** credential
3. Verify:
   - **Access Token** is set
   - Click **Test** to verify it works

---

## Step 2: Import the Simplified Workflow (1 min)

### What This Workflow Does:

```
Every 5 Minutes:
  ↓
Check gabrielnetto.com (HTTPS)
  ↓
Is it responding with 200 OK?
  ├─ YES → Do nothing (site is up!)
  └─ NO  → Send Email + Telegram alert
```

### Import Instructions:

1. Open n8n: `https://163.176.225.87/n8n`
2. Click **Workflows** → **Import from File**
3. Select: `n8n_uptime_monitor.json` (the original, simple version)
4. Click **Import**

---

## Step 3: Configure the Workflow (2 min)

### Update These Nodes:

#### 1. **"Check Website"** Node
- **URL**: `https://gabrielnetto.com` (or keep as `https://163.176.225.87` until DNS propagates)
- **Timeout**: 10000ms
- **Follow Redirects**: ON

#### 2. **"Email: Site Down"** Node
- **From**: `gabriel.netto@gmail.com`
- **To**: `gabriel.netto@gmail.com`
- **Credential**: Select your Gmail SMTP

#### 3. **"Email: Site Recovered"** Node  
- Same as above

#### 4. **"Telegram: Site Down"** Node
- **Chat ID**: `YOUR_CHAT_ID_HERE` (from Step 1)
- **Credential**: Select your Telegram Bot

#### 5. **"Telegram: Site Recovered"** Node
- Same as above

---

## Step 4: Test the Workflow (30 seconds)

1. Click **"Execute Workflow"** button
2. Watch it run
3. You should see:
   - ✅ "Check Website" succeeds (200 OK)
   - ✅ No alerts sent (site is up!)

### Test Alert (Optional):

1. In "Check Website" node, temporarily change URL to: `https://fake-nonexistent-site-12345.com`
2. Click **"Execute Workflow"**
3. You should receive:
   - ✅ Email alert
   - ✅ Telegram notification
4. **IMPORTANT**: Change the URL back to `gabrielnetto.com`!

---

## Step 5: Activate! (10 seconds)

1. Click the **toggle switch** at the top to **"Active"**
2. The workflow will now run every 5 minutes automatically!

---

## 📱 What to Expect

### When Site is Up:
- ✅ Workflow runs silently every 5 minutes
- ✅ No notifications sent

### When Site Goes Down:
- ⚠️ **First alert** within 5 minutes
- ⚠️ **Repeat alerts** every 5 minutes while down
- ✅ **Recovery alert** when site comes back up

---

## 🔧 Troubleshooting

### "No Email Received"
- Check n8n execution log for errors
- Verify Gmail SMTP credential (Port 465, App Password)
- Check spam folder

### "No Telegram Alert"
- Verify Bot Token is correct
- Verify Chat ID is correct (must be a number)
- Make sure you've started a chat with your bot

### "Workflow Not Running"
- Check if toggle is **ON** (green)
- Look at "Executions" tab for errors
- Verify schedule trigger is set to 5 minutes

---

## 🎯 Next Steps (Optional)

Once your site is fully online and you want smarter alerts:

1. **Add Google Sheets State Tracking** (reference: `GOOGLE_SHEETS_SETUP_GUIDE.md`)
   - Only sends alert on status CHANGE
   - Tracks history
   - No more spam!

2. **Add More Notifications**:
   - Discord webhook
   - Slack
   - SMS (via Twilio)

3. **Monitor Multiple Sites**:
   - Duplicate the workflow
   - Change the URL
   - Done!

---

## ✅ You're All Set!

Your uptime monitor is now watching `gabrielnetto.com` 24/7! 🎉

**Tip**: Once DNS propagates (within next few hours), your domain will work and the monitor will track it perfectly!
