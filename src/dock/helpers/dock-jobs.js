// Jobs are background tasks that run asynchronously on the server to complete blockchain transactions
import { get } from '../utils/http-utils';

export const getJob = async (id) => {
  const result = await get(`jobs/${id}`);
  return result.data;
}

export const waitForJobCompletion = async (jobId) => {
  let job = {};
  while (job.status !== 'finalized' && job.status !== 'error') {
    job = await getJob(jobId);

    // sleep a bit
    await new Promise((r) => setTimeout(r, 2000));
  }

  console.log(`Job Response: ${JSON.stringify(job)}`);
}
