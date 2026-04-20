
import React, { useState } from "react";
import { contactPageStyles as styles } from "../assets/dummyStyles";
import { FaClock, FaEnvelope, FaMapMarkedAlt, FaWhatsapp } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    // carType: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappMessage =
      `Name: ${formData.name}%0A` +
      `Email: ${formData.email}%0A` +
      `Phone: ${formData.phone}%0A` +
    //   `Car Type: ${formData.carType}%0A` +
      `Message: ${formData.message}`;

    window.open(
      `https://wa.me/1234567890?text=${whatsappMessage}`, // Replace with your WhatsApp number
      "_blank"
    );

    setFormData({
      name: "",
      email: "",
      phone: "",
    //   carType: "",
      message: "",
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* TITLE */}
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Contact Our Team</h1>
          <div className={styles.divider}></div>
          <p className={styles.subtitle}>
            Have questions? Our team will solve it.
          </p>
        </div>

        {/* MAIN FLEX CONTAINER */}
        <div className={styles.cardContainer}>
          {/* LEFT CARD */}
          <div className={styles.infoCard}>
            <h2 className={styles.infoTitle}>
              <FaMapMarkedAlt className={styles.infoIcon} />
              Our Information
            </h2>

            {[
              {
                icon: FaWhatsapp,
                label: "WhatsApp",
                value: "+91 1234567890",
                color: "text-green-400",
              },
              {
                icon: FaEnvelope,
                label: "Email",
                value: "contact@exoticinfotech.com",
                color: "text-orange-400",
              },
              {
                icon: FaClock,
                label: "Hours",
                value: "Mon-Sat: 10:30AM - 6:30PM",
                color: "text-orange-400",
              },
            ].map((item, i) => (
              <div key={i} className={styles.infoItem}>
                <item.icon className={`${item.color} text-xl`} />
                <div>
                  <p className={styles.infoLabel}>{item.label}</p>
                  <p className={styles.infoValue}>
                    {item.value}
                    {item.label === "Hours" && (
                      <span className="block text-gray-500">
                        Sunday: Off
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT CARD */}
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>
              <IoIosSend className={styles.infoIcon} />
              Send Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className={styles.input}
                required
              />

              {/* <input
                type="text"
                name="carType"
                placeholder="Car Type"
                value={formData.carType}
                onChange={handleChange}
                className={styles.input}
              /> */}

              <textarea
                name="message"
                placeholder="Message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className={styles.textarea}
              ></textarea>

              <button type="submit" className={styles.submitBtn}>
                Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;


