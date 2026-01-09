# 📋 Quick Reference: Google Sheets Uptime Monitor

## What You Need

1. ✅ **Google Sheet** with this structure:
   ```
   Row 1:  timestamp  |  status  |  statusCode  |  error
   Row 2:  (empty)    |  online  |  200         |  (empty)
   ```

2. ✅ **Your Sheet ID**: Copy from the URL
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
   ```

3. ✅ **Google Sheets Credential** in n8n (use OAuth2)

## Workflow Files

- **[GOOGLE_SHEETS_SETUP_GUIDE.md](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/GOOGLE_SHEETS_SETUP_GUIDE.md)** - Full setup instructions
- **[n8n_uptime_monitor_v3_google_sheets.json](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/n8n_uptime_monitor_v3_google_sheets.json)** - Workflow to import

## Before Importing

In the JSON file, replace `YOUR_SHEET_ID_HERE` with your actual Sheet ID (appears twice - lines for both Read and Update nodes).

## After Importing

1. Configure **Google Sheets** credential
2. Verify all credentials are attached:
   - Google Sheets nodes → Google Sheets credential
   - Email nodes → Gmail SMTP
   - Telegram nodes → Telegram Bot
3. Test execution
4. Activate workflow

## Code for "Track State Changes" Node

```javascript
// Get current status from HTTP request
const currentStatusCode = $('Check Website').item.json.statusCode;
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
    error: $('Check Website').item.json.error?.message || '',
    timestamp: new Date().toISOString()
  }
}];
```

## Troubleshooting

**"Cannot read property 'status' of undefined"**
- Google Sheets Read node might be failing
- Check that Sheet ID is correct
- Verify range is `B2:D2`
- Make sure credential is configured

**Workflow not updating Google Sheet**
- Check Google Sheets Update node credential
- Verify range is `A2:D2`
- Make sure "Value Input Mode" is set to "USER_ENTERED"

**Getting alerts on every check**
- Verify the IF node conditions check `stateChanged === true`
- Check Google Sheet is updating properly (Row 2 should change)

## Support

Full guide: [GOOGLE_SHEETS_SETUP_GUIDE.md](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/GOOGLE_SHEETS_SETUP_GUIDE.md)
