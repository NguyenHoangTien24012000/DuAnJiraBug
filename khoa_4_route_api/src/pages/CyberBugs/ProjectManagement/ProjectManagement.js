import React, { useState, useEffect, useRef } from 'react'
import { Table, Button, Space, Tag, Popconfirm, message, Popover, AutoComplete } from 'antd';
import ReactHtmlParser from "react-html-parser";
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import { add_user_project_action, delete_project_action, get_list_project_action, get_user_action, remove_user_from_project_action } from '../../../redux/actions/CyberBugsAction';
import FormEditProject from '../../../components/Forms/FormEditProject';
import Avatar from 'antd/lib/avatar/avatar';
import { NavLink } from 'react-router-dom';


const cancel = (e) => {
  console.log(e);

}


export default function ProjectManagenment(props) {
  const projectList = useSelector(state => state.ProjectCyberBugsReducer.project)
  const dataUser = useSelector(state => state.GetUserCyberBugsReducer.dataUser)
  const [value, setValue] = useState('')
  const searchRef = useRef(null);
  let [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
    value: ''
  })
  const handleChange = (pagination, filters, sorter) => {
    // console.log('Various parameters', pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };
  const clearFilters = () => {
    setState({ filteredInfo: null });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  const setAgeSort = () => {
    setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  };
  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (item2, item1) => {
        return item2?.id - item1?.id
      },
      sortDirections: ['descend'],
    },
    {
      title: 'Project Name',
      dataIndex: 'projectName',
      key: 'projectName',
      render: (text,record,index) =>{
        return <NavLink to={`/projectdetail/${record.id}`}>{text}</NavLink>
      },
      sorter: (item2, item1) => {
        let projectName1 = item1.projectName?.trim().toLowerCase();
        let projectName2 = item2.projectName?.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1
        }
        return 1;
      },

    },
    // {
    //   title: 'Description',
    //   dataIndex: 'description',
    //   key: 'description',
    //   render:(text,record,index) =>{
    //     let jsxContent = ReactHtmlParser(text);
    //     return <div key = {index}>
    //       {jsxContent}
    //     </div>
    //   }
    // },
    {
      title: 'Category',
      // dataIndex: 'categoryName',
      key: 'categoryName',
      render: (text, record, index) => {
        return <Tag color="green">{record.creator?.name}</Tag>
      }
    },
    {
      title: 'Member',
      // dataIndex: 'categoryName',
      key: 'categoryName',
      render: (text, record, index) => {
        return <div>
          <Popover placement="bottom" title={"Member"} content={() => {
            return <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {record.members?.map((item, index) => {
                  return <tr key={index}>
                    <td>{item.userId}</td>
                    <td>{item.name}</td>
                    <td>
                      <Popconfirm
                        title="Are you sure to remove the user from the project?"
                        onConfirm={() => {
                          dispatch(remove_user_from_project_action(record.id, item.userId))
                        }}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"

                      >
                        <Button type="danger" shape="circle"><DeleteOutlined /></Button>
                      </Popconfirm>
                    </td>
                  </tr>
                })}
              </tbody>
            </table>
          }}>
            {record.members?.slice(0, 3).map((item, index) => {
              return <Avatar src={item.avatar} key={index} />
            })}
          </Popover>
          {record.members?.length > 3 ? <Avatar>...</Avatar> : ''}
          <Popover placement="right" title={"Add user"}
            content={() => {
              return <AutoComplete style={{ width: '100%' }}

                onSearch={(value) => {

                  if(searchRef.current){
                    clearTimeout(searchRef.current)
                  }

                  searchRef.current = setTimeout(()=>{
                    dispatch(get_user_action(value))
                  },300)
                
                }}
                options={
                  dataUser?.map((item, index) => {
                    return { label: item.name, value: item.userId.toString() }
                  })
                }
                value={value}
                onChange={(text) => {
                  setValue(text)
                }}
                onSelect={(value, option) => {
                  setValue(option.label)
                  dispatch(add_user_project_action(record.id, option.value))

                }}
              />
            }} trigger="click">
            <Button type="primary" shape="circle">+</Button>
          </Popover>
        </div>
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => {
        return <div>
          <button className="btn mr-2 btn-primary" onClick={() => {
            const action = {
              type: "OPEN_FORM_EDIT_PROJECT",
              title : 'Edit project',
              Component: <FormEditProject />
            }
            dispatch(action)
            const actionEditProject = {
              type: 'EDIT_PROJECT',
              projectEditModel: record
            }
            dispatch(actionEditProject)
          }}>
            <FormOutlined />
          </button>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => {
              dispatch(delete_project_action(record.id))
            }}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"

          >
            <button className="btn btn-danger"  >
              <DeleteOutlined />
            </button>
          </Popconfirm>

        </div>
      },
    }
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_list_project_action())
  }, [])
  return (
    <div className="container-fluid">
      <h3 className="mt-5">Project Management</h3>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table style={{ height: '50%' }} columns={columns} rowKey={'id'} dataSource={projectList} onChange={handleChange} />
    </div>
  )
}
