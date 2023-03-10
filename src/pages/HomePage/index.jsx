import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Collections from '../../components/Collections';
import ContentTypes from '../../components/ContentTypes';
import { getAllFormsApiEndpoint } from '../../constants/apiEndpoints';
import { ContentContext } from '../../contexts/ContentContext';
import { makeRequest } from '../../utils/makeRequest';

import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();
  const [collections, setCollections] = useContext(ContentContext);
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);

  // false, 'content', 'collection'
  const [sideData, setSideData] = useState(false);

  useEffect(() => {
    makeRequest(getAllFormsApiEndpoint, {}, navigate).then((forms) => {
      setCollections(forms);
    });
  }, []);

  if (collections === null) {
    return 'Loading...';
  }

  return (
    <div className='home-page'>
      <div className='cms-nav'>
        <h1>CMS+</h1>
        <br />
        <div className='collections-containers'>
          <h3>COLLECTIONS</h3>
          <br />
          <ul
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              maxHeight: '45vh',
            }}
          >
            {collections.map((collection) => (
              <li
                key={collection.id}
                style={{
                  cursor: 'pointer',
                  backgroundColor:
                    sideData === 'collection' &&
                    selectedCollectionId === collection.id
                      ? 'black'
                      : 'transparent',
                }}
                onClick={() => {
                  setSideData('collection');
                  setSelectedCollectionId(collection.id);
                }}
              >
                • {collection.name}
              </li>
            ))}
          </ul>
          <br />
        </div>

        <h3
          className='build-type-button'
          style={{
            backgroundColor: sideData === 'content' ? 'black' : 'transparent',
            cursor: 'pointer',
          }}
          onClick={() => setSideData('content')}
        >
          CONTENT TYPE BUILDER
        </h3>
      </div>
      <div className='cms-content'>
        {sideData &&
          (sideData === 'content' ? (
            <ContentTypes />
          ) : (
            <Collections collectionId={selectedCollectionId} />
          ))}
      </div>
    </div>
  );
}
