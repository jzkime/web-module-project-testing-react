import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';
import { showData } from './testData'
import userEvent from '@testing-library/user-event'
import Episodes from '../Episodes'

test('renders without errors', () => { 
    render(<Show show={showData} selectedSeason={"none"} />)
});

test('renders Loading component when prop show is null', () => {
    render(<Show show={null}/>);
    const loading = screen.getByText("Fetching data...");
    expect(loading).toBeInTheDocument();
});

test('renders same number of options seasons are passed in', () => {
    render(<Show show={showData} selectedSeason={"none"}/>);
    const seasonDivs = screen.queryAllByTestId("season-option");
    expect(seasonDivs).toHaveLength(3);
});

test('handleSelect is called when an season is selected', () => { 
    const mockHandleSelect = jest.fn();
    render(<Show show={showData} selectedSeason={"none"} handleSelect={mockHandleSelect}/>);
    const seasonSelect = screen.getByRole("combobox");
    expect(seasonSelect).toBeInTheDocument();

    userEvent.selectOptions(seasonSelect, 'season 1');
    expect(mockHandleSelect.mock.calls).toHaveLength(1);
});

test('component renders when no seasons are selected and then rerenders with a season passed in', () => {
    const {rerender} = render(<Show show={showData} selectedSeason={"none"} />);
    const seasonSelect = screen.getByRole("combobox");
    let ep1 = screen.queryByText("fake episode name");
    expect(ep1).toBeNull();
    
    rerender(<Show show={showData} selectedSeason={0}/>);
    const episodeDiv = screen.getByTestId("episodes-container")
    expect(episodeDiv).toBeInTheDocument();
});
