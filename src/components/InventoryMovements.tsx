import React, { useState } from 'react';
import AssignTeamModal from './AssignTeamModal';
import {
    MapPinIcon,
    ArrowRightIcon,
    CalendarIcon,
    UserIcon,
    ClockIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
    TruckIcon
} from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

export interface MovementRequest {
    id: string;
    assetName: string;
    assetType: string;
    fromLocation: string;
    toLocation: string;
    status: 'Ordered' | 'Assigned' | 'Scheduled' | 'In-Progress' | 'Completed';
    priority: 'Low' | 'Medium' | 'High';
    requestDate: string;
    scheduledDate?: string;
    assignedTeam?: string;
    requestedBy: string;
    notes?: string;
    trackingId?: string;
}

const INITIAL_MOVEMENTS: MovementRequest[] = [
    {
        id: '1',
        assetName: 'Executive Desk',
        assetType: 'Furniture',
        fromLocation: 'Main Office - Floor 2',
        toLocation: 'Office Renovation',
        status: 'Ordered',
        priority: 'High',
        requestDate: '2/2/2026',
        requestedBy: 'John Smith',
        notes: 'Asset relocation from inventory - Executive Desk (Furniture)',
        trackingId: 'TRK-2026-001'
    },
    {
        id: '2',
        assetName: 'LED Ceiling Panel 40W',
        assetType: 'Lighting',
        fromLocation: 'Office Renovation Project',
        toLocation: 'Floor 2 Office',
        status: 'Assigned',
        priority: 'Medium',
        requestDate: '1/2/2026',
        assignedTeam: 'Team Beta',
        requestedBy: 'Sarah Johnson',
        notes: 'Asset relocation from inventory - LED Ceiling Panel 40W (Lighting)',
        trackingId: 'TRK-2026-002'
    },
    {
        id: '3',
        assetName: 'Ergonomic Mesh Task Chair',
        assetType: 'Furniture',
        fromLocation: 'Reception Area',
        toLocation: 'Office Renovation',
        status: 'Scheduled',
        priority: 'Low',
        requestDate: '31/1/2026',
        scheduledDate: '4/2/2026 at 13:52:13',
        assignedTeam: 'Team Gamma',
        requestedBy: 'Mike Wilson',
        notes: 'Asset relocation from inventory - Ergonomic Mesh Task Chair (Furniture)',
        trackingId: 'TRK-2026-003'
    },
    {
        id: '4',
        assetName: 'Executive Office Chair',
        assetType: 'Furniture',
        fromLocation: 'Main Warehouse',
        toLocation: 'Floor 4 Office',
        status: 'In-Progress',
        priority: 'Medium',
        requestDate: '30/1/2026',
        scheduledDate: '5/2/2026 at 13:52:13',
        assignedTeam: 'Team Delta',
        requestedBy: 'Lisa Davis',
        notes: 'Asset relocation from inventory - Executive Office Chair (Furniture)',
        trackingId: 'TRK-2026-004'
    }
];

export default function InventoryMovements() {
    const [movements, setMovements] = useState<MovementRequest[]>(INITIAL_MOVEMENTS);
    const [selectedMovement, setSelectedMovement] = useState<MovementRequest | null>(null);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

    const handleAssignClick = (movement: MovementRequest) => {
        setSelectedMovement(movement);
        setIsAssignModalOpen(true);
    };

    const handleAssignConfirm = (updatedData: any) => {
        setMovements(prev => prev.map(m => m.id === updatedData.id ? updatedData : m));
        setIsAssignModalOpen(false);
    };

    // Helper for Status Look & Feel
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Ordered': return 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-700/50';
            case 'Assigned': return 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-700/50';
            case 'Scheduled': return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-700/50';
            case 'In-Progress': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700/50';
            case 'Completed': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700/50';
            default: return 'bg-zinc-100 text-zinc-700 border-zinc-200';
        }
    };

    const getPriorityStyle = (priority: string) => {
        switch (priority) {
            case 'High': return 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/30';
            case 'Medium': return 'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800/30';
            case 'Low': return 'bg-green-50 text-green-600 border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/30';
            default: return 'bg-zinc-50 text-zinc-600';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Ordered': return <ClockIcon className="w-3 h-3" />;
            case 'Assigned': return <UserIcon className="w-3 h-3" />;
            case 'Scheduled': return <CalendarIcon className="w-3 h-3" />;
            case 'In-Progress': return <TruckIcon className="w-3 h-3" />;
            case 'Completed': return <CheckCircleIcon className="w-3 h-3" />;
            default: return <ClockIcon className="w-3 h-3" />;
        }
    }

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header / Legend (Optional) */}
            <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-lg p-3 flex items-start gap-3">
                <ExclamationCircleIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                <p className="text-sm text-blue-700 dark:text-blue-300">
                    All movements can now be assigned to teams regardless of their current status. Use "Assign Team" or "Reassign Team" buttons to manage team assignments.
                </p>
            </div>

            <div className="space-y-4">
                {movements.map((move) => (
                    <div key={move.id} className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-6 hover:shadow-md transition-shadow">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

                            {/* Left Content */}
                            <div className="space-y-4 flex-1">
                                {/* Title Row */}
                                <div className="flex items-center gap-3">
                                    <h3 className="font-semibold text-lg text-foreground">{move.assetName}</h3>
                                    {move.trackingId && (
                                        <span className="text-xs font-mono text-muted-foreground bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">
                                            {move.trackingId}
                                        </span>
                                    )}
                                    <span className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border", getStatusStyle(move.status))}>
                                        {getStatusIcon(move.status)}
                                        {move.status}
                                    </span>
                                    <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium border", getPriorityStyle(move.priority))}>
                                        {move.priority}
                                    </span>
                                </div>

                                {/* From -> To Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">From</p>
                                        <div className="flex items-center gap-2 text-sm text-foreground">
                                            <MapPinIcon className="w-4 h-4 text-zinc-400" />
                                            <span className="font-medium">{move.fromLocation}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">To</p>
                                        <div className="flex items-center gap-2 text-sm text-foreground">
                                            <ArrowRightIcon className="w-4 h-4 text-zinc-400" />
                                            <span className="font-medium">{move.toLocation}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Details Row */}
                                <div className="space-y-2">
                                    {move.assignedTeam && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="text-muted-foreground">Assigned Team:</span>
                                            <span className="font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded">{move.assignedTeam}</span>
                                        </div>
                                    )}
                                    {move.scheduledDate && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="text-muted-foreground">Scheduled:</span>
                                            <span className="font-medium text-foreground">{move.scheduledDate}</span>
                                        </div>
                                    )}
                                    <div className="text-sm text-muted-foreground italic">
                                        Notes: {move.notes}
                                    </div>
                                </div>
                            </div>

                            {/* Right Meta & Actions */}
                            <div className="flex flex-col items-end justify-between gap-4 border-l border-zinc-100 dark:border-zinc-800/50 lg:pl-6">
                                <div className="text-right space-y-1">
                                    <p className="text-xs text-muted-foreground">Order Date: <span className="font-medium text-foreground">{move.requestDate}</span></p>
                                    <p className="text-xs text-muted-foreground">By: <span className="font-medium text-foreground">{move.requestedBy}</span></p>
                                </div>

                                <div className="flex items-center gap-2 w-full lg:w-auto">
                                    <button
                                        onClick={() => handleAssignClick(move)}
                                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20">
                                        <UserIcon className="w-4 h-4" />
                                        {move.assignedTeam ? 'Reassign Team' : 'Assign Team'}
                                    </button>
                                    <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-foreground rounded-lg text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <AssignTeamModal
                isOpen={isAssignModalOpen}
                onClose={() => setIsAssignModalOpen(false)}
                onConfirm={handleAssignConfirm}
                item={selectedMovement}
                type="movement"
            />
        </div>
    );
}
