import { useEffect, useState } from "react";
import CocktailsList from "./cocktails/CocktailsList";
import "../styles/home.css";
import { getCategories } from "../api/cocktailsApi";
import { data } from "react-router-dom";


type Filter = {
    search?: string;
    category?: string;
    alcoholic?: boolean;
    glass?: string;
}

const Home = () => {
    const [filter, setFilter] = useState<Filter>({
        search: "",
        alcoholic: true,
        category: "",
        glass: ""
    })

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

    const changeFilter = (search?: string, category?: string, alcoholic?: boolean, glass?: string) => {
        setFilter(prev => ({
            ...prev,
            ...(search !== undefined && { search }),
            ...(category !== undefined && { category }),
            ...(alcoholic !== undefined && { alcoholic }),
            ...(glass !== undefined && { glass })
        }));
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

        <CocktailsList filter={filter}/>
    </>
    )
}

export default Home;