var list = document.getElementById("list")

firebase.database().ref('todos').on('child_added',function(data){
     var li = document.createElement("li")
    var liText = document.createTextNode(data.val().value)
    li.appendChild(liText)


var delButton = document.createElement("button") 
var delText = document.createTextNode("DELETE") 
delButton.setAttribute("id",data.val().key) 
delButton.setAttribute("class","delbtn")
delButton.setAttribute("onclick","deleteTodo(this)") 
delButton.appendChild(delText)

var editBtn = document.createElement("button")
var editText = document.createTextNode("Edit")
editBtn.setAttribute("id",data.val().key)
editBtn.setAttribute("onclick","editTodo(this)")
editBtn.appendChild(editText)

li.appendChild(delButton)

li.appendChild(editBtn)
    

  

    list.appendChild(li)

    

    
console.log(list)

})

function addTodo () {
    var todoitem = document.getElementById("todo-item");

    var key = firebase.database().ref('todos').push().key

    var todo = {
        value : todoitem.value,
        key : key
    }
    
   firebase.database().ref('todos').child(key).set(todo)

   todoitem.value = ""

  
    

}


   function deleteTodo(e){
       firebase.database().ref('todos').child(e.id).remove()
       e.parentNode.remove()
//console.log(e.id)
   }

   function deleteAll(){
       firebase.database().ref('todos').remove()
       list.innerHTML = ""
   }
function editTodo(e){
    var val = e.parentNode.firstChild.nodeValue
    var editValue = prompt("Enter Edit Value",val)
    var edittodo = {
        value : editValue,
        key : e.id
    }
    firebase.database().ref('todos').child(e.id).set(edittodo)
e.parentNode.firstChild.nodeValue = editValue
}





