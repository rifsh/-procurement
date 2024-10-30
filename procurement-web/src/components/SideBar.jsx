import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Home, Settings, CircleHelp, LogOut, UserPlus, History, PlusCircleIcon, ShoppingBagIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SiStudyverse } from 'react-icons/si';
import { FiMenu } from 'react-icons/fi'; // Import the menu icon
import { IoMdCloseCircle } from 'react-icons/io';
import { CgProductHunt } from 'react-icons/cg';

const MenuItem = ({ icon: Icon, label, items, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-2">
      <div 
        className="flex items-center justify-between p-2 group hover:bg-secondary rounded cursor-pointer"
        onClick={() => {
          setIsOpen(!isOpen);
          if (onClick) onClick(label); 
        }}
      >
        <div className="flex items-center text-black group-hover:text-white">
          <Icon className="mr-2 group-hover:text-white" size={18} />
          <span className="group-hover:text-white">{label}</span>
        </div>
        {items && (isOpen ? <ChevronUp className="group-hover:text-white" size={18} /> : <ChevronDown className="group-hover:text-white" size={18} />)}
      </div>
      {isOpen && items && (
        <div className="ml-6 mt-1">
          {items.map((item, index) => (
            <div key={index} className="p-2 hover:bg-gray-700 rounded cursor-pointer">
              <p className="hover:text-white" onClick={() => onClick(item)}> {item} </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuItemClick = (label) => {
    console.log(label, "label");
    switch (label) {
      case 'Home':
        navigate('/');
        break;
      case 'History':
        navigate('/history');
        break;
      case "CreateSupplier":
        navigate('/supplier'); 
        break;
      case "addItem":
        navigate('/item'); 
        break;
      case "Help":
        
        break;
        case "CreatePurchase":
          navigate('/createpurchase')
          break;
      case "Logout":
        localStorage.clear()
        navigate('/login'); 
        break;
      default:
        break;
    }
  };

  return (
    <>
      {!isSidebarOpen&&<button 
        onClick={() => setIsSidebarOpen(true)} 
        className="sm:hidden absolute p-2 text-secondary rounded "
      >
        <FiMenu size={24} />
      </button>}
      <div className={`w-64 border mt-2 mb-5 text-white p-4 h-screen rounded-tr-xl rounded-br-xl ${isSidebarOpen ? 'block' : 'hidden relative '} sm:flex flex-col justify-between`}>
        <div>
            {isSidebarOpen&&
          <div className="mb-6 w-full justify-end flex sm:hidden" onClick={() => setIsSidebarOpen(false)} >
          <IoMdCloseCircle color='red' />
          </div>
          }
          <div className="space-y-2">
            <MenuItem icon={Home} label="Home" onClick={handleMenuItemClick} />
            <MenuItem 
              icon={History} 
              label="History" 
              onClick={handleMenuItemClick} 
            />
            <MenuItem icon={UserPlus} label="CreateSupplier" onClick={handleMenuItemClick} />
            <MenuItem icon={PlusCircleIcon} label="addItem" onClick={handleMenuItemClick} />
            <MenuItem icon={ShoppingBagIcon} label="CreatePurchase" onClick={handleMenuItemClick} />
            <MenuItem icon={Settings} label="Settings" onClick={handleMenuItemClick} />
          </div>
        </div>
        <div className='w-full h-96 flex flex-col justify-end'>
          <MenuItem icon={CircleHelp} label="Help" onClick={handleMenuItemClick} />
          <MenuItem icon={LogOut} label="Logout" onClick={handleMenuItemClick} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;