import React from 'react';

function Nav() {
  return (
    <nav className="bg-[#34729c] p-4">
      <ul className="flex justify-center space-x-6">
        <li>
          <a href="default.asp" className="text-white hover:bg-[#1e5470] px-4 py-2 rounded-md transition">
            Home
          </a>
        </li>
        <li>
          <a href="news.asp" className="text-white hover:bg-[#1e5470] px-4 py-2 rounded-md transition">
            News
          </a>
        </li>
        <li>
          <a href="contact.asp" className="text-white hover:bg-[#1e5470] px-4 py-2 rounded-md transition">
            Contact
          </a>
        </li>
        <li>
          <a href="about.asp" className="text-white hover:bg-[#1e5470] px-4 py-2 rounded-md transition">
            About
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
