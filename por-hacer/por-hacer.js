const fs = require('fs');



let listadoTodo = [];


const guardarDB = () => {
    const data = JSON.stringify(listadoTodo);

    fs.writeFile('./db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    })

}

const cargarBD = () => {

    try {
        
        listadoTodo = require('../db/data.json');

    } catch (error) {

        listadoTodo = [];

    }

}

const crear = ( descripcion ) => {

    cargarBD();

    let todo = {
        descripcion,
        completado: false
    }

    listadoTodo.push(todo);
    guardarDB()
    
    return todo;
}

const getListado = () => {

    cargarBD();
    
    return listadoTodo;

}

const actualizar = ( descripcion, completado = true ) => {

    cargarBD();

    let index = listadoTodo.findIndex( tarea => tarea.descripcion.toUpperCase() === descripcion.toUpperCase() );

    if (index >= 0) {
        
        listadoTodo[index].completado = completado;
        guardarDB();

    } else {
        
        console.log(`No existe ninguna tarea con la descripcion: ${descripcion}`);

    }
}

const borrarTarea = ( descripcion ) => {

    cargarBD();

    let nuevaLista = listadoTodo.filter( tarea => {
        return tarea.descripcion.toUpperCase() !== descripcion.toUpperCase();
    });

    if ( nuevaLista.length === listadoTodo.length ) {
        console.log(`No existe ninguna tarea con la descripcion: ${descripcion}`);
    }else {
        listadoTodo = nuevaLista; 
        guardarDB();
    }

}



module.exports = {
    crear,
    getListado,
    actualizar,
    borrarTarea
}