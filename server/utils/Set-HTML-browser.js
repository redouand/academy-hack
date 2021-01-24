const fs = require('fs')
const puppeteer = require("puppeteer");



const dash_url = `https://ac.touahria.com/dashboard`



exports.htmlSender = async (year, unit)=>{
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // ----BLOCKING STYLES, BEFORE GOING TO THE "URL"
    await page.setRequestInterception(true);
    page.on("request", (req) => {
        if (
            req.resourceType() === "image" ||
            req.resourceType() === "stylesheet" ||
            req.resourceType() === "font"
        ) {
            req.abort();
        } else {
            req.continue();
        }
    });
    await page.goto(dash_url, { waitUntil: "networkidle0" });

    await page.type(`input[id="user_login"]`, process.env.ADDRESS, {
        delay: 30,
    });
    await page.type(`input[id="user_pass"]`, process.env.PASS, { delay: 30 });

    const submitBtn = await page.$('input[id="wp-submit"]');
    await submitBtn.click();

    await page.waitForNavigation({
        waitUntil: "networkidle0",
    });
    await page.close();
    //-----------------SECOND PART-----------------------------
    const lessonPage = await browser.newPage();
    await lessonPage.setRequestInterception(true);
    lessonPage.on("request", (req) => {
        if (
            req.resourceType() === "image" ||
            req.resourceType() === "stylesheet" ||
            req.resourceType() === "font" ||
            req.resourceType() === "script"
        ) {
            req.abort();
        } else {
            req.continue();
        }
    });
    await lessonPage.goto(`https://ac.touahria.com/courses/${year}-u0${unit}/`)
    const rubbish_html = await lessonPage.content();
    const between_html = rubbish_html.match(/<div class="tutor-single-course-segment  tutor-course-topics-wrap">(.*?)About the instructor<\/h4>/gms)[0].replace('style=""', '')
    const final_html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <title>${year}--|--unit-0${unit}</title>
    </head>
    <body>
        ${between_html}
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
        <script src="./js/Set-JSON.js"></script>
    </body>
    </html>  
    `
    fs.writeFile(`${__dirname}/../../client/Temp-HTML.html`, final_html, (err) => {
        if (err) throw err;
        console.log("The HTML file was succesfully saved!");
    });

    const triggerJson_page = await browser.newPage();   //todo
    await triggerJson_page.goto('https://academy-hack.herokuapp.com/static/Temp-HTML.html', { waitUntil: 'networkidle0' })
    await browser.close()
}
