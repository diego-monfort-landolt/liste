const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const input = document.querySelector('#input');
const botonEnter = document.querySelector('#enter');

const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThrough = 'line-through';
let id;
let LIST;


//Date

const FECHA = new Date()
fecha.innerHTML=FECHA.toLocaleString('de-DE',{ weekday:'long',month:'short',day:'numeric'})



//function hinzufügen -liste-(user wert)
function agregarTarea(tarea,id,realizado,eliminado) {
//durchstrichen oder nicht
if(eliminado){return};
    const REALIZADO = realizado ?check :uncheck;
    const LINE = realizado ?lineThrough :'';

    const elemento = `
                    <li id="elemento">
                         <i class="far ${REALIZADO}" data="realizado" id=${id}></i>
                         <p class="text %{LINE}">${tarea}</p>
                         <i class="fas fa-trash de" data="eliminado" id=${id}></i>
                    </li>
                     `
    
lista.insertAdjacentHTML("beforeend", elemento);
};

//function liste erfült geloest -parentNode = div ereichen
function tareaRealizada(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(lineThrough);
    LIST [element.ID].realizado = LIST[element.id].realizado ?false :true;
}

//function löschen
function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].eliminado = true;
}




//click beim icon
botonEnter.addEventListener('click', ()=> {
    const tarea = input.value
    if(tarea){
        agregarTarea(tarea,id,false,false);
        LIST.push({
            nombre: tarea, 
            id: id, 
            realizado:false, 
            eliminado:false
        });
    }
    localStorage.setItem('TODO',JSON.stringify(LIST))
    input.value=''
    id++
});
//Entertaste funktion
document.addEventListener('keyup', function(event){
    if(event.key=='Enter'){
        const tarea = input.value
        if(tarea){
            agregarTarea(tarea,id,false,false);
            LIST.push({
                nombre: tarea, 
                id: id, 
                realizado:false, 
                eliminado:false
            });
        }
    localStorage.setItem('TODO',JSON.stringify(LIST))
    input.value=''
    id++
    }
});

//entsteheung function buttons in der liste markieren und löschen

lista.addEventListener('click',function(event){
    const element = event.target;
    const elementData = element.attributes.data.value;
    if(elementData==='realizado'){
        tareaRealizada(element);
    }else if(elementData==='eliminado'){
        tareaEliminada(element);
    }

localStorage.setItem('TODO',JSON.stringify(LIST))
})

//localstorage lokale speichern

let data = localStorage.getItem('TODO')
if(data){
    LIST=JSON.parse(data)
    id = LIST.length
    cargarLista(LIST)
        } else {
            LIST = [];
            id = 0;
        }


function cargarLista(data) {
   data.forEach(function(i){
    agregarTarea(i.nombre,i.id, i.realizado, i.eliminado)

   })
}

//localStorac json -- das die user daten gespeichert werden local



