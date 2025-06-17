import React from 'react';
import PropTypes from 'prop-types';
import Image from '../image/image';
import { mapJsonRichText } from '../../utils/renderRichText';

import './cardslist.css';

const CardsList = ({ content }) => {
   const editorProps = {
    'data-aue-resource': `urn:aemconnection:${content._path}/jcr:content/data/${content._variation}`,
    'data-aue-type': 'container',
    'data-aue-label': content?.headline?.plaintext,
    'data-aue-behavior': 'component',
    'data-aue-model': content?._model?._path,
    'data-aue-filter': 'image-list',
    'data-aue-prop': 'card'
  };

  return (
    <React.Fragment>
      {content && content.headline && content.headline.html && 
        <span className='headline' dangerouslySetInnerHTML={{ __html: content.headline.html }} />
      }
      <div className='cards' {...editorProps}>
        {content && content.card && content.card.map((item) => (
          <Card key={item._path} content={item} />
        ))}
      </div>
    </React.Fragment >
  );
};

const Card = ({ content }) => {

  const editorProps = {
    'data-aue-resource': `urn:aemconnection:${content._path}/jcr:content/data/${content._variation}`,
    'data-aue-type': 'reference',
    'data-aue-label': content._metadata ? parseName(content) : 'Card',
    'data-aue-model': content?._model?._path,
    'data-aue-behavior': 'component'
  };

  return (
    <div className='card' key={content._path} {...editorProps}>
      {content && content.primaryImage && <Image asset={content.primaryImage} />}
      <h3 data-aue-prop='title' data-aue-type='text' data-aue-label='Title'>{content.title}</h3>
      <div data-aue-prop='description' data-aue-type='text' data-aue-label='Description'>{mapJsonRichText(content.description.json)}</div>
    </div>
  );
};

Card.propTypes = {
  content: PropTypes.array
};

const parseName = ({ _metadata }) => {
  let cardName = '';
  _metadata.stringMetadata.map((item) => {
    if (item.name === 'title') {
      cardName = item.value;
    }
  });
  return cardName;
};

CardsList.propTypes = {
  content: PropTypes.object
};

export default CardsList;
