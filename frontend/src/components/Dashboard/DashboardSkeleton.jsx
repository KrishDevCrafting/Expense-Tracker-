import React from "react";

// Base shimmer skeleton block
const Skeleton = ({ className = "", style = {} }) => (
  <div
    className={`rounded-lg animate-pulse ${className}`}
    style={{
      background:
        "linear-gradient(90deg, rgba(139,92,246,0.06) 25%, rgba(139,92,246,0.12) 50%, rgba(139,92,246,0.06) 75%)",
      backgroundSize: "200% 100%",
      animation: "skeletonShimmer 1.8s ease-in-out infinite",
      ...style,
    }}
  />
);

// Welcome Banner Skeleton
export const WelcomeBannerSkeleton = () => (
  <div
    className="rounded-2xl p-6 mb-6 border"
    style={{
      background: "rgba(139,92,246,0.03)",
      borderColor: "rgba(139,92,246,0.08)",
    }}
  >
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-3">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-64 h-7 rounded-lg" />
        </div>
        <Skeleton className="w-48 h-4 rounded mb-3" />
        <Skeleton className="w-80 h-4 rounded" />
      </div>
      <Skeleton className="w-28 h-16 rounded-xl" />
    </div>
  </div>
);

// Info Card Skeleton
export const InfoCardSkeleton = () => (
  <div
    className="p-6 rounded-2xl border"
    style={{
      background: "rgba(139,92,246,0.02)",
      borderColor: "rgba(139,92,246,0.06)",
    }}
  >
    <div className="flex gap-5 items-center">
      <Skeleton className="w-14 h-14 rounded-2xl" />
      <div className="flex-1">
        <Skeleton className="w-24 h-3 rounded mb-2" />
        <Skeleton className="w-32 h-7 rounded-lg" />
      </div>
    </div>
  </div>
);

// Budget Progress Skeleton
export const BudgetProgressSkeleton = () => (
  <div
    className="card"
    style={{ border: "1px solid rgba(139,92,246,0.06)" }}
  >
    <div className="flex items-center justify-between mb-4">
      <div>
        <Skeleton className="w-36 h-5 rounded mb-2" />
        <Skeleton className="w-48 h-3 rounded" />
      </div>
      <Skeleton className="w-20 h-7 rounded-full" />
    </div>
    <Skeleton className="w-full h-4 rounded-full mb-3" />
    <div className="flex justify-between">
      <Skeleton className="w-24 h-8 rounded" />
      <Skeleton className="w-40 h-4 rounded" />
      <Skeleton className="w-24 h-8 rounded" />
    </div>
  </div>
);

// Chart Card Skeleton
export const ChartCardSkeleton = () => (
  <div
    className="card"
    style={{ border: "1px solid rgba(139,92,246,0.06)" }}
  >
    <div className="flex items-center justify-between mb-6">
      <div>
        <Skeleton className="w-40 h-5 rounded mb-2" />
        <Skeleton className="w-56 h-3 rounded" />
      </div>
      <Skeleton className="w-8 h-8 rounded-lg" />
    </div>
    {/* Fake chart area */}
    <div className="flex items-end justify-center gap-3 h-48 pt-4">
      {[40, 65, 45, 80, 55, 70, 50].map((h, i) => (
        <Skeleton
          key={i}
          className="rounded-t-lg"
          style={{
            width: "28px",
            height: `${h}%`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  </div>
);

// Transaction List Skeleton
export const TransactionListSkeleton = () => (
  <div
    className="card"
    style={{ border: "1px solid rgba(139,92,246,0.06)" }}
  >
    <div className="flex items-center justify-between mb-6">
      <div>
        <Skeleton className="w-44 h-5 rounded mb-2" />
        <Skeleton className="w-28 h-3 rounded" />
      </div>
      <Skeleton className="w-20 h-8 rounded-lg" />
    </div>
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="flex items-center gap-4 py-3">
        <Skeleton className="w-11 h-11 rounded-xl" />
        <div className="flex-1">
          <Skeleton className="w-28 h-4 rounded mb-2" />
          <Skeleton className="w-20 h-3 rounded" />
        </div>
        <Skeleton className="w-24 h-8 rounded-lg" />
      </div>
    ))}
  </div>
);

// Donut Chart Skeleton
export const DonutChartSkeleton = () => (
  <div
    className="card"
    style={{ border: "1px solid rgba(139,92,246,0.06)" }}
  >
    <div className="flex items-center justify-between mb-6">
      <div>
        <Skeleton className="w-40 h-5 rounded mb-2" />
        <Skeleton className="w-56 h-3 rounded" />
      </div>
      <Skeleton className="w-8 h-8 rounded-lg" />
    </div>
    {/* Fake donut */}
    <div className="flex items-center justify-center py-8">
      <div
        className="w-44 h-44 rounded-full animate-pulse"
        style={{
          border: "24px solid rgba(139,92,246,0.08)",
          borderTopColor: "rgba(139,92,246,0.18)",
          borderRightColor: "rgba(244,63,94,0.12)",
          animation: "skeletonShimmer 1.8s ease-in-out infinite",
        }}
      />
    </div>
    {/* Fake legend */}
    <div className="flex justify-center gap-3 mt-4">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="w-28 h-7 rounded-full" />
      ))}
    </div>
  </div>
);

// Full Dashboard Skeleton
export const DashboardSkeleton = () => (
  <>
    <WelcomeBannerSkeleton />

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <InfoCardSkeleton />
      <InfoCardSkeleton />
      <InfoCardSkeleton />
    </div>

    <div className="mt-6">
      <BudgetProgressSkeleton />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TransactionListSkeleton />
      <DonutChartSkeleton />
      <TransactionListSkeleton />
      <ChartCardSkeleton />
      <DonutChartSkeleton />
      <TransactionListSkeleton />
    </div>

    {/* Shimmer keyframes */}
    <style>{`
      @keyframes skeletonShimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `}</style>
  </>
);
