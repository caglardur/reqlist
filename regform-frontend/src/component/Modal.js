const Modal = ({ message, showModal }) => {
  return (
    <div className="myModal">
      <div className="card" style={{ width: "24rem" }}>
        <div className="card-header">Uyarı</div>
        <div className="card-body">
          <p className="card-text">{message}</p>
          <div className="btn btn-primary" onClick={() => showModal({ status: "close" })}>
            Kapat
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
