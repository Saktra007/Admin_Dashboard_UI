import logoImg from "../../../public/Logo_Zenith_Dash.png";
const Logo = ({ className = "w-12 h-12" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img
        src={logoImg}
        alt="Zenith Dash Logo"
        className="w-full h-full object-contain"
      />
    </div>
  );
};
export default Logo;
