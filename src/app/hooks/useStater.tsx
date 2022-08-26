import React, {
  RefObject,
  useRef,
  useState,
} from "react";

const orders = [300, 100, 300]

interface IUser {
  name: string
  age: number
  address: string
  bio?: string
}

const gifts = [
  'i9', '32', 'RGB'
]

const UseStater = () => {
  const [counter, setCounter] = useState<number>(1)
  const [x, setX] = useState<number>(() => {
    const total = orders.reduce((total, cur) => total + cur)
    console.log({total})
    return total
  })

  const [user, setUser] = useState<IUser>({
    name: 'Nguyen Van A',
    age: 18,
    address: 'Hanoi'
  })

  const handleIncrease = () => {
    // bất đồng bộ, đẩy vào queue
    setCounter(counter + 1)
    //Sử dụng callback để lấy giá trị
    setCounter(prevState => prevState + 1)
    setCounter(prevState => prevState + 1)
    setX(prevState => prevState + 1)
  }

  console.log('re-render')

  const handleUpdate = () => {
    setUser({
      ...user,
      bio: 'Pi',
    })
  }

  const generateIndex = () => {
    const i = Math.random() * gifts.length
    return Math.floor(i)
  }

  const [gift, setGift] = useState<string>('')

  const handleGir = () => {
    const index = generateIndex()
    const g = gifts[index]
    setGift(g)
  }

  const storageJobs = JSON.parse(localStorage.getItem('jobs') ?? '')

  const [job, setJob] = useState('')
  const [jobs, setJobs] = useState(storageJobs ?? [])

  const descRef: RefObject<HTMLInputElement> = useRef(null);

  const handleAddJob = () => {
    setJobs((prev: any) => {
      const newJobs =  [...prev, job]
      const stringJobs = JSON.stringify(newJobs)
      localStorage.setItem('jobs', stringJobs)
      return newJobs
    })
    setJob('')
    descRef?.current?.blur();
    /**
     * Gọi hàm để lên lịch, đẩy vào queue
     */
    console.log(jobs)
  }

  return (
    <>
      <div>
        <h1>{counter}</h1>
        <h2>{x}</h2>
        <h3>{JSON.stringify(user)}</h3>
        <button onClick={handleIncrease}>Increase</button>
        <button onClick={handleUpdate}>Update</button>
        <h4>{gift}</h4>
        <button onClick={handleGir}>Gift</button>
        <hr/>
        <input ref={descRef} type="text" value={job} onChange={(e) => {
          setJob(e.target.value)
        }}/>
        <button onClick={handleAddJob}>Add</button>
        <ul>
          {
            jobs.map(
              (job: any, index: number) => (
              <li key={index}>{job}</li>
              ))
          }
        </ul>

        <ul>
          <li>Component dc re-render lại sau khi `setState` cuối cùng</li>
          <li>Initial state chỉ dùng cho lần đầu</li>
          <li>Set state với callback để cập nhật giá nhiều lần mà k chịu ảnh hưởng bất đồng và queue của react</li>
          <li>Set state là thay thế state bằng giá trị mới</li>
        </ul>
      </div>
    </>
  )

}

export default UseStater
