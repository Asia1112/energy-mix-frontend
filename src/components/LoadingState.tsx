export function LoadingState() {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <span className="loading-spinner" aria-hidden="true" />
      <p>Ładowanie danych...</p>
    </div>
  );
}
