export const BASE_S3_URI = 'https://ttkd-test-s3.s3.amazonaws.com';

export const validateStudioCode = async studio => {
  // currently mocked with a studio mapping, but will fetch from an API in the future
  const studios = {
    TTKD: 'ttkd',
  };
  return studios.hasOwnProperty(studio) && studios[studio];
};

export const fetchAppData = async studio => {
  return await fetch(
    `https://sfjy3c2yji.execute-api.us-east-1.amazonaws.com/TestDBFetchall?studio=${studio}`,
  );
};

export const generateS3URL = (studio, title, path) =>
  `${BASE_S3_URI}/${studio}/${title}/${path}`.replace(/ /g, '%20');
