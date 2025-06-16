import React from 'react';
import PropTypes from 'prop-types';
import Image from '../image/image';
import { mapJsonRichText } from '../../utils/renderRichText';

import './cardslist.css';

const CardsList = ({ content }) => {
  const editorProps = (item) => {
    return {
      'data-aue-resource': `urn:aemconnection:${item?._path}/jcr:content/data/${item?._variation}`,
      'data-aue-type': 'container',
      'data-aue-label': 'Cards',
      'data-aue-behavior': 'component',
      'data-aue-model': item?._model?._path,
      'data-aue-prop': 'card'
    }
  };

  return (
    <React.Fragment>
      {content && content.headline && content.headline.html && <span className='headline' dangerouslySetInnerHTML={{ __html: content.headline.html }} />}
      <div className='cards' {...editorProps(content)}>
        {content && content.card && content.card.map((item) => (
          <Card key={item._path} content={item} />
        ))}
      </div>
    </React.Fragment >
  );
};

const Card = ({ content }) => {
  const editorProps = {
    'data-aue-type': 'reference',
    'data-aue-behavior': 'component',
  };

  return (
    <div className='card' key={content._path} {...editorProps}>
      {content && content.primaryImage && <Image asset={content.primaryImage} />}
      <h3>{content._metadata && parseName(content)}</h3>
      <div>{mapJsonRichText(content.description.json)}</div>
    </div>
  );
};

Card.propTypes = {
  content: PropTypes.object
};

const parseName = ({ _metadata }) => {
  if (!_metadata) return;
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