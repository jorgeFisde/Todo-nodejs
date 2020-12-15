const color     = require('colors');
const { argv }  = require('./config/yargs');
const { crear, getListado, actualizar, borrarTarea } = require('./por-hacer/por-hacer');


const comando = argv._[0];


switch (comando) {
    case 'crear':
        const tarea = crear(argv.descripcion);

        console.log(tarea);
        break;

    case 'listar':

        const tareas = getListado();

        for (const tarea of tareas) {

            console.log('---------- Tarea -----------'.green);
            console.log(tarea.descripcion);
            console.log(tarea.completado);
            console.log('----------------------------'.green);

        }

        break;

    case 'actualizar':

        actualizar(argv.descripcion, argv.completado)

        break;
    case 'borrar':

        borrarTarea(argv.descripcion);

        break;

    default:
        break;
}