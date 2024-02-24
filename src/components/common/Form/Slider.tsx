// SubscribeFunds
import React, { FC } from 'react'
import ReactSlider from 'react-slider'
import classNames from 'classnames'
interface Props {
  value: number
  onChange: (val: number) => void
}
const Slider: FC<Props> = ({ value, onChange }) => {
  const marks = [0, 25, 50, 75, 100]
  return (
    <div className="web-c-slider-layout">
      <ReactSlider
        value={value}
        onChange={onChange}
        className="web-c-slider"
        thumbClassName="web-c-slider-thumb"
        trackClassName="web-c-slider-track"
      />
      <div className="web-c-slider-marks">
        {marks.map((item, index) => (
          <span
            key={index}
            className={classNames({ active: value >= item })}
            onClick={() => onChange(item)}
          />
        ))}
      </div>
    </div>
  )
}

export default Slider
