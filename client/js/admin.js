const form = document.querySelector('form')
const btn = document.querySelector('form button')
const year_input = document.querySelector('form #year-input')
const unit_input = document.querySelector('form #unit-input')
const pass = document.querySelector('#pass')
const response_doc = document.querySelector('#response')
const loader = document.querySelector('img')

form.addEventListener('submit', async (e)=>{
    e.preventDefault()
    const yearTxt = year_input.value
    const unitTxt = unit_input.value
    
    if (year_input.value == '' || unit_input.value == '') {
        response_doc.innerHTML = 'required fields'
    }

    else if(pass.value !== 'newlife47'){
        response_doc.innerHTML = 'wrong password..'
    }  
    else {
        loader.style.display = 'block'
        const jsonInputs = JSON.stringify({ yearTxt, unitTxt })
        const options = {
            jsonInputs
        }
        try {
            const retr = await axios.post('/retrieve-input', options)
            response_doc.innerHTML = retr.data
            loader.style.display = 'none'
        } catch (error) {
            response_doc.innerHTML = error.message
        }

        
        //reset
        year_input.value = ''
        unit_input.value = '';
        pass.value = ''
    }

})
