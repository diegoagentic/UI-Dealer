import React, { useState } from 'react';
import AssignTeamModal from './AssignTeamModal';
import {
    WrenchScrewdriverIcon,
    CalendarIcon,
    ClockIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

export interface MaintenanceTask {
    id: string;
    assetName: string;
    issueType: string;
    description: string;
    status: 'Scheduled' | 'In-Progress' | 'Completed' | 'Overdue';
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
    provider: string;
    scheduledDate: string;
    costEstimate?: string;
    trackingId?: string;
    assignedTeam?: string; // Add assigned team property
}

const INITIAL_MAINTENANCE: MaintenanceTask[] = [
    {
        id: '1',
        assetName: 'LED Desk Lamp',
        issueType: 'Electrical Repair',
        description: 'Flickering light, needs ballast replacement',
        status: 'In-Progress',
        priority: 'Medium',
        provider: 'BrightLights Services',
        scheduledDate: '2/2/2026',
        costEstimate: '$45.00',
        trackingId: 'MNT-2026-001'
    },
    {
        id: '2',
        assetName: 'Standing Desk (Motorized)',
        issueType: 'Mechanical Inspection',
        description: 'Motor making grinding noise when lifting',
        status: 'Overdue',
        priority: 'High',
        provider: 'OfficeFix Pro',
        scheduledDate: '28/1/2026',
        costEstimate: '$120.00',
        trackingId: 'MNT-2026-002'
    },
    {
        id: '3',
        assetName: 'HVAC Unit #4',
        issueType: 'Preventative Maintenance',
        description: 'Quarterly filter change and system check',
        status: 'Scheduled',
        priority: 'Low',
        provider: 'CoolAir Systems',
        scheduledDate: '10/2/2026',
        costEstimate: '$250.00',
        trackingId: 'MNT-2026-003'
    }
];

export default function InventoryMaintenance() {
    const [maintenanceTasks, setMaintenanceTasks] = useState<MaintenanceTask[]>(INITIAL_MAINTENANCE);
    const [selectedTask, setSelectedTask] = useState<MaintenanceTask | null>(null);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

    const handleAssignClick = (task: MaintenanceTask) => {
        setSelectedTask(task);
        setIsAssignModalOpen(true);
    };

    const handleAssignConfirm = (updatedData: any) => {
        setMaintenanceTasks(prev => prev.map(t => t.id === updatedData.id ? updatedData : t));
        setIsAssignModalOpen(false);
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Scheduled': return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400';
            case 'In-Progress': return 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400';
            case 'Completed': return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400';
            case 'Overdue': return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-zinc-50 text-zinc-700 border-zinc-200';
        }
    };

    const getPriorityIcon = (priority: string) => {
        if (priority === 'High' || priority === 'Critical') return <ExclamationTriangleIcon className="w-4 h-4 text-red-500" />;
        return <WrenchScrewdriverIcon className="w-4 h-4 text-zinc-400" />;
    };

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {maintenanceTasks.map((task) => (
                <div key={task.id} className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

                        <div className="space-y-4 flex-1">
                            <div className="flex items-center gap-3">
                                <h3 className="font-semibold text-lg text-foreground">{task.assetName}</h3>
                                {task.trackingId && (
                                    <span className="text-xs font-mono text-muted-foreground bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">
                                        {task.trackingId}
                                    </span>
                                )}
                                <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold border", getStatusStyle(task.status))}>
                                    {task.status}
                                </span>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    {getPriorityIcon(task.priority)}
                                    {task.issueType}
                                </span>
                            </div>

                            <p className="text-sm text-foreground">{task.description}</p>

                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <ClockIcon className="w-4 h-4" />
                                    <span>{task.scheduledDate}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <WrenchScrewdriverIcon className="w-4 h-4" />
                                    <span>{task.provider}</span>
                                    {task.assignedTeam && <span className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-1.5 py-0.5 rounded ml-1">Assigned: {task.assignedTeam}</span>}
                                </div>
                                {task.costEstimate && (
                                    <div className="font-medium text-foreground">
                                        Est: {task.costEstimate}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button className="px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-foreground rounded-lg text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors">
                                View History
                            </button>
                            <button
                                onClick={() => handleAssignClick(task)}
                                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">
                                {task.assignedTeam ? 'Reassign Team' : 'Assign Team'}
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            <AssignTeamModal
                isOpen={isAssignModalOpen}
                onClose={() => setIsAssignModalOpen(false)}
                onConfirm={handleAssignConfirm}
                item={selectedTask}
                type="maintenance"
            />
        </div>
    );
}
