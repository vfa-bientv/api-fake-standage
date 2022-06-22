import PropTypes from "prop-types"
import React, { useEffect } from "react"

function Title({ value = "" }) {
  const title = value ? `DiGiTRAD Forwarding - ${value}` : `DiGiTRAD Forwarding`
  useEffect(() => {
    document.title = title
  }, [value])
  return <></>
}
Title.propTypes = {
  value: PropTypes.string || undefined
}
export default Title
