import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Collections from '..';
import { ContentContext } from '../../../contexts/ContentContext';
import { ErrorContext } from '../../../contexts/ErrorContext';
import { mockCollections } from '../../../mocks/mockData';

jest.mock('react-router-dom');

describe('Collections', () => {
  it('should render correctly', async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    const error = 'some error';
    const setError = jest.fn();

    const collections = mockCollections;
    const setCollections = jest.fn();

    const { asFragment } = render(
      <ErrorContext.Provider value={[error, setError]}>
        <ContentContext.Provider value={[collections, setCollections]}>
          <Collections collectionId={mockCollections[0].id} />
        </ContentContext.Provider>
      </ErrorContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly after clicking on type button', async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    const error = 'some error';
    const setError = jest.fn();

    const collections = mockCollections;
    const setCollections = jest.fn();

    const view = render(
      <ErrorContext.Provider value={[error, setError]}>
        <ContentContext.Provider value={[collections, setCollections]}>
          <Collections collectionId={mockCollections[0].id} />
        </ContentContext.Provider>
      </ErrorContext.Provider>
    );

    const typeButton = view.getByText(mockCollections[0].name);
    fireEvent.click(typeButton);

    // await waitFor(() => {});
    expect(view.asFragment()).toMatchSnapshot();
  });
});
