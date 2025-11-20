import { useState, useEffect } from "react";
import axios from "axios";
import "../../theme/scss/OurTeam.scss";
import { ProfileModal } from "./ProfileModal";

export function OurTeam() {
  const [profiles, setProfiles] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const visibleCards = profiles.slice(startIndex, startIndex + 4);

  const handleNext = () => {
    if (startIndex < profiles.length - 4) {
      setStartIndex(startIndex + 1);
    } else {
      setStartIndex(0);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    } else {
      setStartIndex(profiles.length - 4);
    }
  };

  useEffect(() => {
    axios
      .get("http://wmp.by/profiles")
      .then((res) => setProfiles(res.data))
      .catch((err) => console.error("Ошибка загрузки профилей:", err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [startIndex, profiles]);

  return (
    <div className="team">
      <h2 id="team" className="team__title">
        Наша команда <img className="mark" src="/headerUS.png" alt="" />
      </h2>
      <p className="team__description">
        Каждый участник — часть большой системы. Мы ценим вклад каждого и гордимся нашей командой.
      </p>

      <div className="team__slider">
        <button className="team__nav team__nav--left" onClick={handlePrev}>←</button>

        <div className="team__cards">
          {visibleCards.map((profile, index) => (
            <div className="team__card" key={index}>
              <img
                src={profile.photo ? `${profile.photo}` : "/default-avatar.png"}
                alt={profile.fullName}
                className="team__photo"
                onClick={() => setSelectedProfile(profile)}
                style={{ cursor: "pointer" }}
              />
              <h3>{profile.fullName || "Без имени"}</h3>
              {profile.rank ? (
                <img
                  src={`${profile.rank}`}
                  alt="Звание"
                  className="team__rank"
                />
              ) : (
                <p className="team__rank-placeholder">Звание не указано</p>
              )}
            </div>
          ))}
        </div>

        <button className="team__nav team__nav--right" onClick={handleNext}>→</button>
      </div>

      <div className="team__line">
        <img src="/line3.png" alt="" />
      </div>

      {selectedProfile && (
        <ProfileModal
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
        />
      )}
    </div>
  );
}
