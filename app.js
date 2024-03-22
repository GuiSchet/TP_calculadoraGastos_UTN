"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gasto = void 0;
// Importo funciones.
var graficos_1 = require("./graficos");
// Defino la clase de gasto.
var Gasto = /** @class */ (function () {
    function Gasto(id, fecha, nombre, categoria, monto) {
        // Cuerpo del constructor
        this.id = Gasto.contadorId++;
        this.fecha = fecha;
        this.nombre = nombre;
        this.categoria = categoria;
        this.monto = monto;
    }
    Gasto.prototype.activarInfo = function () {
        console.log("ID: ".concat(this.id, ", ").concat(this.nombre, " , ").concat(this.categoria, ", ").concat(this.monto));
    };
    // Método para guardar en localStorage
    Gasto.prototype.guardarEnLocalStorage = function () {
        try {
            var gastosPreviosJSON = localStorage.getItem('gastos'); // Obtener gastos previos
            var gastosPrevios = gastosPreviosJSON ? JSON.parse(gastosPreviosJSON) : []; // Convertir a array
            gastosPrevios.push(this); // Agregar el nuevo gasto al array
            var gastosActualizadosJSON = JSON.stringify(gastosPrevios); // Convertir a JSON
            localStorage.setItem('gastos', gastosActualizadosJSON); // Guardar en localStorage
            console.log('Nuevo gasto agregado al localStorage.');
        }
        catch (error) {
            console.error('Error al guardar en localStorage:', error);
        }
    };
    Gasto.contadorId = 1; // Contador global para el ID
    return Gasto;
}());
exports.Gasto = Gasto;
// Funcion que genera la tabla en el HTML.
function generarTabla(data) {
    var tablaBody = document.getElementById("tabla-gastos");
    tablaBody.innerHTML = ""; // Limpiar contenido previo
    data.forEach(function (gasto) {
        var row = tablaBody.insertRow();
        row.innerHTML = "\n            <td>".concat(gasto.id, "</td>\n            <td>").concat(gasto.fecha, "</td>\n            <td>").concat(gasto.nombre, "</td>\n            <td>").concat(gasto.categoria, "</td>\n            <td>").concat(gasto.monto, "</td>\n        ");
    });
    (0, graficos_1.graficarGastos)(data);
}
// Función para cargar gastos desde localStorage y mostrarlos en el HTML.
function cargarGastosDesdeLocalStorage() {
    try {
        var gastosPreviosJSON = localStorage.getItem('gastos'); // Obtener gastos previos
        var gastosPrevios = gastosPreviosJSON ? JSON.parse(gastosPreviosJSON) : [];
        // Mostrar los gastos en el HTML (por ejemplo, en una lista)
        generarTabla(gastosPrevios);
    }
    catch (error) {
        console.error('Error al cargar gastos desde localStorage:', error);
    }
}
// Obtener elementos del formulario.
var botonAgregarGasto = document.getElementById('agregar-gasto');
var inputNombre = document.getElementById('nombre');
var selectCategorias = document.getElementById('categorias');
var inputMonto = document.getElementById('monto');
// Escuchar el evento click del botón "agregar gastos".
botonAgregarGasto === null || botonAgregarGasto === void 0 ? void 0 : botonAgregarGasto.addEventListener('click', function () {
    // Obtener los valores del formulario
    var nombre = inputNombre.value;
    var categoria = selectCategorias.value;
    var monto = parseFloat(inputMonto.value); // Convertir a número
    // Crear una nueva instancia de Gasto con los valores del formulario
    var nuevoGasto = new Gasto(1, new Date(), nombre, categoria, monto);
    // Agregar al localStorage
    nuevoGasto.guardarEnLocalStorage();
    // Actualizar la lista de gastos en el HTML
    cargarGastosDesdeLocalStorage();
});
//Escucha el evento "load" del sitio.
window.addEventListener('load', cargarGastosDesdeLocalStorage);
