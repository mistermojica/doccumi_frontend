/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useSearchParams, useNavigate} from 'react-router-dom';
import {ContentHeader, Button} from '@components';
import {useDispatch, useSelector} from 'react-redux';
import UploadImage from '@app/components/photo/addImage/UploadImage';
import ActivityTab from '@app/pages/profile/ActivityTab';
import TimelineTab from '@app/pages/profile/TimelineTab';
import ProfileTab from '@app/pages/profile/ProfileTab';
import SettingsTab from '@app/pages/profile/SettingsTab';
import SubscriptionTab from '@app/pages/profile/SubscriptionTab';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.currentUser);

  const [searchParams, setSearchParams] = useSearchParams();

  const [userClone, setUserClone] = useState({...user});
  const [foto, setFoto] = useState(user.profile.foto);
  const [logo, setLogo] = useState(user.profile.logo);

  const [activeTab, setActiveTab] = useState('PROFILE');
  const [t] = useTranslation();

  const toggle = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const onChange = (img: any) => {
    const uc = {...user};
    // console.log({img});
    if (img.id === 'addImageFoto') {
      uc.foto = img.url;
      setFoto(img.url);
    }
    if (img.id === 'addImageLogo') {
      uc.logo = img.url;
      setLogo(img.url);
    }
    setUserClone(uc);
  };

  useEffect(() => {
    console.log('activetab:', searchParams.get('activetab'));
    toggle(searchParams.get('activetab') || '');
  }, []);

  return (
    <>
      <ContentHeader title="Profile" />
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <div className="card card-primary card-outline">
                <div className="card-body box-profile">
                  <div className="text-center">
                    <strong>Logo</strong>
                    <UploadImage
                      id="addImageLogo"
                      key="imgLogo"
                      foto={user.profile.logo}
                      onChange={onChange}
                    />
                  </div>
                  {/* <h3 className="profile-username text-center">
                    {user.profile.nombre}
                  </h3> */}
                  {/* <p className="text-muted text-center">Software Engineer</p> */}
                  {/* <ul className="list-group list-group-unbordered mb-3">
                    <li className="list-group-item">
                      <b>{t('header.user.profile.followers')}</b>

                      <span className="float-right">1,322</span>
                    </li>
                    <li className="list-group-item">
                      <b>{t('views.user.profile.following')}</b>
                      <span className="float-right">543</span>
                    </li>
                    <li className="list-group-item">
                      <b>{t('header.user.profile.friends')}</b>
                      <span className="float-right">13,287</span>
                    </li>
                  </ul> */}
                  {/* <Button block> */}
                  {/* @ts-ignore */}
                  {/* {t('main.label.follow')}
                  </Button> */}
                </div>
                {/* /.card-body */}
              </div>
              <div className="card card-primary card-outline">
                <div className="card-body box-profile">
                  <div className="text-center">
                    <strong>Foto</strong>
                    <UploadImage
                      id="addImageFoto"
                      key="imgFoto"
                      foto={user.profile.foto}
                      onChange={onChange}
                    />
                  </div>
                  {/* <h3 className="profile-username text-center">
                    {user.profile.nombre}
                  </h3> */}
                  {/* <p className="text-muted text-center">Software Engineer</p> */}
                  {/* <ul className="list-group list-group-unbordered mb-3">
                    <li className="list-group-item">
                      <b>{t('header.user.profile.followers')}</b>

                      <span className="float-right">1,322</span>
                    </li>
                    <li className="list-group-item">
                      <b>{t('views.user.profile.following')}</b>
                      <span className="float-right">543</span>
                    </li>
                    <li className="list-group-item">
                      <b>{t('header.user.profile.friends')}</b>
                      <span className="float-right">13,287</span>
                    </li>
                  </ul> */}
                  {/* <Button block> */}
                  {/* @ts-ignore */}
                  {/* {t('main.label.follow')}
                  </Button> */}
                </div>
                {/* /.card-body */}
              </div>
              {/* <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">{t('main.label.aboutMe')}</h3>
                </div>
                <div className="card-body">
                  <strong>
                    <i className="fas fa-book mr-1" />
                    {t('main.label.education')}
                  </strong>
                  <p className="text-muted">
                    B.S. in Computer Science from the University of Tennessee at
                    Knoxville
                  </p>
                  <hr />
                  <strong>
                    <i className="fas fa-map-marker-alt mr-1" />
                    {t('main.label.location')}
                  </strong>
                  <p className="text-muted">Malibu, California</p>
                  <hr />
                  <strong>
                    <i className="fas fa-pencil-alt mr-1" />
                    {t('main.label.skills')}
                  </strong>
                  <p className="text-muted">
                    <span className="tag tag-danger">UI Design</span>
                    <span className="tag tag-success">Coding</span>
                    <span className="tag tag-info">Javascript</span>
                    <span className="tag tag-warning">PHP</span>
                    <span className="tag tag-primary">Node.js</span>
                  </p>
                  <hr />
                  <strong>
                    <i className="far fa-file-alt mr-1" />
                    {t('main.label.notes')}
                  </strong>
                  <p className="text-muted">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam fermentum enim neque.
                  </p>
                </div>
              </div> */}
            </div>
            <div className="col-md-9">
              <div className="card">
                <div className="card-header p-2">
                  <ul className="nav nav-pills">
                    {/* <li className="nav-item">
                      <button
                        type="button"
                        className={`nav-link ${
                          activeTab === 'ACTIVITY' ? 'active' : ''
                        }`}
                        onClick={() => toggle('ACTIVITY')}
                      >
                        {t('main.label.activity')}
                      </button>
                    </li> */}
                    {/* <li className="nav-item">
                      <button
                        type="button"
                        className={`nav-link ${
                          activeTab === 'TIMELINE' ? 'active' : ''
                        }`}
                        onClick={() => toggle('TIMELINE')}
                      >
                        {t('main.label.timeline')}
                      </button>
                    </li> */}
                    <li className="nav-item">
                      <button
                        type="button"
                        className={`nav-link ${
                          activeTab === 'PROFILE' ? 'active' : ''
                        }`}
                        onClick={() => toggle('PROFILE')}
                      >
                        {t('main.label.profile')}
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        type="button"
                        className={`nav-link ${
                          activeTab === 'SETTINGS' ? 'active' : ''
                        }`}
                        onClick={() => toggle('SETTINGS')}
                      >
                        {t('main.label.credentials')}
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        type="button"
                        className={`nav-link ${
                          activeTab === 'SUBSCRIPTION' ? 'active' : ''
                        }`}
                        onClick={() => toggle('SUBSCRIPTION')}
                      >
                        {t('main.label.subscription')}
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <div className="tab-content">
                    <ProfileTab
                      user={userClone}
                      isActive={activeTab === 'PROFILE'}
                    />
                    <SubscriptionTab
                      user={userClone}
                      isActive={activeTab === 'SUBSCRIPTION'}
                    />
                    <SettingsTab
                      user={userClone}
                      isActive={activeTab === 'SETTINGS'}
                      foto={foto}
                      logo={logo}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
