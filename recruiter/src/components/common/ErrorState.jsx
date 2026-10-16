export default function ErrorState({ message, onRetry }) {
  return (
    <div role="alert" className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-3xl">Content could not be loaded</h1>
      <p className="mt-3 text-muted">
        {message || "The server did not respond."} Check your connection and try again.
      </p>
      <button type="button" onClick={onRetry} className="btn btn-primary mt-6">
        Try again
      </button>
    </div>
  );
}
