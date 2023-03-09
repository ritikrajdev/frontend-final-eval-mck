import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Collections from '../../components/Collections';
import ContentTypes from '../../components/ContentTypes';
import { getAllFormsApiEndpoint } from '../../constants/apiEndpoints';
import { makeRequest } from '../../utils/makeRequest';

import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();
  const [collections, setCollections] = useState(null);
  const [sideData, setSideData] = useState({
    // type: 'content' | 'collection',
    type: false,
    data: null,
  });

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
          <ul>
            {collections.map((collection) => (
              <li key={collection.id}>• {collection.name}</li>
            ))}
          </ul>
          <br />
        </div>

        <h3
          className='build-type-button'
          style={{
            cursor: 'pointer',
          }}
          onClick={() => setSideData({ data: collections, type: 'content' })}
        >
          CONTENT TYPE BUILDER
        </h3>
      </div>
      <div className='cms-content'>
        {sideData.type &&
          (sideData.type === 'content' ? (
            <ContentTypes
              contentTypes={sideData.data}
              setContentTypes={(newData) => {
                setSideData({ ...sideData, data: newData });
              }}
            />
          ) : (
            <Collections />
          ))}
      </div>
    </div>
  );
}
