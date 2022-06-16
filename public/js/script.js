function clearMessage(){
    console.log('yenon neger message')
   let messages =  document.getElementsByClassName('messages')
   setTimeout(() => {
       messages.forEach(element => {
           element.innerHTML = ''
       });
   }, 3000)
}

//delete snippet

function handleDelete(id){
    fetch(`/snippets/${id}?_method=DELETE`,{
        method: 'POST', 
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
        },
    })
    .then(response => console.log(response))
    //.then(response => response.json())
    //.then(data => console.log(data))
    .catch(error => console.log(error))

}