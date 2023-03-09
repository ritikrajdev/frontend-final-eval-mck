import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { editFormApiEndpoint } from '../../constants/apiEndpoints';
import { ErrorContext } from '../../contexts/ErrorContext';
import { ModalContext } from '../../contexts/ModalContext';
import { makeRequest } from '../../utils/makeRequest';

import './ContentTypes.css';

function getTypeBox(type) {
  let text;
  let bgColor;
  switch (type) {
    case 'number': {
      text = '123';
      bgColor = 'rgb(202 185	30)';
      break;
    }
    case 'email': {
      text = '@';
      bgColor = 'rgb(149	96	227)';
      break;
    }
    default: {
      text = 'Ab';
      bgColor = 'rgb(107 134	255)';
    }
  }
  return (
    <div
      style={{
        display: 'flex',
        width: '50px',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: bgColor,
        borderTopLeftRadius: '8px',
        borderBottomLeftRadius: '8px',
      }}
    >
      <p
        style={{
          color: 'white',
          padding: '8px 0',
        }}
      >
        {text}
      </p>
    </div>
  );
}

export default function ContentTypes({ contentTypes, setContentTypes }) {
  const [selectedContentTypeId, setSelectedContentTypeId] =
    React.useState(null);

  // eslint-disable-next-line no-unused-vars
  const [modal, setModal] = useContext(ModalContext);

  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useContext(ErrorContext);

  function addNewContentType() {
    // TODO
  }

  function addAnotherField() {
    const fields = {
      'Field Name': '',
      'Field Type': '',
    };
    setModal({
      show: true,
      title: 'Content Type',
      position: 'center',
      fields: fields,
      onSave: async (data) => {
        const newContentType = {
          name: selectedContentType.name,
          schema: { ...selectedContentType.schema },
        };
        newContentType.schema[data['Field Name']] = data['Field Type'];
        try {
          const updatedContentType = await makeRequest(
            editFormApiEndpoint(selectedContentTypeId),
            {
              data: newContentType,
            }
          );

          const newContentTypes = contentTypes.map((contentType) => {
            if (contentType.id === selectedContentTypeId) {
              return { ...selectedContentType, ...updatedContentType };
            }
            return contentType;
          });

          setContentTypes(newContentTypes);

          return true;
        } catch (err) {
          setError(err.response ? err.response.data.message : err.message);
          return false;
        }
      },
    });
  }
  // eslint-disable-next-line no-unused-vars
  function editField(field) {
    const modalFields = {
      'Field Name': field,
      'Field Type': selectedContentType.schema[field],
    };

    setModal({
      show: true,
      title: 'Content Type',
      position: 'center',
      fields: modalFields,
      onSave: async (data) => {
        const newContentType = {
          name: selectedContentType.name,
          schema: { ...selectedContentType.schema },
        };
        delete newContentType.schema[field];
        newContentType.schema[data['Field Name']] = data['Field Type'];
        try {
          const updatedContentType = await makeRequest(
            editFormApiEndpoint(selectedContentTypeId),
            {
              data: newContentType,
            }
          );

          const newContentTypes = contentTypes.map((contentType) => {
            if (contentType.id === selectedContentTypeId) {
              return { ...selectedContentType, ...updatedContentType };
            }
            return contentType;
          });

          setContentTypes(newContentTypes);
          return true;
        } catch (err) {
          setError(err.response ? err.response.data.message : err.message);
          return false;
        }
      },
    });
  }

  // eslint-disable-next-line no-unused-vars
  async function deleteField(field) {
    try {
      const newSchema = { ...selectedContentType.schema };
      delete newSchema[field];

      const updatedContentType = await makeRequest(
        editFormApiEndpoint(selectedContentTypeId),
        {
          data: {
            name: selectedContentType.name,
            schema: newSchema,
          },
        }
      );
      const newContentTypes = contentTypes.map((contentType) => {
        if (contentType.id === selectedContentTypeId) {
          return { ...selectedContentType, ...updatedContentType };
        }
        return contentType;
      });
      setContentTypes(newContentTypes);
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  }

  let selectedContentType = null;
  if (selectedContentTypeId) {
    selectedContentType = contentTypes.find(
      (contentType) => contentType.id === selectedContentTypeId
    );
  }

  return (
    <div className='content-types'>
      <h2>Content Types</h2>
      <div className='types-container'>
        <div className='left-container'>
          <p>{contentTypes.length} Types</p>
          <br />
          <button className='add-button' onClick={addNewContentType}>
            + New Type
          </button>
          {contentTypes.map((contentType) => (
            <div key={contentType.id}>
              <button
                className='content-type-button'
                style={
                  contentType.id === selectedContentTypeId
                    ? { backgroundColor: 'var(--dark-purple)', color: 'white' }
                    : {}
                }
                key={contentType.id}
                onClick={() => setSelectedContentTypeId(contentType.id)}
              >
                <span
                  style={{
                    color: 'inherit',
                  }}
                >
                  {contentType.name}
                </span>
                <span
                  style={{
                    color: 'inherit',
                  }}
                >
                  {Object.keys(contentType.schema).length}
                </span>
              </button>
            </div>
          ))}
        </div>
        <div className='right-container'>
          {selectedContentType && (
            <div>
              <h1>{selectedContentType.name}</h1>
              <br />
              <p>{Object.keys(selectedContentType.schema).length} fields</p>
              <br />
              <button className='add-button' onClick={addAnotherField}>
                Add another Field
              </button>
              <br />

              {Object.entries(selectedContentType.schema).map(
                ([field, type]) => (
                  <div
                    key={field}
                    style={{
                      display: 'flex',
                      borderRadius: '8px',
                      alignItems: 'center',
                      backgroundColor: 'white',
                      width: '100%',
                      marginBottom: '8px',
                    }}
                  >
                    <div>{getTypeBox(type)}</div>
                    <div
                      style={{
                        marginLeft: '8px',
                        width: '200px',
                      }}
                    >
                      {field}
                    </div>
                    <div>{type}</div>
                    <div
                      style={{
                        marginLeft: 'auto',
                      }}
                    >
                      <button
                        style={{
                          margin: '0 8px',
                        }}
                        onClick={() => editField(field)}
                      >
                        <i className='fa-regular fa-pen-to-square' />
                      </button>
                      <button
                        style={{
                          margin: '0 8px',
                        }}
                        onClick={() => deleteField(field)}
                      >
                        <i className='fa-regular fa-trash-can' />
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

ContentTypes.propTypes = {
  contentTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  setContentTypes: PropTypes.func.isRequired,
};
