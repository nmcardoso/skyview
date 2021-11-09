function FilterControl({ label, min, max, value, step, onChange }) {
  return (
    <div className="row mb-1">
      <label className="col-3 d-flex align-items-center">
        {label}
      </label>

      <div className="col-9 d-flex align-items-center">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          step={step || 1}
          onChange={onChange} />

        <span className="ms-3">{Number(value).toFixed(2)}</span>
      </div>
    </div>
  )
}
