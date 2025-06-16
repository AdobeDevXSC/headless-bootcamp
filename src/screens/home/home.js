import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AEMHeadless from '@adobe/aem-headless-client-js';
import Teaser from '../../components/teaser/teaser';
import CardsList from '../../components/cardslist/cardslist';

import './home.css';

const Home = ({ context }) => {
  const [cards, setCards] = useState({});
  const [content, setContent] = useState({});

  useEffect(() => {
    const sdk = new AEMHeadless({
      serviceURL: context.url,
      endpoint: context.endpoint,
      fetch: ((resource, options = {}) => {
        options.credentials = 'include';
        return window.fetch(resource, options);
      })
    });


    sdk.runPersistedQuery('pure-headless/teaser', { path: `/content/dam/${context.project}/hero` })
      .then(({ data }) => {
        if (data) {
          setContent(data);
        }
      })
      .catch((error) => {
        console.log(`Error with pure-headless/teaser. ${error.message}`);
      });

    sdk.runPersistedQuery('pure-headless/cardsList', { path: `/content/dam/${context.project}/cards` })
      .then(({ data }) => {
        if (data) {
          setCards(data?.cardsByPath?.item);
          console.log(data?.cardsByPath?.item);
        }
      })
      .catch((error) => {
        console.log(`Error with pure-headless/cardslist. ${error.message}`);
      });


  }, [context.url, context.endpoint, context.project]);

  return (
    <div className='main-body'>
      <div>{content.component && <Teaser content={content.component.item} />}</div>
      <div className='cardslist'>{cards && <CardsList content={cards} />}</div>
    </div>
  );
};

Home.propTypes = {
  context: PropTypes.object
};

export default Home;