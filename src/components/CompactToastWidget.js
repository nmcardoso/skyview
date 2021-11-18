import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import { ACTIONS, useApp } from '../core/AppContext'

function CompactToastWidget() {
  const [appState, appDispatch] = useApp()

  const handleClose = () => {
    appDispatch({
      type: ACTIONS.WIDGET.COMPACT_TOAST.TOGGLE,
      data: {
        text: ''
      }
    })
  }

  return (
    <ToastContainer
      position="bottom-center"
      className="mb-2"
      style={{ zIndex: 999 }}>
      <Toast
        show={appState.widget.compactToast.show}
        onClose={handleClose}
        delay={3000}
        autohide>
        <Toast.Body>
          <div className="d-flex justify-content-center">
            {appState.widget.compactToast.text}
          </div>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default CompactToastWidget
