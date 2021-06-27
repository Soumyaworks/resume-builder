import React, { createContext, useState, useEffect } from "react";
import fakeData from "../utils/fake_data";
import firebase from "../firebase";
export const ResumeContext = createContext();

const ResumeContextProvider = (props) => {
  //If there is no data stored in localStorage, then use the default object.
  const [content, setContent] = useState(
    JSON.parse(localStorage.getItem("dataLocal") || null) || {
      header: {},
      professional: { desc1: ["", "", ""], desc2: ["", "", ""] },
      education: {},
      additional: [],
      templateType: "",
    }
  );

  const [contentFake, setContentFake] = useState();

  //Used to "Right" components know when to use the original state or the fake one (for the "example")
  const [control, setControl] = useState(false);

  function updateTemplateType(data) {
    setContent({ ...content, templateType: data });
  }

  function updateHeaderData(data) {
    setContent({ ...content, header: data });
  }

  function updateProfessionalData(data) {
    setContent({ ...content, professional: data });
  }

  function updateEducationData(data) {
    setContent({ ...content, education: data });
  }

  function updateAdditionalData(data) {
    setContent({ ...content, additional: Object.values(data) }); //Converting the object to an Array in order to iterate in AdditionalSkillsP.js
  }

  function addFakeData() {
    setControl(true);
    setContentFake(fakeData);
  }

  function removeFakeData() {
    setControl(false);
    setContentFake({
      header: {},
      professional: { desc1: ["", "", ""], desc2: ["", "", ""] },
      education: {},
      additional: [],
    });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const wordRef = firebase.default.database().ref();
    wordRef
      .child(token)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          let retrieveData = JSON.parse(snapshot.val());
          setContent(retrieveData);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("dataLocal", JSON.stringify(content));
    const token = localStorage.getItem("token");
    if (token) {
      const itemref = firebase.default.database().ref(token);
      itemref.set(JSON.stringify(content));
    }
  }, [content]);

  return (
    <ResumeContext.Provider
      value={{
        content,
        control,
        contentFake,
        setContent,
        updateHeaderData,
        updateProfessionalData,
        updateEducationData,
        updateAdditionalData,
        addFakeData,
        removeFakeData,
        updateTemplateType,
      }}
    >
      {/* This refers to the children that this provider/components wraps. */}
      {props.children}
    </ResumeContext.Provider>
  );
};

export default ResumeContextProvider;
