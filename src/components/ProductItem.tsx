
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  detailedDescription: string;
  description: string;
  image: string;
  price: number;
}
interface ProductProps {
  product: Product; // Change from review to product to match the prop name
}

export const ProductItem: React.FC<ProductProps> = ({ product }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  return (
    <div
      className="relative  group w-auto mx-auto border-2 border-[#443] 
          rounded-[95%_4%_97%_5%/_4%_94%_3%_95%] text-[#443] 
          hover:rounded-[4%_95%_6%_95%/_95%_4%_92%_5%] hover:border-dashed 
          transition-all duration-300 p-4 mb-6"
    >
      <img
        src={product.image}
        alt={product.name}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
        className="absolute -top-10 left-1/2 transform -translate-x-1/2  w-20 aspect-square object-fit rounded-full cursor-default
              transition-transform duration-300 group-hover:scale-110"
      />
<svg 
  viewBox="0 0 24 24" 
  className={`
    absolute bottom-2 right-3 w-6 h-6 cursor-pointer
    transform transition-all duration-300 ease-in-out
    ${isFilled ? 'scale-110' : 'scale-100'}
    hover:scale-105
  `}
  onClick={() => setIsFilled(!isFilled)}
>
  <path
    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    fill={isFilled ? 'red' : 'none'}
    stroke={isFilled ? 'red' : 'currentColor'}
    strokeWidth="2"
    className="transition-colors duration-300"
  />
</svg>
      {showTooltip && (
        <div className="absolute z-10 w-48 p-2 bg-white border-2 border-[#443] rounded-lg shadow-lg bottom-28 left-1/2 -translate-x-1/2 text-sm">
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[-8px] w-0 h-0 border-l-8 border-l-transparent border-t-8 border-t-[#443] border-r-8 border-r-transparent" />
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[-6px] w-0 h-0 border-l-8 border-l-transparent border-t-8 border-t-white border-r-8 border-r-transparent" />
          <div className="flex flex-col gap-1">
            <span className="text-center font-semibold">{product.name}</span>
            <p>{product.detailedDescription}</p>
          </div>
        </div>
      )}
      <div className="flex mt-5 flex-col justify-center items-center">
        <h1 className="font-poppins text-center font-semibold">
          {product.name}
        </h1>
        <span className="font-poppins font-medium">{product.price}$</span>
      </div>
    </div>
  );
};

export default ProductItem;
