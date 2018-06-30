
function Get(whateverUrl){
        const Httpreq = new XMLHttpRequest(); // a new request
        Httpreq.open("GET",whateverUrl,false);
        Httpreq.send(null);
        return Httpreq.responseText;          
    }

let currency_list_obj = JSON.parse(Get("https://free.currencyconverterapi.com/api/v5/currencies"));
//let myJSON = JSON.stringify(currency);
console.log(currency_list_obj);

 



//creating indexed Db

let idbSupported = false;

document.addEventListener("DOMContentLoaded", function(){

  fetch('https://free.currencyconverterapi.com/api/v5/currencies')
  .then(response => response.json())
  .then(({results}) => {
    console.log(results)
    let currencyArray = Object.values(results);
    let selects = document.querySelectorAll('select');
    selects.forEach(select => {
      currencyArray.forEach(currency => {
      let option = document.createElement('option');
      option.value = currency.id;
      option.innerText = currency.id;
        select.appendChild(option)
      })  
    })
    
  })
  .catch(console.log)





function Get(whateverUrl){
        const Httpreq = new XMLHttpRequest(); // a new request
        Httpreq.open("GET",whateverUrl,false);
        Httpreq.send(null);
        return Httpreq.responseText;          
    }


     document.getElementById("convert").addEventListener("click", () => {
      let currencyA = currency1.value;
      let currencyB = currency2.value;

      let query = currencyA + '_' + currencyB;
      fetch(`https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=y`)
      .then(response => response.json())
      .then(data => {
            let rate = Object.values(data)[0].val;
            document.getElementById("result").value = rate * document.getElementById("number").value;
      })
        
    }); 

 
    if("indexedDB" in window) {
        idbSupported = true;
    }
 
    if(idbSupported) {
        var openRequest = indexedDB.open("currency_converter",2);

        console.log(openRequest);
 
        openRequest.onupgradeneeded = (e) => {
        	console.log("came in here")
            console.log("running onupgradeneeded");
            // var thisDB = e.target.result;
 
            

        }
 
        openRequest.onsuccess = (e) => {
            // console.log(result);
            thisDB = e.target.result;
            if(!thisDB.objectStoreNames.contains("country_currencies")) {
                thisDB.createObjectStore("country_currencies");
            }
 			

 			if(!thisDB.objectStoreNames.contains("country_name")) {
                thisDB.createObjectStore("country_name");
            }
 
            var transaction = thisDB.transaction(["country_currencies"],"readwrite");
            var store = transaction.objectStore("country_currencies");
            var request = store.add(currency_list_obj,1);

         	request.onerror = (e) => {
    			console.log("Error",e.target.error.name);
			}

			request.onsuccess = (e) => {
    			console.log("Woot! Did it");
			}
        }
 
        openRequest.onerror = (e) => {
            console.log("Error");
            console.dir(e);
        }
 
    }
 
},false);

