import { FC } from 'react'

interface Props {
  show: boolean
}

const ChartLoading: FC<Props> = ({ show }) => {
  const list = new Array(100).fill('')
  return (
    <div className="web-c-chart-loading-warp">
      <div className="web-c-chart-loading">
        <footer className="web-c-chart-loading-footer">
          {list.map((_, index: number) => (
            <span key={index} />
          ))}
        </footer>
      </div>
    </div>
  )
}

export default ChartLoading
