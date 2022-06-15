function clearMessage(){
    console.log('yenon neger message')
   let messages =  document.getElementsByClassName('messages')
   setTimeout(() => {
       messages.forEach(element => {
           element.innerHTML = ''
       });
   }, 3000)
}