import "../../styles/cocktailCard.css";

interface CocktailCardProps {
  id: number;
  cocktailName: string;
  imageUrl: string;
}

const CocktailCard = ({id, cocktailName, imageUrl} : CocktailCardProps) => {
    return (
    <div className="cocktail-card">
        <h2>{cocktailName}</h2>
        <img src={imageUrl} alt="" />
    </div>
    )
};

export default CocktailCard;