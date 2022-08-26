import React, {memo, RefObject, useMemo, useRef, useState} from "react";

/**
 * Tránh thực hiện lại 1 logic không cần thiết
 *
 * @constructor
 */
const UseMemor = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [products, setProducts] = useState([])

  const nameRef: RefObject<HTMLInputElement> = useRef(null)

  const handleSubmit = () => {
    // setProducts([...products, {
    //   name, price: +price
    // }])
    //
    // setName('')
    // setPrice('')
    // nameRef.current.focus()
  }

  console.log(products)

  const total = useMemo(() => {
    products.reduce((result, prod) => result + prod, 0)
  }, [products])


  return (
    <>
      <div>
        <input value={name}
               ref={nameRef}
               placeholder={'Enter name...'}
               onChange={e => setName(e.target.value)}
               type="text" />
      </div>
      <div>
        <input value={price}
               placeholder={'Enter price...'}
               onChange={e => setPrice(e.target.value)}
               type="text" />
      </div>
      {/*<div>*/}
      {/*  Total: {total}*/}
      {/*</div>*/}
      {/*<button onClick={handleSubmit}>Add</button>*/}
    </>
  )
}

export default memo(UseMemor)
