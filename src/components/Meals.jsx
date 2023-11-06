import { useEffect, useState } from "react";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";

const requestConfig = {};

const Meals = () => {
  //UseEffect replaced by the useHttp Custom Hook
  /*const [loadedMeals, setLoadedMeals] = useState([]);
  
  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch("http://localhost:3000/meals");
      if (!response.ok) {
        console.log("Response not ok");
      }
      const meals = await response.json();
      setLoadedMeals(meals);
    }
    fetchMeals();
  }, []);*/
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  console.log(loadedMeals);

  if (isLoading) {
    return <p>Fetching meals...</p>;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};

export default Meals;
