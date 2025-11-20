import "../../theme/scss/OurProjects.scss";

export function OurProjects() {
  const projects = [
    {
      title: "Первая мировая на землях Беларуси",
      img: "/project1.jpg",
      link: "https://1wwbel.netlify.app/",
    },
    {
      title: "Проект 2",
      img: "/project2.jpg",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      title: "Проект 3",
      img: "/project3.jpg",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      title: "Проект 4",
      img: "/project4.jpg",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ];

  return (
    <div className="wrapperProjects">
      <h2 className="wrapperProjects__title">
        Наши проекты
        <img className="mark" src="/headerUS.png" alt="" />
      </h2>

      <div className="wrapperProjects__container">
        {projects.map((project, index) => (
          <div className="wrapperProjects__card" key={index}>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <div className="project-img">
                <img src={project.img} alt={project.title} />
              </div>
            </a>
            <div className="project-text">
              <h2>{project.title}</h2>
        
            </div>
          </div>
        ))}
      </div>

      <div className="wrapperProjects__line">
        <img src="/line2.png" alt="" />
      </div>
    </div>
  );
}
