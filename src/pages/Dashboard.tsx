/* eslint-disable no-unused-vars */

import React, {useEffect, useRef, useState, useContext} from 'react';
import {SmallBox} from '@app/components';
import {ContentHeader} from '@components';
import {Pie, Doughnut} from 'react-chartjs-2';
import {Card} from 'react-bootstrap';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import 'chartjs-plugin-datalabels';
import axios from 'axios';
// @ts-ignore
import Loading from '@app/components/loadings/Loading';
import {mlCL} from '@app/utils/helpers';
import {useNavigate} from 'react-router-dom';
// @ts-ignore
import AppContext from '@app/contexts/AppContext';
import * as AuthService from '../services/auth';
// @ts-ignore
import * as Config from '../utils/config';

// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';

ChartJS.register(ArcElement, Tooltip, Legend);

const DataChartsHolderV = {
  hasData: false,
  labels: [],
  datasets: [
    {
      label: '# de Unidades',
      data: [],
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      // borderWidth: 1,
      hoverOffset: 1
    }
  ]
};

const DataChartsHolderI = {
  hasData: false,
  labels: [],
  datasets: [
    {
      label: '# de Unidades',
      data: [],
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      // borderWidth: 1,
      hoverOffset: 1
    }
  ]
};

const pieOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      labels: {
        font: {
          size: 12
        }
      }
    },
    datalabels: {
      display: true,
      color: 'black'
    },
    tooltip: {
      usePointStyle: true,
      backgroundColor: '#5a6e7f'
    }
  }
};

// type Variant = 'venta' | 'pendiente' | 'vendido' | 'taller';

// const variantsMap: Record<Variant, string> = {
//   venta: 'success',
//   pendiente: 'info',
//   vendido: 'warning',
//   taller: 'danger'
// };
// interface ITransactionProps {
//   status: Variant;
//   label: string;
// }

// console.log('variantsMap.venta', variantsMap.venta);

// {variantsMap['venta']}
// { status, label }: ITransactionProps

const Dashboard = () => {
  const AppCtx = useContext(AppContext);

  const navegar = useNavigate();

  const summaryRef: any = useRef(null);

  // let mapTiposCartas = new Map<string, string>();
  // mapTiposCartas.set('venta', 'success');
  // mapTiposCartas.set('pendiente', 'info');
  // mapTiposCartas.set('vendido', 'warning');
  // mapTiposCartas.set('taller', 'danger');

  // const [Data, SetData] = useState<any[]>([]);
  const [DataCarts, SetDataCarts] = useState<any>([]);
  const [DataCharts, SetDataCharts] = useState<any>([]);
  const [DataChartsLocalV, SetDataChartsLocalV] = useState<any>({});
  const [DataChartsLocalI, SetDataChartsLocalI] = useState<any>({});
  const [profileId, SetProfileId] = useState<string>(
    AuthService.getProfileId() || ''
  );

  const GetAllData = (ctxProId: string) => {
    const url = Config.gatDomainName()
      .concat('/vehiculos/dashboard/')
      .concat(ctxProId);
    axios
      .get(url)
      .then((response: any) => {
        const result = response.data;
        const {status, message, data} = result;
        if (status !== 'SUCCESS') {
          mlCL('message:', message);
        } else {
          // ||
          // data.charts.ventas.values.length === 0 ||
          // data.charts.inventario.values.length === 0
          if (data.carts.length === 0) {
            // AppCtx.setSearchParams({showdbb: 'true'});
            navegar('introduccion');
          }
          mlCL('data.carts:', data.carts);
          mlCL('data.charts:', data.charts);
          SetDataCarts(data.carts);
          SetDataCharts(data.charts);
        }
      })
      .catch((err: any) => {
        mlCL('err:', err);
      });
  };

  useEffect(() => {
    SetProfileId(AuthService.getProfileId() || '');
  }, []);

  useEffect(() => {
    if (profileId === undefined || profileId === '') {
      navegar('login');
    } else {
      GetAllData(profileId);
    }
  }, [profileId]);

  useEffect(() => {
    if (DataCharts?.ventas?.labels?.length > 0) {
      DataChartsHolderV.labels = DataCharts.ventas.labels;
      DataChartsHolderV.datasets[0].data = DataCharts.ventas.values;
      DataChartsHolderV.hasData = true;
      SetDataChartsLocalV(DataChartsHolderV);
    }

    if (DataCharts?.inventario?.labels?.length > 0) {
      DataChartsHolderI.labels = DataCharts.inventario.labels;
      DataChartsHolderI.datasets[0].data = DataCharts.inventario.values;
      DataChartsHolderI.hasData = true;
      SetDataChartsLocalI(DataChartsHolderI);
    }

    if (DataCarts.length > 0) {
      mlCL('DataCarts:', DataCarts);
    }
  }, [DataCarts, DataCharts]);

  return (
    <div className="container-fluid">
      {/* =========================================================== */}
      <ContentHeader title="Panel de Control de Ventas" />
      {/* Small Box (Stat card) */}
      {/* <h5 className="mb-2 mt-4">Small Box</h5> */}
      {DataCarts?.length > 0 ? (
        <div className="row">
          {DataCarts.map((item: any) => (
            <div
              key={'vehCD'.concat(item.descripcion_corta)}
              className="col-lg-3 col-12"
            >
              <SmallBox
                key={'vehCSB'.concat(item.descripcion_corta)}
                type={item.tipo}
                icon="ion-android-car"
                count={item.cantidad}
                amount={item.monto}
                title={item.descripcion_larga}
                navigateTo="/"
              />
            </div>
          ))}
        </div>
      ) : (
        <Loading show />
      )}
      {/* =========================================================== */}
      {/* =========================================================== */}
      <div className="row">
        <div className="col-lg-6 col-12 p-2">
          <Card className="text-center">
            <Card.Header as="h4">Montos por Categoría</Card.Header>
            <Card.Body className="p-5">
              {/* <Card.Title>Special title treatment</Card.Title> */}
              {DataChartsLocalV.hasData ? (
                <Doughnut
                  data={DataChartsLocalV}
                  options={pieOptions}
                  ref={summaryRef}
                />
              ) : (
                <Loading show />
              )}
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
            {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
          </Card>
        </div>
        <div className="col-lg-6 col-12">
          <Card className="text-center">
            <Card.Header as="h4">Inventario de Vehículos</Card.Header>
            <Card.Body className="p-5">
              {/* <Card.Title>Special title treatment</Card.Title> */}
              {DataChartsLocalI.hasData ? (
                <Pie
                  data={DataChartsLocalI}
                  options={pieOptions}
                  ref={summaryRef}
                />
              ) : (
                <Loading show />
              )}
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
          </Card>
        </div>
      </div>
      {/* =========================================================== */}
    </div>
  );
};

export default Dashboard;
