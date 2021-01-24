const vid = document.querySelector('video')
let lesson_doc = null;

async function render() {
  try {
    const json = await axios.get(`../static/data/${myPassedData}.json`);
    //---CHANGE THE ALL TO NEW ALL
    const map = new Map(json.data.newAll)
    

    var all = document.createElement("DIV")
    all.setAttribute('id', 'all-lessons')
    document.body.appendChild(all);

    
    map.forEach((value, key)=>{
    var unit_doc = document.createElement("DIV")
    unit_doc.setAttribute('id', key);

    var h1 = document.createElement("H1")
    h1.innerHTML = key
    unit_doc.appendChild(h1)


    var all_lessons = document.createElement("DIV")
    all_lessons.setAttribute('id', 'all-lessons')


    value.forEach(lesson=>{
        lesson_doc = document.createElement("A")
        //MADE A CHANGE
        lesson_doc.setAttribute('class', 'anchor')
        lesson_doc.setAttribute('id', lesson.id)
        lesson_doc.innerHTML = lesson.name
        //--<div class="anchor" id="12542555">النظائر</div>
        const br = document.createElement('BR')
        all_lessons.appendChild(lesson_doc)
        all_lessons.appendChild(br)
    })


    unit_doc.appendChild(all_lessons)
    all.appendChild(unit_doc)
    })

  } catch (err) {
    console.log(err.message);
  }
}
render();




///---------------the GET part.


document.addEventListener('click', async function(e){
  if(e.target && e.target.className == 'anchor'){
      const id = e.target.id
      const options = {
          id
      }
      const direct = await axios.post('/get-direct-route', options)
      //--left off
      vid.setAttribute('src', direct.data[0].url)
      console.log(direct.data);//returns an empty obj
   }
});


