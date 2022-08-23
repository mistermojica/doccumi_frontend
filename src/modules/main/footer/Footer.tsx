import React from 'react';
import {useTranslation} from 'react-i18next';
import {DateTime} from 'luxon';
import {version} from '../../../../package.json';

const Footer = () => {
  const [t] = useTranslation();
  return (
    <footer className="main-footer">
      <strong>
        <span>
          <small>
            © {DateTime.now().toFormat('y')}
            <a
              href="https://omarmojica.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              &nbsp;Omar Mojica
            </a>
            &nbsp;|&nbsp;Solución de Gestión de Documentos
          </small>
        </span>
        <span>.</span>
      </strong>
      <div className="float-right d-none d-sm-inline-block">
        <small>
          <b>{t('footer.version')}</b>
          <span>&nbsp;{version}</span>
        </small>
      </div>
    </footer>
  );
};
export default Footer;
