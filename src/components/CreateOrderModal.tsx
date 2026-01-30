import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
    XMarkIcon,
    PencilSquareIcon,
    DocumentTextIcon,
    DocumentDuplicateIcon,
    ArrowUpOnSquareIcon,
    CheckIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline'

interface CreateOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const creationOptions = [
    {
        id: 'import',
        title: 'Import Files',
        description: 'Import order data from Excel, CSV, or PDF files. Ideal for bulk orders or external sources.',
        icon: ArrowUpOnSquareIcon,
        actionLabel: 'Upload Files',
        estimatedTime: '3-5 minutes',
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-100',
        darkColor: 'dark:text-emerald-400',
        darkBgColor: 'dark:bg-emerald-900/30'
    },
    {
        id: 'quote',
        title: 'From Quote',
        description: 'Convert an accepted quote directly into a purchase order. All details are automatically transferred.',
        icon: DocumentTextIcon,
        actionLabel: 'Select Quote',
        estimatedTime: '2-3 minutes',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        darkColor: 'dark:text-blue-400',
        darkBgColor: 'dark:bg-blue-900/30'
    },
    {
        id: 'template',
        title: 'From Template',
        description: 'Use a pre-configured template or previous order as a starting point. Perfect for recurring orders.',
        icon: DocumentDuplicateIcon,
        actionLabel: 'Browse Templates',
        estimatedTime: '5-8 minutes',
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
        darkColor: 'dark:text-purple-400',
        darkBgColor: 'dark:bg-purple-900/30'
    },
    {
        id: 'manual',
        title: 'Manual Creation',
        description: 'Create an order from scratch by entering all details manually. Best for custom or unique orders.',
        icon: PencilSquareIcon,
        actionLabel: 'Start Manual Creation',
        estimatedTime: '10-15 minutes',
        color: 'text-zinc-600',
        bgColor: 'bg-zinc-100',
        darkColor: 'dark:text-zinc-400',
        darkBgColor: 'dark:bg-zinc-800'
    }
]

const templates = [
    {
        id: 1,
        name: 'Standard Monthly Restock',
        items: 12,
        totalValue: '$4,250.00',
        lastUsed: '2 days ago',
        category: 'Restock'
    },
    {
        id: 2,
        name: 'New Dealer Initial Setup',
        items: 45,
        totalValue: '$25,000.00',
        lastUsed: '1 week ago',
        category: 'New Setup'
    },
    {
        id: 3,
        name: 'Seasonal Promo (Q1)',
        items: 8,
        totalValue: '$1,800.00',
        lastUsed: 'Yesterday',
        category: 'Promo'
    },
    {
        id: 4,
        name: 'Urgent Parts Replacement',
        items: 3,
        totalValue: '$450.00',
        lastUsed: '5 days ago',
        category: 'Maintenance'
    }
]

export default function CreateOrderModal({ isOpen, onClose }: CreateOrderModalProps) {
    const [step, setStep] = useState<'selection' | 'templates'>('selection')

    // Reset step when modal closes
    useEffect(() => {
        if (!isOpen) {
            const timer = setTimeout(() => setStep('selection'), 300)
            return () => clearTimeout(timer)
        }
    }, [isOpen])

    const handleOptionClick = (id: string) => {
        if (id === 'template') {
            setStep('templates')
        }
        // Handle other options here as needed
    }

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white dark:bg-zinc-950 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-3xl border border-border">
                                <div className="absolute right-6 top-6 z-10">
                                    <button
                                        type="button"
                                        className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors outline-none"
                                        onClick={onClose}
                                    >
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                {step === 'selection' ? (
                                    <div className="p-8">
                                        <div className="max-w-2xl">
                                            <Dialog.Title as="h3" className="text-2xl font-brand font-bold text-foreground mb-2">
                                                Create New Order
                                            </Dialog.Title>
                                            <p className="text-sm text-muted-foreground mb-6">
                                                Choose how you would like to start this order. Select the option that best fits your current workflow.
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {creationOptions.map((option) => (
                                                <div
                                                    key={option.id}
                                                    onClick={() => handleOptionClick(option.id)}
                                                    className="group relative flex flex-col p-6 rounded-2xl border border-border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300 cursor-pointer"
                                                >
                                                    <div className="flex items-start justify-between mb-4">
                                                        <div className={`h-12 w-12 rounded-xl ${option.bgColor} ${option.color} ${option.darkBgColor} ${option.darkColor} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                                                            <option.icon className="h-6 w-6" />
                                                        </div>
                                                        <div className="flex justify-end">
                                                            <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border border-zinc-200 dark:border-zinc-700">
                                                                {option.estimatedTime}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <h4 className="text-lg font-bold text-foreground mb-1">{option.title}</h4>
                                                    <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{option.description}</p>

                                                    <div className="mt-auto">
                                                        <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-foreground/10 hover:border-foreground text-foreground font-medium transition-all group-hover:bg-foreground group-hover:text-background text-sm">
                                                            <span>{option.actionLabel}</span>
                                                            <ArrowRightIcon className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-8 h-[600px] flex flex-col">
                                        <div className="flex items-center gap-4 mb-6">
                                            <button
                                                onClick={() => setStep('selection')}
                                                className="p-2 -ml-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                                            >
                                                <ArrowRightIcon className="h-5 w-5 rotate-180 text-muted-foreground" />
                                            </button>
                                            <div>
                                                <Dialog.Title as="h3" className="text-2xl font-brand font-bold text-foreground">
                                                    Select a Template
                                                </Dialog.Title>
                                                <p className="text-sm text-muted-foreground">
                                                    Choose from your saved templates to quickly create a new order.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex-1 overflow-y-auto -mx-2 px-2">
                                            <div className="grid grid-cols-1 gap-4">
                                                {templates.map((template) => (
                                                    <div
                                                        key={template.id}
                                                        className="group flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                                                                <DocumentDuplicateIcon className="h-5 w-5" />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold text-foreground">{template.name}</h4>
                                                                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                                                                    <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">{template.category}</span>
                                                                    <span>{template.items} Items</span>
                                                                    <span>•</span>
                                                                    <span>Last used {template.lastUsed}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <span className="font-medium text-foreground">{template.totalValue}</span>
                                                            <button className="p-2 rounded-lg text-primary hover:bg-primary/10 transition-colors opacity-0 group-hover:opacity-100">
                                                                <ArrowRightIcon className="h-5 w-5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-6 pt-4 border-t border-border flex justify-between items-center">
                                            <p className="text-sm text-muted-foreground">
                                                Showing {templates.length} templates
                                            </p>
                                            <button className="text-sm font-medium text-primary hover:underline">
                                                Manage Templates
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
