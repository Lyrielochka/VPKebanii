import { useState } from "react";
import { AboutUs } from "../Product/AbouUS";
import "../../theme/scss/sloiOne.scss";
import { OurValues } from "./OurValues";
import { OurTeam } from "./OurTeam";
import { News } from "./News";
import { Footer } from "./Footer";
import { ScrollBar } from "./ScrollBar";
import { OurProjects } from "./OurProjects";

export function Sloi () {

const slides = [
  {
    id: 1,
    title: "ВПК Вымпел",
    text: "Военно-патриотическое воспитание, спорт, история и современные технологии — всё для тех, кто готов быть сильным и умным защитником своей страны.",
    button: "Подробнее",
    image: "/fonVPK.jpg"
  },
  {
    id: 2,
    title: "ВПК Вымпел 2",
    text: "Классический выбор профессиональных инвесторов с заданными умеренными параметрами риска. Основан на инвестировании в бумаги индекса S&P 500 с диверсификацией по 11 секторам экономики.",
    button: "Подробнее",
    image: "/fonVPK2.jpg"
  },
  {
    id: 3,
    title: "ВПК Вымпел 3",
    text: "Классический выбор профессиональных инвесторов с заданными умеренными параметрами риска. Основан на инвестировании в бумаги индекса S&P 500 с диверсификацией по 11 секторам экономики.",
    button: "Подробнее",
    image: "/kkk.png"
  },
    {
    id: 4,
    title: "ВПК Вымпел 4",
    text: "Классический выбор профессиональных инвесторов с заданными умеренными параметрами риска. Основан на инвестировании в бумаги индекса S&P 500 с диверсификацией по 11 секторам экономики.",
    button: "Подробнее",
    image: "/ver.png"
  }
];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="wrapperSloiOne">
    <section className="sloi-slider">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`sloi-slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="content-wrapper">
            <div className="arrows">
              <button className="arrow left" onClick={prevSlide}>‹</button>
              <button className="arrow right" onClick={nextSlide}>›</button>
            </div>

            <h2 className="title">{slide.title}</h2>
            <p className="description">{slide.text}</p>
            <button className="main-btn">{slide.button}</button>

            <div className="dots">
              {slides.map((_, idx) => (
                <span
                  key={idx}
                  className={`dot ${idx === current ? "active" : ""}`}
                  onClick={() => setCurrent(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
        <AboutUs/>
        <OurValues/>
        <OurProjects/>
        <OurTeam/>
        <News/>
        <Footer/>
        <ScrollBar/>
    </div>
  );
};
