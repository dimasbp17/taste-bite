import React, { useState } from 'react';
import { FiExternalLink, FiPlay } from 'react-icons/fi';

// Shows the YouTube thumbnail first and only loads the player when the user
// presses play, so the page stays fast and nothing autoplays unexpectedly.
const RecipeVideo = ({ videoId, title, url }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <section
      id="video"
      className="scroll-mt-28 print:hidden"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-3xl font-semibold">Watch how it&apos;s made</h2>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-brand"
        >
          Open on YouTube <FiExternalLink aria-hidden />
        </a>
      </div>

      <div className="relative mt-6 aspect-video overflow-hidden rounded-3xl bg-ink shadow-card">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={`Video: how to make ${title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 size-full"
            aria-label={`Play video: how to make ${title}`}
          >
            <img
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="size-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
            />
            <span className="absolute inset-0 bg-ink/25" />
            <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-full bg-white py-3 pl-4 pr-6 font-semibold text-ink shadow-lift transition-transform group-hover:scale-105">
              <span className="flex size-10 items-center justify-center rounded-full bg-brand text-white">
                <FiPlay
                  className="translate-x-px"
                  aria-hidden
                />
              </span>
              Play video
            </span>
          </button>
        )}
      </div>
    </section>
  );
};

export default RecipeVideo;
