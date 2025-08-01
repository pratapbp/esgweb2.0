export default function BlogSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 h-full">
          <div className="h-48 bg-slate-700/50 animate-pulse"></div>
          <div className="p-5 space-y-4">
            <div className="flex gap-4">
              <div className="h-3 w-24 bg-slate-700 rounded animate-pulse"></div>
              <div className="h-3 w-20 bg-slate-700 rounded animate-pulse"></div>
            </div>
            <div className="h-6 w-3/4 bg-slate-700 rounded animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-700 rounded animate-pulse"></div>
              <div className="h-4 bg-slate-700 rounded animate-pulse"></div>
              <div className="h-4 w-2/3 bg-slate-700 rounded animate-pulse"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-4 w-20 bg-slate-700 rounded animate-pulse"></div>
              <div className="flex gap-2">
                <div className="h-8 w-8 bg-slate-700 rounded-full animate-pulse"></div>
                <div className="h-8 w-8 bg-slate-700 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
