import {CSSProperties, useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import logo from './assets/light-logo.svg'
import {
    ArrowRightOutlined,
    CaretRightOutlined, DownloadOutlined, GithubOutlined,
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
    Button, Result, Input
} from "antd";
import {qifei} from "./util.ts";
// import {useToken} from "antd/es/theme/internal";
const {Text}  =Typography
const text = `Canyon offers a solution that involves adding a code probe during the construction of JavaScript projects and triggering the code probe upon page loading to gather code coverage data.`;

const {useToken} = theme
function App() {
  const [count, setCount] = useState(0)
    const [data,setData] = useState({
        "commitSha": "ac6061b6f00179f77102561cbd737c205b98c27d",
        "projectID": "999999",
        "branch": "rel/8.62.dev.price",
        "dsn": "http://canyon.org.io",
        "reporter": "tzhangm",
        "instrumentCwd": "/Users/zhangtao/github.com/canyon-project/canyon-extension"
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
                <span onClick={()=>{
                    window.open('https://github.com/canyon-project/canyon')
                }} style={{textAlign:'right',display:'block',fontWeight:'bold',cursor:'pointer'}}>Learn more<ArrowRightOutlined style={{marginLeft:'10px'}}/></span>
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
                  <div style={{fontSize:'24px',display:'flex',alignItems:'center',cursor:'pointer'}} onClick={()=>{
                      window.open('https://github.com/canyon-project/canyon')
                  }}>
                      <img style={{width:'36px',marginRight:'12px'}} src={logo} alt=""/>
                      <span style={{fontWeight:'bold'}}>Canyon</span>
                  </div>

                  <div style={{cursor:'pointer'}} onClick={()=>{
                      window.open('https://github.com/canyon-project/canyon')
                  }}>
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
                              <Space style={{fontSize: '14px', color: token.colorTextSecondary}}>Commit Sha
                                  <span>:</span></Space>
                              <Text>{data.commitSha}</Text>
                          </Space>

                          <Space>
                              <Space style={{fontSize: '14px', color: token.colorTextSecondary}}>Branch
                                  <span>:</span></Space>
                              <Text>{data.branch}</Text>
                          </Space>

                          <Space>
                              <Space style={{fontSize: '14px', color: token.colorTextSecondary}}>DSN
                                  <span>:</span></Space>
                              <Text>{data.dsn}</Text>
                          </Space>

                          <Space>
                              <Space style={{fontSize: '14px', color: token.colorTextSecondary}}>Coverage
                                  <span>:</span></Space>
                              <a href="">
                                  <Text>16</Text>
                                  <DownloadOutlined style={{marginLeft:'8px'}}/>
                              </a>
                          </Space>




                          <Space>
                              <Space style={{fontSize: '14px', color: token.colorTextSecondary}}>Report ID
                                  <Tooltip title={'Coverage data for the same report id can be aggregated'}>
                                      <QuestionCircleOutlined/>
                                  </Tooltip>
                                  <span>:</span></Space>
                              <Input value={''} style={{width:'320px'}} placeholder={'The default value is Commit Sha'}/>
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
                          <a href="https://github.com/canyon-project/canyon" target={'_blank'} style={{fontSize: '12px'}}>Something wrong or missing?</a>
                      </div>
                  </div>
              </div>
              <footer>

                  <Collapse
                      bordered={false}
                      defaultActiveKey={[]}
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
