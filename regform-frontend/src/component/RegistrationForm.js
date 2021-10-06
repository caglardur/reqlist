import React, { useState, useEffect } from "react"

const RegistrationForm = ({ refreshList, showModal }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [eduDetection, setEduDetection] = useState(false)
  const [strongPassDetec, setStrongPassDetec] = useState(false)
  const [trueEmail, setTrueEmail] = useState(false)

  // isim kontrolü
  useEffect(() => {
    if (name && name.length > 1) {
      document.getElementById("nameField").classList.remove("is-invalid")
      document.getElementById("nameField").classList.add("is-valid")
    } else {
      document.getElementById("nameField").classList.add("is-invalid")
      document.getElementById("nameField").classList.remove("is-valid")
    }
  }, [name])

  // edu uzantı kontrolü
  useEffect(() => {
    if (email && email.includes("@")) {
      const splitEmail = email.split("@")
      if (splitEmail[1].includes(".edu")) {
        setEduDetection(true)
      } else {
        setEduDetection(false)
      }
    } else {
      setEduDetection(false)
    }
  }, [email])

  // email kuralları
  useEffect(() => {
    if (email && email.includes("@") && email.includes(".")) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (re.test(String(email).toLowerCase())) {
        document.getElementById("emailField").classList.remove("is-invalid")
        document.getElementById("emailField").classList.add("is-valid")
        setTrueEmail(true)
      } else {
        document.getElementById("emailField").classList.add("is-invalid")
        document.getElementById("emailField").classList.remove("is-valid")
        setTrueEmail(false)
      }
    } else {
      document.getElementById("emailField").classList.add("is-invalid")
      document.getElementById("emailField").classList.remove("is-valid")
      setTrueEmail(false)
    }
  }, [email])

  // şifre kuralları
  useEffect(() => {
    const strongRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,})")

    if (password) {
      if (password.includes(" ")) {
        document.getElementById("passwordField").classList.remove("is-valid")
        document.getElementById("passwordField").classList.add("is-invalid")
        setStrongPassDetec(false)
      } else if (strongRegex.test(password)) {
        document.getElementById("passwordField").classList.add("is-valid")
        document.getElementById("passwordField").classList.remove("is-invalid")
        setStrongPassDetec(true)
      } else {
        document.getElementById("passwordField").classList.remove("is-valid")
        document.getElementById("passwordField").classList.add("is-invalid")
        setStrongPassDetec(false)
      }
    } else {
      document.getElementById("passwordField").classList.remove("is-valid")
      document.getElementById("passwordField").classList.add("is-invalid")
      setStrongPassDetec(false)
    }
  }, [password])

  const handleSubmit = async e => {
    e.preventDefault()

    const personInfo = {
      name: e.target.nameField.value,
      email: e.target.emailField.value,
      position: eduDetection ? e.target.positionRadio.value : "",
      password: e.target.passwordField.value
    }

    if (strongPassDetec && name && trueEmail) {
      try {
        await fetch("http://localhost:5010/api/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(personInfo)
        })
          .then(response => {
            return response.json().then(data => ({
              status: response.status,
              data
            }))
          })
          .then(data => {
            if (data.status === 201) {
              refreshList()
              setName("")
              setEmail("")
              setPassword("")
            } else {
              showModal({ message: data.data.message, status: "open" })
            }
          })
      } catch (err) {
        console.log(err.message)
      }
    } else {
      showModal({ message: "Eksik yada hatalı bilgi girdiniz.", status: "open" })
    }
  }

  return (
    <div className="card mt-3">
      <div className="card-header">kayıt formu</div>
      <div className="card-body">
        <form className="row g-2" onSubmit={handleSubmit}>
          <div className="col-md">
            <label htmlFor="nameField" className="form-label">
              isim
            </label>
            <input type="text" className="form-control" id="nameField" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="col-md">
            <label htmlFor="emailField" className="form-label">
              email
            </label>
            <input type="email" className="form-control" id="emailField" value={email} onChange={e => setEmail(e.target.value)} required />
            {eduDetection && (
              <div className="mt-1">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="positionRadio" id="positionTeacher" value="teacher" />
                  <label className="form-check-label" htmlFor="positionTeacher">
                    öğretim görevlisi
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="positionRadio" id="positionStudent" value="student" required />
                  <label className="form-check-label" htmlFor="positionStudent">
                    öğrenci
                  </label>
                </div>
              </div>
            )}
          </div>
          <div className="col-md">
            <label htmlFor="passwordField" className="form-label">
              şifre
            </label>
            <input type="password" className="form-control" id="passwordField" value={password} autoComplete="on" onChange={e => setPassword(e.target.value)} required />
            <div id="emailHelp" className="form-text mb-3">
              Şifre en az 8 karakter olmalı. Minimum 1 büyük, 1 küçük harf ve 1 özel karakter içermeli.
            </div>
          </div>
          <div className="col-md-12 d-flex justify-content-end mt-4">
            <button type="submit" className="btn btn-primary fw-bold" id="submit1">
              kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegistrationForm
