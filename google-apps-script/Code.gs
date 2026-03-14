/**
 * Ryvon Lead Form — Google Apps Script
 * ─────────────────────────────────────
 * SHEET HEADERS (Row 1):
 * Timestamp | FirstName | LastName | Company | Industry | Email | Phone | Services | Interests | Timeline | Budget | Message
 */

const SHEET_NAME = 'Leads';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    sheet.appendRow([
      new Date().toISOString(),
      data.firstName || '',
      data.lastName  || '',
      data.company   || '',
      data.industry  || '',
      data.email     || '',
      data.phone     || '',
      Array.isArray(data.services)  ? data.services.join(', ')  : (data.services  || ''),
      Array.isArray(data.interests) ? data.interests.join(', ') : (data.interests || ''),
      Array.isArray(data.timeline)  ? data.timeline.join(', ')  : (data.timeline  || ''),
      Array.isArray(data.budget)    ? data.budget.join(', ')    : (data.budget    || ''),
      data.message   || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
