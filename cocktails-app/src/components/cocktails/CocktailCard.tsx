import { useModal } from "../../ModalContext";
import "../../styles/cocktailCard.css";
import { BiSolidDrink } from "react-icons/bi";
import CocktailPopup from "./CocktailPopup";


interface CocktailCardProps {
  id: number;
  cocktailName: string;
  imageUrl: string;
}

const CocktailCard = ({id, cocktailName, imageUrl} : CocktailCardProps) => {
    
    const {openModal} = useModal();


    const openPopup = () => {
        openModal(<CocktailPopup cocktailId={id} />)
    };

    return (
    <div className="cocktail-card" onClick={openPopup}>
        <div className="card-content">
            <img src={imageUrl} alt="" />
            <h2>{cocktailName}</h2>
        </div>

        <div className="card_sign" id="top"><BiSolidDrink /></div>
        <div className="card_sign" id="bottom"><BiSolidDrink /></div>

    </div>
    )
};

export default CocktailCard;