import { CronJob } from 'cron';
import storeValues from './jobs/storeValues'

export default function scheduler() {
  const storeValuseJob = new CronJob({
    cronTime: '0 */1 * * * *',
    onTick: () => {
      storeValues();
    },
    start: false
  });
  
  storeValuseJob.start();
}
