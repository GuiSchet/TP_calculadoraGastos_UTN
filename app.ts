// Importo funciones.
import { graficarGastos } from './graficos';

// Defino el type categoria.

type Categoria = 'alimentos' | 'transporte' | 'alquiler' | 'salidas' | 'internet' | 'farmacia' | 'otros'

// Defino la interface de Gasto.
interface Gasto {
    id: number;
    fecha: Date;
    nombre: string;
    categoria: Categoria;
    monto: number;
}
// Defino la clase de gasto.
class Gasto {
    static contadorId = 1; // Contador global para el ID

    id: number;
    fecha: Date;
    nombre: string;
    categoria: Categoria;
    monto: number;
    constructor (id: number, fecha: Date, nombre: string, categoria: Categoria, monto: number) {
        // Cuerpo del constructor
        this.id = Gasto.contadorId++;
        this.fecha = fecha;
        this.nombre = nombre;
        this.categoria = categoria;
        this.monto = monto;
    }
    activarInfo() {
        console.log(`ID: ${this.id}, ${this.nombre} , ${this.categoria}, ${this.monto}`);
    }
    // Método para guardar en localStorage
    guardarEnLocalStorage() {
        try {
            const gastosPreviosJSON = localStorage.getItem('gastos'); // Obtener gastos previos
            const gastosPrevios: Gasto[] = gastosPreviosJSON ? JSON.parse(gastosPreviosJSON) : []; // Convertir a array

            gastosPrevios.push(this); // Agregar el nuevo gasto al array
            const gastosActualizadosJSON = JSON.stringify(gastosPrevios); // Convertir a JSON
            localStorage.setItem('gastos', gastosActualizadosJSON); // Guardar en localStorage

            console.log('Nuevo gasto agregado al localStorage.');
        } catch (error) {
            console.error('Error al guardar en localStorage:', error);
        }
    }
}

// Funcion que genera la tabla en el HTML.
function generarTabla(data: Gasto[]): void {
    const tablaBody = document.getElementById("tabla-gastos") as HTMLTableSectionElement;
    tablaBody.innerHTML = ""; // Limpiar contenido previo

    data.forEach(gasto => {
        const row = tablaBody.insertRow();
        row.innerHTML = `
            <td>${gasto.id}</td>
            <td>${gasto.fecha}</td>
            <td>${gasto.nombre}</td>
            <td>${gasto.categoria}</td>
            <td>${gasto.monto}</td>
        `;
    });
    graficarGastos(data);
}

// Función para cargar gastos desde localStorage y mostrarlos en el HTML.
function cargarGastosDesdeLocalStorage() {
    try {
        const gastosPreviosJSON = localStorage.getItem('gastos'); // Obtener gastos previos
        const gastosPrevios: Gasto[] = gastosPreviosJSON ? JSON.parse(gastosPreviosJSON) : [];

        // Mostrar los gastos en el HTML (por ejemplo, en una lista)
        generarTabla(gastosPrevios);
    } catch (error) {
        console.error('Error al cargar gastos desde localStorage:', error);
    }
}

// Obtener elementos del formulario.
const botonAgregarGasto = document.getElementById('agregar-gasto');
const inputNombre = document.getElementById('nombre') as HTMLInputElement;
const selectCategorias = document.getElementById('categorias') as HTMLSelectElement;
const inputMonto = document.getElementById('monto') as HTMLInputElement;

// Escuchar el evento click del botón "agregar gastos".
botonAgregarGasto?.addEventListener('click', () => {
    // Obtener los valores del formulario
    const nombre = inputNombre.value;
    const categoria = selectCategorias.value as Categoria;
    const monto = parseFloat(inputMonto.value); // Convertir a número

    // Crear una nueva instancia de Gasto con los valores del formulario
    const nuevoGasto = new Gasto(1, new Date(), nombre, categoria, monto);

    // Agregar al localStorage
    nuevoGasto.guardarEnLocalStorage();

    // Actualizar la lista de gastos en el HTML
    cargarGastosDesdeLocalStorage();
});

//Escucha el evento "load" del sitio.
window.addEventListener('load', cargarGastosDesdeLocalStorage);

