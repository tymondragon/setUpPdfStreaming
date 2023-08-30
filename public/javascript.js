document.addEventListener("DOMContentLoaded", function(){
  window.onload = function() {
    var config = {
      headers: {'Accept': 'application/pdf'}
    };
    
    axios.get('http://localhost:3000/pdf', config)
    .then(response => {
      window.open(response)
    });
  };
  
})