import { FileText, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useGenUI } from '../../../context/GenUIContext';

export default function QuoteProposalArtifact({ data }: { data: any }) {
    const [generated, setGenerated] = useState(false);
    const { sendMessage } = useGenUI();

    const handlePreview = () => {
        setGenerated(true);
        setTimeout(() => {
            sendMessage(`System: Proposal PDF for ${data.client} generated. Opening preview...`);
        }, 500);
    };

    if (generated) {
        return (
            <div className="p-4 bg-ai-light dark:bg-ai/10 rounded-lg border border-ai/20 dark:border-ai/30 flex items-start gap-3 animate-in fade-in zoom-in duration-300">
                <div className="p-1 bg-ai-light dark:bg-ai/15 rounded-full text-ai">
                    <FileText className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="font-semibold text-ai dark:text-ai-light text-sm">Proposal Ready</h4>
                    <p className="text-xs text-ai dark:text-ai-light mt-1">PDF downloaded. Sent copy to your email.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden group">
            {/* Header */}
            <div className="relative bg-ai px-4 py-8 flex flex-col items-center justify-center text-white overflow-hidden">
                {/* Abstract Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-ai to-purple-700"></div>
                <div className="absolute top-0 left-0 w-full h-full opacity-20">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 text-center">
                    <Sparkles className="w-8 h-8 mx-auto mb-2 text-ai-light" />
                    <h4 className="font-brand font-bold text-xl tracking-tight">{data.client}</h4>
                    <p className="text-ai-light text-xs uppercase tracking-widest mt-1">Strategic Proposal</p>
                </div>
            </div>

            <div className="p-4 space-y-4">
                <div className="flex justify-between items-end border-b border-zinc-100 dark:border-zinc-800 pb-3">
                    <div>
                        <p className="text-xs text-zinc-500 uppercase font-semibold">Vibe / Style</p>
                        <p className="text-sm font-medium text-foreground">{data.style}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-zinc-500 uppercase font-semibold">Est. Total</p>
                        <p className="text-lg font-bold text-ai">{data.total}</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="aspect-[4/3] bg-zinc-200 dark:bg-zinc-800 rounded md:group-hover:opacity-100 transition-opacity"></div>
                    ))}
                </div>
                <p className="text-[10px] text-center text-zinc-400">Includes moodboard, product list, and sustainability specs.</p>

                <button
                    onClick={handlePreview}
                    className="w-full py-2.5 bg-ai hover:bg-ai text-white rounded-lg text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
                >
                    <FileText className="w-4 h-4" />
                    Preview & Export PDF
                </button>
            </div>
        </div>
    );
}
