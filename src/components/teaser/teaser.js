
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Video from '../video';

import './teaser.css';

const Teaser = ({ content }) => {
   
  return (
    <React.Fragment>
      <section className={'teaser ' + content.style} data-model={content.title} data-fragment={content._path}>

        <div className='container'>
          {content.asset && Object.prototype.hasOwnProperty.call(content.asset, 'format') &&
            (<Video content={content.asset} context={context} />)}

          <div className='content-block'>
            {content.title && content.style === 'hero' && (
              <h1>{content.title}</h1>
            )}

            {content.title && content.style === 'featured' && (
              <h2>{content.title}</h2>
            )}

            <span className='seperator'></span>

            {content.preTitle && content.style === 'hero' && (
              <h2>{content.preTitle}</h2>
            )}

            {content.preTitle && content.style === 'featured' && (
              <h5>{content.preTitle}</h5>
            )}


            {content.description && content.style === 'featured' && (
              <p>{content.description.plaintext}</p>
            )}

          </div>
        </div>

        <div className='arrow'></div>

      </section>

    </React.Fragment>
  );
};

Teaser.propTypes = {
  content: PropTypes.object
};

export default Teaser;
