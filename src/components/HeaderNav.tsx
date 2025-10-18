import { useState } from "react";
import { faMugHot, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function HeaderNav() {
  const [isOpen, setIsOpen] = useState(false);
  const fixedClassName =
    "text-[#443] text-lg hover:text-[#b9b999] cursor-pointer";

  return (
    <nav className="w-full bg-white fixed z-50 h-[4.5rem] flex items-center font-poppins">
      <div className="w-full flex flex-row items-center justify-between px-4 md:px-12">
        <div className="flex flex-row gap-2 items-center">
          <h2 className="text-[#443] text-2xl font-poppins">Brew Haven</h2>
          <FontAwesomeIcon icon={faMugHot} className="text-[#443] w-6 h-6" />
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-row gap-6">
          <a className={fixedClassName} href="#home">Home</a>
          <a className={fixedClassName} href="/menu">Menu</a>
          <a className={fixedClassName} href="#about">About</a>
          <a className={fixedClassName} href="#reviews">Review</a>
          <a className={fixedClassName} href="#book">Book</a>
        </div>

        {/* Book a Table Button - Fixed for Desktop */}
        <div className="hidden md:block">
          <a href="#book" className="inline-block px-8 py-1 border-2 border-[#443] rounded-[95%_4%_97%_5%/_4%_94%_3%_95%] text-[#443] bg-none cursor-pointer text-lg hover:rounded-[4%_95%_6%_95%/_95%_4%_92%_5%] hover:border-dashed">
            Book A Table
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <FontAwesomeIcon
            icon={isOpen ? faTimes : faBars}
            className="text-[#443] w-6 h-6 cursor-pointer"
          />
        </div>
      </div>

      {/* Mobile Dropdown Menu with Animation */}
      <div 
        className={`absolute top-[4.5rem] left-0 w-full bg-white md:hidden 
        flex flex-col items-center gap-6 py-6 shadow-lg 
        transform transition-all duration-300 ease-in-out
        ${isOpen 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 -translate-y-full pointer-events-none'}`}
      >
        <a className={fixedClassName}>Home</a>
        <a className={fixedClassName}>Menu</a>
        <a className={fixedClassName}>About</a>
        <a className={fixedClassName}>Review</a>
        <a className={fixedClassName}>Book</a>
        
        {/* Mobile Book a Table Button */}
        <button className="inline-block px-8 py-1 border-2 border-[#443] 
        rounded-[95%_4%_97%_5%/_4%_94%_3%_95%] text-[#443] 
        hover:rounded-[4%_95%_6%_95%/_95%_4%_92%_5%] hover:border-dashed 
        transition-all duration-300 md:hidden">
          Book A Table
        </button>
      </div>
    </nav>
  );
}

export default HeaderNav;