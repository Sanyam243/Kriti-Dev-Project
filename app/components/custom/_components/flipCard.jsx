
// "use client"
// import Image from 'next/image';
// import styles from './flipCard.module.css';


// const FlipCard = ({ title, description, imageUrl, backContent }) => {
//   return (
//     <div className={styles.flipBox}>
       
//       <div className={styles.flipBoxInner}>
//         <div
//           className={`${styles.flipBoxFront} ${styles.textCenter}`}
   
//         // style={{ backgroundImage: `url(${imageUrl})` }}
//         style={{ backgroundImage: `url("/ai1.jpg")` }}
//         >
//           <div className={styles.inner}>
//             <h3 className={styles.flipBoxHeader}>{title}</h3>
//             <p>{description}</p>
//             {/* <Image
//               src="https://s25.postimg.cc/65hsttv9b/cta-arrow.png"
//               alt="Arrow"
//               className={styles.flipBoxImg}
//               width={50}
//               height={50}
//             /> */}
//           </div>
//         </div>
//         <div
//           className={`${styles.flipBoxBack} ${styles.textCenter}`}
//           style={{ backgroundImage: `url("/ai2.jpg")` }}
//         >
//           <div className={styles.inner}>
//             <h3 className={styles.flipBoxHeader}>{title}</h3>
//             <p>{backContent}</p>
//             <button className={styles.flipBoxButton}>Learn More</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FlipCard;



"use client";
import styles from './flipCard.module.css';

const FlipCard = ({ title, description, backContent }) => {
  return (
    <div className={styles.flipBox}>
      <div className={styles.flipBoxInner}>
        {/* Front Side */}
        <div
          className={`${styles.flipBoxFront} ${styles.textCenter}`}
          style={{ backgroundImage: `url("/ai1.jpg")` }}
        >
          <div className={styles.inner}>
            <h3 className={styles.flipBoxHeader}>{title}</h3>
            <p>{description}</p>
          </div>
        </div>

        {/* Back Side */}
        <div
          className={`${styles.flipBoxBack} ${styles.textCenter}`}
          style={{ backgroundImage: `url("/ai2.jpg")` }}
        >
          <div className={styles.inner}>
            <h3 className={styles.flipBoxHeader}>{title}</h3>
            <p>{backContent}</p>
            <button className={styles.flipBoxButton}>Learn More</button>
          </div>
        </div>

        {/* Third Image Side */}
        <div
          className={`${styles.flipBoxThird} ${styles.textCenter}`}
          style={{ backgroundImage: `url("/ai3.jpg")` }}
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
