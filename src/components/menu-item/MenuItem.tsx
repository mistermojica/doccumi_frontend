/* eslint-disable no-unused-vars */

import React, {useEffect, useState, useContext} from 'react';
import {NavLink, useNavigate, useLocation, Location} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {IMenuItem} from '@app/modules/main/menu-sidebar/MenuSidebar';
import {styled} from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Tooltip, {TooltipProps, tooltipClasses} from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AppContext from '@app/contexts/AppContext';

const HtmlTooltip = styled(({className, ...props}: TooltipProps) => (
  <Tooltip {...props} classes={{popper: className}} />
))(({theme}) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#dce9f7',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9'
  }
}));

const MenuItem = ({
  menuItem,
  profileData
}: {
  menuItem: IMenuItem;
  profileData: any;
}) => {
  const AppCtx = useContext(AppContext);
  const [t] = useTranslation();
  const [isMenuExtended, setIsMenuExtended] = useState(false);
  const [isExpandable, setIsExpandable] = useState(false);
  const [isMainActive, setIsMainActive] = useState(false);
  const [isOneOfChildrenActive, setIsOneOfChildrenActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuExtended(!isMenuExtended);
  };

  const handleMainMenuAction = () => {
    if (isExpandable) {
      toggleMenu();
      return;
    }
    navigate(menuItem.path ? menuItem.path : '/');
  };

  const calculateIsActive = (url: Location) => {
    setIsMainActive(false);
    setIsOneOfChildrenActive(false);
    if (isExpandable && menuItem && menuItem.children) {
      menuItem.children.forEach((item) => {
        if (item.path === url.pathname) {
          setIsOneOfChildrenActive(true);
          setIsMenuExtended(true);
        }
      });
    } else if (menuItem.path === url.pathname) {
      setIsMainActive(true);
    }
  };

  useEffect(() => {
    if (location) {
      calculateIsActive(location);
    }
  }, [location, isExpandable, menuItem]);

  useEffect(() => {
    if (!isMainActive && !isOneOfChildrenActive) {
      setIsMenuExtended(false);
    }
  }, [isMainActive, isOneOfChildrenActive]);

  useEffect(() => {
    setIsExpandable(
      Boolean(menuItem && menuItem.children && menuItem.children.length > 0)
    );
  }, [menuItem]);

  return (
    <li className={`nav-item${isMenuExtended ? ' menu-open' : ''}`}>
      <a
        className={`nav-link${
          isMainActive || isOneOfChildrenActive ? ' active' : ''
        }`}
        role="link"
        onClick={handleMainMenuAction}
        style={{cursor: 'pointer'}}
      >
        <i className="nav-icon fas fa-tachometer-alt" />
        {menuItem.name === 'menusidebar.label.entidades.gestionEntidades' ? (
          <small>Gestión {profileData.nombre_entidad_plural}</small>
        ) : menuItem.name === 'menusidebar.label.clientes.gestionClientes' ? (
          <small>Gestión {profileData.nombre_cliente_plural}</small>
        ) : (
          <small>{t(menuItem.name)}</small>
        )}
        {isExpandable ? <i className="right fas fa-angle-left" /> : null}
      </a>

      {isExpandable &&
        menuItem &&
        menuItem.children &&
        menuItem.children.map((item) => (
          <ul key={item.name} className="nav nav-treeview">
            <li className="nav-item">
              {item.name === 'menusidebar.label.clientes.agregarCliente' &&
              !AppCtx.StripeData.has_active_subscription &&
              AppCtx.ClientesData.length > 0 ? (
                <HtmlTooltip
                  placement="top"
                  title={
                    <React.Fragment>
                      <Typography color="inherit">
                        <small>
                          Para agregar más clientes debes activar un plan de
                          servicio.
                        </small>
                      </Typography>
                    </React.Fragment>
                  }
                >
                  <div className="nav-link">
                    {/* <NavLink className="nav-link" to={`${item.path}`}> */}
                    {/* <i className="far fa-circle nav-icon" /> */}
                    <LockOutlinedIcon />
                    {/* <small>{t(item.name)}</small> */}
                    <small>Agregar {profileData.nombre_entidad} +</small>
                    {/* </NavLink> */}
                  </div>
                </HtmlTooltip>
              ) : item.name === 'menusidebar.label.entidades.agregarEntidad' &&
                !AppCtx.StripeData.has_active_subscription &&
                AppCtx.EntidadesData.length > 0 ? (
                <HtmlTooltip
                  placement="top"
                  title={
                    <React.Fragment>
                      <Typography color="inherit">
                        <small>
                          Para agregar más entidades debes activar un plan de
                          servicio.
                        </small>
                      </Typography>
                    </React.Fragment>
                  }
                >
                  <div className="nav-link">
                    {/* <NavLink className="nav-link" to={`${item.path}`}> */}
                    {/* <i className="far fa-circle nav-icon" /> */}
                    <LockOutlinedIcon />
                    {/* <small>{t(item.name)}</small> */}
                    <small>Agregar {profileData.nombre_entidad} +</small>
                    {/* </NavLink> */}
                  </div>
                </HtmlTooltip>
              ) : (
                <NavLink className="nav-link" to={`${item.path}`}>
                  <i className="far fa-circle nav-icon" />
                  {item.name ===
                  'menusidebar.label.entidades.agregarEntidad' ? (
                    <small>Agregar {profileData.nombre_entidad} +</small>
                  ) : item.name ===
                    'menusidebar.label.clientes.agregarCliente' ? (
                    <small>Agregar {profileData.nombre_cliente} +</small>
                  ) : item.name ===
                    'menusidebar.label.entidades.mostrarEntidades' ? (
                    <small>Mostrar {profileData.nombre_entidad_plural}</small>
                  ) : item.name ===
                    'menusidebar.label.clientes.mostrarClientes' ? (
                    <small>Mostrar {profileData.nombre_cliente_plural}</small>
                  ) : (
                    <small>{t(item.name)}</small>
                  )}
                </NavLink>
              )}
            </li>
          </ul>
        ))}
    </li>
  );
};

export default MenuItem;
