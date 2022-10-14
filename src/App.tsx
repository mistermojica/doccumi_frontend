/* eslint-disable no-unused-vars */

import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from '@modules/main/Main';
import Login from '@modules/login/Login';
import Register from '@modules/register/Register';
import ForgetPassword from '@modules/forgot-password/ForgotPassword';
import RecoverPassword from '@modules/recover-password/RecoverPassword';
import {useWindowSize} from '@app/hooks/useWindowSize';
import {calculateWindowSize} from '@app/utils/helpers';
import {useDispatch, useSelector} from 'react-redux';
import {setWindowSize} from '@app/store/reducers/ui';

import AppContext from '@app/contexts/AppContext';

import Introduccion from '@pages/Introduccion';
import PieChart from '@app/pages/PieChart';
import Dashboard from '@pages/Dashboard';
import Profile from '@pages/profile/Profile';
import AgregarVehiculo from '@pages/AgregarVehiculo';
import AgregarCliente from '@pages/AgregarCliente';
import EditarCliente from '@pages/EditarCliente';
import MostrarClientes from '@pages/MostrarClientes';
import MostrarVehiculos from '@pages/MostrarVehiculos';
import ImprimirDocumentos from '@app/pages/ImprimirDocumentos';
import AgregarPlantilla from '@app/pages/AgregarPlantilla';
import MostrarPlantillas from '@app/pages/MostrarPlantillas';
import AsignarPlantillas from '@app/pages/AsignarPlantillas';
import AgregarCampo from '@app/pages/AgregarCampo';
import MostrarCampos from '@pages/MostrarCampos';
import AgregarTipo from '@pages/AgregarTipo';
import MostrarTipos from '@pages/MostrarTipos';
import AgregarSoporte from '@app/pages/AgregarSoporte';
import MostrarSoportes from '@app/pages/MostrarSoportes';
import Blank from '@pages/Blank';
import CalculadoraPrestamo from '@pages/CalculadoraPrestamo';
import InventarioVehiculos from '@pages/InventarioVehiculos';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

import * as Config from '@app/utils/config';
import * as AuthService from '@app/services/auth';

import axios from 'axios';

const App = () => {
  const [FileUploadData, setFileUploadData] = useState<any>(new Map());
  const [SubmitedUploadFilesData, setSubmitedUploadFilesData] = useState(false);
  const [SubmitedFormData, setSubmitedFormData] = useState<any>({});
  const [Navigate, setNavigate] = useState<any>({});
  const [ClientesData, SetClientesData] = useState<any>([]);
  const [InventariosData, SetInventariosData] = useState<any>([]);

  const [StripeData, setStripeData] = useState<any>({
    customer: {},
    subscriptions: [],
    subscriptionsi: [],
    current_subscription: {},
    prices: [],
    current_price: {},
    default_payment_method: {},
    has_active_subscription: false
  });
  const [UrlBase] = useState(Config.gatDomainName().concat('/subscripciones/'));

  // const [searchParams, setSearchParams] = useSearchParams();

  const windowSize = useWindowSize();
  const screenSize = useSelector((state: any) => state.ui.screenSize);
  const dispatch = useDispatch();

  const loadStripeInit = () => {
    console.log('loadStripeInit');
    const promise = new Promise(function (resolve, reject) {
      const fetchData = async () => {
        const {customer, subscriptions} = await fetch(
          UrlBase.concat('load-stripe-init'),
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              customerId: AuthService.getProfileStripeId(),
              statusCode: 'active'
            })
          }
        ).then((r) => r.json());

        const stripeData = {...StripeData};
        stripeData.customer = customer;
        stripeData.default_payment_method =
          customer?.invoice_settings?.default_payment_method;
        stripeData.subscriptionsi = subscriptions.data.sort(compareStatus);

        stripeData.has_active_subscription = hasSubscription(stripeData);

        setStripeData(stripeData);

        resolve(true);
      };

      fetchData();
    });

    return promise;
  };

  const hasSubscription = (stripeData: any) => {
    const result =
      stripeData.subscriptionsi.length > 0 &&
      stripeData.subscriptionsi.filter(
        (doc: any) => doc.status === 'active'
      )[0] !== undefined;
    return result;
  };

  const loadInitData = () => {
    GetAllData('clientes');
    GetAllData('vehiculos');
  };

  const userSettings = {
    FileUploadData,
    SubmitedUploadFilesData,
    SubmitedFormData,
    Navigate,
    StripeData,
    ClientesData,
    InventariosData,
    setFileUploadData,
    setSubmitedUploadFilesData,
    setSubmitedFormData,
    setNavigate,
    setStripeData,
    SetClientesData,
    SetInventariosData,
    loadStripeInit,
    loadInitData
  };

  const compareStatus = (a: any, b: any) => {
    console.log(a.status);
    if (a.status < b.status) {
      return -1;
    }
    if (a.status > b.status) {
      return 1;
    }
    return 0;
  };

  const GetAllData = (modelo: string) => {
    const url = Config.gatDomainName()
      .concat('/')
      .concat(modelo)
      .concat('/listapordueno/')
      .concat(AuthService.getProfileId() || '');
    axios
      .get(url)
      .then((response: any) => {
        const result = response.data;
        const {status, message, data} = result;
        if (status !== 'SUCCESS') {
          console.log('message:', message);
        } else {
          if (modelo === 'vehiculos') {
            SetInventariosData(data);
          } else if (modelo === 'clientes') {
            SetClientesData(data);
          }
        }
      })
      .catch((err: any) => {
        console.log('err:', err);
      });
  };

  useEffect(() => {
    loadStripeInit();
    loadInitData();
  }, []);

  useEffect(() => {
    console.log({StripeData});
  }, [StripeData]);

  useEffect(() => {
    const size = calculateWindowSize(windowSize.width);
    if (screenSize !== size) {
      dispatch(setWindowSize(size));
    }
  }, [windowSize]);

  return (
    <AppContext.Provider value={userSettings}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/register" element={<PublicRoute />}>
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/forgot-password" element={<PublicRoute />}>
            <Route path="/forgot-password" element={<ForgetPassword />} />
          </Route>
          <Route path="/recover-password" element={<PublicRoute />}>
            <Route path="/recover-password" element={<RecoverPassword />} />
          </Route>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Main />}>
              {/* <Route path="/sub-menu-2" element={<Blank />} /> */}
              {/* <Route path="/sub-menu-1" element={<SubMenu />} /> */}
              <Route path="/blank" element={<Blank />} />
              <Route path="/introduccion" element={<Introduccion />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/agregar-vehiculo" element={<AgregarVehiculo />} />
              <Route path="/agregar-cliente" element={<AgregarCliente />} />
              <Route path="/editar-cliente" element={<EditarCliente />} />
              <Route path="/mostrar-clientes" element={<MostrarClientes />} />
              <Route path="/mostrar-vehiculos" element={<MostrarVehiculos />} />
              <Route path="/agregar-plantilla" element={<AgregarPlantilla />} />
              <Route path="/agregar-campos" element={<AgregarCampo />} />
              <Route path="/gestionar-campos" element={<MostrarCampos />} />
              <Route path="/agregar-tipos" element={<AgregarTipo />} />
              <Route path="/gestionar-tipos" element={<MostrarTipos />} />
              <Route path="/agregar-soportes" element={<AgregarSoporte />} />
              <Route path="/gestionar-soportes" element={<MostrarSoportes />} />
              <Route
                path="/mostrar-plantillas"
                element={<MostrarPlantillas />}
              />
              <Route
                path="/imprimir-documentos"
                element={<ImprimirDocumentos />}
              />
              <Route
                path="/asignar-plantillas"
                element={<AsignarPlantillas />}
              />
              <Route
                path="/inventario-vehiculos"
                element={<InventarioVehiculos />}
              />
              <Route path="/piechart" element={<PieChart />} />
              <Route
                path="/calculadora-prestamo"
                element={<CalculadoraPrestamo />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
