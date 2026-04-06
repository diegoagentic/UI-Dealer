import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { Archive, ArrowRight, Clock, Copy, MoreHorizontal, Printer } from 'lucide-react';

interface ItemActionsPopoverProps {
    transactionType: 'quote' | 'order' | 'ack' | 'project';
    onAction: (action: string) => void;
}

const CONTEXTUAL_ACTION: Record<string, { label: string; icon: typeof ArrowRight }> = {
    quote: { label: 'Convert to Order', icon: ArrowRight },
    order: { label: 'Track Shipment', icon: ArrowRight },
    ack: { label: 'Request Revision', icon: ArrowRight },
    project: { label: 'Move to Category', icon: ArrowRight },
};

const COMMON_ACTIONS = [
    { id: 'duplicate', label: 'Duplicate Item', icon: Copy },
    { id: 'history', label: 'View History', icon: Clock },
    { id: 'print', label: 'Print Label', icon: Printer },
];

export default function ItemActionsPopover({ transactionType, onAction }: ItemActionsPopoverProps) {
    const contextual = CONTEXTUAL_ACTION[transactionType];

    return (
        <Popover className="relative">
            <PopoverButton className="p-1 text-muted-foreground hover:text-zinc-900 dark:hover:text-white rounded hover:bg-primary transition-colors">
                <MoreHorizontal className="h-4 w-4" />
            </PopoverButton>
            <PopoverPanel className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-xl bg-card border border-border shadow-lg p-1">
                {({ close }) => (
                    <>
                        {/* Contextual action */}
                        <button
                            onClick={() => { onAction(contextual.label); close(); }}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                            <contextual.icon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                            {contextual.label}
                        </button>

                        <div className="my-1 h-px bg-border" />

                        {/* Common actions */}
                        {COMMON_ACTIONS.map((action) => (
                            <button
                                key={action.id}
                                onClick={() => { onAction(action.label); close(); }}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            >
                                <action.icon className="h-4 w-4 text-zinc-500" />
                                {action.label}
                            </button>
                        ))}

                        <div className="my-1 h-px bg-border" />

                        {/* Archive (destructive) */}
                        <button
                            onClick={() => { onAction('Archive Item'); close(); }}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                            <Archive className="h-4 w-4" />
                            Archive Item
                        </button>
                    </>
                )}
            </PopoverPanel>
        </Popover>
    );
}
