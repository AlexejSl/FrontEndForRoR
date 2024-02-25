import Top3users from '../components/Top3users';
import Top5posts from '../components/Top5posts';
import TopMenu from '../components/TopMenu';
import styles from './Statistics.module.scss';

function Statistics() {
  return (
    <div className={styles.mainContainer}>
      <TopMenu />
      <div className={styles.statsBox}>
        <h2 className={styles.statHeader}>Top 5 posts with most comments</h2>
        <Top5posts />
      </div>

      <div className={styles.statsBox}>
        <h2 className={styles.statHeader}>Top 3 users with most posts</h2>
        <Top3users path="most_posts" />
      </div>

      <div className={styles.statsBox}>
        <h2 className={styles.statHeader}>
          Top 3 users by average post engagement
        </h2>
        <Top3users path="most_engaged" />
      </div>
    </div>
  );
}

export default Statistics;
