# n8n Workflow Management

## Purpose
Manage n8n workflows for gabrielnetto.com, including importing, exporting, and maintaining workflow configurations for AI chat and uptime monitoring.

## Available Workflows

### 1. Uptime Monitor (Simple)
**File**: `workflows/uptime_monitor_simple.json`  
**Purpose**: Basic uptime monitoring with email/Telegram notifications  
**Alert Frequency**: Every 5 minutes (not recommended for production)  
**Use Case**: Testing or temporary monitoring

**Features**:
- Checks website availability every 5 minutes
- Sends notifications via email and Telegram
- Simple setup, no external dependencies

**Limitations**:
- Sends alerts on EVERY check (spam risk)
- No state tracking
- No historical data

### 2. Uptime Monitor (Google Sheets)
**File**: `workflows/uptime_monitor_sheets.json`  
**Purpose**: Smart uptime monitoring with Google Sheets state tracking  
**Alert Frequency**: Only on status changes  
**Use Case**: Production monitoring

**Features**:
- Tracks previous state in Google Sheets
- Only alerts when status changes (online ↔ offline)
- Historical tracking and logging
- Smart notification system

**Requirements**:
- Google Sheets API access
- OAuth2 credentials configured in n8n
- Domain must have HTTPS/SSL for OAuth callback
- Properly configured Google Sheet (see `directives/monitoring/google_sheets_integration.md`)

### 3. AI Chat Workflow
**File**: `workflows/ai_chat.json`  
**Purpose**: AI-powered chat interface for portfolio website  
**Use Case**: Interactive AI assistant on gabrielnetto.com

**Features**:
- Integrates with Groq and/or Gemini APIs
- Webhook endpoint for frontend integration
- Conversational AI responses

**Requirements**:
- API keys for Groq or Gemini (stored in n8n credentials)
- Frontend configured to call webhook endpoint

---

## Importing Workflows

### Using the Import Script

**Location**: `execution/n8n/import_workflow.js`

**Command**:
```bash
cd /Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom
node execution/n8n/import_workflow.js <workflow-file.json>
```

**Example**:
```bash
# Import uptime monitor
node execution/n8n/import_workflow.js workflows/uptime_monitor_simple.json

# Import AI chat
node execution/n8n/import_workflow.js workflows/ai_chat.json
```

**Prerequisites**:
1. n8n must be running
2. n8n accessible at: `http://163.176.225.87/n8n` (or your domain)
3. Valid n8n API credentials (if required)

### Manual Import via UI

1. Navigate to n8n UI: `http://163.176.225.87/n8n`
2. Click **Workflows** → **Import from File**
3. Select workflow JSON file
4. Configure required credentials
5. Test workflow execution
6. Activate workflow

---

## Exporting Workflows

### When to Export:
- After making changes to a workflow
- Before major modifications (backup)
- When creating new workflow variations

### Export Process:
1. Open workflow in n8n UI
2. Click **Workflow** menu (top right)
3. Select **Download**
4. Save to `workflows/` directory
5. Update this directive if functionality changes

### Naming Convention:
- `<purpose>_<variant>.json`
- Examples: `uptime_monitor_sheets.json`, `ai_chat_v2.json`
- Archive old versions in `workflows/archive/`

---

## Managing Credentials

### Listing Credentials

**Location**: `execution/n8n/list_credentials.js`

**Command**:
```bash
node execution/n8n/list_credentials.js
```

**Output**: Lists all configured credentials in n8n (without exposing sensitive data)

### Required Credentials

#### For Uptime Monitor (Simple):
- **Email (SMTP)**: Gmail or other SMTP service
- **Telegram Bot**: Telegram Bot API token

#### For Uptime Monitor (Google Sheets):
- **Email (SMTP)**: Gmail or other SMTP service
- **Telegram Bot**: Telegram Bot API token
- **Google Sheets API**: OAuth2 credentials

#### For AI Chat:
- **Groq API**: API key for Groq LLM
- **Gemini API**: API key for Google Gemini (alternative)

### Adding Credentials in n8n:
1. Go to **Settings** → **Credentials**
2. Click **Add Credential**
3. Select credential type (e.g., "Google Sheets API")
4. Follow OAuth flow or enter API keys
5. Test connection
6. Save with descriptive name

---

## Workflow Activation Checklist

Before activating any workflow:

- [ ] All required credentials configured
- [ ] Workflow imported successfully
- [ ] Test execution completed (no errors)
- [ ] Notification channels verified (email/Telegram working)
- [ ] For Google Sheets workflows: Sheet structure validated
- [ ] For production: Alert frequency is appropriate (not spamming)

---

## Troubleshooting

### Workflow Import Fails
**Symptoms**: Error when importing JSON file  
**Causes**:
- Invalid JSON format
- Missing required nodes in n8n
- Credential references not found

**Solution**:
1. Validate JSON syntax
2. Check n8n version (ensure nodes are available)
3. Import workflow without credentials first
4. Configure credentials manually after import

### Workflow Executions Fail
**Symptoms**: Workflow runs but produces errors  
**Common Issues**:
1. **Missing Credentials**: Check credential configuration
2. **API Rate Limits**: Add delays between requests
3. **Invalid URLs**: Verify endpoint addresses
4. **Permission Issues**: Ensure OAuth scopes are correct

**Debugging Steps**:
1. Check workflow execution log in n8n
2. Test individual nodes using "Execute Node"
3. Verify credential validity
4. Check API service status

### Google Sheets Integration Issues
**Symptoms**: OAuth fails or can't connect to Sheets  
**Causes**:
- Domain not accessible via HTTPS
- OAuth callback URL misconfigured
- Sheet sharing permissions incorrect

**Solution**:
1. Ensure domain has valid SSL certificate
2. Configure OAuth redirect URI correctly
3. Share Google Sheet with service account email
4. See: `directives/monitoring/google_sheets_integration.md`

---

## Best Practices

### Version Control
- Keep production workflows in `workflows/`
- Archive old versions in `workflows/archive/`
- Document changes in workflow descriptions

### Credential Management
- **NEVER** commit credentials to Git
- Store sensitive data in n8n's credential system
- Use environment variables for n8n configuration
- Regularly rotate API keys

### Testing
- Always test workflows in n8n UI before activation
- Use "Execute Workflow" to validate end-to-end
- Test notification channels separately
- Monitor first executions closely

### Maintenance
- Review workflow executions weekly
- Update workflows when APIs change
- Keep credentials current
- Archive unused workflows

---

## Related Directives

- [Uptime Monitor Setup](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/directives/monitoring/uptime_monitor_setup.md) - Basic setup guide
- [Google Sheets Integration](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/directives/monitoring/google_sheets_integration.md) - OAuth and Sheets configuration
- [Quick Reference](file:///Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom/directives/monitoring/quick_reference.md) - Common commands and troubleshooting
