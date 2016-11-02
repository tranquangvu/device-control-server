import { CronJob } from 'cron';
import store from './jobs/store'

export default function scheduler() {
  const storeJob = new CronJob({
    cronTime: '0 */10 * * * *',
    onTick: () => {
      store();
    },
    start: false
  });
  
  storeJob.start();
}
