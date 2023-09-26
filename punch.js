require('dotenv').config();
const puppeteer = require('puppeteer');
const axios = require('axios');

const WEB_PUNCH_API = process.env.WEB_PUNCH_API;

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=800,600'],
    defaultViewport: null,
  });
  const page = await browser.newPage();

  await page.goto(process.env.LOGIN_PAGE_URL);

  await page.type('#user', process.env.GEO_USERNAME);
  await page.type('#password', process.env.GEO_PASSWORD);

  await page.click('#btnLogin');
  await page.waitForSelector('#content');

  await delay(5000);

  await page.waitForSelector('iframe[name="myFrame"]');
  const frame = page.frames().find((frame) => frame.name() == 'myFrame');

  if (!frame) {
    console.error('Frame not found!');
    await browser.close();
    return;
  }
  const vsk = frame.url().split('&').pop();
  if (vsk) {
    
    const webPunchUrl = `${WEB_PUNCH_API}/GetWebPunch?${vsk}`;
    console.log(webPunchUrl);
    const response = await axios.get(webPunchUrl);
    if(response.status === 200 && response.data) {
      console.log(response.data);
      const { groupId, lastPunchType } = response.data;
      
      // Punch Salida or Entrada
      var punchType = lastPunchType === 'Salida' ? 'Ingreso' : 'Salida';
      var savePunchUrl = `${WEB_PUNCH_API}/SaveUserPunch/?${vsk}&punchType=${punchType}&groupId=${groupId}`;
      console.log(savePunchUrl)
      //await axios.get(savePunchUrl); //DESCOMENTAR PARA GUARDAR PUNCH
      //page.reload();
    }
  }
  //await browser.close();
})();

const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));
