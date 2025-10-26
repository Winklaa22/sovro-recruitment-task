import { useState, useEffect } from 'react';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<number[]>([]);

    useEffect(() => {
        const savedFavorites = localStorage.getItem('cocktail-favorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    const addToFavorites = (cocktailId: number) => {
        const newFavorites = [...favorites, cocktailId];
        setFavorites(newFavorites);
        localStorage.setItem('cocktail-favorites', JSON.stringify(newFavorites));
    };

    const removeFromFavorites = (cocktailId: number) => {
        const newFavorites = favorites.filter(id => id !== cocktailId);
        setFavorites(newFavorites);
        localStorage.setItem('cocktail-favorites', JSON.stringify(newFavorites));
    };

    const toggleFavorite = (cocktailId: number) => {
        if (favorites.includes(cocktailId)) {
            removeFromFavorites(cocktailId);
        } else {
            addToFavorites(cocktailId);
        }
    };

    const isFavorite = (cocktailId: number) => {
        return favorites.includes(cocktailId);
    };

    return {
        favorites,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        isFavorite
    };
};