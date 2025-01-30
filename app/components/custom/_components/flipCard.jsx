
"use client"
import Image from 'next/image';
import styles from './flipCard.module.css';


const FlipCard = ({ title, description, imageUrl, backContent }) => {
  return (
    <div className={styles.flipBox}>
       
      <div className={styles.flipBoxInner}>
        <div
          className={`${styles.flipBoxFront} ${styles.textCenter}`}
   
        style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <div className={styles.inner}>
            <h3 className={styles.flipBoxHeader}>{title}</h3>
            <p>{description}</p>
            {/* <Image
              src="https://s25.postimg.cc/65hsttv9b/cta-arrow.png"
              alt="Arrow"
              className={styles.flipBoxImg}
              width={50}
              height={50}
            /> */}
          </div>
        </div>
        <div
          className={`${styles.flipBoxBack} ${styles.textCenter}`}
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <div className={styles.inner}>
            <h3 className={styles.flipBoxHeader}>{title}</h3>
            <p>{backContent}</p>
            <button className={styles.flipBoxButton}>Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
