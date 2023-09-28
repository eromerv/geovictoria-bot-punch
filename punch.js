require('dotenv').config();
const puppeteer = require('puppeteer');
const axios = require('axios');
const axiosRetry = require('axios-retry');
const isWeekday = require('./util/isWeekday');

// Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.WEB_PUNCH_API,
});

// Configure retries
axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000;
  },
  retryCondition: (error) => {
    //1: Check if response.data is undefined
    const isDataUndefined = error.response && error.response.data === undefined;

    //2: Check for 5xx server errors
    const isServerError = error.response && error.response.status >= 500;

    //3: Check for network errors
    const isNetworkError = !error.response;

    return isDataUndefined || isServerError || isNetworkError;
  },
});

// Main
(async () => {
  try {
    if (!isWeekday()) {
      throw new Error('The current day is not a weekday!');
    }

    const browser = await puppeteer.launch({
      headless: false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--window-size=800,600',
      ],
      defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto(process.env.LOGIN_PAGE_URL);

    await page.type('#user', process.env.GEO_USERNAME);
    await page.type('#password', process.env.GEO_PASSWORD);
    await page.click('#btnLogin');

    await page.waitForSelector('#main');

    await delay(5000);

    await page.waitForSelector('iframe[name="myFrame"]');
    const frame = page.frames().find((frame) => frame.name() == 'myFrame');

    if (!frame) {
      console.error('Frame not found.');
      await browser.close();
      return;
    }
    const vsk = frame.url().split('&').pop();
    if (vsk) {
      const webPunchUrl = `/GetWebPunch?${vsk}`;
      console.log(webPunchUrl);
      const response = await axiosInstance.get(webPunchUrl);
      if (response.status === 200 && response.data) {
        console.log(response.data);
        const { groupId, lastPunchType } = response.data;

        // Punch Salida or Ingreso
        var punchType = lastPunchType === 'Salida' ? 'Ingreso' : 'Salida';
        var savePunchUrl = `/SaveUserPunch?${vsk}&punchType=${punchType}&groupId=${groupId}`;
        console.log(savePunchUrl);
        // await axiosInstance.get(savePunchUrl); //DESCOMENTAR PARA REGISTRAR PUNCH
        // page.reload();
      }
    } else {
      console.log('Token not found.');
    }
  } catch (error) {
    console.log('Failed', error);
  } finally {
    //await browser.close();
  }
})();

const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));
