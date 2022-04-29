import React from "react";
import { useTranslation } from "react-i18next";
import code42 from "../../assets/images/code42.jpg";
import soprasteria from "../../assets/images/soprasteria.jpeg";

const experiences = [
  {
    title: "Full Stack lead developer PHP & React.JS",
    company: "Code 42",
    location: "Nantes",
    date: "09/2020 - present",
    missions: [
      "Leading a team of 5 developers",
      "Project management / technical architecture",
      "On demand software development",
      "Development processes creation",
      "Documentations and training creation",
    ],
    image: code42,
  },
  {
    title: "Full Stack Java developer",
    company: "Sopra Steria",
    location: "Nantes",
    date: "03/2020 - 09/2020",
    missions: [
      "French criminal record redesign",
      "Work on a team composed of 100 developers",
      "Adaptation to the environment in full remote context",
    ],
    image: soprasteria,
  },
  {
    title: "Full Stack PHP developer (Part time)",
    company: "Code 42",
    location: "Nantes",
    date: "09/2019 - 02/2020",
    missions: ["Company management software"],
    image: code42,
  },
  {
    title: "Freelance Full Stack PHP developer",
    company: "Code 42 / Graslin Immobilier",
    location: "Bahrain",
    date: "2018 - 2020",
    missions: [
      "Property management software",
      "Self employed company management",
      "Customer relationship",
    ],
    image: code42,
  },
  {
    title: "Intern PHP / Laravel developer",
    company: "Code 42",
    location: "Nantes",
    date: "04/2018 - 07/2018",
    missions: [],
    image: code42,
  },
  {
    title: "Intern PHP developer",
    company: "Code 42",
    location: "Nantes",
    date: "09/2016 - 12/2016",
    missions: [],
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
              <h2>{experience.title}</h2>
              <span className="notion-subtitle">
                <b>{experience.company}</b>, {experience.location} -{" "}
                {experience.date}
              </span>
              <ul>
                {experience.missions.map((mission, index) => (
                  <li key={index}>{mission}</li>
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
