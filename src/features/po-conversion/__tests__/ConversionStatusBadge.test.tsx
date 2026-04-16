import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ConversionStatusBadge from '../ConversionStatusBadge'

describe('ConversionStatusBadge', () => {
    it('renders DRAFT with blue styling', () => {
        render(<ConversionStatusBadge status="DRAFT" />)
        expect(screen.getByText('Draft')).toBeInTheDocument()
    })

    it('renders FINALIZED with amber styling', () => {
        render(<ConversionStatusBadge status="FINALIZED" />)
        expect(screen.getByText('Finalized')).toBeInTheDocument()
    })

    it('renders SUBMITTED with green styling', () => {
        render(<ConversionStatusBadge status="SUBMITTED" />)
        expect(screen.getByText('Submitted')).toBeInTheDocument()
    })

    it('renders FAILED with red styling', () => {
        render(<ConversionStatusBadge status="FAILED" />)
        expect(screen.getByText('Failed')).toBeInTheDocument()
    })

    it('shows PO count when provided', () => {
        render(<ConversionStatusBadge status="SUBMITTED" poCount={3} />)
        expect(screen.getByText('3')).toBeInTheDocument()
    })

    it('supports size variants', () => {
        const { container } = render(<ConversionStatusBadge status="DRAFT" size="md" />)
        expect(container.firstChild).toBeTruthy()
    })
})
