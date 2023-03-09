import PropTypes from 'prop-types';
import React from 'react';

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

export default function ContentTypes({ contentTypes }) {
  const [selectedContentTypeId, setSelectedContentTypeId] =
    React.useState(null);

  function addNewContentType() {
    // TODO
  }

  // eslint-disable-next-line no-unused-vars
  function addAnotherField(contentType) {
    // TODO
  }
  // eslint-disable-next-line no-unused-vars
  function editField(contentType, field) {
    // TODO
  }

  // eslint-disable-next-line no-unused-vars
  function deleteField(contentType, field) {
    // TODO
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
              <button
                className='add-button'
                onClick={() => addAnotherField(selectedContentType)}
              >
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
                        onClick={() => editField(selectedContentType, field)}
                      >
                        <i className='fa-regular fa-pen-to-square' />
                      </button>
                      <button
                        style={{
                          margin: '0 8px',
                        }}
                        onClick={() => deleteField(selectedContentType, field)}
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
};
