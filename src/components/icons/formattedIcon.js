import React from "react"
import PropTypes from "prop-types"
import { IconLoader } from "@components/icons"

const FormattedIcon = ({ name }) => {
  switch (name) {
    case "Loader":
      return <IconLoader />
  }
}

FormattedIcon.propTypes = {
  name: PropTypes.string.isRequired,
}

export default FormattedIcon
