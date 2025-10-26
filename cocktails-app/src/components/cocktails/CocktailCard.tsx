import { useModal } from "../../ModalContext";
import "../../styles/cocktailCard.css";
import { BiSolidDrink } from "react-icons/bi";
import { RiDrinks2Fill } from "react-icons/ri";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "../../hooks/useFavorites";
import CocktailPopup from "./CocktailPopup";


interface CocktailCardProps {
  id: number;
  cocktailName: string;
  imageUrl: string;
  alcoholic: boolean;
  isFavoriteCard?: boolean;
}

const CocktailCard = ({id, cocktailName, imageUrl, alcoholic, isFavoriteCard = false} : CocktailCardProps) => {
    
    const {openModal} = useModal();
    const {toggleFavorite, isFavorite} = useFavorites();

    const openPopup = () => {
        openModal(<CocktailPopup cocktailId={id} />)
    };

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleFavorite(id);
    };

    return (
    <div className={`cocktail-card ${isFavoriteCard ? 'favorite-card' : ''}`} onClick={openPopup}>
        <div className="card-content">
            <img src={imageUrl} alt="" />
            <h2>{cocktailName}</h2>
        </div>

        <button 
            className="favorite-btn" 
            onClick={handleFavoriteClick}
            aria-label={isFavorite(id) ? 'Remove from favorites' : 'Add to favorites'}
        >
            {isFavorite(id) ? <FaHeart /> : <FaRegHeart />}
        </button>

        <div className="card_sign" id="top">{alcoholic ? <BiSolidDrink /> : <RiDrinks2Fill />}</div>
        <div className="card_sign" id="bottom">{alcoholic ? <BiSolidDrink /> : <RiDrinks2Fill />}</div>

    </div>
    )
};

export default CocktailCard;