export function LoadingState() {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <span className="loading-spinner" aria-hidden="true" />
      <p>Ladowanie danych...</p>
    </div>
  );
}
