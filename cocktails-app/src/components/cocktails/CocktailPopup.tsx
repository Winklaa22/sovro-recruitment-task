import { useEffect, useState } from "react";
import { getCocktailById } from "../../api/cocktailsApi";
import "../../styles/cocktailPopup.css";

type Cocktail = {
  id: number;
  name: string;
  category: string;
  glass: string;
  instructions: string;
  imageUrl: string;
  ingredients: { name: string; measure: string }[];
};

type Props = {
    cocktailId: number;
}

const CocktailPopup = ({cocktailId} : Props) => {

    const [cocktailData, setCocktailData] = useState<Cocktail | null>(null);

    useEffect(() => {
        const fetchCocktail = async () => {
            try {
                const data = await getCocktailById(cocktailId);
                setCocktailData(data.data);
                console.log(data.data)
            } catch (err) {
                console.error('Error fetching cocktail:', err);
            }

        };

        if (cocktailId) {
            fetchCocktail();
        }
    }, [cocktailId]);

    if (!cocktailData) {
        return (
            <div className="cocktail-popup">
                <p>No cocktail data available</p>
            </div>
        );
    }

    return (
        <div className="cocktail-popup">
            <h2>{cocktailData.name}</h2>
            <div className="popup-content">
                
                <img src={cocktailData.imageUrl} alt={cocktailData.name} />
                <div className="cocktail-info">
                    <p><strong>Category:</strong> {cocktailData.category}</p>
                    <p><strong>Glass:</strong> {cocktailData.glass}</p>
                    <p><strong>Instructions:</strong> {cocktailData.instructions}</p>
                </div>
                {cocktailData.ingredients && cocktailData.ingredients.length > 0 && (
                    <div className="ingredients">
                        <h3>Ingredients:</h3>
                        <ul>
                            {cocktailData.ingredients.map((ingredient, index) => (
                                <li key={index}>
                                    {ingredient.measure} {ingredient.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
};

export default CocktailPopup;