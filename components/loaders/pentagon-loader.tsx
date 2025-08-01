"use client"

export default function PentagonLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="relative">
        {/* Pentagon Shape */}
        <div className="w-16 h-16 relative animate-spin">
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon
              points="50,10 90,35 75,85 25,85 10,35"
              stroke="url(#gradient)"
              strokeWidth="3"
              fill="none"
              className="animate-pulse"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Loading Text */}
        <div className="mt-4 text-center">
          <p className="text-sm font-medium text-gray-600 animate-pulse">Loading...</p>
        </div>
      </div>
    </div>
  )
}
