export const BASE_S3_URI = 'https://ttkd-test-s3.s3.amazonaws.com/ttkd';

export const fetchAppData = async () => {
  return await fetch(
    'https://sfjy3c2yji.execute-api.us-east-1.amazonaws.com/TestDBFetchall',
  );
};
