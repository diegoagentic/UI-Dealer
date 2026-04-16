/**
 * SDB-1315 · FE-01 — ConvertToPOButton
 *
 * Entry-point CTA that starts a quote-to-PO conversion. Renders on the
 * quote detail page when the quote is in APPROVED status.
 *
 * States:
 *   · idle      → "Convert to Purchase Orders"
 *   · loading   → spinner + "Converting…"
 *   · disabled  → tooltip "Quote must be approved first"
 *   · done      → navigates to ConversionReviewPage
 *
 * Strata DS: bg-brand-300 dark:bg-brand-500 text-zinc-900 rounded-lg
 */

import { useState } from 'react'
import { clsx } from 'clsx'
import { ArrowRight, Loader2, Package } from 'lucide-react'
import { useInitiateConversion } from './hooks'

interface ConvertToPOButtonProps {
    quoteId: string
    quoteStatus: string
    /** Fires when conversion completes — parent navigates to review page. */
    onConversionStarted?: (quoteId: string) => void
}

export default function ConvertToPOButton({
    quoteId,
    quoteStatus,
    onConversionStarted,
}: ConvertToPOButtonProps) {
    const { loading, error, execute } = useInitiateConversion()
    const [showError, setShowError] = useState(false)
    const isApproved = quoteStatus === 'APPROVED'

    const handleClick = async () => {
        if (!isApproved || loading) return
        setShowError(false)
        try {
            await execute()
            onConversionStarted?.(quoteId)
        } catch {
            setShowError(true)
        }
    }

    return (
        <div className="relative inline-flex flex-col items-start gap-1">
            <button
                type="button"
                onClick={handleClick}
                disabled={!isApproved || loading}
                title={!isApproved ? 'Quote must be approved first' : undefined}
                className={clsx(
                    'flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200',
                    isApproved && !loading
                        ? 'bg-brand-300 dark:bg-brand-500 text-zinc-900 hover:opacity-90 shadow-sm'
                        : 'bg-muted text-muted-foreground cursor-not-allowed'
                )}
            >
                {loading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Converting…
                    </>
                ) : (
                    <>
                        <Package className="w-4 h-4" />
                        Convert to Purchase Orders
                        <ArrowRight className="w-4 h-4" />
                    </>
                )}
            </button>

            {/* Inline error toast */}
            {(showError || error) && (
                <p className="text-[10px] text-red-600 dark:text-red-400 font-semibold animate-in fade-in duration-200">
                    Conversion failed.{' '}
                    <button
                        type="button"
                        onClick={handleClick}
                        className="underline hover:no-underline"
                    >
                        Retry
                    </button>
                </p>
            )}
        </div>
    )
}
