# Waitlist setup (Google Sheets)

You have 2 ways to save waitlist emails into Google Sheets:
- Option A: Google Form (easy)
- Option B: Google Apps Script directly to a sheet (no form needed)

## 1) Create a Google Form
- Create a new Google Form.
- Add one question: **Email** (set it to required).

## 2) Connect form responses to a Google Sheet
- In Google Form, open **Responses**.
- Click the Google Sheets icon.
- Create a new sheet (or connect an existing one).

Now every form submission will appear in that sheet automatically.

## 3) Get two values from your form

You need:
- `REACT_APP_WAITLIST_GOOGLE_FORM_ACTION`
- `REACT_APP_WAITLIST_GOOGLE_FORM_EMAIL_ENTRY`

### A) Form action URL
- Your public form link looks like this:
  `https://docs.google.com/forms/d/e/FORM_ID/viewform`
- Convert it to:
  `https://docs.google.com/forms/d/e/FORM_ID/formResponse`

Use that as `REACT_APP_WAITLIST_GOOGLE_FORM_ACTION`.

### B) Email entry key
- In your form editor, click the 3-dot menu and choose **Get pre-filled link**.
- Enter a sample email and generate link.
- In that link, find the part like:
  `entry.123456789=sample@example.com`
- Copy only `entry.123456789`.

Use that as `REACT_APP_WAITLIST_GOOGLE_FORM_EMAIL_ENTRY`.

## 4) Add environment values in this project
- Copy `.env.example` to `.env.local`.
- Replace placeholder values with your real values.
- Restart the app after saving the file.

## 5) Direct spreadsheet setup (without Google Form)

Use this if you want emails to go straight into your Google Sheet.

### A) Create Apps Script
- Open your sheet.
- Click **Extensions -> Apps Script**.
- Replace code with this:

```javascript
function doPost(e) {
  var spreadsheet = SpreadsheetApp.openById("1FVyGOa6cS2bzFFOb10N6v3ED7GF46zJyiVE2FUIJ3OY");
  var sheet = spreadsheet.getSheets()[0];

  var email = "";
  var source = "";
  var createdAt = "";

  if (e && e.parameter) {
    email = e.parameter.email || "";
    source = e.parameter.source || "save-and-resume-website";
    createdAt = e.parameter.createdAt || new Date().toISOString();
  }

  if (!email) {
    return ContentService.createTextOutput("Missing email");
  }

  sheet.appendRow([new Date(), email, source, createdAt]);
  return ContentService.createTextOutput("OK");
}
```

### B) Deploy it as a web app
- Click **Deploy -> New deployment**.
- Type: **Web app**.
- Execute as: **Me**.
- Who has access: **Anyone**.
- Click **Deploy** and copy the Web App URL.

### C) Add URL in this project
- Open `.env.local`.
- Set:
  - `REACT_APP_WAITLIST_APPS_SCRIPT_URL=<your web app url>`
- You can leave Google Form values as-is.
- Restart your app.

When `REACT_APP_WAITLIST_APPS_SCRIPT_URL` is set, the website will use this direct sheet route first.
