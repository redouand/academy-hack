const puppeteer = require('puppeteer');
 

const browserFoo = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const triggerJson_page = await browser.newPage();
    //TODO: change the url to the real one
    await triggerJson_page.goto('http://localhost:8080/static/Temp-HTML.html', { waitUntil: 'networkidle0' })
    
    //--closes after there is a json file in data folder
    await browser.close()
}

module.exports = browserFoo