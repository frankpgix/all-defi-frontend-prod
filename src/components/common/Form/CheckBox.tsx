import { FC, ReactNode } from 'react'
import classNames from 'classnames'

export interface CheckBoxProps {
  label?: string
  value: boolean
  onChange: (value: boolean) => void
  className?: string
  children?: ReactNode
}

const CheckBox: FC<CheckBoxProps> = ({ label, value, onChange, className, children }) => {
  return (
    <label
      className={classNames('web-checkbox', { active: value }, className)}
      onClick={() => onChange(!value)}
    >
      <i>{value ? <CheckedSvg /> : <UnCheckedSvg />}</i>
      {label && <span>{label}</span>}
      {children && children}
    </label>
  )
}

export default CheckBox

const CheckedSvg = () => (
  <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="21" height="21" rx="4.5" fill="#1036E6" stroke="#1036E6" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.7267 7.80001L9.1334 16.3933L4.27344 11.5333L4.9334 10.8734L9.1334 15.0734L17.0667 7.14005L17.7267 7.80001Z"
      fill="white"
      stroke="white"
      strokeWidth="0.5"
      strokeLinecap="square"
      strokeLinejoin="round"
    />
  </svg>
)

const UnCheckedSvg = () => (
  <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="21" height="21" rx="4.5" fill="white" stroke="#777470" />
  </svg>
)
