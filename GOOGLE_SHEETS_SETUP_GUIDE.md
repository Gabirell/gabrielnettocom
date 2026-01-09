# 📊 Google Sheets Setup Guide for Uptime Monitor

This guide will walk you through setting up Google Sheets as the state tracker for your uptime monitor.

---

## Step 1: Create Your Google Sheet

### 1.1 Create New Sheet

1. **Go to** [Google Sheets](https://sheets.google.com)
2. Click **"Blank"** to create a new spreadsheet
3. **Rename** the sheet by clicking "Untitled spreadsheet" at the top
4. Name it: **`gabrielnetto.com Uptime Monitor`**

### 1.2 Set Up Columns

In **Row 1**, add these headers:

| A1 | B1 | C1 | D1 |
|----|----|----|-----|
| `timestamp` | `status` | `statusCode` | `error` |

### 1.3 Add Initial Data

In **Row 2**, add this initial data:

| A2 | B2 | C2 | D2 |
|----|----|----|-----|
| (leave empty) | `online` | `200` | (leave empty) |

**Your sheet should look like this:**

```
Row 1:  timestamp  |  status  |  statusCode  |  error
Row 2:             |  online  |  200         |
```

### 1.4 Get Your Sheet ID

1. Look at your browser's URL bar
2. The URL will look like:
   ```
   https://docs.google.com/spreadsheets/d/1a2B3c4D5e6F7g8H9i0J1k2L3m4N5o6P7q8R9s0T1u2V3/edit
   ```
3. **Copy the long string** between `/d/` and `/edit` 
   - Example: `1a2B3c4D5e6F7g8H9i0J1k2L3m4N5o6P7q8R9s0T1u2V3`
4. **Save this ID** - you'll need it in n8n!

---

## Step 2: Configure Google Sheets in n8n

### 2.1 Create Google Sheets Credential

1. **Open your n8n instance**
2. Go to **Settings** (gear icon) → **Credentials**
3. Click **"Add Credential"**
4. Search for **"Google Sheets"**
5. Select **"Google Sheets API"** or **"Google Service Account"**

### 2.2 Choose Authentication Method

**Option A: OAuth2 (Recommended - Easier)**

1. Select **"OAuth2"** as the authentication method
2. Click **"Connect my account"**
3. You'll be redirected to Google
4. **Sign in** with your Google account
5. **Allow** n8n to access your Google Sheets
6. You'll be redirected back to n8n
7. **Name your credential**: `Google Sheets - Uptime Monitor`
8. Click **"Save"**

**Option B: Service Account (Advanced)**

If OAuth2 doesn't work, you can use a Service Account:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable **"Google Sheets API"**
4. Create a **Service Account**
5. Download the **JSON key file**
6. In n8n, paste the JSON content
7. **Share your Google Sheet** with the service account email (found in the JSON)

---

## Step 3: Add Google Sheets Nodes to Workflow

Now let's add the nodes to your existing workflow.

### 3.1 Add "Google Sheets: Read Previous Status" Node

1. **Click the "+" button** between "Check Website1" and "Track State Changes"
2. Search for **"Google Sheets"**
3. Select **"Google Sheets"** node
4. Configure it:

**Parameters:**
- **Resource**: `Sheet`
- **Operation**: `Read`
- **Credential**: Select `Google Sheets - Uptime Monitor`
- **Document**: Click "From list" → Select your sheet name
  - OR paste your **Sheet ID** directly
- **Sheet Name**: `Sheet1` (or whatever your sheet tab is named)
- **Range**: `B2:D2`

> **Why B2:D2?** We only need status, statusCode, and error from row 2. Timestamp is just for logging.

5. **Rename this node** to: `Google Sheets: Read Previous Status`

### 3.2 Update "Track State Changes" Code Node

Replace the JavaScript code with:

```javascript
// Get current status from HTTP request
const currentStatusCode = $('Check Website1').item.json.statusCode;
const currentStatus = currentStatusCode === 200 ? 'online' : 'offline';

// Get previous status from Google Sheets
const sheetsData = $('Google Sheets: Read Previous Status').first().json;
const previousStatus = sheetsData.status || 'online';

// Determine if state changed
const stateChanged = currentStatus !== previousStatus;

// Return data for routing and updating the sheet
return [{
  json: {
    currentStatus,
    previousStatus,
    stateChanged,
    statusCode: currentStatusCode || 0,
    error: $('Check Website1').item.json.error?.message || '',
    timestamp: new Date().toISOString()
  }
}];
```

### 3.3 Add "Google Sheets: Update Status" Node

1. **Click the "+" button** after "Track State Changes"
2. Add another **"Google Sheets"** node
3. Configure it:

**Parameters:**
- **Resource**: `Sheet`
- **Operation**: `Update`
- **Credential**: Select `Google Sheets - Uptime Monitor`
- **Document**: (Same as before - select or paste Sheet ID)
- **Sheet Name**: `Sheet1`
- **Range**: `A2:D2`
- **Data Mode**: `Define Below`

**Data to Insert:**
Under "Values to Send" → "Add Value" (4 times):

| Column | Value |
|--------|-------|
| Column A | `={{ $json.timestamp }}` |
| Column B | `={{ $json.currentStatus }}` |
| Column C | `={{ $json.statusCode }}` |
| Column D | `={{ $json.error }}` |

4. **Rename this node** to: `Google Sheets: Update Status`

### 3.4 Connect the Nodes

Make sure your workflow flow looks like this:

```
Check Every 5 Minutes
  ↓
Check Website1
  ↓
Google Sheets: Read Previous Status
  ↓
Track State Changes
  ↓
Google Sheets: Update Status
  ↓ ↓
Did State Change to DOWN?    Did State Change to UP?
```

**Important:** Connect both IF nodes to **"Google Sheets: Update Status"** so the sheet updates regardless of state change.

---

## Step 4: Test the Workflow

### 4.1 Manual Test

1. Make sure your workflow is **NOT active** yet
2. Click **"Execute Workflow"** button
3. Watch the execution:
   - ✅ "Google Sheets: Read Previous Status" should succeed
   - ✅ "Track State Changes" should process the data
   - ✅ "Google Sheets: Update Status" should write to the sheet
   - ✅ Check your Google Sheet - Row 2 should be updated with current data!

### 4.2 Verify Google Sheet

Open your Google Sheet and check Row 2:
- **Column A** should have a timestamp
- **Column B** should show `online` or `offline`
- **Column C** should show a status code (or 0 if offline)
- **Column D** might be empty or have an error message

### 4.3 Test State Change Detection

**If your site is currently DOWN:**
1. Execute the workflow → You should get a DOWN alert
2. Execute again immediately → NO alert (state didn't change)
3. This confirms it's working! ✅

**If your site is currently UP:**
1. The sheet should update to `online` status
2. No alert should be sent (since previous was also "online")

---

## Step 5: Activate the Workflow

1. Once testing is successful, click the **"Active"** toggle at the top
2. Your workflow will now run every 5 minutes automatically
3. Check your Google Sheet periodically to see the updates

---

## 📊 Bonus: Track Full History

Want to keep a log of every check? Here's how:

### 5.1 Create History Sheet

1. In your Google Sheets, click the **"+"** at the bottom to add a new sheet
2. Name it: **"History"**
3. Add headers in Row 1: `timestamp | status | statusCode | error`

### 5.2 Add Append Node

1. In n8n, add a new **Google Sheets** node after "Track State Changes"
2. Configure:
   - **Operation**: `Append`
   - **Sheet Name**: `History`
   - **Range**: `A:D`
   - **Data**: Same as the Update node (timestamp, status, statusCode, error)

3. This will create a new row for every check, giving you full historical data!

---

## 🎉 You're Done!

Your uptime monitor now:
- ✅ Checks your site every 5 minutes
- ✅ Only sends alerts when status changes
- ✅ Keeps track of state in Google Sheets
- ✅ Works with any n8n version

**Happy monitoring!** 🚀
