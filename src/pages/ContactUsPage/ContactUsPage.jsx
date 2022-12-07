import React,{ useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactForm from "../../components/ContactForm/ContactForm";
import Header from "../../components/Header/Header";
import MapAndDetails from "../../components/MapAndDetails/MapAndDetails";
import { animateScroll as scroll } from "react-scroll";

export default function ContactUsPage() {
  const { lang } = useSelector((state) => state.language);
    useEffect(() => {
    scroll.scrollToTop();
  },[]);
  return (
    <div className="hide-contact">
      <Header title={lang==="english"?"Contact Us":"تواصل بنا" } subTitle={lang==="english"?"Enter your details below and one of our representatives will contact with you as soon as possible":"سجل بياناتك بالاسفل و سيقوم أحد ممثلينا بالرد عليكم فى أقرب وقت"

}
cover="imgs/sean-pollock-PhYq704ffdA-unsplash.jpg"/>

      <ContactForm />
      <MapAndDetails />
     
    </div>
  );
}
