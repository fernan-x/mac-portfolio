import React from "react";
import { useTranslation } from "react-i18next";
import code42 from "../../assets/images/code42.jpg";
import soprasteria from "../../assets/images/soprasteria.jpeg";

const experiences = [
  {
    title: "notion-exp1-title",
    company: "Code 42",
    location: "Nantes",
    date: "09/2020 - present",
    missions: [
      "notion-exp1-mission1",
      "notion-exp1-mission2",
      "notion-exp1-mission3",
      "notion-exp1-mission4",
      "notion-exp1-mission5",
    ],
    image: code42,
  },
  {
    title: "notion-exp2-title",
    company: "Sopra Steria",
    location: "Nantes",
    date: "03/2020 - 09/2020",
    missions: [
      "notion-exp2-mission1",
      "notion-exp2-mission2",
      "notion-exp2-mission3",
    ],
    image: soprasteria,
  },
  {
    title: "notion-exp3-title",
    company: "Code 42",
    location: "Nantes",
    date: "09/2019 - 02/2020",
    missions: ["notion-exp3-mission1"],
    image: code42,
  },
  {
    title: "notion-exp4-title",
    company: "Code 42 / Graslin Immobilier",
    location: "Bahrain",
    date: "2018 - 2020",
    missions: [
      "notion-exp4-mission1",
      "notion-exp4-mission2",
      "notion-exp4-mission3",
    ],
    image: code42,
  },
  {
    title: "notion-exp5-title",
    company: "Code 42",
    location: "Nantes",
    date: "04/2018 - 07/2018",
    missions: ["notion-exp3-mission1"],
    image: code42,
  },
  {
    title: "notion-exp6-title",
    company: "Code 42",
    location: "Nantes",
    date: "09/2016 - 12/2016",
    missions: ["notion-exp3-mission1"],
    image: code42,
  },
];

const NotionExperiencePage = () => {
  const { t } = useTranslation(["app"]);
  return (
    <>
      <h1>{t("app:notion-experience-title")}</h1>
      {experiences.map((experience, index) => (
        <React.Fragment key={index}>
          <div className="notion-preview">
            <div className="notion-preview__image">
              <img src={experience.image} alt={experience.title} />
            </div>
            <div className="notion-preview__text">
              <h2>{t(experience.title)}</h2>
              <span className="notion-subtitle">
                <b>{experience.company}</b>, {experience.location} -{" "}
                {experience.date}
              </span>
              <ul>
                {experience.missions.map((mission, index) => (
                  <li key={index}>{t(mission)}</li>
                ))}
              </ul>
            </div>
          </div>
          {index + 1 < experiences.length && (
            <div className="notion-divider"></div>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default NotionExperiencePage;
