/* eslint-disable no-unused-vars */

import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {DateTime} from 'luxon';
import {useTranslation} from 'react-i18next';
import {logoutUser} from '@store/reducers/auth';
import {Dropdown} from '@components';
import styled from 'styled-components';

const StyledUserImage = styled.img`
  height: 1.6rem !important;
  width: 1.6rem !important;
  margin-right: 0 !important;
  margin-left: -8px !important;
`;

const UserDropdown = () => {
  const navigate = useNavigate();
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.currentUser);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logOut = (event: any) => {
    event.preventDefault();
    setDropdownOpen(false);
    dispatch(logoutUser());
    navigate('/login');
  };

  const navigateToProfile = (event: any) => {
    event.preventDefault();
    setDropdownOpen(false);
    navigate('/profile');
  };

  return (
    <Dropdown
      isOpen={dropdownOpen}
      onChange={(open: boolean) => setDropdownOpen(open)}
      className="user-menu"
      menuContainerTag="ul"
      buttonTemplate={
        <StyledUserImage
          src={user.profile.foto || '/img/default-profile.png'}
          className="user-image img-circle elevation-2"
          alt="User"
        />
      }
      menuTemplate={
        <>
          <li className="user-header bg-primary">
            <img
              src={user.profile.foto || '/img/default-profile.png'}
              className="img-circle elevation-2"
              alt="User"
            />
            <p>
              {user.profile.nombre}
              <small>
                <span>{t('header.label.memberSince')} </span>
                <span>
                  {DateTime.fromISO(user.profile.fecha_creacion).toFormat(
                    'dd LLL yyyy'
                  )}
                </span>
              </small>
            </p>
          </li>
          {/* <li className="user-body">
            <div className="row">
              <div className="col-4 text-center">
                <Link to="/">{t('header.user.profile.followers')}</Link>
              </div>
              <div className="col-4 text-center">
                <Link to="/">{t('header.user.profile.ales')}</Link>
              </div>
              <div className="col-4 text-center">
                <Link to="/">{t('header.user.profile.friends')}</Link>
              </div>
            </div>
          </li> */}
          <li className="user-footer">
            <button
              type="button"
              className="btn btn-default btn-flat"
              onClick={navigateToProfile}
            >
              {t('header.user.profile')}
            </button>
            <button
              type="button"
              className="btn btn-default btn-flat float-right"
              onClick={logOut}
            >
              {t('login.button.signOut')}
            </button>
          </li>
        </>
      }
    />
  );
};

export default UserDropdown;
