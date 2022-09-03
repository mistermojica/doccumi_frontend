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

// @ts-ignore
import AppContext from '@app/contexts/AppContext';

import Introduccion from '@pages/Introduccion';
import PieChart from '@app/pages/PieChart';
import Dashboard from '@pages/Dashboard';
import Profile from '@pages/profile/Profile';
import AgregarVehiculo from '@pages/AgregarVehiculo';
import AgregarCliente from '@pages/AgregarCliente';
import EditarCliente from '@pages/EditarCliente';
// @ts-ignore
import MostrarClientes from '@pages/MostrarClientes';
// @ts-ignore
import MostrarVehiculos from '@pages/MostrarVehiculos';
// @ts-ignore
import ImprimirDocumentos from '@app/pages/ImprimirDocumentos';
import AgregarPlantilla from '@app/pages/AgregarPlantilla';
// @ts-ignore
import MostrarPlantillas from '@app/pages/MostrarPlantillas';
// @ts-ignore
import AsignarPlantillas from '@app/pages/AsignarPlantillas';
import AgregarCampos from '@pages/AgregarCampos';
// @ts-ignore
import MostrarCampos from '@pages/MostrarCampos';
import AgregarTipos from '@pages/AgregarTipos';
// @ts-ignore
import MostrarTipos from '@pages/MostrarTipos';
import Blank from '@pages/Blank';
import CalculadoraPrestamo from '@pages/CalculadoraPrestamo';
// @ts-ignore
import InventarioVehiculos from '@pages/InventarioVehiculos';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

const App = () => {
  const [FileUploadData, setFileUploadData] = useState<any>(new Map());
  const [SubmitedUploadFilesData, setSubmitedUploadFilesData] = useState(false);
  const [SubmitedFormData, setSubmitedFormData] = useState<any>({});
  // const [searchParams, setSearchParams] = useSearchParams();

  const windowSize = useWindowSize();
  const screenSize = useSelector((state: any) => state.ui.screenSize);
  const dispatch = useDispatch();

  const userSettings = {
    FileUploadData,
    SubmitedUploadFilesData,
    SubmitedFormData,
    // searchParams,
    setFileUploadData,
    setSubmitedUploadFilesData,
    setSubmitedFormData
    // setSearchParams
  };

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
              <Route path="/agregar-campos" element={<AgregarCampos />} />
              <Route path="/gestionar-campos" element={<MostrarCampos />} />
              <Route path="/agregar-tipos" element={<AgregarTipos />} />
              <Route path="/gestionar-tipos" element={<MostrarTipos />} />
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
