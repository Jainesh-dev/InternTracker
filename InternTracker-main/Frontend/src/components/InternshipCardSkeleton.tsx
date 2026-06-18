const InternshipCardSkeleton = () => (
  <div className="bg-card rounded-2xl card-shadow border border-border/60 p-5 animate-pulse">
    <div className="flex items-start gap-4 mb-4">
      <div className="w-11 h-11 rounded-xl bg-muted" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-muted rounded-lg w-3/4" />
        <div className="h-3 bg-muted rounded-lg w-1/2" />
      </div>
    </div>
    <div className="flex gap-2.5 mb-5">
      <div className="h-6 bg-muted rounded-lg w-20" />
      <div className="h-6 bg-muted rounded-lg w-16" />
    </div>
    <div className="h-10 bg-muted rounded-xl" />
  </div>
);

export default InternshipCardSkeleton;
