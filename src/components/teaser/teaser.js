
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { mapJsonRichText } from '../../utils/renderRichText';
import Image from '../image/image';
import { useRef } from 'react';
import './teaser.css';


const Teaser = ({ content }) => {
  const [style, setStyle] = useState('');
  const divRef = useRef(document.body); // Ref for HTML Element
  
  useEffect(() => {
    setStyle(content.style);
  },[content.style]);

  divRef.current.addEventListener('aue:content-patch', (event) => {
    setStyle(event.detail.patch.value);
    event.stopPropagation();
  });

  const editorProps = {
    'data-aue-resource': `urn:aemconnection:${content._path}/jcr:content/data/${content._variation}`,
    'data-aue-type': 'reference',
    'data-aue-label': 'Hero',
    'data-aue-filter': 'cf'
  };

  const Hero = ({ content }) => {
    return (
      <React.Fragment>
        <h1 data-aue-prop='title' data-aue-type='text' data-aue-label='Title'>{content.title}</h1>
        <span className='seperator'></span>
        {content.preTitle && (
          <h2 data-aue-prop='preTitle' data-aue-type='text' data-aue-label='Pre-Title'>{content.preTitle}</h2>
        )}
        {content.description && (
          <span data-aue-prop='description' data-aue-type='richtext' data-aue-label='Description'>{mapJsonRichText(content.description.json)}</span>
        )}
      </React.Fragment>
    );
  };

  const Featured = ({ content }) => {
    return (
      <React.Fragment>
        <h2 data-aue-prop='title' data-aue-type='text' data-aue-label='Title'>{content.title}</h2>
        <h5 data-aue-prop='preTitle' data-aue-type='text' data-aue-label='Pre-Title'>{content.preTitle}</h5>
        <p data-aue-prop='description' data-aue-type='richtext' data-aue-label='Description'>{mapJsonRichText(content.description.json)}</p>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <section className={'teaser ' + style} {...editorProps} id='hero'>
        <div className='container'>

          {content.asset.__typename === 'ImageRef' &&
            (<Image asset={content.asset} />)}

          <div className='content-block'>
            {content && style === 'hero' && (<Hero content={content} />)}
            {content && style === 'featured' && (<Featured content={content} />)}
          </div>
        </div>
      </section>

    </React.Fragment>
  );
};

Teaser.propTypes = {
  content: PropTypes.object
};

export default Teaser;
