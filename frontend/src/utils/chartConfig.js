import{
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    maintainAspectRadio: false,
    plugins:{
        legend:{
            position: 'top',
        },
        title:{
            display: true,
            text: 'Distribuição Anual de Incêndios'
        }
    }
}