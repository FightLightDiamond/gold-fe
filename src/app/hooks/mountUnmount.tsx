import React, {
  useState,
  useEffect
} from "react";

/**
 * Side effects: khi co tac dong xay ra, du lieu thay doi
 *
 * 1. (callback): gọi khi component re-render, sau khi render moi dc goi
 * 2. (callback, []): chỉ gọi 1 lần sau khi mounted, render không gọi
 * 3. (callback, [deps])
 * Uu tien luong ui cho nguoi dung
 * @constructor
 */

const tabs = ['posts', 'comments', 'albums']

const Content = () => {
  const [title, setTitle] = useState('')
  const [posts, setPosts] = useState([])
  const [type, setType] = useState('posts')

  useEffect(() => {
    document.title = title
  })

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/' + type)
      .then(res => res.json())
      .then(posts => {
        setPosts(posts)
      })
  }, [type])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(posts => {
        setPosts(posts)
      })
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      // console.log(window.screenY)
    }
    window.addEventListener('scroll', handleScroll)
  }, [])

  const [countdown, setCountdown] = useState(180)

  // useEffect(() => {
  //   setTimeout(() => {
  //     setCountdown(countdown - 1)
  //   }, 1000)
  // }, [countdown])

  useEffect(() => {
    const timerId = setInterval(() => {
      setCountdown(prevState => prevState - 1)
    }, 1000)

    /**
     * Cb when component mounted
     * Cleanup function luon dc goi truoc computed unmounted
     * Cleanup function dc goi truoc khi call dc goi lai (tru lan mount)
     */
    return () => clearInterval(timerId)
  }, [])

  const [count, setCount] = useState(1)

  useEffect(() => {
    console.log(`Mounted or Re-render lan ${count}`)

    //cleanup func
    return () => {
      console.log(`Cleanup lần ${count}`)
    }
  }, [count])

  return (
    <>
      <h1>Count: {count}</h1>
      {countdown}
      <input  type="text" onChange={(e) => setTitle(e.target.value)} />
      {/*<ul>*/}
      {/*  {*/}
      {/*    posts.map(post => (*/}
      {/*      <li key={post.id}>{post.title}</li>*/}
      {/*    ))*/}
      {/*  }*/}
      {/*</ul>*/}

      {
        tabs.map((tab,key) => (
          <button onClick={() => setType(tab)} key={key}>{tab}</button>
        ))
      }
      <button onClick={() => setCount(preCount => preCount + 1)}>SetCount</button>
    </>
  )
}

const MountUnmount = () => {
  const [show, setShow] = useState(false)

  return (
    <>
      <button onClick={() => setShow(!show)}>Toggle</button>
      {show && <Content/>}
    </>
  )

}

export default MountUnmount
