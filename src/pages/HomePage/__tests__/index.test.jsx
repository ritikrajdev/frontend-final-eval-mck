import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '..';
import { ContentContext } from '../../../contexts/ContentContext';
import { mockCollections } from '../../../mocks/mockData';
import { makeRequest } from '../../../utils/makeRequest';

jest.mock('../../../utils/makeRequest');

describe('HomePage', () => {
  it('should render the loading text', async () => {
    makeRequest.mockResolvedValue(mockCollections);
    const setCollections = jest.fn();
    render(
      <ContentContext.Provider value={[null, setCollections]}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </ContentContext.Provider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {});
  });

  it('should render the collections', async () => {
    makeRequest.mockResolvedValue(mockCollections);
    const view = render(
      <ContentContext.Provider value={[mockCollections, jest.fn()]}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </ContentContext.Provider>
    );
    await waitFor(() => {});
    expect(view.asFragment()).toMatchSnapshot();
  });

  it('should render content type on content type builder click', async () => {
    makeRequest.mockResolvedValue(mockCollections);
    const view = render(
      <ContentContext.Provider value={[mockCollections, jest.fn()]}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </ContentContext.Provider>
    );
    await waitFor(() => {});
    const contentTypeBuilder = await screen.findByText('CONTENT TYPE BUILDER');
    contentTypeBuilder.click();
    expect(view.asFragment()).toMatchSnapshot();
    await waitFor(() => {});
  });

  it('should render collection on collections click', async () => {
    makeRequest.mockResolvedValue(mockCollections);
    const view = render(
      <ContentContext.Provider value={[mockCollections, jest.fn()]}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </ContentContext.Provider>
    );
    await waitFor(() => {});
    const contentTypeBuilder = await screen.findByText(
      '• ' + mockCollections[0].name
    );
    contentTypeBuilder.click();
    expect(view.asFragment()).toMatchSnapshot();
    await waitFor(() => {});
  });
});
