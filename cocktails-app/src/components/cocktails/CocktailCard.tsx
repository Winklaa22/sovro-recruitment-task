import { useModal } from "../../ModalContext";
import "../../styles/cocktailCard.css";
import { BiSolidDrink } from "react-icons/bi";
import { RiDrinks2Fill } from "react-icons/ri";
import CocktailPopup from "./CocktailPopup";


interface CocktailCardProps {
  id: number;
  cocktailName: string;
  imageUrl: string;
  alcoholic: boolean;
}

const CocktailCard = ({id, cocktailName, imageUrl, alcoholic} : CocktailCardProps) => {
    
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

        <div className="card_sign" id="top">{alcoholic ? <BiSolidDrink /> : <RiDrinks2Fill />}</div>
        <div className="card_sign" id="bottom">{alcoholic ? <BiSolidDrink /> : <RiDrinks2Fill />}</div>

    </div>
    )
};

export default CocktailCard;