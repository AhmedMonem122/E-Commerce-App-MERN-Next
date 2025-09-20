const Navbar = () => {
  return (
    <nav className="px-10 py-3 border-b border-[#e5e8eb]">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-8 font-medium text-[14px] leading-3.5 text-[#0D141C]">
          <a href="" className="font-bold text-[18px] leading-6">
            Tech Haven
          </a>
          <a href="">Home</a>
          <a href="">Products</a>
          <a href="">Brands</a>
          <a href="">Categories</a>
          <a href="">About</a>
        </div>
        <div className="flex items-center gap-6 font-medium text-[14px] leading-3.5 text-[#0D141C]">
          <a href="">Login</a>
          <a href="">Register</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
