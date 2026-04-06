import { useState } from 'react';
import { Paperclip, Plus, Search, X } from 'lucide-react';
import { SlideOver, SlideOverHeader, SlideOverTitle, SlideOverDescription, SlideOverBody } from 'strata-design-system';
import { Button, Input } from 'strata-design-system';

interface SendItemSlideOverProps {
    open: boolean;
    onClose: () => void;
    transactionType: 'quote' | 'order' | 'ack' | 'project';
    transactionId: string;
    itemName: string;
    itemId: string;
    onSend: () => void;
}

interface Stakeholder {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar: string;
    initials: string;
    color: string;
}

const STAKEHOLDERS: Stakeholder[] = [
    { id: '1', name: 'Sarah Mitchell', email: 'sarah.mitchell@acmecorp.com', role: 'Procurement Manager', avatar: '', initials: 'SM', color: 'bg-blue-500' },
    { id: '2', name: 'Michael Chen', email: 'm.chen@acmecorp.com', role: 'VP of Operations', avatar: '', initials: 'MC', color: 'bg-success' },
    { id: '3', name: 'Jessica Torres', email: 'j.torres@strata.io', role: 'Account Executive', avatar: '', initials: 'JT', color: 'bg-violet-500' },
    { id: '4', name: 'David Park', email: 'd.park@strata.io', role: 'Product Manager', avatar: '', initials: 'DP', color: 'bg-amber-500' },
    { id: '5', name: 'Emily Watson', email: 'e.watson@acmecorp.com', role: 'Finance Director', avatar: '', initials: 'EW', color: 'bg-rose-500' },
    { id: '6', name: 'James Kim', email: 'j.kim@strata.io', role: 'Logistics Coordinator', avatar: '', initials: 'JK', color: 'bg-cyan-500' },
    { id: '7', name: 'Rachel Adams', email: 'r.adams@acmecorp.com', role: 'Project Lead', avatar: '', initials: 'RA', color: 'bg-ai' },
];

const TYPE_LABELS: Record<string, string> = {
    quote: 'Quote',
    order: 'Purchase Order',
    ack: 'Acknowledgment',
    project: 'Inventory Report',
};

export default function SendItemSlideOver({ open, onClose, transactionType, transactionId, itemName, itemId, onSend }: SendItemSlideOverProps) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [search, setSearch] = useState('');
    const [showAddNew, setShowAddNew] = useState(false);
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newRole, setNewRole] = useState('');
    const label = TYPE_LABELS[transactionType];

    const toggleStakeholder = (id: string) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const filteredStakeholders = STAKEHOLDERS.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase()) ||
        s.role.toLowerCase().includes(search.toLowerCase())
    );

    const handleSend = () => {
        onSend();
        setSelectedIds([]);
        setSearch('');
        setShowAddNew(false);
        onClose();
    };

    const handleAddNew = () => {
        if (newName && newEmail) {
            setShowAddNew(false);
            setNewName('');
            setNewEmail('');
            setNewRole('');
        }
    };

    const selectedStakeholders = STAKEHOLDERS.filter(s => selectedIds.includes(s.id));

    return (
        <SlideOver open={open} onClose={() => onClose()}>
            <SlideOverHeader onClose={onClose}>
                <SlideOverTitle>Send Item Details</SlideOverTitle>
                <SlideOverDescription>Share {itemName} details with stakeholders</SlideOverDescription>
            </SlideOverHeader>
            <SlideOverBody>
                <div className="space-y-5">
                    {/* Recipients — Stakeholder Multi-select */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Recipients</label>

                        {/* Selected chips */}
                        {selectedStakeholders.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-3">
                                {selectedStakeholders.map(s => (
                                    <span key={s.id} className="inline-flex items-center gap-1.5 pl-1 pr-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-sm">
                                        <span className={`inline-flex items-center justify-center h-5 w-5 rounded-full text-[10px] font-bold text-white ${s.color}`}>
                                            {s.initials}
                                        </span>
                                        <span className="text-foreground text-xs font-medium">{s.name}</span>
                                        <button onClick={() => toggleStakeholder(s.id)} className="text-muted-foreground hover:text-foreground transition-colors">
                                            <X className="h-3 w-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Search */}
                        <div className="relative mb-2">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search stakeholders..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>

                        {/* Stakeholder list */}
                        <div className="border border-border rounded-lg divide-y divide-border max-h-52 overflow-y-auto">
                            {filteredStakeholders.map(s => {
                                const isSelected = selectedIds.includes(s.id);
                                return (
                                    <label
                                        key={s.id}
                                        className={`flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors ${isSelected ? 'bg-primary/5' : 'hover:bg-muted/50'}`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => toggleStakeholder(s.id)}
                                            className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-600 text-ai focus:ring-indigo-500"
                                        />
                                        <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full text-xs font-bold text-white shrink-0 ${s.color}`}>
                                            {s.initials}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-medium text-foreground truncate">{s.name}</div>
                                            <div className="text-xs text-muted-foreground truncate">{s.role} · {s.email}</div>
                                        </div>
                                    </label>
                                );
                            })}
                            {filteredStakeholders.length === 0 && (
                                <div className="px-3 py-4 text-sm text-muted-foreground text-center">No stakeholders found</div>
                            )}
                        </div>

                        {/* Add new stakeholder */}
                        {!showAddNew ? (
                            <button
                                onClick={() => setShowAddNew(true)}
                                className="mt-2 flex items-center gap-1.5 text-sm text-ai hover:text-ai dark:hover:text-ai font-medium transition-colors"
                            >
                                <Plus className="h-4 w-4" />
                                Add new recipient
                            </button>
                        ) : (
                            <div className="mt-3 p-3 rounded-lg border border-border bg-muted/30 space-y-2">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-semibold uppercase text-muted-foreground">New Recipient</span>
                                    <button onClick={() => setShowAddNew(false)} className="text-muted-foreground hover:text-foreground">
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                                <Input placeholder="Full name" value={newName} onChange={(e) => setNewName(e.target.value)} />
                                <Input placeholder="Email address" type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                                <Input placeholder="Role (optional)" value={newRole} onChange={(e) => setNewRole(e.target.value)} />
                                <div className="flex justify-end">
                                    <Button variant="primary" onClick={handleAddNew} className="text-xs">Add</Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Subject */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Subject</label>
                        <Input
                            value={`${label} ${transactionId} — ${itemName} Details`}
                            readOnly
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                        <textarea
                            rows={4}
                            defaultValue={`Hi,\n\nPlease find attached the details for ${itemName} (${itemId}) from ${label} ${transactionId}.\n\nPlease review and let me know if you have any questions.\n\nBest regards`}
                            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        />
                    </div>

                    {/* Attachment */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Attachments</label>
                        <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2.5">
                            <Paperclip className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-foreground">{label.replace(/\s/g, '_')}_{transactionId}_{itemId}.pdf</span>
                            <span className="ml-auto text-xs text-muted-foreground">Auto-attached</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                    <span className="text-xs text-muted-foreground">
                        {selectedIds.length > 0 ? `${selectedIds.length} recipient${selectedIds.length > 1 ? 's' : ''} selected` : 'No recipients selected'}
                    </span>
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={onClose}>Cancel</Button>
                        <Button variant="primary" onClick={handleSend} disabled={selectedIds.length === 0}>
                            Send to {selectedIds.length > 0 ? selectedIds.length : ''} {selectedIds.length === 1 ? 'person' : selectedIds.length > 1 ? 'people' : ''}
                        </Button>
                    </div>
                </div>
            </SlideOverBody>
        </SlideOver>
    );
}
