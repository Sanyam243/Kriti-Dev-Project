"use client";
import { useState, useEffect } from "react";
import styles from "./HighlightSection.module.css";
import Image from "next/image";

const textData = [
  {
    title: "code in your own native language .",
    description: "Use your native language to describe your idea, then watch Lovable do the rest. Creating for the web is faster and easier than ever before.",
    image: "/ss1.png" 
  },
  {
    title: "Re-prompting feature.",
    description: "Say goodbye to the hassle of relying on frontend engineers or freelancers to manage your website. Just send a text, and we'll handle the changes for you!",
    image: "/ss2.png"
  },
  {
    title: "Drag and Drop Customization Interface.",
    description: "Interface allows user to edit content directly by clicking or checking the options, apply different fonts, colors, and styles to text elements, ensuring the website aligns with their desired aesthetic.",
    image: "/ss3.png" 
  }
];

export default function HighlightSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % textData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.textSection}>
        {textData.map((item, index) => (
          <div
            key={index}
            className={`${styles.textItem} ${index === currentIndex ? styles.active : ""}`}
          >
            <h2 className={styles.title}>{item.title}</h2>
            <p className={styles.description}>{item.description}</p>
          </div>
        ))}
      </div>
      <div className={styles.imageSection}>
        <Image
          src={textData[currentIndex].image} // Ensure this path is correct
          width={600} // Set an appropriate width
          height={600} // Set an appropriate height
          alt="Highlighted"
          className={styles.image}
        />
      </div>
    </div>
  );
}






