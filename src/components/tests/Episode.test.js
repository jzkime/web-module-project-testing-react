import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Episode from './../Episode';
import { testData } from './testData'

test("renders without error", () => { 
    render(<Episode episode={[]}/>);
});

test("renders the summary test passed as prop", () => {
    render(<Episode episode={testData.episode}/>)
    let summary = screen.getByText(testData.episode.summary)
    expect(summary).toBeInTheDocument();
});

test("renders default image when image is not defined", () => { 
    render(<Episode episode={testData.episode}/>)

    const image = screen.getByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png');
    expect(image).toBeInTheDocument();
});
