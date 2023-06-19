
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {getDatabase , ref ,push , onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings={
    databaseURL:"https://realtime-database-a4aee-default-rtdb.firebaseio.com/"
};

const app= initializeApp(appSettings);

const database = getDatabase(app);

const shoppinglistInDB = ref(database,"shoppinglist")
 
// console.log(app)

const inputField = document.getElementById("input-feild")
// console.log(inputField)
const addbutton = document.getElementById("add-button")
const shoppinglistEl= document.getElementById("shopping-list")


addbutton.addEventListener("click",function(){
    let inputvalue=inputField.value
    
    push(shoppinglistInDB,inputvalue)
    // console.log(inputField.value)
    clearField()
    // appendItem(inputvalue)
    // console.log(`${inputvalue} added to the database`)
})


onValue(shoppinglistInDB,function(snapshot){
    // console.log(snapshot.val())
   if(snapshot.exists()){  
    let itemsArray =Object.entries(snapshot.val())
    
    //  console.log(itemsArray)
    clearShoppingList()
     for(let i=0;i<itemsArray.length;i++){
        let curritem = itemsArray[i]
        let curritemID =curritem[0]
        let curritemValue = curritem[1]
        // console.log(curritem)

        appendItem(curritem)
     }
    }else{
        shoppinglistEl.innerHTML="No items here...."
    }


})

function clearShoppingList(){
    shoppinglistEl.innerHTML=""
}

function clearField(){
    inputField.value =""
}

function appendItem(item){
    let itemId= item[0]
    let itemvalue=item[1]
    // shoppinglistEl.innerHTML +=`<li> ${itemvalue} <li>`
    let newEl = document.createElement("li")
    newEl.textContent=itemvalue
    newEl.addEventListener("click",function(){
        let exactlocation = ref(database,`shoppinglist/${itemId}`)
        remove(exactlocation)
    })
      
     
    shoppinglistEl.append(newEl)

}