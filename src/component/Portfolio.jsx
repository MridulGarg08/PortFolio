import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import photo from "../assets/pf.jpg";

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const heroTitleRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);

      const sections = [
        "home",
        "about",
        "experience",
        "education",
        "projects",
        "contact",
      ];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const typeWriter = (element, text, speed = 150) => {
      if (!element) return;
      let i = 0;
      const textSpan = element.querySelector("span") || element;
      element.innerHTML =
        '<span class="inline-block w-1 h-16 bg-white ml-1 animate-pulse"></span>';

      const type = () => {
        if (i < text.length) {
          element.innerHTML =
            text.substring(0, i + 1) +
            '<span class="inline-block w-1 h-16 bg-white ml-1 animate-pulse"></span>';
          i++;
          setTimeout(type, speed);
        } else {
          // Remove cursor after typing is complete
          setTimeout(() => {
            element.innerHTML = text;
          }, 1000);
        }
      };

      type();
    };

    if (heroTitleRef.current) {
      setTimeout(() => {
        typeWriter(heroTitleRef.current, "Mridul Garg");
      }, 500);
    }
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const fadeElements = document.querySelectorAll(".fade-in");
    fadeElements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const serviceId = "service_dyn3bdd";
      const templateId = "template_d28ua5f";
      const publicKey = "RmhLH5QylCzmXrT59";

      const templateParams = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      alert("Message sent successfully! Thank you for reaching out.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Email sending error:", error);
      alert("Oops! Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const scrollToSection = (sectionId) => {
  //   const element = document.getElementById(sectionId);
  //   if (element) {
  //     element.scrollIntoView({ behavior: "smooth", block: "start" });
  //   }
  //   setMobileMenuOpen(false);
  // };
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -40; // Adjust this to your navbar height
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const skills = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "MongoDB",
    "Tailwind CSS",
  ];
  const learning = ["Python (Advanced)", "NumPy", "Pandas", "Machine Learning"];

  const experienceData = [
    {
      company: "Helios Tech Labs",
      position: "Software Developer",
      duration: "Jul. 2025 - Present",
      location: "Chandigarh, India",
      description:
        "Developed scalable web applications, automated 10+ workflows reducing manual work by 30%, integrated 3+ REST APIs to improve data flow by 30%, and implemented secure authentication with JWT/bcrypt.",
      achievements: [
        "Built and deployed 10+ automated workflows for form validation, trigger actions, and custom business logic across internal tools, reducing manual work by 30%",
        "Integrated 3+ external REST APIs to automate lead capture and third-party data sync, boosting data flow efficiency by 30%",
        "Collaborated with a cross-functional team of 6+ members during 6 Agile sprint cycles, ensuring on-time delivery of planned features",
      ],
      technologies: ["HTML", "CSS", "JavaScript", "Zoho Creator", "Deluge"],
    },
    {
      company: "Novem Controls",
      position: "Fullstack Developer Intern",
      duration: "Jan. 2025 - Jun. 2025",
      location: "Chandigarh, India",
      description:
        "Collaborated on multiple client projects, focusing on responsive UI development and REST API integration. Gained hands-on experience with modern frontend frameworks.",
      achievements: [
        "Contributed to 2 internal web applications using React.js, Node.js, Express, and MongoDB, assisting in both front-end and back-end tasks",
        "Implemented and tested 3+ features (form validation, API integration, UI enhancements) and resolved 8+ bugs, leading to 10% performance improvement",
        "Leveraged REST APIs, Git version control, and Agile practices to raise code review efficiency by 15% and improve collaboration across 2 ongoing projects",
        "Engaged in peer code reviews and pair programming, reducing post-deployment bugs by 15%",
      ],
      technologies: ["React", "JavaScript", "Tailwind CSS", "REST APIs", "Git"],
    },
  ];

  const projects = [
    {
      id: 1,
      title: "Read Haven – Bookstore",
      description:
        "A Full-stack MERN e-commerce app with secure user authentication, real-time inventory updates, and responsive UI. Optimized database queries for 40% faster login/signup.",
      icon: "📚",
      technologies: ["React.js", "Node.js", "MongoDB", "Express.js"],
      demoLink: "",
      githubLink: "https://github.com/MridulGarg08/ReadHaven08",
    },
    {
      id: 2,
      title: "Talko: A Realtime Chat Application",
      description:
        "Engineered a real-time chat system with Socket.io, optimized database queries, and secured authentication with JWT/bcrypt, achieving 99% reliability.",
      icon: "📱",
      technologies: ["React", "Express", "Socket.io", "MongoDB"],
      demoLink: "#",
      githubLink: "https://github.com/MridulGarg08/mern-chat-web-app",
    },
  ];

  const educationData = [
    {
      year: "2025",
      title: "Master of Computer Applications",
      institution: "Chandigarh University",
      description:
        "Focused on Python programming, data structures, and design & analysis of algorithms, gaining advanced knowledge in software engineering and modern application development.",
      courses:
        "Python Programming, Data Structures & Algorithms (DAA), Database Management, Web Technologies",
    },
    {
      year: "2023",
      title: "Bachelor of Computer Applications",
      institution: "Lovely Professional University",
      description:
        "Specialized in Software Engineering with a focus on web development, algorithms, database systems, and project management.",
      courses:
        "Data Structures, Web Development, Database Management, Software Engineering, Project Management & IT Strategy",
    },
  ];

  const contactInfo = [
    { icon: "📧", label: "Email", value: "gargmridul0808@email.com" },
    { icon: "📱", label: "Phone", value: "+91 (985) 596-5119" },
    { icon: "📍", label: "Location", value: "Chandigarh, India" },
    {
      icon: "💼",
      label: "LinkedIn",
      value: "https://www.linkedin.com/in/mridulg08/",
    },
    { icon: "🐙", label: "GitHub", value: "https://github.com/MridulGarg08" },
  ];

  // :root {
  //   --primary: #667eea;
  //   --secondary: #764ba2;
  //   --accent: #f093fb;
  //   --dark: #1a1a2e;
  //   --darker: #16213e;
  //   --light: #eee;
  //   --text: #333;
  //   --text-light: #666;
  // }
  return (
    <div className="font-sans leading-relaxed min-h-screen ">
      <style jsx>{`
        :root {
          --primary: #3b82f6; /* Blue */
          --secondary: #8b5cf6; /* Purple */
          --accent: #14b8a6; /* Teal (optional for highlights) */
          --warning: #facc15; /* Yellow accent */

          --dark: #0f172a; /* Main background */
          --darker: #1e293b; /* Card background */
          --light: #f1f5f9; /* Light text */
          --text: #f1f5f9; /* Primary text */
          --text-light: #94a3b8; /* Secondary text */
        }
        .nav-scrolled {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }

        .nav-link::after {
          content: "";
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--primary);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        .nav-link.active {
          color: var(--primary);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .fade-in {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-animation {
          animation: slideUp 1s ease;
        }

        .hero-animation-delay-1 {
          animation: slideUp 1s ease 0.2s both;
        }

        .hero-animation-delay-2 {
          animation: slideUp 1s ease 0.4s both;
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .gradient-bg {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
        }

        .card-hover {
          transition: all 0.3s ease;
        }

        .card-hover:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
        }

        .skill-hover {
          transition: all 0.3s ease;
        }

        .skill-hover:hover {
          transform: translateY(-5px);
        }

        .project-card {
          transition: transform 0.1s ease;
        }

        .project-card:hover {
          transform: perspective(1000px) rotateX(5deg) rotateY(5deg)
            translateZ(10px);
        }

        .timeline::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(
            to bottom,
            var(--primary),
            var(--secondary)
          );
          transform: translateX(-50%);
        }

        @media (max-width: 768px) {
          .timeline::before {
            left: 20px;
          }
        }
      `}</style>

      <nav
        className={`fixed top-0 w-full z-50 py-4 transition-all duration-300 ${
          isScrolled ? "nav-scrolled" : "glass-effect"
        }`}
      >
        <div className="w-full flex justify-between items-center">
          <div className="text-2xl font-bold gradient-text mx-8">
            Mridul Garg
          </div>
          <div className="mx-8">
            <ul className="hidden md:flex space-x-8">
              {[
                "home",
                "about",
                "experience",
                "education",
                "projects",
                "contact",
              ].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => scrollToSection(section)}
                    className={`nav-link relative font-medium transition-colors duration-300 capitalize ${
                      activeSection === section
                        ? "active text-blue-600"
                        : "text-blue-600"
                    }`}
                  >
                    {section}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button
            className="md:hidden text-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[var(--darker)] shadow-lg">
            <ul className="flex flex-col items-center py-8 space-y-4">
              {[
                "home",
                "about",
                "experience",
                "education",
                "projects",
                "contact",
              ].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => scrollToSection(section)}
                    className="font-medium text-[var(--text)] hover:text-blue-600 capitalize"
                  >
                    {section}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      <section
        id="home"
        className="pt-32 pb-16 w-full flex items-center justify-center text-white relative overflow-hidden px-6 bg-[var(--dark)]"
      >
        <div
          className="
      relative z-10 max-w-6xl w-full
      flex flex-col md:flex-row    /* stack on mobile, row on desktop */
      items-center md:items-center /* center vertically on desktop   */
    "
        >
          {/* LEFT – Image */}
          <div className="flex-shrink-0 mb-10 md:mb-0 md:mr-24">
            <img
              src={photo} // 👉 replace with your image path
              alt="Mridul Garg"
              className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full shadow-2xl border-4 border-white/30 hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* RIGHT – Text */}
          <div className="flex-1 text-center md:text-left">
            <h1
              ref={heroTitleRef}
              className="text-5xl md:text-6xl font-bold mb-4 hero-animation min-h-[4rem] relative"
            ></h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 hero-animation-delay-1">
              Full Stack Developer | React Enthusiast | Aspiring Machine
              Learning Engineer
            </p>
            <button
              onClick={() => scrollToSection("about")}
              className="hero-animation-delay-2 inline-block px-8 py-4 bg-white bg-opacity-20 text-white border-2 border-white border-opacity-30 rounded-full font-semibold transition-all duration-300 hover:bg-opacity-30 hover:-translate-y-1 hover:shadow-2xl backdrop-blur-sm"
            >
              Discover My Work
            </button>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="py-16 w-full px-8 fade-in bg-[var(--dark)]"
      >
        <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
          About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="bg-white rounded-3xl p-8 shadow-2xl text-center transform hover:scale-105 transition-transform duration-300">
            <div className="w-36 h-36 gradient-bg rounded-full mx-auto mb-6 flex items-center justify-center text-white text-5xl font-bold">
              MG
            </div>
            <h3 className="text-2xl font-bold mb-4">Mridul Garg</h3>
            <p className="text-gray-600 mb-6">
              Passionate developer with a passion for Problem Solving.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="gradient-bg text-white px-4 py-2 rounded-xl text-sm skill-hover"
                >
                  {skill}
                </div>
              ))}
            </div>
            <p className="text-gray-600 mb-6 mt-4">Currently Learning</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {learning.map((learn, index) => (
                <div
                  key={index}
                  className="gradient-bg text-white px-4 py-2 rounded-xl text-sm skill-hover"
                >
                  {learn}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Hello! I'm Mridul</h3>
            <p className="text-gray-300 leading-relaxed">
              I'm a passionate Full-Stack Developer with a strong foundation in
              React, Node.js, and Python, driven by the challenge of turning
              complex problems into elegant, user-focused solutions.
            </p>
            <p className="text-gray-300 leading-relaxed">
              My journey began during my Bachelor of Computer Applications at
              Lovely Professional University, where I built a solid foundation
              in software engineering, web technologies, and databases. I
              further deepened my expertise while pursuing a Master of Computer
              Applications at Chandigarh University, focusing on Python, data
              structures, algorithms, and modern application development.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Alongside academics, I’ve gained hands-on experience through
              internships and projects, building scalable web applications,
              integrating REST APIs, and optimizing system performance.
            </p>
            <p className="text-gray-300 leading-relaxed">
              I specialize in modern web technologies and am currently exploring
              Data Science, learning Python for Machine Learning, NumPy, and
              Pandas to strengthen my skills in data analysis and model
              development.
            </p>
            <p className="text-gray-300 leading-relaxed">
              I believe in writing clean, maintainable code and creating
              seamless user experiences that make a real impact. Let’s build
              something amazing together!
            </p>
          </div>
        </div>
      </section>

      <section
        id="experience"
        className="py-16 bg-[var(--dark)] fade-in w-full"
      >
        <div className="w-full mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            Professional Experience
          </h2>
          <div className="space-y-12">
            {experienceData.map((job, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-blue-600 mb-1">
                          {job.position}
                        </h3>
                        <h4 className="text-xl text-blue-600 font-semibold">
                          {job.company}
                        </h4>
                      </div>
                      <div className="text-right mt-2 md:mt-0">
                        <p className="text-gray-600 font-medium">
                          {job.duration}
                        </p>
                        <p className="text-gray-500 text-sm">{job.location}</p>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {job.description}
                    </p>

                    <div className="mb-6">
                      <h5 className="font-semibold text-blue-600 mb-3">
                        Key Achievements:
                      </h5>
                      <ul className="space-y-2">
                        {job.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start">
                            <span className="text-blue-600 mr-2 mt-1">•</span>
                            <span className="text-gray-600">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <h5 className="font-semibold text-blue-600 mb-4">
                      Technologies Used:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {job.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="education"
        className="py-16 w-full mx-auto px-8 fade-in bg-[var(--dark)]"
      >
        <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
          Education
        </h2>
        <div className="timeline relative py-8">
          {educationData.map((item, index) => (
            <div
              key={index}
              className={`relative mb-12 flex items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="bg-white p-8 rounded-3xl shadow-2xl flex-1 mx-8 md:mx-8 relative">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <h4 className="text-blue-600 font-semibold mb-4">
                  {item.institution}
                </h4>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <p className="text-sm text-gray-500">
                  <strong>Highlights:</strong> {item.courses}
                </p>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold z-10 md:relative md:left-auto md:transform-none">
                {item.year}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="projects"
        className="py-16 w-full mx-auto px-8 fade-in bg-[var(--dark)]"
      >
        <h2 className="text-4xl font-bold text-center mb-16 gradient-text relative z-10 leading-tight">
          My Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card bg-white rounded-3xl overflow-hidden shadow-xl card-hover"
            >
              <div className="h-48 gradient-bg flex items-center justify-center text-white text-6xl">
                {project.icon}
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-4">{project.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {/* <a
                    href={project.demoLink}
                    className="text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                  >
                    Live Demo
                  </a> */}
                  <a
                    href={project.githubLink}
                    target="_blank"
                    className="text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="py-24 bg-[var(--dark)] text-white fade-in w-full"
      >
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-bold mb-8 text-pink-300">
                Let's Connect!
              </h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                I'm always open to discussing new opportunities, collaborations,
                or just having a chat about technology. Feel free to reach out!
              </p>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 bg-white bg-opacity-5 rounded-2xl hover:bg-opacity-10 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-4 text-xl">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.label}</h4>
                      <p className="text-gray-300">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white bg-opacity-5 p-8 rounded-3xl backdrop-blur-sm">
              <div className="space-y-6">
                <div>
                  <label className="block text-pink-300 mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full p-4 border-0 rounded-xl bg-white bg-opacity-10 text-white placeholder-gray-400 focus:bg-opacity-20 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-pink-300 mb-2">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full p-4 border-0 rounded-xl bg-white bg-opacity-10 text-white placeholder-gray-400 focus:bg-opacity-20 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-pink-300 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What's this about?"
                    className="w-full p-4 border-0 rounded-xl bg-white bg-opacity-10 text-white placeholder-gray-400 focus:bg-opacity-20 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-pink-300 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Your message here..."
                    className="w-full p-4 border-0 rounded-xl bg-white bg-opacity-10 text-white placeholder-gray-400 focus:bg-opacity-20 focus:outline-none transition-all resize-none"
                  />
                </div>
                <button
                  onClick={handleFormSubmit}
                  disabled={isSubmitting}
                  className="w-full gradient-bg text-white py-4 px-8 rounded-full font-semibold transition-transform duration-300 hover:transform hover:-translate-y-1 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message 🚀"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
