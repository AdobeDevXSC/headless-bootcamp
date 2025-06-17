import React from 'react';
import PropTypes from 'prop-types';
import Image from '../image/image';
import { mapJsonRichText } from '../../utils/renderRichText';

import './cardslist.css';

const CardsList = ({ content }) => {

  return (
    <React.Fragment>
      {content && content.headline && content.headline.html && <span className='headline' dangerouslySetInnerHTML={{ __html: content.headline.html }} />}
      <div className='cards'>
        {content && content.card && content.card.map((item) => (
          <Card key={item._path} content={item} />
        ))}
      </div>
    </React.Fragment >
  );
};

const Card = ({ content }) => {
  return (
    <div className='card' key={content._path}>
      {content && content.primaryImage && <Image asset={content.primaryImage} />}
      <h3>{content._metadata && parseName(content)}</h3>
      <div>{mapJsonRichText(content.description.json)}</div>
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
