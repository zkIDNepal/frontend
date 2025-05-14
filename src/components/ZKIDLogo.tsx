
import { Link } from "react-router-dom";

const ZKIDLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
      <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 14C20.6569 14 22 12.6569 22 11C22 9.34315 20.6569 8 19 8C17.3431 8 16 9.34315 16 11C16 12.6569 17.3431 14 19 14Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M7 22C8.65685 22 10 20.6569 10 19C10 17.3431 8.65685 16 7 16C5.34315 16 4 17.3431 4 19C4 20.6569 5.34315 22 7 22Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M7 8C8.65685 8 10 6.65685 10 5C10 3.34315 8.65685 2 7 2C5.34315 2 4 3.34315 4 5C4 6.65685 5.34315 8 7 8Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M7 16V8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 17L17 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 7L17 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div>
        <span className="font-bold text-xl tracking-tight">zkID<span className="text-primary">Nepal</span></span>
      </div>
    </Link>
  );
};

export default ZKIDLogo;
