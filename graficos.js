"use strict";
// Funcion que genera los graficos en el html.
// npm install chart.js
Object.defineProperty(exports, "__esModule", { value: true });
exports.graficarGastos = void 0;
var auto_1 = require("chart.js/auto");
function graficarGastos(gastos) {
    var labels = gastos.map(function (gasto) { return gasto.fecha; });
    var montos = gastos.map(function (gasto) { return gasto.monto; });
    var ctx = document.getElementById('grafico-gastos');
    new auto_1.default(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                    label: 'Gastos',
                    data: montos,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
exports.graficarGastos = graficarGastos;
