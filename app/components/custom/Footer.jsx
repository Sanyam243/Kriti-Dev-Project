"use client"
import "@fortawesome/fontawesome-free/css/all.min.css";
const Footer = () => {
  return (
    <>
      {/* Separator Line Above Footer */}
      <div className="border-t border-gray-700 w-full my-8"></div>

      <footer className=" bg-black text-white py-10 px-8 md:px-20">
        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* Left Section - Branding & Socials */}
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">💙 Manas Hostel</span>
            </div>
            {/* Social Icons */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-x-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-discord text-xl"></i>
              </a>
            </div>
          </div>

          {/* Middle Sections - Links */}
          <div className="flex flex-wrap md:flex-nowrap gap-8">
            {/* Product Section */}
            <div>
              <h3 className="font-bold mb-3">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">News</a></li>
                <li><a href="#" className="hover:text-white">Partners</a></li>
                <li><a href="#" className="hover:text-white">Roadmap</a></li>
              </ul>
            </div>

            {/* Resources Section */}
            <div>
              <h3 className="font-bold mb-3">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Builder Hall of Fame</a></li>
                <li><a href="#" className="hover:text-white">Learn <span>↗</span></a></li>
                <li><a href="#" className="hover:text-white">Integrations</a></li>
                <li><a href="#" className="hover:text-white">Affiliates</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>

            {/* Legal Section */}
            <div>
              <h3 className="font-bold mb-3">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Developer Credits */}
        <div className="mt-10 border-t border-gray-700 pt-4 text-center">
          <p className="text-gray-400 text-sm md:text-base font-medium">
            Crafted with ❤️ by 
            <span className="text-white font-serif text-lg font-bold"> Manas Hostel </span> 
            
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
