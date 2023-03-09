import PropTypes from 'prop-types';
import React, { createContext } from 'react';
import Button from '../components/elements/Button';
import Input from '../components/elements/Input';

export const ModalContext = createContext([]);

export default function ModalContextProvider({ children }) {
  const [modal, setModal] = React.useState({
    // position: 'center' | 'right'
    show: false,
    position: 'center',
    title: 'Modal',
    fields: {},
    onSave: () => {
      return true;
    },
  });

  let positionStylingProps = {};

  if (modal.position === 'center') {
    positionStylingProps = {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };
  } else if (modal.position === 'right') {
    positionStylingProps = {
      top: '0',
      right: '0',
      bottom: '0',
    };
  }

  return (
    <ModalContext.Provider value={[modal, setModal]}>
      {modal.show && (
        <div
          style={{
            width: '100%',
            height: '100vh',
            backgroundColor: '#00000099',
            position: 'absolute',
          }}
          onClick={() => {
            setModal({ ...modal, show: false });
          }}
        >
          <form
            style={{
              ...positionStylingProps,
              position: 'absolute',
              backgroundColor: 'white',
              display: 'inline-block',
              padding: '20px',
              borderRadius: '8px',
              color: 'red',
              border: '1px solid black',
            }}
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => {
              e.preventDefault();
              if (modal.onSave(modal.fields))
                setModal({ ...modal, show: false });
            }}
          >
            <h2>{modal.title}</h2>
            <br />
            {Object.entries(modal.fields).map(([key, value]) => (
              <div key={key}>
                <Input
                  label={key}
                  value={value}
                  onChange={(e) =>
                    setModal({
                      ...modal,
                      fields: { ...modal.fields, [key]: e.target.value },
                    })
                  }
                />
                <br />
              </div>
            ))}

            <center>
              <Button type='submit'>Save</Button>
            </center>
          </form>
        </div>
      )}
      {children}
    </ModalContext.Provider>
  );
}

ModalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
