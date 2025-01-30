import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Chart.jsの各機能を登録
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const ChartBar = (props) => {
  // 例: props.data1 = [必要単位数, 取得単位数]
  const needValue = props.data1[0]; // 必要単位数
  const currentValue = props.data1[1]; // 取得単位数

  // 取得単位数が必要単位数を超えていたら、残りを0にするなどのガード
  const completedValue = Math.min(currentValue, needValue);
  const remainingValue = Math.max(needValue - currentValue, 0);

  const data = {
    // 「1 本の棒」を描画したいので、ラベルは 1 つだけ用意しておくイメージ
    labels: [props.title],
    datasets: [
      {
        // ゲージの「埋まっている部分」
        label: '取得単位数',
        data: [completedValue],
        backgroundColor: 'rgba(100, 220, 120, 0.5)', // 好きな色に
        borderColor: 'rgba(100, 220, 120, 1)',
        borderWidth: 1,
      },
      {
        // ゲージの「残りの部分」
        label: '残り単位数',
        data: [remainingValue],
        backgroundColor: 'rgba(200, 200, 200, 0.5)', // 好きな色に
        borderColor: 'rgba(200, 200, 200, 1)',
        borderWidth: 1,
      },
    ],
  };

  // スタックオプションを有効にし、棒を横向きにしたい場合は indexAxis: 'y'
  const options = {
    indexAxis: 'y', // 横棒チャートにする
    responsive: true,
    scales: {
      x: {
        // 積み上げを有効
        stacked: true,
        // 取得単位数が 0 のときにも正しく表示されるように
        min: 0,
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: props.title,
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};
