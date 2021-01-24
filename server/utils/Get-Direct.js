const axios = require('axios')

const requester = async(id)=>{
    let result = []
    const options = {
        headers: {
            'Host': 'player.vimeo.com',
            'Referer': 'https://ac.touahria.com/',
            'Content-Type': 'text/plain'
        }
    };
    
    const rubbish = await axios.get(`https://player.vimeo.com/video/${id}`, options)
    const json_as_string = rubbish.data.match(/progressive":\[(.*?)\]/)[0].slice(13)
    const vimeo_obj = JSON.parse(json_as_string)
    vimeo_obj.forEach(Ssvimeo => {
        result.push(
            {
                quality: Ssvimeo.quality,
                url: Ssvimeo.url
            }
        )
    });
    console.log(result);
    return result
}

module.exports = requester