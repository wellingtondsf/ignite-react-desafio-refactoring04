import { FiEdit3, FiTrash } from "react-icons/fi";

import { Container } from "./styles";
import api from "../../services/api";
import { useState } from "react";

export interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: Number;
  image: string;
  available: boolean;
}

interface FoodProps {
  food: FoodItem;
  handleDelete: (id: Number) => void;
  handleEditFood: (item: FoodItem) => void;
}

const Food = ({ food, handleDelete, handleEditFood }: FoodProps) => {
  const [isAvaliable, setIsAvaliable] = useState(food.available)


  const toggleAvailable = async () => {
    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !isAvaliable,
    });
    setIsAvaliable(!isAvaliable)
  };

  const setEditingFood = () => {
    handleEditFood(food);
  };

  return (
    <Container available={isAvaliable}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={setEditingFood}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvaliable ? "Disponível" : "Indisponível"}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={isAvaliable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
};

export default Food;
