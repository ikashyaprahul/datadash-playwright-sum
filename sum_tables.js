const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const urls = [
    44,45,46,47,48,49,50,51,52,53
  ].map(n => `https://sanand0.github.io/tdsdata/js_table/?seed=${n}`);

  let total = 0;

  for (const url of urls) {
    await page.goto(url);
    await page.waitForSelector("table");

    const numbers = await page.$$eval("td", tds =>
      tds.map(td => parseFloat(td.innerText)).filter(n => !isNaN(n))
    );

    total += numbers.reduce((a,b)=>a+b,0);
  }

  console.log("FINAL TOTAL =", total);
  await browser.close();
})();
