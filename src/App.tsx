import {CSSProperties, useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import logo from './assets/light-logo.svg'
import {
    ArrowRightOutlined,
    CaretRightOutlined, GithubOutlined,
    InfoCircleOutlined,
    QuestionCircleFilled, QuestionCircleOutlined,
    RightOutlined
} from '@ant-design/icons';
import {
    Collapse,
    CollapseProps,
    Divider,
    Space,
    Typography,
    theme,
    Switch,
    ConfigProvider,
    Tooltip,
    Button, Result
} from "antd";
import {qifei} from "./util.ts";
// import {useToken} from "antd/es/theme/internal";
const {Text}  =Typography
const text = `Canyon offers a solution that involves adding a code probe during the construction of JavaScript projects and triggering the code probe upon page loading to gather code coverage data.`;

const {useToken} = theme
function App() {
  const [count, setCount] = useState(0)
    const [data,setData] = useState({
        "commitSha": "",
        "projectID": "",
        "branch": "",
        "dsn": "",
        "reporter": "",
        "instrumentCwd": ""
    })
    const {token} = useToken()
    const panelStyle: React.CSSProperties = {
        marginBottom: 24,
        background: token.colorPrimaryBg,
        // borderRadius: token.borderRadiusLG,
        border: 'none',
    };
    const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
        {
            key: '1',
            label: <span style={{
                fontWeight:'bold',
                color:token.colorPrimary
            }}>{'Canyon is a JavaScript code coverage solution'}</span>,
            children: <div style={{
                color:token.colorPrimary
            }}>
                <p>{text}</p>
                <span style={{textAlign:'right',display:'block',fontWeight:'bold'}}>Learn more<ArrowRightOutlined style={{marginLeft:'10px'}}/></span>
            </div>,
            style: panelStyle,
        },
    ];

    useEffect(()=>{
        qifei().then(res=>{
            console.log(res)
            if (res){

                // setData(res)
            }

        })
    },[])



  return (
      <ConfigProvider theme={{
          token: {
              colorPrimary:'#3264ff'
          }
      }}>

          <div id={'box'} style={{width: '500px', margin: '0'}}>
              <header className={'header'}>
                  <div style={{fontSize:'24px',display:'flex',alignItems:'center'}}>
                      <img style={{width:'36px',marginRight:'12px'}} src={logo} alt=""/>
                      <span style={{fontWeight:'bold'}}>Canyon</span>
                  </div>

                  <div>
                      <GithubOutlined/>
                  </div>
              </header>
              <div className={'main'}>
                  <div className={'row'}>
                      <span className={'title'}>Data</span>
                      <Space direction={'vertical'}>
                          <Space>
                              <Space style={{fontSize: '14px', color: token.colorTextSecondary}}>Project
                                  ID<span>:</span></Space>
                              <Text>{data.projectID}</Text>
                          </Space>
                          <Space>
                              <Space style={{fontSize: '14px', color: token.colorTextSecondary}}>
                                  Auto
                                  <Tooltip title={'sss'}>
                                      <QuestionCircleOutlined/>
                                  </Tooltip>:
                              </Space>
                              <Text>
                                  <ConfigProvider theme={{
                                      token: {
                                          // colorPrimary:'white'
                                      }
                                  }}>
                                      <Switch/>
                                  </ConfigProvider>
                              </Text>
                          </Space>
                      </Space>
                      <Divider/>
                  </div>

                  <div className={'row'}>
                      <span className={'title'}>Operate</span>
                      <div style={{display: 'flex'}}>
                          <Button style={{flex: '1'}} type={'primary'} onClick={()=>{
                              qifei().then(res=>{
                                  console.log(res,'1111')
                              })
                          }}>Upload</Button>
                          <div style={{width: '20px'}}></div>
                          <Button style={{flex: '1'}}>Reset</Button>
                      </div>
                      <Divider/>
                  </div>


                  <div className="row">
                      <span className="title">Result</span>
                      <div>
                          <Result
                              style={{padding: '0px'}}
                              status="success"
                              title="Upload Success"
                              subTitle="The report was successfully uploaded, please go to https://canyon.com to view the details of the report."
                              // extra={[
                              //     <Button type="primary" key="console">
                              //         Go Console
                              //     </Button>,
                              //     <Button key="buy">Buy Again</Button>,
                              // ]}
                          />
                      </div>
                      <Divider/>
                      <div>
                          <a href="" style={{fontSize: '12px'}}>Something wrong or missing?</a>
                      </div>
                  </div>
              </div>
              <footer>

                  <Collapse
                      bordered={false}
                      defaultActiveKey={['1']}
                      expandIcon={({isActive}) => <CaretRightOutlined style={{
                          color: token.colorPrimary
                      }} rotate={isActive ? 90 : 0}/>}
                      // style={{ background: token.colorBgContainer }}
                      items={getItems(panelStyle)}
                  />
              </footer>
          </div>
      </ConfigProvider>
  )
}

export default App
