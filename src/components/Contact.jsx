import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { Linkedinlogo } from "../assets";
import { X } from "../assets";
import { github } from "../assets";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Include form.email in the message
    const fullMessage = `${form.message}\n\nEmail: ${form.email}`;

    emailjs
      .send(
        'service_nfqrjzh',
        'template_p7khd1j',
        {
          from_name: form.name,
          to_name: "Raphael Sanchez",
          from_email: form.email,
          to_email: "0xrphl@gmail.com",
          message: fullMessage, // Use the updated message here
        },
        'C-lqF5So-fON-s2VF'
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl relative'
      >
       <div className='flex absolute top-2 right-2 gap-2'>
          <button
            className='bg-tertiary py-2 px-2 rounded-xl outline-none text-white font-bold flex items-center'
            onClick={() => {
              window.open("https://www.linkedin.com/in/0xraphael/", "_blank");
            }}
          >
            <img
              src={Linkedinlogo}
              alt="Linkedin"
              style={{ width: '30px', height: '30px', marginRight: '0px' }}
            />
          </button>
          <button
            className='bg-tertiary py-2 px-2 rounded-xl outline-none text-white font-bold flex items-center'
            onClick={() => {
              window.open("https://github.com/0xrphl", "_blank");
            }}
          >
            <img
              src={github}
              alt="GitHub"
              style={{ width: '30px', height: '30px', marginRight: '0px' }}
            />
          </button>
          <button
            className='bg-tertiary py-2 px-2 rounded-xl outline-none text-white font-bold flex items-center'
            onClick={() => {
              window.open("https://twitter.com/0xrnull", "_blank");
            }}
          >
            <img
              src={X}
              alt="X"
              style={{ width: '30px', height: '30px', marginRight: '0px' }}
            />
          </button>
        </div>

        

        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form ref={formRef} onSubmit={handleSubmit} className='mt-12 flex flex-col gap-8'>
        <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="Type your Name"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="Type Email address"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='Type your question or inquiry'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>

          <button
            type='submit'
            className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
