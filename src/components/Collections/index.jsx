import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { ContentContext } from '../../contexts/ContentContext';

import './Collections.css';

export default function Collections({ collectionId }) {
  // eslint-disable-next-line no-unused-vars
  const [contentTypes, setContentTypes] = useContext(ContentContext);

  const selectedCollection = contentTypes.find(
    (collection) => collection.id === collectionId
  );

  function addNewEntry() {
    // TODO
    console.log('add new entry');
  }

  function editResponse(id) {
    // TODO
    console.log('edit response', id);
  }

  function deleteResponse(id) {
    // TODO
    console.log('delete response', id);
  }

  const schema = selectedCollection.schema;
  const requiredKeys = Object.keys(schema).slice(0, 3);
  requiredKeys.unshift('id');

  return (
    <div className='collections'>
      <h2>{selectedCollection.name}</h2>
      <br />
      <div
        style={{
          padding: '20px',
        }}
      >
        <div className='entries'>
          <h1>{selectedCollection.formResponses.length} Entries Found</h1>
          <button onClick={addNewEntry}>Add a new entry</button>
        </div>

        <div className='entries-table'>
          <div className='entries-headings'>
            {requiredKeys.map((key) => (
              <div key={key} className='w-150'>
                {key}
              </div>
            ))}
            <div
              style={{
                marginLeft: 'auto',
              }}
            >
              Actions
            </div>
          </div>

          {selectedCollection.formResponses.map((entry) => (
            <div key={entry.id} className='entries-row'>
              <div className='w-150'>{entry.id}</div>
              {requiredKeys.slice(1).map((key) => (
                <div key={key} className='w-150'>
                  {entry.response[key]}
                </div>
              ))}
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px' }}>
                {/* <button>
                  <i className='fa-regular fa-clone'></i>
                </button> */}

                <button onClick={() => editResponse(entry.id)}>
                  <i className='fa-regular fa-pen-to-square'></i>
                </button>

                <button onClick={() => deleteResponse(entry.id)}>
                  <i className='fa-regular fa-trash-can'></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Collections.propTypes = {
  collectionId: PropTypes.number.isRequired,
};
