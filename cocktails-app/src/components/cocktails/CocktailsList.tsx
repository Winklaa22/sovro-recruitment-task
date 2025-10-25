import { useEffect, useState } from "react";
import { getCocktails } from "../../api/cocktailsApi";
import "../../styles/cocktailsList.css";
import CocktailCard from "./CocktailCard";

type Cocktail = {
  id: number;
  name: string;
  imageUrl: string;
  alcoholic: boolean
};

type Filter = {
    search?: string;
    category?: string;
    alcoholic?: boolean;
    glass?: string;
}

const CocktailsList = ({ filter = {} }: { filter?: Filter }) => {
    const [cocktails, setCocktails] = useState<Cocktail[]>([]);

    useEffect(() => {
        getCocktails({
                alcoholic: filter.alcoholic,
                name: `%${filter.search}%`,
                category: filter.category,
                glass: filter.glass
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setCocktails(data);
                } else {
                    console.error('Expected array but got:', data);
                }
            })
            .catch(error => {
                console.error('Error fetching cocktails:', error);
            });
    }, [filter]);

    return (
        <div className="cocktail-list">
            {cocktails.map(c => (
                <CocktailCard
                    key={c.id}
                    cocktailName={c.name}
                    imageUrl={c.imageUrl}
                    alcoholic={c.alcoholic}
                    id={c.id}
                />
            ))}
        </div>
    )
};

export default CocktailsList;