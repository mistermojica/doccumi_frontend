import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {MenuItem} from '@components';

export interface IMenuItem {
  name: string;
  path?: string;
  children?: Array<IMenuItem>;
}

export const MENU: IMenuItem[] = [
  {
    name: 'menusidebar.label.dashboard',
    path: '/'
  },
  {
    name: 'menusidebar.label.utilitarios.label',
    children: [
      {
        name: 'menusidebar.label.utilitarios.calculadoraprestamo.calculadoraPrestamo',
        path: '/calculadora-prestamo'
      }
      // ,
      // {
      //   name: 'menusidebar.label.configuraciones.tipos.gestionarTipos',
      //   path: '/gestionar-tipos'
      // }
    ]
  },
  {
    name: 'menusidebar.label.vehiculos.gestionVehiculos',
    children: [
      {
        name: 'menusidebar.label.vehiculos.agregarVehiculo',
        path: '/agregar-vehiculo'
      },
      {
        name: 'menusidebar.label.vehiculos.mostrarVehiculos',
        path: '/mostrar-vehiculos'
      }
      // ,
      // {
      //   name: 'menusidebar.label.vehiculos.mostrarGaleria',
      //   path: '/mostrar-galeria'
      // },
      // {
      //   name: 'menusidebar.label.vehiculos.inventarioVehiculos',
      //   path: '/inventario-vehiculos'
      // },
      // {
      //   name: 'menusidebar.label.vehiculos.enVenta',
      //   path: '/en-venta'
      // },
      // {
      //   name: 'menusidebar.label.vehiculos.pendientes',
      //   path: '/pendientes'
      // },
      // {
      //   name: 'menusidebar.label.vehiculos.vendidos',
      //   path: '/vendidos'
      // },
      // {
      //   name: 'menusidebar.label.vehiculos.enTaller',
      //   path: '/en-taller'
      // },
      // {
      //   name: 'menusidebar.label.vehiculos.configuracion',
      //   path: '/gvconfiguracion'
      // }
    ]
  },
  {
    name: 'menusidebar.label.entidades.gestionEntidades',
    children: [
      {
        name: 'menusidebar.label.entidades.agregarEntidad',
        path: '/agregar-entidad'
      },
      {
        name: 'menusidebar.label.entidades.mostrarEntidades',
        path: '/mostrar-entidades'
      }
      // ,
      // {
      //   name: 'menusidebar.label.entidades.mostrarGaleria',
      //   path: '/mostrar-galeria'
      // },
      // {
      //   name: 'menusidebar.label.entidades.inventarioEntidades',
      //   path: '/inventario-entidades'
      // },
      // {
      //   name: 'menusidebar.label.entidades.enVenta',
      //   path: '/en-venta'
      // },
      // {
      //   name: 'menusidebar.label.entidades.pendientes',
      //   path: '/pendientes'
      // },
      // {
      //   name: 'menusidebar.label.entidades.vendidos',
      //   path: '/vendidos'
      // },
      // {
      //   name: 'menusidebar.label.entidades.enTaller',
      //   path: '/en-taller'
      // },
      // {
      //   name: 'menusidebar.label.entidades.configuracion',
      //   path: '/gvconfiguracion'
      // }
    ]
  },
  {
    name: 'menusidebar.label.clientes.gestionClientes',
    children: [
      {
        name: 'menusidebar.label.clientes.agregarCliente',
        path: '/agregar-cliente'
      },
      {
        name: 'menusidebar.label.clientes.mostrarClientes',
        path: '/mostrar-clientes'
      }
      // ,
      // {
      //   name: 'menusidebar.label.clientes.configuracion',
      //   path: '/gcconfiguracion'
      // }
    ]
  },
  {
    name: 'menusidebar.label.documentos.gestionDocumentos',
    children: [
      {
        name: 'menusidebar.label.documentos.agregarPlantilla',
        path: '/agregar-plantilla'
      },
      {
        name: 'menusidebar.label.documentos.mostrarPlantillas',
        path: '/mostrar-plantillas'
      },
      {
        name: 'menusidebar.label.documentos.asignarPlantillas',
        path: '/asignar-plantillas'
      },
      {
        name: 'menusidebar.label.documentos.imprimirDocumentos',
        path: '/imprimir-documentos'
      }
      // ,
      // {
      //   name: 'menusidebar.label.documentos.contratos',
      //   path: '/contratos'
      // },
      // {
      //   name: 'menusidebar.label.documentos.actosVentas',
      //   path: '/actos-ventas'
      // },
      // {
      //   name: 'menusidebar.label.documentos.pagares',
      //   path: '/pagares'
      // },
      // {
      //   name: 'menusidebar.label.documentos.matriculas',
      //   path: '/matriculas'
      // },
      // {
      //   name: 'menusidebar.label.documentos.hojaDatosCondiciones',
      //   path: '/hoja-datos-condiciones'
      // },
      // {
      //   name: 'menusidebar.label.documentos.cedulas',
      //   path: '/cedulas'
      // },
      // {
      //   name: 'menusidebar.label.documentos.conduceSalidaEntrada',
      //   path: '/conduce-salida-entrada'
      // },
      // {
      //   name: 'menusidebar.label.documentos.carfax',
      //   path: '/carfax'
      // },
      // {
      //   name: 'menusidebar.label.documentos.configuracion',
      //   path: '/gdconfiguracion'
      // }
    ]
  },
  {
    name: 'menusidebar.label.configuraciones.label',
    children: [
      // {
      //   name: 'menusidebar.label.configuraciones.campos.mostrarCampos',
      //   path: '/agregar-campos'
      // },
      {
        name: 'menusidebar.label.configuraciones.campos.gestionarCampos',
        path: '/gestionar-campos'
      },
      {
        name: 'menusidebar.label.configuraciones.tipos.gestionarTipos',
        path: '/gestionar-tipos'
      },
      // {
      //   name: 'menusidebar.label.configuraciones.tipos.gestionarSoporte',
      //   path: '/gestionar-soportes'
      // },
      {
        name: 'menusidebar.label.configuraciones.perfil.credenciales',
        path: '/profile'
      }
      // ,
      // {
      //   name: 'menusidebar.label.clientes.configuracion',
      //   path: '/gcconfiguracion'
      // }
    ]
  }
];

const MenuSidebar = () => {
  const user = useSelector((state: any) => state.auth.currentUser);
  const sidebarSkin = useSelector((state: any) => state.ui.sidebarSkin);
  const menuItemFlat = useSelector((state: any) => state.ui.menuItemFlat);
  const menuChildIndent = useSelector((state: any) => state.ui.menuChildIndent);

  return (
    <aside className={`main-sidebar elevation-4 ${sidebarSkin}`}>
      <Link to="/" className="brand-link">
        <img
          src={user.profile.logo || '/img/logo.png'}
          alt="Empresa Logo"
          className="brand-image img-circle elevation-1"
          style={{opacity: '.8'}}
        />
        <span className="brand-text font-weight-light">
          {user.profile.nombre_empresa}
        </span>
      </Link>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src={user.profile.foto || '/img/default-profile.png'}
              className="img-circle elevation-2"
              alt="User"
            />
          </div>
          <div className="info">
            <Link to="/profile" className="d-block">
              {user.profile.nombre}
            </Link>
          </div>
        </div>
        <nav className="mt-2" style={{overflowY: 'hidden'}}>
          <ul
            className={`nav nav-pills nav-sidebar flex-column${
              menuItemFlat ? ' nav-flat' : ''
            }${menuChildIndent ? ' nav-child-indent' : ''}`}
            role="menu"
          >
            {MENU.map((menuItem: IMenuItem) => (
              <MenuItem key={menuItem.name} menuItem={menuItem} />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default MenuSidebar;
