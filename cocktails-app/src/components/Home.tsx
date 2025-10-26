import { useEffect, useState } from "react";
import CocktailsList from "./cocktails/CocktailsList";
import "../styles/home.css";
import { getCategories, getCocktails } from "../api/cocktailsApi";
import { useFavorites } from "../hooks/useFavorites";
import { data } from "react-router-dom";


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
    page?: number;
}

const Home = () => {
    const [filter, setFilter] = useState<Filter>({
        search: "",
        alcoholic: true,
        category: "",
        glass: "",
        page: 1
    });
    const countPerPage: number = 12;
    const [isNextPage, setIsNextPage] = useState(false)

    const [cocktails, setCocktails] = useState<Cocktail[]>([]);
    const {favorites} = useFavorites();

    const sortedCocktails = cocktails.sort((a, b) => {
        const aFav = favorites.includes(a.id);
        const bFav = favorites.includes(b.id);
        
        if (aFav && !bFav) return -1;
        if (!aFav && bFav) return 1;
        return 0;
    });

    useEffect(() => {
        getCocktails({
                alcoholic: filter.alcoholic,
                name: filter.search ? `%${filter.search}%` : undefined,
                category: filter.category,
                glass: filter.glass,
                page: filter.page || 1,
                per_page: countPerPage
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setCocktails(data);
                    setIsNextPage(Math.floor(data.length / countPerPage) == 1)
                } else {
                    console.error('Expected array but got:', data);
                }
            })
            .catch(error => {
                console.error('Error fetching cocktails:', error);
            });
    }, [filter]);

    const [categories, setCategories] = useState([
        "Cocktail",
        "Ordinary Drink",
        "Punch / Party Drink",
        "Shake",
        "Other / Unknown",
        "Cocoa",
        "Shot",
        "Coffee / Tea",
        "Homemade Liqueur",
        "Soft Drink"
    ])

        const [glassesList, setGlassesList] = useState([
        "Highball glass",
        "Old-fashioned glass",
        "Cocktail glass",
        "Copper Mug",
        "Whiskey Glass",
        "Collins glass",
        "Pousse cafe glass",
        "Champagne flute",
        "Whiskey sour glass",
        "Brandy snifter",
        "White wine glass",
        "Nick and Nora Glass",
        "Hurricane glass",
        "Coffee mug",
        "Shot glass",
        "Jar",
        "Irish coffee cup",
        "Punch bowl",
        "Pitcher",
        "Pint glass",
        "Cordial glass",
        "Beer mug",
        "Margarita/Coupette glass",
        "Beer pilsner",
        "Beer Glass",
        "Parfait glass",
        "Wine Glass",
        "Mason jar",
        "Margarita glass",
        "Martini Glass",
        "Balloon Glass",
        "Coupe Glass"
    ])


    // Nie działa mi to :(
    // useEffect(()=>{
    //     try{
    //         getCategories().then(data => setCategories(data))
    //     } catch(e){

    //     }
    // }, [])

    const changeFilter = (search?: string, category?: string, alcoholic?: boolean, glass?: string, page?: number) => {
        setFilter(prev => ({
            ...prev,
            ...(search !== undefined && { search, page: 1 }),
            ...(category !== undefined && { category, page: 1 }),
            ...(alcoholic !== undefined && { alcoholic, page: 1 }),
            ...(glass !== undefined && { glass, page: 1 }),
            ...(page !== undefined && { page })
        }));
    }

    const changePage = (newPage: number) => {
        setFilter(prev => ({ ...prev, page: newPage }));
    }

    return (
    <>
        <h1 className="contails-title">Cocktails</h1>
        
        <div className="filters">
            <input
                type="text"
                placeholder="Search cocktails..."
                value={filter.search || ""}
                onChange={(e) => changeFilter(e.target.value)}
            />
            
            <select
                value={filter.category || ""}
                onChange={(e) => changeFilter(undefined, e.target.value)}
            >
                <option value="">All Categories</option>
                {categories.map((category: any) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
            
            <select
                value={filter.alcoholic === undefined ? "" : filter.alcoholic ? "true" : "false"}
                onChange={(e) => {
                    const value = e.target.value === "" ? undefined : e.target.value === "true";
                    changeFilter(undefined, undefined, value);
                }}
            >
                <option value="true">Alcoholic</option>
                <option value="false">Non-Alcoholic</option>
            </select>
            
            <select
                value={filter.glass || ""}
                onChange={(e) => changeFilter(undefined, undefined, undefined, e.target.value)}
            >
                <option value="">Any Glass</option>
                {glassesList.map((glass: any) => (
                    <option key={glass} value={glass}>
                        {glass}
                    </option>
                ))}
            </select>
        </div>

        <div className="pagination">
            <button 
                onClick={() => changePage(Math.max(1, filter.page! - 1))}
                disabled={filter.page === 1}
            >
                Previous
            </button>
            <span className="page-info">Page {filter.page}</span>
            <button 
                onClick={() => changePage(filter.page! + 1)}
                disabled={!isNextPage}
            >
                Next
            </button>
        </div>

        <CocktailsList cocktails={sortedCocktails}/>
    </>
    )
}

export default Home;