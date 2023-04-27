import cake_image1 from "../assets/images/addOnImages/knife-and-candle.svg";
import cake_image2 from "../assets/images/addOnImages/magic-candles.png";
import cake_image3 from "../assets/images/addOnImages/paper-popper.png";
import cake_image4 from "../assets/images/addOnImages/sparkle-candle.png";

// Made dummy data for product card
let AddOnData: {
  id: number;
  image: any;
  cake_name: string;
  price: number;
}[] = [
    {
      id: 0,
      image: cake_image1,
      cake_name: "Kids Birthday Cake",
      price: 1
    },
    {
      id: 1,
      image: cake_image2,
      cake_name: "Customer Cakes",
      price: 1

    },

    {
      id: 2,
      image: cake_image3,
      cake_name: "Birthday",
      price: 1

    },
    {
      id: 3,
      image: cake_image4,
      cake_name: "Anniversary",
      price: 3
    },
  ]

export default AddOnData;
