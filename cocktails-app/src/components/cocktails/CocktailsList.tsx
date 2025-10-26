import { useEffect, useState } from "react";
import { getCocktails } from "../../api/cocktailsApi";
import "../../styles/cocktailsList.css";
import { useFavorites } from "../../hooks/useFavorites";
import CocktailCard from "./CocktailCard";

type Cocktail = {
  id: number;
  name: string;
  imageUrl: string;
  alcoholic: boolean
};

const CocktailsList = ({ cocktails = [] }: { cocktails?: Cocktail[] }) => {
    const {favorites} = useFavorites();

    return (
        <div className="cocktail-list">
            {cocktails.map(c => (
                <CocktailCard
                    key={c.id}
                    cocktailName={c.name}
                    imageUrl={c.imageUrl}
                    alcoholic={c.alcoholic}
                    id={c.id}
                    isFavoriteCard={favorites.includes(c.id)}
                />
            ))}
        </div>
    )
};

export default CocktailsList;