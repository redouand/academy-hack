const axios = require('axios');
const fs = require('fs')


const htmlSender = async (year, unit)=>{
    const options = {
        headers: {
            Cookie: "wordpress_logged_in_5b5a3c4bf40826565bba9bb593ba4c98=theomurf47%7C1609965325%7Ciy1YBuO66jLiDZutVTWW5GU0CgPMd5gN9ZLk05erveW%7C0d200a5b8ae6704f723e35fec0f586f1dfa2a3896f2528580b73ea8859db3ca8;path=/; wordpress_sec_5b5a3c4bf40826565bba9bb593ba4c98=theomurf47%7C1609965325%7Ciy1YBuO66jLiDZutVTWW5GU0CgPMd5gN9ZLk05erveW%7C83a23a75a1d4f453bab5f151592138c0b607154a56035ce3d5a88130c2c2566d;path=wp-admin;secure; wordpress_sec_5b5a3c4bf40826565bba9bb593ba4c98=theomurf47%7C1609965325%7Ciy1YBuO66jLiDZutVTWW5GU0CgPMd5gN9ZLk05erveW%7C83a23a75a1d4f453bab5f151592138c0b607154a56035ce3d5a88130c2c2566d;path=wp-content/plugins;secure"//TODO: hide the cookie
        }
    }
    const rubbish_html = await axios.get(`https://ac.touahria.com/courses/${year}-u0${unit}/`, options)
    
    const between_html = rubbish_html.data.match(/<div class="tutor-single-course-segment  tutor-course-topics-wrap">(.*?)About the instructor<\/h4>/gms)[0].replace('style=""', '')
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
}

module.exports = htmlSender


