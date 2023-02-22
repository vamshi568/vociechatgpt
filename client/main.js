const reqs=document.getElementById('reqs')
const ress=document.getElementById('responsed')
const btn=document.getElementById('btn')
const chk=document.querySelector('.chk')
const texarea=document.querySelector('textarea')
let micro=document.querySelector('.micro')
const URL='http://localhost:3300'
let uservalue=true
function playResults(text){
    const utterance=new SpeechSynthesisUtterance(text)
    utterance.rate=1.2
    utterance.addEventListener('end',()=>{
        input.disabled=false
    })
    // input.disabled=true
    speechSynthesis.speak(utterance)
}
function stopText(){
    speechSynthesis.cancel()
}
const bla=async (args)=>{

    const some=await fetch(URL,{method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({promt:args})
    })
    const data=await some.json()
    // console.log(reqs.value)
    // ress.innerHTML=data.bot
    console.log(data)
    playResults(data.bot)
    addchatbot(data.bot)
    
}
const GetSpeech = () => {
    // console.log("clicked microphone");
    
    const SpeechRecognition =  window.SpeechRecognition || window.webkitSpeechRecognition;
    
    let recognition = new SpeechRecognition();
    if (chk.checked){

    let textt;
    recognition.interimResults=true
        recognition.onstart = () => {
            console.log("starting listening, speak in microphone");
            uservalue=false
        }
        
        let list=document.createElement('li')
        list.classList.add('userbox')
        chatbox.append(list)
        let image=document.createElement('i')
        image.classList.add("fa-solid", "fa-user")
        list.append(image)
        let para=document.createElement('p')
        
        recognition.addEventListener('result',(e)=>{
            textt=Array.from(e.results)
            .map(result=>result[0])
            .map(result=>result.transcript)
            .join('')
            // console.log(textt)
            para.innerText=textt
            list.append(para)
            chatbox.scrollTo(0, chatbox.scrollHeight);
            

        })
        recognition.onspeechend = () => {
            console.log("stopped listening");
            recognition.stop();
            chk.checked=false
            // uservalue=true
            if (textt!==' ' && textt!=='' && textt!==undefined && textt !==null){

                bla(textt)
            }else {playResults('Unable to understand')}
          
        }
        
        // recognition.onresult = (result) => {
        //     const transcript=result.results[0][0]
        //     .map(result=>result[0])
        //     .map(result=>result.transcript)
        //     // addchatuser(resultdata)
        //     console.log(transcript)
        //     // console.log(result)

        //     // bla(resultdata)
        //     // addchatuser(resultdata)
            
            
        // }
        recognition.start();

   }else{
    recognition.stop()
    chk.checked=false
console.log('stopped')}}

btn.onclick=()=>{
    
    if (reqs.value===''){
        console.log('emty')
        GetSpeech()
    }else{
        reqs.value=''
        input.classList.remove('adding')
        icon.classList.remove('scale')
        send.classList.remove('sendon')
        texarea.style.overflow='hidden'
        input.style.height='30px'
        GetSpeech()
        typing=false
    }
}



const icon=document.querySelector('.icon')
const input=document.querySelector('.input')
const send=document.querySelector('.send')
let intervalId;
let typing=true
icon.onclick=()=> {
    input.classList.add('adding')
    icon.classList.add('scale')
    send.classList.add('sendon')
    input.focus()
    stopText()
    typing=false
    console.log(typing)
}
input.addEventListener('blur',()=>{
    if (input.value===''){

        input.classList.remove('adding')
        icon.classList.remove('scale')
        send.classList.remove('sendon')
        texarea.style.overflow='hidden'
        
    }
    typing=true
        console.log(typing)
})
const keysshift={shift:false}
reqs.addEventListener('input', (event) => {
    event.target.style.height = 'auto';
    event.target.style.overflow = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
    if (input.value===''){
        event.target.style.height='30px'
    }

  });
reqs.addEventListener('keydown',(e)=>{
    if (e.key==='Shift'){
        
        keysshift.shift=true
        
    }
})
reqs.addEventListener('keyup',(e)=>{
    if (reqs.value!=='' && e.key==='Enter'){
        
        if (keysshift.shift && e.key==='Enter'){ 
            addchatuser(input.value)
            bla(input.value)
            reqs.value=''
            input.style.height='30px'
            typing=true
        }
    }else if (e.key==='Shift'){
        keysshift.shift=false
    }
})
send.addEventListener('click',()=>{
    if (input.value !==''){
        // console.log(input.value)
        addchatuser(input.value)
        // addchatbot(input.value)
        // bla(input.value)
        input.value=''
        input.style.height='30px'
        typing=true
    }
})

// adding the chat boxes
const chatbox=document.getElementById('chatbox')
function addchatuser(text){
    let list=document.createElement('li')
    list.classList.add('userbox')
    chatbox.append(list)
    let para=document.createElement('p')
    para.textContent=text
    list.append(para)
    let image=document.createElement('i')
    image.classList.add("fa-solid", "fa-user")
    list.append(image)
    chatbox.scrollTo(0, chatbox.scrollHeight);

}

function addchatbot(text){
    
    
    let list=document.createElement('li')
    list.classList.add('botbox')
    chatbox.append(list)
    let image=document.createElement('i')
    image.classList.add('fa-android','fa-brands')
    list.append(image)
    let para=document.createElement('p')
    para.classList.add('typing-text')
    simulateTyping(para,text,80)
    // para.textContent=text
    list.append(para)
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
}

async function simulateTyping (typingText, text, delay) {
    let i = 0;
    const intervalId = await setInterval(() => {
        if (typing){

        
      typingText.textContent = text.substring(0, i);
      i++;
      if (i > text.length) {
        clearInterval(intervalId);
        typingText.classList.add("typed");
      }
    }}, delay);
    typingText.classList.add("typed")
  }
  
addchatbot('Hai there...')