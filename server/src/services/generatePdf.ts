import { format } from 'path'
import puppeteer from 'puppeteer'




export const genPdf = async (notes: string, filePath: string) => {
  let browser;

  try {
    browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage', // helps in low memory environments
                '--disable-extensions',
                '--disable-gpu',
            ],
            defaultViewport: { width: 1200, height: 1600 },
        });

    const page = await browser.newPage();

    await page.setContent(notes, {
      waitUntil: "networkidle0",
      timeout: 0,
    });

    await page.pdf({
      path: filePath,
      format: "A4",
      printBackground: true,
      margin: {
        top: "1in",
        bottom: "1in",
        left: "1in",
        right: "1in",
      },
    });

  } finally {
    if (browser) {
      await browser.close();
    }
  }
};