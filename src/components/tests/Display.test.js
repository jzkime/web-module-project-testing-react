import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Display from './../Display';
import {showData} from './testData'

test('renders without errors with no props', async () => {
    render(<Display />)
 });

test('renders Show component when the button is clicked ', async () => { 
    render(<Display show={showData}/>)
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    await waitFor(() => {
        const show = screen.getByTestId("show-container");
        expect(show).toBeInTheDocument();
    });
});

test('renders show season options matching your data when the button is clicked', async () => { 
    render(<Display show={showData} />);
    const button = screen.getByRole("button");
    let selection = screen.queryByRole("combobox");
    expect(selection).not.toBeInTheDocument();
    userEvent.click(button);
    await waitFor(() => {
        selection = screen.queryByRole("combobox");
        expect(selection).toHaveLength(5)
    })
});

