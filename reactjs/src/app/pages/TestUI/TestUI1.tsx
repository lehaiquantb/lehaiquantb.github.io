import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import './TestUI1.scss';
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Age',
    width: 100,
    dataIndex: 'age',
    key: 'age',
    fixed: 'left',
  },
  {
    title: 'Column 1',
    width: 100,
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a>action</a>,
  },
];

const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
export const TestUI1 = () => {
  return (
    <div
      className="testui1"
      style={{
        height: 700,
        width: 600,
        backgroundColor: 'yellow',
        marginLeft: 100,
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
      }}
    >
      <h1>TestUI1</h1>
      <div style={{ overflow: 'auto', margin: 20 }}>
        {/* <h2 style={{ position: 'sticky' }}>dss</h2>
        <p>asda</p> */}
        <Table
          columns={columns}
          dataSource={data}
          //   scroll={{ y: 300 }}
          pagination={false}
        />
      </div>
      <div>Footer</div>
    </div>
  );
};
