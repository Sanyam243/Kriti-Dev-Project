import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ImageOverlap.module.css";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger); 

const ImageOverlap = () => {
  useEffect(() => {
    const images = document.querySelectorAll(`.${styles.image}`);

    images.forEach((image, index) => {
      gsap.fromTo(
        image,
        { opacity: 0, zIndex: 1 }, // Start state
        {
          opacity: 1, // End state
          zIndex: index + 2, // Increase z-index for each image to create the overlap effect
          scrollTrigger: {
            trigger: image,
            start: "top 80%", // Trigger when the top of the image reaches 80% of the viewport
            end: "bottom top", // End when the bottom of the image reaches the top of the viewport
            scrub: true, // Smooth scroll effect
            markers: false, // Debugging markers (remove in production)
          },
        }
      );
    });
  }, []);

  return (
    <div className={styles.imageContainer}>
      <Image src="/ss1.png" alt="Image 1" width={500} height={500} className={styles.image} />
      <Image src="/ss2.png" alt="Image 2" width={500} height={500} className={styles.image} />
      <Image src="/ss3.png" alt="Image 3" width={500} height={500} className={styles.image} />
      {/* Add more images as needed */}
    </div>
  );
};

export default ImageOverlap;
