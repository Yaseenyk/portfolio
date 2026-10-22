/**
 * Job-application tracker — Google Apps Script web app.
 *
 * The portfolio's /outreach "Log a job" tab posts here through the Cloudflare
 * worker. This script appends one row per application to a Sheet and files
 * the screenshot in a Drive folder, so the tracker lives where it can be read
 * on a phone.
 *
 * Deploy (once, about five minutes):
 *   1. Create a new Google Sheet. Name it anything.
 *   2. Extensions → Apps Script. Delete the sample code, paste this file.
 *   3. Project Settings (gear) → Script Properties → add two:
 *        JOBS_TOKEN = <a long random string>
 *          The worker sends the same string; a request without it is refused.
 *        SHEET_ID   = <the ID from the Sheet's URL, /spreadsheets/d/<ID>/edit>
 *          Required when the script was created at script.google.com rather
 *          than from inside the Sheet; harmless otherwise.
 *   4. Deploy → New deployment → type "Web app":
 *        Execute as: Me        Who has access: Anyone
 *      Authorise when prompted. Copy the Web app URL.
 *   5. Give the URL and the token to the worker:
 *        cd worker
 *        npx wrangler secret put JOBS_SHEET_URL     (paste the URL)
 *        npx wrangler secret put JOBS_SHEET_TOKEN   (paste the token)
 *
 * After any edit to this script: Deploy → Manage deployments → edit → new
 * version. The URL stays the same.
 */

var SHEET_NAME = 'Applications';
var FOLDER_NAME = 'Job application screenshots';
var HEADER = [
  'Date', 'Company', 'Role', 'Platform', 'Location', 'Job URL',
  'Applicants', 'Screenshot', 'Status', 'Response', 'Notes',
];

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: 'jobs-tracker' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var out = function (obj, code) {
    obj.status = code || 200;
    return ContentService
      .createTextOutput(JSON.stringify(obj))
      .setMimeType(ContentService.MimeType.JSON);
  };

  var body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return out({ ok: false, error: 'invalid JSON' }, 400);
  }

  var token = PropertiesService.getScriptProperties().getProperty('JOBS_TOKEN');
  if (!token || body.token !== token) {
    return out({ ok: false, error: 'unauthorised' }, 401);
  }

  var sheet = getSheet_();
  var screenshotUrl = '';
  if (body.image && typeof body.image === 'string' && body.image.indexOf('data:image') === 0) {
    try {
      screenshotUrl = saveScreenshot_(body.image, body.company, body.role);
    } catch (err) {
      screenshotUrl = 'upload failed: ' + err;
    }
  }

  var row = [
    body.date || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd'),
    body.company || '',
    body.role || '',
    body.platform || '',
    body.location || '',
    body.url || '',
    body.applicants || '',
    screenshotUrl,
    body.status || 'applied',
    '',
    body.notes || '',
  ];
  sheet.appendRow(row);
  var rowNumber = sheet.getLastRow();

  return out({
    ok: true,
    row: rowNumber,
    screenshotUrl: screenshotUrl,
    sheetUrl: getSpreadsheet_().getUrl() + '#gid=' + sheet.getSheetId(),
  });
}

// A script created from script.google.com (rather than from inside a Sheet)
// has no active spreadsheet, so the Sheet to write to is named by ID in a
// Script Property. The ID is the long segment of the Sheet's URL:
//   https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit
function getSpreadsheet_() {
  var id = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  if (id) return SpreadsheetApp.openById(id);
  var active = SpreadsheetApp.getActiveSpreadsheet();
  if (active) return active;
  throw new Error('No Sheet: set Script Property SHEET_ID to the spreadsheet ID');
}

function getSheet_() {
  var ss = getSpreadsheet_();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADER);
    sheet.getRange(1, 1, 1, HEADER.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function saveScreenshot_(dataUrl, company, role) {
  var comma = dataUrl.indexOf(',');
  var meta = dataUrl.substring(5, comma); // e.g. image/png;base64
  var mime = meta.split(';')[0];
  var ext = mime.split('/')[1] || 'png';
  var bytes = Utilities.base64Decode(dataUrl.substring(comma + 1));
  var stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH-mm');
  var name = [stamp, company || 'company', role || 'role'].join(' - ').replace(/[\\/:*?"<>|]/g, '') + '.' + ext;
  var blob = Utilities.newBlob(bytes, mime, name);
  var folder = getFolder_();
  var file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file.getUrl();
}

function getFolder_() {
  var it = DriveApp.getFoldersByName(FOLDER_NAME);
  return it.hasNext() ? it.next() : DriveApp.createFolder(FOLDER_NAME);
}
