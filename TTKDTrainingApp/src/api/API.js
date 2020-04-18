export const BASE_S3_URI = 'https://ttkd.s3.amazonaws.com/ttkd';

export const fetchAppData = async () => {
  // This can change when expanding to multiple studios
  const studioCode = 'ttkd';
  return await fetch(
    `https://v8eklcakr9.execute-api.us-east-1.amazonaws.com/ttkdDBFetchAll?studio_code=${studioCode}`,
  );
};
