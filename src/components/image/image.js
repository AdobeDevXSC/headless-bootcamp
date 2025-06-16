import React from 'react';
import PropTypes from 'prop-types';
import BrokenImage from '../../assets/broken-image.png'

const Image = ({ asset, itemProp='asset' }) => {

  if( !asset || !asset._authorUrl || !asset._dynamicUrl ) {
    return <img src={BrokenImage} alt="Broken Image" />;
  }
  
  const {_authorUrl, _dynamicUrl} = asset;
  const url = new URL(_authorUrl);

  const srcset = [
    `${url.origin + _dynamicUrl} 1900w`,
    `${url.origin + _dynamicUrl.replace('width=1900', 'width=1200')} 1200w`,
    `${url.origin + _dynamicUrl.replace('width=1900', 'width=900')} 900w`,
    `${url.origin + _dynamicUrl.replace('width=1900', 'width=')} 600w`
  ];

  return (
    <picture>
      <img itemProp={itemProp} itemType="media" data-editor-itemlabel='Asset' src={`${_authorUrl}` }
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
