import React from 'react'
import InputMask from "react-input-mask"

const onlyNumbers = (str) => str.replace(/[^0-9]/g, '')

// const MaskedInput = React.forwardRef(({ value, onChange, name, mask, placeholder, ref, ...props }) => {
//   const handleChange = (e) => {
//     onChange({
//       ...e,
//       target: {
//         ...e.target,
//         name,
//         value: props.onlyNumbers ? onlyNumbers(e.target.value) : e.target.value
//       }
//     })
//   }
//   return (
//     <InputMask
//       name={name}
//       mask={mask}
//       onChange={handleChange}
//       placeholder={placeholder}
//       value={value}
//       ref={ref} />
//   )  
// })

// export default MaskedInput

export default function MaskedInput({ value, onChange, name, mask, placeholder, ...props }) {

  const handleChange = (e) => {
    onChange({
      ...e,
      target: {
        ...e.target,
        name,
        value: props.onlyNumbers ? onlyNumbers(e.target.value) : e.target.value
      }
    })
  }
  return (
    <InputMask
      name={name}
      mask={mask}
      onChange={handleChange}
      placeholder={placeholder}
      value={value}
    />
  )
}
