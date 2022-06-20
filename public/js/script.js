function clearMessage(){
    console.log('yehon neger message lak')
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
//handle Theme to dark/sun mode
function handleTheme(){
    
    let body =  document.getElementsByTagName("body")[0].style.background;
   let header = document.getElementsByClassName("dark");
   let inputs = document.getElementsByTagName("input");
   let lis = document.getElementsByTagName("li");
   
   //body.style.background = body.style.background != 'black' ? 'black' : '';
   //body.style = "background:black; color:white"
   for(let i = 0; i < header.length; i++){
     body !== 'black' ? header[i].style = "background:black; color:white" : header[i].style  =  ''
   }
   for(let i = 0; i < inputs.length; i++){
    body !== 'black' ? inputs[i].style = "background:#24292F; color:white" : inputs[i].style  =  ''
  }
  for(let i = 0; i < lis.length; i++){
    body !== 'black' ? lis[i].style = "background:#24292F; color:white" : lis[i].style  =  ''
  }
}

//log out user
function handleLogout(){
  fetch(`/user/logout?_method=DELETE`,{
      method: 'POST', 
      headers: {
          'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
      },
  })
  .then(response => function(){
    console.log(response, 'delete response')
    window.location.replace('/')
  })
  //.then(response => response.json())
  //.then(data => console.log(data))
  .catch(error => console.log(error))

}