export const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
             text: 'Distribuição Anual de Incêndios',
        },
    },
};

export const getChartData = (chartData) => {
    return chartData ? {
        labels: Object.keys(chartData),
        datasets: [{
            label: 'Número de Incêndios',
            data: Object.values(chartData),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }]
    } : null;
};