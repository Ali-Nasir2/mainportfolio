import React from "react";
import {Tilt} from "react-tilt";
import { motion } from "framer-motion";
import { useLanguage } from '../context/LanguageContext';

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        {icon && (
          <img
            src={icon}
            alt={title || 'service-icon'}
            className='w-16 h-16 object-contain'
          />
        )}

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title || ''}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  const { currentLanguage, t } = useLanguage();
  
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{t('introduction')}</p>
        <h2 className={styles.sectionHeadText}>{t('overview')}</h2>
      </motion.div>
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-5xl leading-[30px]'
      >
        {t('aboutDescription')}
      </motion.p>
      <div className='mt-20 flex flex-wrap gap-10'>
        {services[currentLanguage]?.map((service, index) => (
          <ServiceCard 
            key={`service-${index}`}
            index={index} 
            {...service} 
          />
        )) || []}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");