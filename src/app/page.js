"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import deveImage from "./assets/developerr.png";
import devImage from "./assets/devImg.png";
import instagramImage from "./assets/instagram-image.png";
import githubImage from "./assets/github-image.png";
import linkedinImage from "./assets/linkedin-icon.png";
import Typed from "typed.js";
import { projects, intro, name, profession } from "./_data.js";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const typed = new Typed("#element", {
      strings: [
        "MERN Developer",
        "WEB3 Developer",
        "MEVN Developer",
        "Software Engineer",
      ],
      typeSpeed: 60,
      loop: true,
      fadeOut: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsMenuOpen(false); // Close the menu when a link is clicked

    // Find the section to scroll to
    const section = document.getElementById(link);
    section.scrollIntoView({ behavior: "smooth" });
  };

  // Handle section visibility for dynamic nav highlighting
  useEffect(() => {
    const observerOptions = {
      threshold: 0.5, // Trigger when 50% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id); // Update activeLink state when section is visible
        }
      });
    }, observerOptions);

    // Observe each section
    sectionsRef.current.forEach((section) => observer.observe(section));

    // Cleanup observer on unmount
    return () => {
      sectionsRef.current.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#ee9476] to-[#8B0a10]  min-h-screen text-gray-800">
      {/* Navigation */}
      <nav className="p-4 md:p-6 fixed top-0 left-0 w-full z-50 bg-opacity-25 backdrop-blur-lg">
      <div className="flex justify-between items-center">
    <div className="text-2xl font-semibold text-[#F8F1E5]">
      Welcome Here !!
    </div>
    {/* Desktop Navigation */}
    <ul className="hidden md:flex space-x-4">
      {["home", "projects", "about", "contact"].map((item) => (
        <li key={item} className="hover:scale-110">
          <button
            className={`py-1 px-4 rounded-full text-sm transition-all ${
              activeLink === item
                ? "bg-[#986147] text-[#F8F1E5]"
                : "hover:bg-[#E97451] text-[#9C7944]"
            }`}
            onClick={() => handleLinkClick(item)}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        </li>
      ))}
    </ul>
    {/* Hamburger Menu Button (Visible on mobile) */}
    <button
      ref={menuButtonRef}
      className="md:hidden text-grey-600"
      onClick={toggleMenu}
    >
      {isMenuOpen ? "✖️" : "☰"}
    </button>
  </div>
</nav>


      {/* Hamburger Sliding Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 bg-gradient-to-r from-[#986147] to-[#E97451] p-6 w-1/2 h-full z-50 transition-all transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="absolute top-4 right-4 text-[#FFFADA] text-xl cursor-pointer"
          onClick={toggleMenu}
        >
          ✖️
        </div>
        {["home", "projects", "about", "contact"].map((item) => (
          <div key={item} className="mb-4">
            <button
              className="text-lg text-[#ffffe3] hover:text-[#F8F1E5]"
              onClick={() => handleLinkClick(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          </div>
        ))}
      </div>

      {/* Home Section */}
      <main className="pt-20">
        <section
          id="home"
          className="flex flex-wrap justify-around items-center py-24 px-4 md:px-10 bg-gradient-to-r from-[#E97451] to-[#F8F1E5] min-h-screen"
          ref={(el) => (sectionsRef.current[0] = el)}
        >
          <div className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center md:text-left max-w-lg bg-white bg-opacity-25 backdrop-blur-lg p-6 rounded-xl h-[260px] hover:bg-[#091C2C] hover:bg-opacity-25 transition-all duration-300 ease-in-out">
            Hi, My name is <span className="text-[#8a75fa]">{name}</span>
            <div className="mt-5">
              And I am a{" "}
              <span className="font-bold text-[#8a75fa]" id="element">
                {profession}
              </span>
            </div>
          </div>
          <div className="mt-8 md:mt-0">
            <Image src={deveImage} alt="Developer" width={350} height={350} />
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="py-24 px-4 md:px-10 bg-gradient-to-r from-[#E97451] to-[#F8F1E5] min-h-screen"
          ref={(el) => (sectionsRef.current[1] = el)}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#986147]">
              What I have done so far
            </h2>
            <p className="text-xl text-[#986147]">Personal Projects</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Projects List */}
            {projects.map((project, index) => (
              <div
                key={index}
                className="p-6 bg-[#C77440] bg-opacity-25 backdrop-blur-lg text-[#FFFADA] rounded-lg shadow-xl hover:bg-[#091C2C] hover:bg-opacity-25 transition-all duration-300 ease-in-out"
              >
                <h3 className="text-xl font-semibold mb-4">{project.name}</h3>
                <p className="text-sm mb-4">{project.description}</p>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block py-2 px-4 rounded-full bg-gray-500 bg-opacity-25 text-[#FFFADA] transition-all hover:bg-gray-600 hover:bg-opacity-50"
                  >
                    Code →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-24 px-4 md:px-10 bg-gradient-to-r from-[#E97451] to-[#F8F1E5] min-h-screen"
          ref={(el) => (sectionsRef.current[2] = el)}
        >
          <div className="text-center mb-12 text-[#986147]">
            <h2 className="text-3xl font-bold mb-4">Who Am I?</h2>
            <p className="text-xl text-[#986147]">About Me</p>
          </div>
          <div className="flex flex-wrap items-center justify-around">
            <div className="w-full md:w-1/2 px-4">
              <div className="bg-[#C77440] bg-opacity-25 backdrop-blur-lg p-6 rounded-xl shadow-xl text-[#FFFADA] hover:bg-[#091C2C] hover:bg-opacity-25 transition-all duration-300 ease-in-out">
                <div className="text-xl mb-3">Hello There,</div>
                <div className="text-base text-justify">{intro}</div>
              </div>
            </div>
            <div className="md:w-1/3 px-4 mt-8 md:mt-0">
              <Image
                src={devImage}
                alt="Utkarsh's image"
                width={400}
                height={400}
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-24 px-4 md:px-10 bg-gradient-to-r from-[#986147] to-[#E97451] h-[90vh]"
          ref={(el) => (sectionsRef.current[3] = el)}
        >
          <div className="mt-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-6 text-[#ffffe3]">
                Contact Me
              </h2>
              <div className="flex justify-center space-x-6 mb-4">
                <a
                  href="https://www.instagram.com/the.utkarshroy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={instagramImage}
                    alt="Instagram"
                    width={50}
                    height={50}
                    className="hover:bg-white bg-opacity-25"
                  />
                </a>
                <a
                  href="https://github.com/ur-star"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={githubImage}
                    alt="GitHub"
                    width={50}
                    height={50}
                    className="hover:bg-white bg-opacity-25"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/utkarsh-roy-wave"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={linkedinImage}
                    alt="LinkedIn"
                    width={50}
                    height={50}
                    className="hover:bg-white bg-opacity-25"
                  />
                </a>
              </div>
              <p className="text-xl text-[#FFFADA] hover:scale-125">
                Email on:
                <a
                  href="mailto:uroyofficial@gmail.com"
                  className="ml-2 text-cyan-800 "
                >
                  uroyofficial@gmail.com
                </a>
              </p>
            </div>
            <div className="text-center">
              <a href="/cv.pdf" download="cv.pdf">
                <button className="px-6 py-2 mt-6 border-2 border-white text-[#FFFADA] rounded-full transition-all hover:bg-white hover:text-black">
                  Download Resume
                </button>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
