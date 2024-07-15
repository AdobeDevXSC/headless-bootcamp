import React from 'react';
import PropTypes from 'prop-types';
import Image from '../image/image';
import { mapJsonRichText } from '../../utils/renderRichText';

import './cards.css';

const Cards = ({ content }) => {
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
      {
        content.cardsList.items.map((item, i) => (
          <div key={i} className='imagelist' {...editorProps(item)}>
            {mapJsonRichText(item.headline.json)}
            <div className='cards'>
              {item.cards && item.cards.map((card, x) => (
                <Card key={x} card={card} />
              ))}
            </div>

          </div>
        ))
      }
    </React.Fragment>
  );
};

const Card = ({ card }) => {
  const editorProps = {
    'data-aue-type': 'reference',
    'data-aue-behavior': 'component',
  };

  return (
    <div className='card' data-aue-label={parseName(card)} key={card._path} data-aue-resource={`urn:aemconnection:${card._path}/jcr:content/data/${card._variation}`} {...editorProps}>
      <Image asset={card.primaryImage} />
      <h3>{card.title}</h3>
      <div data-aue-prop='description' data-aue-type='richtext'>{mapJsonRichText(card.description.json)}</div>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.object
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

Cards.propTypes = {
  content: PropTypes.object
};

export default Cards;