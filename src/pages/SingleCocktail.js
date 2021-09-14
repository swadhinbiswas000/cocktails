import React from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='


const SingleCocktail = () => {
  const [singleCocktail, setSingleCocktail] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const {id} = useParams();

  const fetchSingleCocktail = async()=>{
    setLoading(true)
    const response = await fetch(`${url}${id}`);
    const data = await response.json();
    
    if(data.drinks){
      const {
        strDrink: name,
        strDrinkThumb: image,
        strAlcoholic: info,
        strCategory: category,
        strGlass: glass,
        strInstructions: instructions,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
      } = data.drinks[0]

      const ingredients = [
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5]

      const newCocktail ={name,image, info, category, glass, instructions, ingredients}

      setSingleCocktail(newCocktail);
    }else{
      setSingleCocktail(null)
    }
    setLoading(false)
  }
  React.useEffect(() => {
    fetchSingleCocktail()
  }, [id])

  if(loading){
    return <Loading />
  }
  if(!singleCocktail){
    return <h2 className="section-title">no matching cocktail found</h2>
  }else{
    const {name,image, info, category, glass, instructions, ingredients} = singleCocktail;

  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">back home</Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image} alt="cocktail" />
      <div className="drink-info">
        <p>
        <span className="drink-data">name:</span> {name}
        </p>
        <p>
        <span className="drink-data">category:</span> {category}
        </p>
        <p>
        <span className="drink-data">info:</span> {info}
        </p>
        <p>
        <span className="drink-data">instructions:</span> {instructions}
        </p>
        <p>
        <span className="drink-data">ingredients:</span> {ingredients.map((item)=>{
          return <span>{item}</span>
        })}
        </p>
      </div>
      </div>
    </section>
  )
  }
}

export default SingleCocktail
