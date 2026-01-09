# 🚨 gabrielnetto.com Uptime Monitor Setup Guide

> [!IMPORTANT]
> **Using v2 Workflow (State Tracking Enabled)**
> 
> This guide now references `n8n_uptime_monitor_v2.json` which includes **state change detection**.
> - ✅ Checks your site every 5 minutes
> - ✅ Only sends notifications when status **changes** (online→offline or offline→online)
> - ✅ No notification spam - you won't get alerts every 5 minutes for the same state
> 
> The workflow uses n8n's built-in static data storage to remember the previous state between executions.

This guide will help you configure Telegram and Gmail notifications for your website uptime monitoring in n8n.


---

## 📋 Prerequisites

- Access to your n8n instance (running on Render or your server)
- A Gmail account (gabriel.netto@gmail.com)
- A Telegram account
- The `n8n_uptime_monitor_v2.json` file ready to import

---

## 🤖 Part 1: Telegram Bot Setup

### Step 1: Create a Telegram Bot

1. **Open Telegram** on your phone or desktop
2. **Search for** `@BotFather` (this is Telegram's official bot creation tool)
3. **Start a chat** with BotFather by clicking "Start"
4. **Send the command**: `/newbot`
5. BotFather will ask you to **choose a name** for your bot
   - Example: `gabrielnetto.com Monitor`
6. BotFather will ask for a **username** for your bot (must end in "bot")
   - Example: `gabrielnettocom_monitor_bot`
7. **BotFather will reply** with your bot token - it looks like this:
   ```
   123456789:ABCdefGHIjklMNOpqrsTUVwxyz1234567890
   ```
   - ⚠️ **SAVE THIS TOKEN** - you'll need it in n8n!

### Step 2: Get Your Chat ID

You need your personal Chat ID so the bot knows where to send messages.

#### Option A: Using Your Bot (Easy Method)

1. **Find your newly created bot** in Telegram search
2. **Start a chat** with your bot and send any message (e.g., "Hello")
3. **Open this URL** in your browser (replace `YOUR_BOT_TOKEN` with your actual token):
   ```
   https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
   ```
   Example:
   ```
   https://api.telegram.org/bot123456789:ABCdefGHIjklMNOpqrsTUVwxyz1234567890/getUpdates
   ```
4. **Look for** the `"chat":{"id":` section in the response
   - Your Chat ID will be a number like: `5269208269`
5. **Save your Chat ID** - you'll need it in n8n!

#### Option B: Using @userinfobot (Alternative Method)

1. Search for `@userinfobot` in Telegram
2. Start a chat and send `/start`
3. The bot will reply with your Chat ID
4. Save this number!

### Step 3: Configure Telegram in n8n

1. **Open your n8n instance** in the browser
2. Go to **Settings** (gear icon) → **Credentials**
3. Click **"Add Credential"**
4. Search for **"Telegram"** and select **"Telegram API"**
5. **Fill in the details**:
   - **Credential Name**: `Telegram Bot` (exactly as specified in the workflow)
   - **Access Token**: Paste your bot token from Step 1
6. Click **"Save"**

---

## 📧 Part 2: Gmail SMTP Setup

Gmail requires an "App Password" for security. You cannot use your regular Gmail password.

### Step 1: Enable 2-Factor Authentication (Required)

App Passwords only work if you have 2-Factor Authentication enabled.

1. Go to your **Google Account**: [myaccount.google.com](https://myaccount.google.com)
2. Click **"Security"** in the left sidebar
3. Under **"How you sign in to Google"**, click **"2-Step Verification"**
4. Follow the prompts to **enable 2-Step Verification** if not already enabled
   - You'll need your phone for verification codes

### Step 2: Create an App Password

1. Once 2-Step Verification is enabled, go to: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Or navigate: **Google Account** → **Security** → **2-Step Verification** → scroll down to **"App passwords"**
2. You may need to **sign in again** for security
3. Click **"Select app"** dropdown and choose **"Mail"**
4. Click **"Select device"** dropdown and choose **"Other (Custom name)"**
5. **Enter a name**: `n8n Uptime Monitor`
6. Click **"Generate"**
7. Google will show you a **16-character password** (looks like: `abcd efgh ijkl mnop`)
   - ⚠️ **COPY THIS PASSWORD** - you won't see it again!
   - Remove the spaces: `abcdefghijklmnop`

### Step 3: Configure Gmail SMTP in n8n

1. **Open your n8n instance** in the browser
2. Go to **Settings** (gear icon) → **Credentials**
3. Click **"Add Credential"**
4. Search for **"SMTP"** and select it
5. **Fill in the details**:
   - **Credential Name**: `Gmail SMTP` (exactly as specified in the workflow)
   - **User**: `gabriel.netto@gmail.com`
   - **Password**: Paste your App Password from Step 2 (without spaces)
   - **Host**: `smtp.gmail.com`
   - **Port**: `587`
   - **SSL/TLS**: Enable **"Use TLS"** ✅
6. Click **"Save"**

---

## 📥 Part 3: Import and Activate the Workflow

### Step 1: Import the Workflow

1. **Open n8n** and go to **"Workflows"**
2. Click the **"+"** button or **"Add Workflow"**
3. In the workflow editor, click the **three dots menu (⋮)** in the top-right corner
4. Select **"Import from File"**
5. **Upload** the `n8n_uptime_monitor_v2.json` file
6. The workflow will appear in your editor

### Step 2: Verify Credentials

After importing, you should see these nodes:

- ✅ **Check Every 5 Minutes** (Cron trigger) - green
- ✅ **Check Website** - green
- ✅ **Track State Changes** (Code node) - green
- ✅ **Did State Change to DOWN?** - green
- ✅ **Did State Change to UP?** - green
- ✅ **Format Alert Message** - green
- ✅ **Format Recovery Message** - green
- ❌ **Email: Site Down** - might show credential error (red)
- ❌ **Telegram: Site Down** - might show credential error (red)
- ❌ **Email: Site Recovered** - might show credential error (red)
- ❌ **Telegram: Site Recovered** - might show credential error (red)

**To fix credential errors:**

1. **Click on each email node** (Email: Site Down, Email: Site Recovered)
   - In the **"Credential to connect with"** dropdown, select **"Gmail SMTP"**
   - The node should turn green ✅

2. **Click on each Telegram node** (Telegram: Site Down, Telegram: Site Recovered)
   - In the **"Credential to connect with"** dropdown, select **"Telegram Bot"**
   - Under **"Chat ID"**, verify it shows: `5269208269` (or update with your Chat ID)
   - The node should turn green ✅

### Step 3: Test the Workflow (Optional but Recommended)

Before activating, test that notifications work:

1. **Click on the "Check Website" node**
2. At the top, click **"Execute Workflow"** or **"Test Workflow"**
3. If your site is online, you should see a success path (green line to "Site Recovered")
4. Check your **email** and **Telegram** - you should receive a test message!

> **Note**: If you want to test the "Site Down" alerts, you can temporarily change the website URL to something that doesn't exist (e.g., `https://fake-site-that-doesnt-exist.com`) in the "Check Website" node.

### Step 4: Activate the Workflow

1. At the top of the workflow editor, you'll see an **"Inactive"** toggle switch
2. **Click the switch** to turn it to **"Active"** ✅
3. The workflow will now run **automatically every 5 minutes**!

---

## ✅ What You'll Receive

### When Your Site Goes DOWN 🚨

**Email:**
- **Subject**: 🚨 Alert: gabrielnetto.com is DOWN
- **From**: gabriel.netto@gmail.com
- **To**: gabriel.netto@gmail.com
- **Content**:
  ```
  🚨 ALERT: Site is DOWN! 🚨
  
  Website: gabrielnetto.com
  Status: [Error code or "No Response"]
  Time: [Date/Time in America/Sao_Paulo timezone]
  Error: [Error message]
  
  Monitoring will continue every 5 minutes.
  ```

**Telegram:**
- Same message sent to your Telegram bot chat

### When Your Site Comes BACK ONLINE ✅

**Email:**
- **Subject**: ✅ Recovery: gabrielnetto.com is BACK ONLINE
- **From**: gabriel.netto@gmail.com
- **To**: gabriel.netto@gmail.com
- **Content**:
  ```
  ✅ Site is BACK ONLINE! ✅
  
  Website: gabrielnetto.com
  Status: 200
  Time: [Date/Time in America/Sao_Paulo timezone]
  
  Site is responding normally.
  ```

**Telegram:**
- Same recovery message sent to your Telegram bot chat

---

## 🔧 Customization Options

### Change Monitoring Frequency

1. Click on **"Check Every 5 Minutes"** node
2. Under **"Trigger Intervals"**, change **"Minutes Interval"** to your preference:
   - `1` = Every minute
   - `5` = Every 5 minutes (current)
   - `15` = Every 15 minutes
   - `30` = Every 30 minutes

### Add Additional Email Recipients

1. Click on **"Email: Site Down"** or **"Email: Site Recovered"** nodes
2. In the **"To Email"** field, add multiple emails separated by commas:
   ```
   gabriel.netto@gmail.com, another@email.com, third@email.com
   ```

### Change Website Being Monitored

1. Click on **"Check Website"** node
2. Change the **"URL"** field to any website you want to monitor

### Adjust Timeout Settings

1. Click on **"Check Website"** node
2. Under **"Options"** → **"Timeout"**, adjust the value (default: 10000ms = 10 seconds)

---

## 🐛 Troubleshooting

### Telegram Messages Not Arriving

- ✅ Verify you started a chat with your bot and sent at least one message
- ✅ Double-check your Chat ID is correct
- ✅ Ensure your bot token is correct
- ✅ Make sure the "Telegram Bot" credential is selected in the nodes

### Gmail Emails Not Sending

- ✅ Verify 2-Factor Authentication is enabled on your Google account
- ✅ Double-check your App Password (no spaces)
- ✅ Ensure you're using port `587` with TLS enabled
- ✅ Check Gmail's "Sent" folder - emails might be there
- ✅ Check your spam/junk folder

### Workflow Not Running Automatically

- ✅ Make sure the workflow is set to **"Active"** (toggle at the top)
- ✅ Check n8n's **"Executions"** tab to see if it's running
- ✅ Ensure your n8n instance is running and not sleeping (some free tiers auto-sleep)

### Getting False Positives (Site Down alerts when site is actually up)

- ✅ Increase the timeout in the "Check Website" node (try 20000ms = 20 seconds)
- ✅ Check if your hosting provider has temporary slowdowns
- ✅ Verify the URL is correct and publicly accessible

---

## 📞 Need Help?

If you run into issues:
1. Check the **"Executions"** tab in n8n to see detailed logs
2. Click on a failed execution to see exactly which node failed and why
3. Test each node individually using the "Test step" button

---

## 🎉 You're All Set!

Your uptime monitoring is now active! You'll receive notifications via **Telegram** and **Gmail** whenever your website goes down or comes back online.

**Happy monitoring!** 🚀
