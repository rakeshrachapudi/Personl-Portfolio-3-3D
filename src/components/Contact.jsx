import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import ScrollUpButton from "./ScrollUpButton";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [secondMessage, setSecondMessage] = useState(false);

  useEffect(() => {
    let timer;
    if (messageSent) {
      timer = setTimeout(() => {
        setMessageSent(false);
        setSecondMessage(true);
      }, 7000); //7 seconds
    }
    return () => clearTimeout(timer);
  }, [messageSent]);

  useEffect(() => {
    let secondMessageTimer;
    if (secondMessage) {
      secondMessageTimer = setTimeout(() => {
        setSecondMessage(false);
      }, 5000); // 5 seconds
    }
    return () => clearTimeout(secondMessageTimer);
  }, [secondMessage]);

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

    emailjs
      .send(
        "service_seobqxq",
        "template_zf90a2e",
        {
          from_name: form.name,
          to_name: "Rakesh",
          from_email: form.email,
          to_email: "rakeshrachapudi04@gmail.com",
          message: form.message,
        },
        "mw-uMxCuF_KirqpgB"
      )
      .then(
        () => {
          setLoading(false);
          setMessageSent(true);
          // alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert(
            "Ahh, something went wrong. Please check your internet connection and try again."
          );
        }
      );
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch . .</p>
        <h3 className={styles.sectionHeadText}>Contact</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Rakesh Rachapudi"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              autoComplete="name"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">E-mail</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="rakeshrachapudi04@gmail.com"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              autoComplete="email"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Wanna say something!..😉"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              autoComplete="message"
            />
            {messageSent && (
              <p className="text-red-500 text-xs">
                <span className="font-medium">
                  🥵Whoa Whoa Whoa!🤯 Your message has sparked a fire!🔥 But
                  just in case, I'll douse it with water!💦
                </span>
              </p>
            )}
            {secondMessage && (
              <p className="text-green-500 text-xs">
                <span className="font-medium">
                  Just kidding!😛 Your message has been sent successfully 😌
                </span>
              </p>
            )}
          </label>

          <button
            type="submit"
            className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
        <div className="flex mt-8 justify-center space-x-4">
          <a
            href="https://www.linkedin.com/in/rakesh-rachapudi-4572b22b4/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              size="2x"
              className="text-white hover:text-blue-500"
            />
          </a>
          <a
            href="https://github.com/rakeshrachapudi/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faGithub}
              size="2x"
              className="text-white hover:text-gray-500"
            />
          </a>
          <a
            href="https://x.com/RakeshRachpudi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faTwitter}
              size="2x"
              className="text-white hover:text-blue-400"
            />
          </a>
          <a
            href="https://www.instagram.com/i_.am_.vicky/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              size="2x"
              className="text-white hover:text-pink-400"
            />
          </a>
        </div>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>

      <ScrollUpButton />
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
