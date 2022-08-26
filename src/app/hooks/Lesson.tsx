import React, {
  useEffect,
  useState,
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

const lessons = [
  {
    id: 1, name: 'ReactJS'
  },
  {
    id: 2, name: 'SPA/MPA'
  },
  {
    id: 3, name: 'Arrow function'
  },
]


// // Fake comments
// function emitComment(id) {
//   setInterval(() => {
//     window.dispatchEvent(new CustomEvent(`lesson-${id}`, {
//       detail: `Nội dung comment của lesson ${id}`
//     }))
//   }, 2000)
// }
//
// emitComment(1)
// emitComment(2)
// emitComment(3)

const Lesson = () => {
  const [lessonId, setLessonId] = useState<number>(0)

  useEffect(() => {
    const handleComment = (e: any) => {
      const {detail} = e
      console.log(detail)
    }
    // window.addEventListener(`lesson-${lessonId}`, handleComment)
    // return () => {
    //   window.removeEventListener(`lesson-${lessonId}`, handleComment)
    // }
  }, [lessonId])

  return (
    <>
      <ul>
        {
          lessons.map((lesson) =>
            <li key={lesson.id} style={{color: lessonId === lesson.id ? 'red': '#000'}}
                onClick={() => setLessonId(lesson.id)}
            >
              {lesson.name} 12345
            </li>
          )
        }
      </ul>
    </>
  )

}

export default Lesson
