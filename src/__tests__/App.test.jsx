import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('JSON Formatter Integration', () => {
    it('formats valid JSON correctly', () => {
        render(<App />);
        const textarea = screen.getByRole('textbox');

        fireEvent.change(textarea, { target: { value: '{"name":"test"}' } });
        const formatBtn = screen.getByRole('button', { name: /format/i });
        fireEvent.click(formatBtn);

        // Check if output displays formatted JSON 
        expect(screen.getByText(/VALID JSON/i)).toBeDefined();
    });

    it('displays error message for invalid JSON', () => {
        render(<App />);
        const textarea = screen.getByRole('textbox');

        fireEvent.change(textarea, { target: { value: '{invalid}' } });
        const formatBtn = screen.getByRole('button', { name: /format/i });
        fireEvent.click(formatBtn);

        // Check for error state in JsonOutput
        expect(screen.getByText(/Error/i)).toBeDefined();
    });
});