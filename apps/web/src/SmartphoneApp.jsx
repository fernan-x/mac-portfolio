import React, { useState, useEffect } from "react";
import moment from "moment";
import { StatusBar } from "./components/Smartphone";
import Footer from "./components/Smartphone/Footer/Footer";
import LockScreen from "./components/Smartphone/LockScreen/LockScreen";

const SmartphoneApp = () => {
  const [date, setDate] = useState("6:34");
  const [hour, setHour] = useState("Monday, March 18");
  const dateFormat = "dddd, MMMM D";
  const hourFormat = "h:mm";

  useEffect(() => {
    setDate(moment().format(dateFormat));
    setHour(moment().format(hourFormat));

    const interval = setInterval(() => {
      setDate(moment().format(dateFormat));
      setHour(moment().format(hourFormat));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="smartphone-app locked">
      <StatusBar hour={hour} />
      <LockScreen hour={hour} date={date} />
      <Footer />
    </div>
  );
};

export default SmartphoneApp;
