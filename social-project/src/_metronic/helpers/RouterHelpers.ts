export function getCurrentUrl(pathname: string) {
  return pathname.split(/[?#]/)[0]
}

export function checkIsActive(pathname: string, url: string) {
  const current = getCurrentUrl(pathname)
  if (!current || !url) {
    return false
  }


  if (current === url && current.endsWith('/news')) {
    return true
  }

  if (current.indexOf(url) > -1) {
    return true
  }

  return false
}

export function checkCurrentActive(location: string, url: string) {
  if (!location || !url) {
    return false
  }


  if (location === url) {
    return true
  }

  if (location.indexOf(url) > -1) {
    return true
  }

  return false
}
