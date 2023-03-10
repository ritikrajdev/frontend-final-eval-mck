import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import {
  createResponseApiEndpoint,
  deleteResponseApiEndpoint,
  editResponseApiEndpoint,
} from '../../constants/apiEndpoints';
import { ContentContext } from '../../contexts/ContentContext';
import { ErrorContext } from '../../contexts/ErrorContext';
import { ModalContext } from '../../contexts/ModalContext';
import { makeRequest } from '../../utils/makeRequest';
import SignOutButton from '../SignOutButton';

import './Collections.css';

export default function Collections({ collectionId }) {
  // eslint-disable-next-line no-unused-vars
  const [contentTypes, setContentTypes] = useContext(ContentContext);

  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useContext(ErrorContext);

  // eslint-disable-next-line no-unused-vars
  const [modal, setModal] = useContext(ModalContext);

  const selectedCollection = contentTypes.find(
    (collection) => collection.id === collectionId
  );

  function addNewEntry() {
    const modalFields = { ...selectedCollection.schema };
    Object.keys(modalFields).forEach((key) => {
      modalFields[key] = '';
    });

    setModal({
      show: true,
      title: 'Add Response',
      position: 'right',
      fields: modalFields,
      onSave: async (data) => {
        try {
          const newResponse = await makeRequest(createResponseApiEndpoint, {
            data: {
              form_id: selectedCollection.id,
              response: data,
            },
          });

          setContentTypes(
            contentTypes.map((collection) => {
              if (collection.id === collectionId) {
                return {
                  ...collection,
                  formResponses: [...collection.formResponses, newResponse],
                };
              }
              return collection;
            })
          );

          return true;
        } catch (err) {
          setError(err.response ? err.response.data.message : err.message);
          return false;
        }
      },
    });
  }

  function editResponse(id) {
    setModal({
      show: true,
      title: 'Edit Response',
      position: 'right',
      fields: selectedCollection.formResponses.find(
        (response) => response.id === id
      ).response,
      onSave: async (data) => {
        try {
          const updatedResponse = await makeRequest(
            editResponseApiEndpoint(id),
            {
              data: {
                form_id: selectedCollection.id,
                response: data,
              },
            }
          );

          setContentTypes(
            contentTypes.map((collection) => {
              if (collection.id === collectionId) {
                return {
                  ...collection,
                  formResponses: collection.formResponses.map((response) => {
                    if (response.id === id) {
                      return updatedResponse;
                    }
                    return response;
                  }),
                };
              }
              return collection;
            })
          );

          return true;
        } catch (err) {
          setError(err.response ? err.response.data.message : err.message);
          return false;
        }
      },
    });
  }

  async function deleteResponse(id) {
    try {
      await makeRequest(deleteResponseApiEndpoint(id));

      setContentTypes(
        contentTypes.map((collection) => {
          if (collection.id === collectionId) {
            return {
              ...collection,
              formResponses: collection.formResponses.filter(
                (response) => response.id !== id
              ),
            };
          }
          return collection;
        })
      );
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  }

  const schema = selectedCollection.schema;
  const requiredKeys = Object.keys(schema).slice(0, 3);
  requiredKeys.unshift('id');

  return (
    <div className='collections'>
      <h2>
        <span>{selectedCollection.name}</span> <SignOutButton />
      </h2>
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
