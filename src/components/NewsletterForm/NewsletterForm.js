import {
  faCheck,
  faEnvelope,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

const NewsletterForm = ({ className }) => {
  const [email, setEmail] = useState(null)
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)

  const classes = clsx('bg-white w-max p-1 rounded', className)
  const buttonClassName =
    'bg-gray-800 text-white rounded py-2 px-6 cursor-pointer content-end'

  const listFields = []
  const _handleSubmit = async e => {
    e.preventDefault()

    if (email && !sending) {
      setSending(true)

      const result = await addToMailchimp(email, listFields)
      if (!result.error) {
        setSuccess(true)
      }

      setEmail(null)
      setSending(false)
    }
  }

  let icon
  if (sending) {
    icon = faSpinner
  } else if (success) {
    icon = faCheck
  } else {
    icon = faEnvelope
  }

  return (
    <form onSubmit={_handleSubmit} className={classes}>
      <input
        type="email"
        onChange={e => setEmail(e.target.value)}
        value={email}
        placeholder="Email"
        className="p-2 border-none text-gray-900 focus:ring-0 focus:outline-none"
      />

      <button type="submit" className={buttonClassName}>
        <FontAwesomeIcon icon={icon} />
      </button>
    </form>
  )
}

NewsletterForm.propTypes = {
  className: PropTypes.string,
}

export default NewsletterForm
