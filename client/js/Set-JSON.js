
const setJson =async ()=> {
    const All_units_doc = document.querySelectorAll('.tutor-course-topic.tutor-topics-in-single-lesson')
    let all_units_intity = []

    All_units_doc.forEach(unit=>{
        const unitNameText = unit.querySelector('.tutor-course-title h4').innerText
        let generate_before_add = [
            unitNameText,
            []
        ]

        
        const lessonNames_a = unit.querySelectorAll('.tutor-course-lessons .tutor-course-lesson h5 a'); //this has both the lesson name value and the lesson url as an href
        lessonNames_a.forEach(eachLessonNames_a=>{
            generate_before_add[1].push({
                lesson_name: eachLessonNames_a.innerText,
                lesson_link: eachLessonNames_a.href,
                id: null
            })
        })
        all_units_intity.push(generate_before_add)
    })
    const jsonTXT = JSON.stringify(all_units_intity)

    const option = {
        jsonTXT,
        documentTitle: document.title //was set by the htmlSender()
    }
    await axios.post('/retrieve-json', option)
}

setJson()