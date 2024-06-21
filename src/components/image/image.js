import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ asset, itemProp='asset' }) => {

  const {_authorUrl, _dynamicUrl} = asset;
  const url = new URL(_authorUrl);

  const srcset = [
    `${url.origin + _dynamicUrl} 1900w`,
    `${url.origin + _dynamicUrl.replace('width=1900', 'width=1200')} 1200w`,
    `${url.origin + _dynamicUrl.replace('width=1900', 'width=900')} 900w`,
    `${url.origin + _dynamicUrl.replace('width=1900', 'width=')} 600w`
  ];

  const editorProps = {
    'data-aue-prop':itemProp,
    'data-aue-type':'media',
    'data-aue-model':'image',
    'data-aue-label':'Asset'
  };

  return (
    <picture>
      <img  {...editorProps} title={asset.title} alt={asset.description} src={`${_authorUrl}` }
        srcSet={srcset.join(',')}
      />
    </picture>
  );
};

export default Image;

Image.propTypes = {
  asset: PropTypes.object,
  itemProp: PropTypes.string
};