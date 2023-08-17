import { getCheckingList, loggerApi } from 'api/logger.api';
import React, { FC, useEffect } from 'react';
import useSWR from 'swr';
type Props = {};

const CheckingStatistic: FC<Props> = (props: Props) => {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/data',
    getCheckingList,
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return <div></div>;
};

CheckingStatistic.defaultProps = {};

export default CheckingStatistic;
