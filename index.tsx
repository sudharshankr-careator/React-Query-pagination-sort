import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { render } from 'react-dom';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Hello from './Hello';
import { Table, Input } from 'antd';
import './style.css';
import 'antd/dist/antd.css';

const client = new QueryClient();
const App = () => {
  const [user, setuser] = useState<any>();
  const url = 'https://jsonplaceholder.typicode.com/users';
  const getpro = () => axios.get(url);
  const [search, setserach] = useState('');
  const { data, status, error, isLoading } = useQuery('product', getpro);
  const pagination: any = {
    pageSize: 3,
  };
  useEffect(() => {
    if (!error && !isLoading) setuser(data.data);
  }, [!error, !isLoading]);

  if (status === 'loading') <h3>loading</h3>;
  if (status === 'error') <h3>error</h3>;

  const colums = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: 'username',
      dataIndex: 'username',
      sorter: (a: any, b: any) => a.username.localeCompare(b.username),
    },
    {
      title: 'email',
      dataIndex: 'email',
    },
  ];
  return (
    <div>
      <Input.Search
        style={{ width: 200, marginTop: '1rem' }}
        onSearch={(val) => setserach(val)}
      />
      <Table
        columns={colums}
        dataSource={
          user &&
          user.filter((val) => {
            if (search === '') {
              return val;
            } else if (
              val.username.toLowerCase().includes(search.toLowerCase())
            ) {
              return val;
            }
          })
        }
        pagination={pagination}
      />
    </div>
  );
};

render(
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
);
