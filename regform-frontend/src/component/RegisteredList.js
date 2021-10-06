import React, { useState, useEffect } from "react"

import SingleData from "./List/SingleData"

const RegisteredList = ({ registerList }) => {
  const [nowPage, setNowPage] = useState(0)
  const [newRegList, setNewRegList] = useState(registerList.slice(nowPage * 10, nowPage * 10 + 10))
  const [pages, setPages] = useState(Math.ceil(registerList.length / 10))

  useEffect(() => {
    setNewRegList(registerList.slice(nowPage * 10, nowPage * 10 + 10))
    setPages(Math.ceil(registerList.length / 10))
  }, [nowPage, registerList])

  const pageArray = []
  for (let int = 1; int <= pages; int++) {
    pageArray.push(int)
  }

  return (
    <div className="card my-2">
      <div className="card-body">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" className="col-4">
                  isim
                </th>
                <th scope="col" className="col-5">
                  email
                </th>
                <th scope="col" className="col-2">
                  şifre
                </th>
              </tr>
            </thead>
            <tbody>
              {newRegList &&
                newRegList.map(singleData => (
                  <tr key={singleData.id}>
                    <SingleData singleData={singleData} />
                  </tr>
                ))}
              {newRegList && newRegList.length === 0 && (
                <tr>
                  <td className="col text-center my-5" colSpan="3">
                    kayıt bulunamadı
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center" id="pages">
            {pages > 1 &&
              pageArray.map(pg => (
                <li key={pg} className={pg - 1 === nowPage ? "page-item active" : "page-item"} style={{ cursor: "pointer" }}>
                  <div className="page-link" onClick={() => setNowPage(pg - 1)}>
                    {pg}
                  </div>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default RegisteredList
