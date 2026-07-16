const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log(`[CONSOLE ${msg.type()}]: ${msg.text()}`);
  });
  
  page.on('pageerror', err => {
    console.error(`[PAGE ERROR]: ${err.message}`);
  });

  const urls = [
    'http://localhost:3000/services',
    'http://localhost:3000/process'
  ];

  for (const url of urls) {
    console.log(`\nTesting ${url}...`);
    try {
      await page.goto(url, { waitUntil: 'networkidle2' });
      await new Promise(r => setTimeout(r, 2000));
    } catch (e) {
      console.error('Navigation error:', e.message);
    }
  }

  await browser.close();
})();
