import { Skeleton } from "antd";
import { ConfigProvider } from 'antd';
import './style.scss'

export default function Loading() {
  const theme = {
    token: {
      colorFill: 'gray', // 修改 colorFill 的值为希望的颜色
      colorFillContent: '#575757'
    },
  };

  const cardData = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
  ];
  return (
    <>
      <div className='space'>
        <ConfigProvider theme={theme}>
          {
            cardData.map((item) => {
              return (
                <Skeleton key={item.id} className="skeleton" active avatar paragraph={{ rows: 4 }} />
              )
            })
          }
        </ConfigProvider>
      </div>
    </>
  )
}
