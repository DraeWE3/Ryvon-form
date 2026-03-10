const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const CSV_FILE = path.join(__dirname, 'leads.csv');

// Middleware
app.use(cors());
app.use(express.json());

// CSV headers
const CSV_HEADERS = [
  'Timestamp',
  'FirstName',
  'LastName',
  'Company',
  'Industry',
  'Email',
  'Phone',
  'Interests',
  'Timeline',
  'Budget',
  'Message'
];

/**
 * Escape a value for CSV (handles commas, quotes, newlines)
 */
function csvEscape(value) {
  if (value == null) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

/**
 * POST /api/leads
 * Receives form data and appends it as a row in leads.csv
 */
app.post('/api/leads', (req, res) => {
  try {
    const data = req.body;

    // Create CSV file with headers if it doesn't exist
    if (!fs.existsSync(CSV_FILE)) {
      fs.writeFileSync(CSV_FILE, CSV_HEADERS.join(',') + '\n', 'utf8');
      console.log('Created leads.csv with headers');
    }

    // Build the row
    const timestamp = new Date().toISOString();
    const row = [
      timestamp,
      data.firstName || '',
      data.lastName || '',
      data.company || '',
      data.industry || '',
      data.email || '',
      data.phone || '',
      Array.isArray(data.interests) ? data.interests.join('; ') : (data.interests || ''),
      Array.isArray(data.timeline) ? data.timeline.join('; ') : (data.timeline || ''),
      Array.isArray(data.budget) ? data.budget.join('; ') : (data.budget || ''),
      data.message || ''
    ].map(csvEscape);

    // Append row to CSV
    fs.appendFileSync(CSV_FILE, row.join(',') + '\n', 'utf8');

    console.log(`Lead saved: ${data.firstName} ${data.lastName} <${data.email}>`);

    res.json({ success: true, message: 'Lead saved successfully' });
  } catch (error) {
    console.error('Error saving lead:', error);
    res.status(500).json({ success: false, message: 'Failed to save lead' });
  }
});

// Download CSV endpoint
app.get('/api/leads/download', (req, res) => {
  if (fs.existsSync(CSV_FILE)) {
    res.download(CSV_FILE, 'ryvon_leads.csv');
  } else {
    res.status(404).json({ error: 'No leads have been submitted yet.' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', leads: fs.existsSync(CSV_FILE) ? 'file exists' : 'no file yet' });
});

app.listen(PORT, () => {
  console.log(`\n  Ryvon Lead Server running at http://localhost:${PORT}`);
  console.log(`  CSV file: ${CSV_FILE}\n`);
});
