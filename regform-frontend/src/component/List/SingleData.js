import React, { useState } from "react"
const SingleData = ({ singleData }) => {
  const [showPass, setShowPass] = useState(false)
  return (
    <>
      <td>{singleData.name}</td>
      <td style={{ textOverflow: "clip", overflowClipBox: "content-box" }}>
        {singleData.email} {singleData.position && "(" + (singleData.position === "student" ? "öğrenci" : "öğretim görevlisi") + ")"}
      </td>
      <td style={{ cursor: "pointer" }} onClick={() => (showPass ? setShowPass(false) : setShowPass(true))}>
        {showPass ? singleData.password : "********"}
      </td>
    </>
  )
}

export default SingleData
