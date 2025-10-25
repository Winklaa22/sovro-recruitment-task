import { useEffect, useState } from "react";
import { getCocktails } from "../../api/cocktailsApi";
import "../../styles/cocktailsList.css";
import CocktailCard from "./CocktailCard";

type Cocktail = {
  id: number;
  name: string;
  imageUrl: string;
};

const CocktailsList = () => {
    const [cocktails, setCocktails] = useState<Cocktail[]>([]);

    useEffect(() => {
        getCocktails()
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
    }, []);

    return (
        <div className="cocktail-list">
            {cocktails.map(c => (
                <CocktailCard
                    key={c.id}
                    cocktailName={c.name}
                    imageUrl={c.imageUrl} 
                    id={c.id}
                />
            ))}
        </div>
    )
};

export default CocktailsList;