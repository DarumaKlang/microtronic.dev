
// ===== Comparison Table Component =====
interface ComparisonRow {
    aspect: string;
    template: string;
    custom: string;
}

interface ComparisonTableProps {
    title: string;
    rows: ComparisonRow[];
}

function ComparisonTable({ title, rows }: ComparisonTableProps) {
    const GLASS_PANEL_CLASS = "bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg";

    return (
        <div className={`${GLASS_PANEL_CLASS} p-6 rounded-2xl border-emerald-500/20`}>
            <h4 className="text-xl font-bold text-emerald-300 mb-4">{title}</h4>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="border-b border-emerald-500/30">
                        <tr>
                            <th className="text-left p-3 text-gray-400 font-semibold w-1/4">ด้าน</th>
                            <th className="text-left p-3 text-pink-400 font-semibold w-1/3">
                                Template (5,000 บาท)
                            </th>
                            <th className="text-left p-3 text-emerald-400 font-semibold w-5/12">
                                Custom System (120,000+ บาท)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, idx) => (
                            <tr
                                key={idx}
                                className="border-b border-white/5 hover:bg-white/5 transition-colors"
                            >
                                <td className="p-3 text-gray-300 font-medium align-top">
                                    {row.aspect}
                                </td>
                                <td className="p-3 text-gray-400 align-top">
                                    {row.template}
                                </td>
                                <td className="p-3 text-gray-200 align-top font-medium">
                                    {row.custom}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export { ComparisonTable };
