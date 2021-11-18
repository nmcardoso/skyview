function getCurrentPath() {
  const protocol = window.location.protocol
  const host = window.location.host
  const path = window.location.pathname
  return `${protocol}//${host}${path}`
}

export { getCurrentPath }
