import { DownloadOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { useRequest } from 'ahooks';
import { Alert, Button, Input, Modal, Space, Spin, Tag, Tooltip } from 'antd';
import { useMemo, useState } from 'react';

import { downJson, getCoverageAndCanyonData, upload } from '../../helper.ts';
import AppDataLayout from './data/layout.tsx';
import AppResult from './result.tsx';
import AppRow from './row.tsx';

const AppMain = () => {
  const [coverages, setCoverages] = useState<any>([]);
  const [reportID, setReportID] = useState('');
  const {
    data: uploadData,
    loading: uploadLoading,
    refresh: uploadRefresh,
    error: uploadError,
  } = useRequest(
    () =>
      upload({
        canyon: {
          ...canyon,
          reportID: reportID || undefined,
        },
        coverage,
      }),
    {
      manual: true,
      onSuccess() {},
    },
  );
  const {
    data: { canyon, coverage } = {
      canyon: {
        commitSha: '-',
        projectID: '-',
        branch: '-',
        dsn: '-',
        reporter: '-',
        instrumentCwd: '-',
      },
      coverage: {},
    },
    loading,
    refresh,
    error: error,
  } = useRequest(
    () => {
      return getCoverageAndCanyonData();
    },
    {
      onSuccess(res: any) {
        setCoverages([coverages.length > 0 ? coverages[1] : null, res.coverage]);
      },
      onError(err) {
        errorAlert(err);
      },
    },
  );
  const isnew = useMemo(() => {
    return JSON.stringify(coverages[0]) !== JSON.stringify(coverages[1]);
  }, [coverages]);
  const errorAlert = (e: any) => {
    Modal.error({
      title: String(e),
    });
  };
  return (
    <div
      css={css`
        padding: 20px;
      `}
    >
      {error && (
        <Alert
          css={css`
            margin-bottom: 20px;
          `}
          type={'error'}
          message={`${error}`}
          showIcon
        />
      )}
      <AppRow title={'Data'}>
        <Spin spinning={loading}>
          <Space direction={'vertical'}>
            <AppDataLayout label={'Project ID'} value={canyon.projectID} />
            <AppDataLayout label={'Commit Sha'} value={canyon.commitSha} />
            <AppDataLayout label={'Branch'} value={canyon.branch} />
            <AppDataLayout label={'DSN'} value={canyon.dsn} />
            <AppDataLayout
              label={'Coverage'}
              value={
                <div>
                  <a
                    onClick={() => {
                      downJson(JSON.stringify(coverage), canyon.projectID + '-' + canyon.commitSha);
                    }}
                  >
                    {Object.keys(coverage).length}
                    <DownloadOutlined
                      css={css`
                        margin-left: 8px;
                      `}
                    />
                  </a>{' '}
                  {isnew && coverages[0] ? (
                    <Tooltip title={'has new'}>
                      <Tag
                        css={css`
                          margin-left: 8px;
                          cursor: default;
                        `}
                        color={'success'}
                      >
                        New
                      </Tag>
                    </Tooltip>
                  ) : null}
                </div>
              }
            />
            <AppDataLayout
              label={
                <>
                  Report ID
                  <Tooltip title={'Coverage data for the same report id can be aggregated'}>
                    <QuestionCircleOutlined />
                  </Tooltip>
                </>
              }
              value={
                <Input
                  value={reportID}
                  onChange={(e) => {
                    setReportID(e.target.value);
                  }}
                  style={{ width: '320px' }}
                  placeholder={'The default value is Commit Sha'}
                />
              }
            />
          </Space>
        </Spin>
      </AppRow>
      <AppRow title={'Action'}>
        <div style={{ display: 'flex' }}>
          <Button
            disabled={!!error}
            style={{ flex: '1' }}
            type={'primary'}
            loading={uploadLoading}
            onClick={() => {
              uploadRefresh();
            }}
          >
            Upload
          </Button>
          <div style={{ width: '20px' }}></div>
          <Button
            loading={loading}
            style={{ flex: '1' }}
            onClick={() => {
              refresh();
            }}
          >
            Refresh
          </Button>
        </div>
      </AppRow>
      <AppRow title={'Result'}>
        <Spin spinning={uploadLoading}>
          <AppResult error={uploadError} data={uploadData}></AppResult>
        </Spin>
      </AppRow>
      <a
        href='https://github.com/canyon-project/canyon'
        target={'_blank'}
        style={{ fontSize: '12px' }}
        rel='noreferrer'
      >
        Something wrong or missing?
      </a>
    </div>
  );
};

export default AppMain;
