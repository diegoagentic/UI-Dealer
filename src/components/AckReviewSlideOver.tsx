import { X, FileSearch } from 'lucide-react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment } from 'react'
import ComparisonSummaryPanel, { type AckComparisonReport } from './ack-comparison/ComparisonSummaryPanel'
import { MOCK_AIS_REPORT } from './ack-comparison/mockReports'

interface AckReviewSlideOverProps {
    open: boolean
    onClose: () => void
    poId?: string
    ackId?: string
    onRequestExpertReview?: () => void
}

export default function AckReviewSlideOver({ open, onClose, poId, ackId, onRequestExpertReview }: AckReviewSlideOverProps) {
    // In a real app we'd fetch the report matching the poId or ackId
    // For the demo, we use the detailed MOCK_AIS_REPORT
    const reportToUse: AckComparisonReport = {
        ...MOCK_AIS_REPORT,
        // Override with passed IDs if available
        ...(poId && { poId }),
        ...(ackId && { ackId })
    }

    return (
        <Transition show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                            <TransitionChild
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <DialogPanel className="pointer-events-auto w-screen max-w-2xl flex flex-col h-full bg-background border-l border-border shadow-2xl">
                                    {/* Header */}
                                    <div className="px-6 py-6 sm:px-8 border-b border-border bg-card">
                                        <div className="flex items-start justify-between">
                                            <DialogTitle className="text-xl font-bold text-foreground">
                                                Review Acknowledgment
                                            </DialogTitle>
                                            <div className="ml-3 flex h-7 items-center">
                                                <button
                                                    type="button"
                                                    className="rounded-md bg-background text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                                    onClick={onClose}
                                                >
                                                    <span className="sr-only">Close panel</span>
                                                    <X className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            Compare the vendor acknowledgment against your original Purchase Order and resolve discrepancies.
                                        </p>
                                    </div>

                                    {/* Content (Scrollable) */}
                                    <div className="flex-1 overflow-y-auto bg-muted/20 p-6 sm:p-8 scrollbar-hide">
                                        <div className="mx-auto max-w-full">
                                            <ComparisonSummaryPanel report={reportToUse} />
                                        </div>
                                    </div>
                                    
                                    {/* Footer */}
                                    <div className="px-6 py-4 border-t border-border bg-card flex justify-between items-center gap-3">
                                        <p className="text-[11px] text-muted-foreground">
                                            Resolve discrepancies inline, or escalate to Expert Hub for review.
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <button
                                                type="button"
                                                className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-lg hover:bg-muted transition-colors"
                                                onClick={onClose}
                                            >
                                                Close
                                            </button>
                                            {onRequestExpertReview && (
                                                <button
                                                    type="button"
                                                    onClick={() => { onRequestExpertReview(); onClose(); }}
                                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-zinc-900 bg-brand-300 dark:bg-brand-500 hover:bg-brand-400 dark:hover:bg-brand-600 rounded-lg transition-colors"
                                                >
                                                    <FileSearch className="h-4 w-4" />
                                                    Send to Expert Hub
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
