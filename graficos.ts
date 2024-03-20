// Funcion que genera los graficos en el html.
// npm install chart.js

import Chart from 'chart.js/auto';

export function graficarGastos(gastos: Gasto[]): void {
    const labels = gastos.map(gasto => gasto.fecha);
    const montos = gastos.map(gasto => gasto.monto);

    const ctx = document.getElementById('grafico-gastos') as HTMLCanvasElement;
    new Chart(ctx, {
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