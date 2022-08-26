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

interface IFile extends File {
  preview?: string
}

const Avatar = () => {
  const [avatar, setAvatar] = useState<IFile>()

  useEffect(() => {
      return () => {
        avatar?.preview && URL.revokeObjectURL(avatar.preview)
      }
  }, [avatar])

  const handlePreviewAvatar = (e: any) => {
    const file = e.target.files[0]
    file.preview = URL.createObjectURL(file)
    setAvatar(file)
    console.log(URL.createObjectURL(file))
  }

  return (
    <>
      {avatar && <img src={avatar.preview}/>}
      <input type="file" onChange={handlePreviewAvatar} />
    </>
  )

}

export default Avatar
