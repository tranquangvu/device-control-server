import { CronJob } from 'cron';

let job = new CronJob({
  cronTime: '0 */1 * * * *',
  onTick: () => {
    console.log('cron job completed');
  },
  start: false
});

job.start();
