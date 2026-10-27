import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import useFavorites from '../hooks/useFavorites';

const FavoriteButton = ({ meal, variant = 'icon', className = '' }) => {
  const { isFavorite, toggle } = useFavorites();
  const saved = isFavorite(meal.idMeal);
  const Icon = saved ? FaHeart : FaRegHeart;

  if (variant === 'button') {
    return (
      <button
        type="button"
        onClick={() => toggle(meal)}
        aria-pressed={saved}
        className={`${saved ? 'btn bg-brand-50 text-brand ring-1 ring-brand/30 hover:bg-brand-100' : 'btn-outline'} ${className}`}
      >
        <Icon
          className={saved ? 'text-brand' : ''}
          aria-hidden
        />
        {saved ? 'Saved' : 'Save recipe'}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggle(meal)}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${meal.strMeal} from saved` : `Save ${meal.strMeal}`}
      title={saved ? 'Remove from saved' : 'Save recipe'}
      className={`flex size-11 items-center justify-center rounded-full bg-white/95 shadow-card backdrop-blur transition-transform hover:scale-110 ${className}`}
    >
      <Icon className={`text-lg ${saved ? 'text-brand' : 'text-ink'}`} />
    </button>
  );
};

export default FavoriteButton;
