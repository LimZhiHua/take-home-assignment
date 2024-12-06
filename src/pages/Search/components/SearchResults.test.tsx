import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchResults from './SearchResults';
import { SearchResultResponse } from '../Search';
import { highlightText } from '../../../utils';

jest.mock('../../../utils', () => ({
    highlightText: jest.fn((text, query) => text.replace(new RegExp(query, 'gi'), (match: any) => `<mark>${match}</mark>`))
}));

describe('SearchResults Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
        cleanup();
    });

    const mockSearchResults: SearchResultResponse = {
        PageSize: 2,
        TotalNumberOfResults: 10,
        ResultItems: [
            {
                DocumentId: '1',
                DocumentURI: 'https://example.com/doc1',
                DocumentTitle: {
                    Text: 'Example Document 1',
                    Highlights: []
                },
                DocumentExcerpt: {
                    Text: 'This is an excerpt for document 1.',
                    Highlights: []
                }
            },
            {
                DocumentId: '2',
                DocumentURI: 'https://example.com/doc2',
                DocumentTitle: {
                    Text: 'Example Document 2',
                    Highlights: []
                },
                DocumentExcerpt: {
                    Text: 'This is an excerpt for document 2.',
                    Highlights: []
                }
            }
        ]
    };

    const searchQuery = 'Example';

    it('renders the correct number of search results', () => {
        render(<SearchResults searchResults={mockSearchResults} searchQuery={searchQuery} />);

        expect(screen.getByText(/Showing 1-2 of 10 results/i)).toBeInTheDocument();
        expect(screen.getAllByRole('listitem')).toHaveLength(mockSearchResults.ResultItems.length);
    });

    it('calls the highlightText function with the correct arguments', () => {
        render(<SearchResults searchResults={mockSearchResults} searchQuery={searchQuery} />);

        expect(highlightText).toHaveBeenCalledTimes(6); // 2 for titles, 2 for excerpts, 2 for uri link
        expect(highlightText).toHaveBeenCalledWith(mockSearchResults.ResultItems[0].DocumentTitle.Text, searchQuery);
        expect(highlightText).toHaveBeenCalledWith(mockSearchResults.ResultItems[0].DocumentExcerpt.Text, searchQuery);
        expect(highlightText).toHaveBeenCalledWith(mockSearchResults.ResultItems[0].DocumentURI, searchQuery);

        expect(highlightText).toHaveBeenCalledWith(mockSearchResults.ResultItems[1].DocumentTitle.Text, searchQuery);
        expect(highlightText).toHaveBeenCalledWith(mockSearchResults.ResultItems[1].DocumentExcerpt.Text, searchQuery);
        expect(highlightText).toHaveBeenCalledWith(mockSearchResults.ResultItems[1].DocumentURI, searchQuery);
    });

    it('renders document titles and excerpts correctly', () => {
        render(<SearchResults searchResults={mockSearchResults} searchQuery={searchQuery} />);

        // it has "<mark>" because our searchQuery is "Example" and it highlights the searchQuery text
        expect(screen.getByText('<mark>Example</mark> Document 1')).toBeInTheDocument();
        expect(screen.getByText('<mark>Example</mark> Document 2')).toBeInTheDocument();

        expect(screen.getByText('This is an excerpt for document 1.')).toBeInTheDocument();
        expect(screen.getByText('This is an excerpt for document 2.')).toBeInTheDocument();

        expect(screen.getByText('https://<mark>example</mark>.com/doc1')).toBeInTheDocument();
        expect(screen.getByText('https://<mark>example</mark>.com/doc2')).toBeInTheDocument();

    });

    it('renders the document URIs correctly with a link', () => {
        render(<SearchResults searchResults={mockSearchResults} searchQuery={searchQuery} />);

        const linkElements = screen.getAllByRole('link');
        expect(linkElements).toHaveLength(mockSearchResults.ResultItems.length);
        expect(linkElements[0]).toHaveAttribute('href', 'https://example.com/doc1');
        expect(linkElements[1]).toHaveAttribute('href', 'https://example.com/doc2');
    });
});
