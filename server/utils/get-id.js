const puppeteer = require("puppeteer");
const fs = require("fs");
const url = `https://ac.touahria.com/dashboard`

const getId = async (arr, docTitle) => {
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
    await page.goto(url, { waitUntil: "networkidle0" });

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
    const m = new Map(arr);
    let newM = [];

    //LOOPING THROUGH UNITS
    for (const [k, v] of m.entries()) {
        const unit = k;
        let lessons = [];

        for (let i = 0; i < v.length; i++) {
            const lessonObj = v[i];
            await lessonPage.goto(lessonObj.lesson_link);
            await lessonPage.waitForTimeout(50);
            const id = await lessonPage.evaluate(() => {
                if (document.querySelector(`iframe`) === null) {
                    return 'pdf'
                }
                return document.querySelector(`iframe`).src.slice(-9)
            });
            console.log(id);
            lessons.push({
                name: lessonObj.lesson_name,
                url: lessonObj.lesson_link,
                id: id,
            });
        }
        console.log(lessons);
        newM.push([unit, lessons]);
    }

    //----saving the new file.
    const myNewJson = { newAll: newM };
    fs.writeFile(
        `${__dirname}/../../client/data/${docTitle}.json`,
        JSON.stringify(myNewJson),
        (err) => {
            if (err) throw err;
            console.log("The json file was succesfully saved!");
        }
    );
    await browser.close()
};

module.exports = getId
