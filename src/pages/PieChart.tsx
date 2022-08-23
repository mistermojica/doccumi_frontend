import React, {useState, useEffect} from 'react';
import {Chart, ArcElement} from 'chart.js';
import {Pie} from 'react-chartjs-2';

Chart.register(ArcElement);

const PieChart = () => {
  const [graph, setGraph] = useState<any>({
    labels: [],
    data: []
  });

  const graphData = [
    {
      label: 'React',
      value: 12
    },
    {
      label: 'Vue',
      value: 19
    },
    {
      label: 'Angular',
      value: 3
    }
  ];

  useEffect(() => {
    const labels: any[] = [];
    const data: any[] = [];

    graphData?.forEach((v: any) => {
      labels.push(v?.label);
      data.push(v?.value);
    });

    setGraph({
      labels,
      data
    });
  }, []);

  const data = {
    labels: graph.labels,
    datasets: [
      {
        label: '# of Votes',
        data: graph.data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <>
      <div className="App">
        <h3>React Pie Chart Example - CodeCheef </h3>
        <div style={{height: '300px', width: '300px', margin: '0 auto'}}>
          <Pie data={data} />
        </div>
      </div>
    </>
  );
};

export default PieChart;
