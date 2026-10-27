import React from 'react';
import { Link } from 'react-router-dom';

const StatusMessage = ({ title, message, onRetry, action }) => (
  <div className="rounded-3xl border border-dashed border-line bg-white/60 px-6 py-14 text-center">
    <p className="font-serif text-2xl text-ink">{title}</p>
    {message && <p className="mx-auto mt-2 max-w-md text-ink-soft">{message}</p>}
    <div className="mt-6 flex justify-center gap-3">
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="btn-primary"
        >
          Try again
        </button>
      )}
      {action && (
        <Link
          to={action.to}
          className="btn-outline"
        >
          {action.label}
        </Link>
      )}
    </div>
  </div>
);

export default StatusMessage;
