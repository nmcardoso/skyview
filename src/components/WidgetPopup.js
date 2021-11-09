import './WidgetPopup.css'

function WidgetPopup({ children, className, show, onClose, ...props }) {
  const handleClose = (e) => {
    if (typeof onClose === 'function') {
      onClose(e)
    }
  }

  return (
    <div
      className={`widget-popup ${show ? '' : 'd-none'} ${className || ''}`}
      {...props}>
      <button className="closebtn" onClick={handleClose}>&times;</button>
      <div className="clearfix"></div>
      <div>
        {children}
      </div>
    </div>
  )
}

export default WidgetPopup
