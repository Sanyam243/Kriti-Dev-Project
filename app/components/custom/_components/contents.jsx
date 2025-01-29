"use client";
import { useState, useEffect } from "react";
import styles from "./HighlightSection.module.css";
import Image from "next/image";

const textData = [
  {
    title: "20× faster than coding.",
    description: "Use your native language to describe your idea, then watch Lovable do the rest. Creating for the web is faster and easier than ever before.",
    image: "/image4.png" // Correct path relative to /public
  },
  {
    title: "Prompt to edit.",
    description: "Forget about the overhead of frontend engineers or freelancers to maintain your website. Ask in text to change anything.",
    image: "/image3.png" // Correct path relative to /public
  },
  {
    title: "You own the code.",
    description: "Everything that Lovable builds is yours. Sync your codebase to Github and edit in any code editor, export or publish your app instantly with one click.",
    image: "/image2.png" // Correct path relative to /public
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






