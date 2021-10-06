import React, { useEffect, useState } from "react"

import "./App.css"

import RegisteredList from "./component/RegisteredList"
import RegistrationForm from "./component/RegistrationForm"
import Modal from "./component/Modal"

function App() {
  const [registerList, setRegisterList] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [modalState, setModalState] = useState(false)
  const [modalMessage, setModalMessage] = useState("")

  const refreshList = () => {
    setIsLoading(true)
  }

  useEffect(() => {
    fetch("http://localhost:5010/api/")
      .then(response => response.json())
      .then(data => {
        data.sort((a, b) => {
          if (a.id > b.id) {
            return -1
          } else {
            return 1
          }
        })
        setRegisterList([...data])
        setIsLoading(false)
      })
  }, [isLoading])

  const showModal = e => {
    if (e.status === "open") {
      setModalMessage(e.message)
      setModalState(true)
    } else if (e.status === "close") {
      setModalState(false)
    }
  }

  return (
    <div className="App bg-light">
      <div className="container-xxl">
        <RegistrationForm refreshList={refreshList} showModal={showModal} />
        {registerList && registerList.length > 0 && <RegisteredList registerList={registerList} />}
        {modalState && <Modal message={modalMessage} showModal={showModal} />}
      </div>
    </div>
  )
}

export default App
