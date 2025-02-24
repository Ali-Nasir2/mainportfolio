import React from "react";
import { motion } from "framer-motion";
import { Linkedinlogo , emaillogo, recomendation} from "../assets";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";
import { useLanguage } from '../context/LanguageContext';

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
  url,
  doc,
  email,
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className='bg-black-200 p-5 sm:p-10 rounded-3xl w-full xs:w-[320px]'
  >
    <div className='flex items-center gap-2'>
      <p className='text-white font-black text-[36px] sm:text-[48px] mb-0 leading-none'>"</p>
      <div className='flex ml-auto gap-2'> 
        {url && (
          <button
            className='bg-tertiary p-1.5 sm:p-2 rounded-xl outline-none text-white font-bold flex items-center'
            onClick={() => window.open(url, "_blank")}
          >
            <img
              src={Linkedinlogo} 
              alt="LinkedIn"
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
          </button>
        )}
        {email && (
          <button
            className='bg-tertiary p-1.5 sm:p-2 rounded-xl outline-none text-white font-bold flex items-center'
            onClick={() => {
              window.open(`mailto:${email}`, "_blank");
            }}
          >
            <img
              src={emaillogo} 
              alt="Email"
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
          </button>
        )}
        {doc && (
          <button
            className='bg-tertiary p-1.5 sm:p-2 rounded-xl outline-none text-white font-bold flex items-center'
            onClick={() => {
              window.open(doc, "_blank");
            }}
          >
            <img
              src={recomendation} 
              alt="View Document"
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
          </button>
        )}
      </div>
    </div>
    <div className='mt-1'>
      <p className='text-white tracking-wider text-[16px] sm:text-[18px]'>{testimonial}</p>
      <div className='mt-7 flex justify-between items-center gap-1'>
        <div className='flex-1 flex flex-col'>
          <p className='text-white font-medium text-[16px]'>
            <span className='blue-text-gradient'>@</span> {name}
          </p>
          <p className='mt-1 text-secondary text-[12px]'>
            {designation} of {company}
          </p>
        </div>

        <img
          src={image}
          alt={`feedback_by-${name}`}
          className='w-10 h-10 rounded-full object-cover'
        />
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  const { currentLanguage, t } = useLanguage();

  return (
    <div className={`mt-12 bg-black-100 rounded-[20px]`}>
      <div className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>{t('whatOthersSay')}</p>
          <h2 className={styles.sectionHeadText}>{t('testimonials')}</h2>
        </motion.div>
      </div>
      <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7`}>
        {testimonials[currentLanguage].map((testimonial, index) => (
          <FeedbackCard
            key={testimonial.name}
            index={index}
            {...testimonial}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");