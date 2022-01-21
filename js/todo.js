const toDoForm = document.getElementById('todo-form');
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.getElementById('todo-list');

const TODOS_KEY = 'todos'

let toDos=[];

function saveToDos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); // localStorage에 배열형태로 자료 저장하기 위함
}


function deleteToDo(event){
    const li = event.target.parentElement;
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
    li.remove();
    saveToDos();
}

function paintToDo(newTodo){
    const li = document.createElement('li');
    li.id = newTodo.id
    const span = document.createElement('span');
    span.innerText = newTodo.text;
    const button = document.createElement('button');
    button.innerText='❌';
    button.addEventListener('click', deleteToDo)
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value; // newTodo는 사용자가 입력한 String 값
    toDoInput.value = '';
    const newTodoObj = {
        text:newTodo,
        id:Date.now() // 랜덤한 값을 id로 주기 위함
    }
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener('submit', handleToDoSubmit);


const savedToDos = localStorage.getItem(TODOS_KEY);
console.log(savedToDos);
if(savedToDos) {
    const parsedToDos = JSON.parse(savedToDos); // string을 object로 파싱
    console.log(parsedToDos);
    toDos = parsedToDos
    parsedToDos.forEach((item) => paintToDo(item));
}