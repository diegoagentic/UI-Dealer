/**
 * SDB-1315 · FE-10 — ArtifactDownloads
 *
 * Grid of downloadable file cards for a PO. Each card shows the file
 * icon (by format), filename, size, date, and a direct download CTA.
 * Single click triggers download via the artifact's downloadUrl.
 */

import { clsx } from 'clsx'
import { Download, File, FileSpreadsheet, FileText, Code } from 'lucide-react'
import type { POArtifact } from './types'

interface ArtifactDownloadsProps {
    artifacts: POArtifact[]
    loading?: boolean
}

const FORMAT_ICON: Record<POArtifact['format'], typeof FileText> = {
    pdf: FileText,
    csv: FileSpreadsheet,
    edi: Code,
    xml: Code,
}

const FORMAT_COLOR: Record<POArtifact['format'], string> = {
    pdf: 'bg-red-500/10 text-red-600 dark:text-red-400',
    csv: 'bg-green-500/10 text-green-600 dark:text-green-400',
    edi: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    xml: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
}

function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })

export default function ArtifactDownloads({
    artifacts,
    loading = false,
}: ArtifactDownloadsProps) {
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="h-24 rounded-xl bg-muted/40 animate-pulse"
                    />
                ))}
            </div>
        )
    }

    if (artifacts.length === 0) {
        return (
            <div className="rounded-2xl bg-muted/20 border border-border p-6 text-center">
                <File className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-semibold text-foreground">
                    No artifacts yet
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                    Artifacts will appear here after the PO is submitted.
                </p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {artifacts.map((artifact) => {
                const Icon = FORMAT_ICON[artifact.format] ?? File
                const colorClass = FORMAT_COLOR[artifact.format] ?? 'bg-muted/50 text-muted-foreground'
                return (
                    <a
                        key={artifact.id}
                        href={artifact.downloadUrl}
                        download={artifact.fileName}
                        className="group flex items-start gap-3 rounded-xl bg-card dark:bg-zinc-800 border border-border hover:border-primary/40 p-3 transition-colors"
                    >
                        <div
                            className={clsx(
                                'shrink-0 w-10 h-10 rounded-xl flex items-center justify-center',
                                colorClass
                            )}
                        >
                            <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                                {artifact.fileName}
                            </p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">
                                {artifact.format.toUpperCase()} · {formatFileSize(artifact.fileSize)} · {fmtDate(artifact.createdAt)}
                            </p>
                            <p className="text-[9px] text-muted-foreground mt-0.5 uppercase tracking-wider">
                                {artifact.type.replace(/_/g, ' ')}
                            </p>
                        </div>
                        <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 mt-1 transition-colors" />
                    </a>
                )
            })}
        </div>
    )
}
