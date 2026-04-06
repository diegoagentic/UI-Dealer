import { Box, Layers } from 'lucide-react';
import { useState } from 'react';
import { useGenUI } from '../../../context/GenUIContext';

export default function LayoutProposalArtifact({ data }: { data: any }) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const { sendMessage } = useGenUI();

    const handleSelect = (option: string) => {
        setSelectedOption(option);
    };

    const handleConfirm = () => {
        if (!selectedOption) return;
        sendMessage(`System: "${selectedOption}" layout selected. Created new Project Board: "Office Expansion - ${selectedOption}".`);
    };

    return (
        <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-ai-light dark:bg-ai/10 px-4 py-3 border-b border-ai/10 dark:border-ai/30 flex items-center gap-2">
                <Layers className="w-4 h-4 text-ai dark:text-ai" />
                <h4 className="font-semibold text-ai dark:text-ai-light text-sm">Layout Generator</h4>
            </div>

            <div className="p-4 space-y-4">
                <div className="text-xs text-zinc-500 flex justify-between">
                    <span>Dimensions: <strong>{data.dimensions}</strong></span>
                    <span>Target Cap: <strong>{data.capacity} ppl</strong></span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    {data.options.map((opt: string) => (
                        <button
                            key={opt}
                            onClick={() => handleSelect(opt)}
                            className={`aspect-square rounded-lg border flex flex-col items-center justify-center gap-2 transition-all ${selectedOption === opt
                                ? 'bg-ai-light dark:bg-ai/15 border-ai/50 ring-1 ring-indigo-500'
                                : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-ai/30'
                                }`}
                        >
                            <Box className={`w-6 h-6 ${selectedOption === opt ? 'text-ai' : 'text-zinc-400'}`} />
                            <span className={`text-[10px] font-medium ${selectedOption === opt ? 'text-ai' : 'text-zinc-500'}`}>{opt}</span>
                        </button>
                    ))}
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg text-xs text-zinc-500 border border-zinc-100 dark:border-zinc-700">
                    {selectedOption ? (
                        <p><strong>{selectedOption} Analysis:</strong> Optimized for collaboration. Density ratio 1:120sqft. Includes 2 breakout zones.</p>
                    ) : (
                        <p className="italic">Select a layout option to see analysis...</p>
                    )}
                </div>

                <button
                    onClick={handleConfirm}
                    disabled={!selectedOption}
                    className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2 ${selectedOption
                        ? 'bg-ai hover:bg-ai text-white'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
                        }`}
                >
                    Generate Project Board
                </button>
            </div>
        </div>
    );
}
