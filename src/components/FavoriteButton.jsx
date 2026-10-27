import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import useFavorites from '../hooks/useFavorites';
import useLanguage from '../i18n/useLanguage';

const FavoriteButton = ({ meal, variant = 'icon', className = '' }) => {
  const { isFavorite, toggle } = useFavorites();
  const { t } = useLanguage();
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
        {saved ? t('fav.saved') : t('fav.save')}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggle(meal)}
      aria-pressed={saved}
      aria-label={saved ? t('fav.removeNamed', meal.strMeal) : t('fav.saveNamed', meal.strMeal)}
      title={saved ? t('fav.removeTitle') : t('fav.save')}
      className={`flex size-11 items-center justify-center rounded-full bg-white/95 shadow-card backdrop-blur transition-transform hover:scale-110 ${className}`}
    >
      <Icon className={`text-lg ${saved ? 'text-brand' : 'text-ink'}`} />
    </button>
  );
};

export default FavoriteButton;
