import React from 'react'
import { useMutation } from '@apollo/client'

import AppartmentInput from 'src/components/Inputs/AppartmentInput'

import addAppartmentSchema from 'src/graphql/mutation/addAppartment.graphql'
import currentUserSchema from 'src/graphql/query/currentUser.graphql'

export default function ADD() {
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState(false)

  const resetState = () => {
    setError(null)
    setSuccess(false)
  }

  const [addAppartmentMutation] = useMutation(addAppartmentSchema, {
    refetchQueries: [{ query: currentUserSchema }],
    onCompleted: () => setSuccess(true),
    onError: (e) => setError(e.message),
  })

  const addAppartment = ({ name, image, price, rooms, timeSlots, description = '' }) => {
    if (!name || !image || !price || !rooms) {
      setError('name image price rooms are required fields')
      return
    }

    if (price <= 0 || rooms <= 0) {
      setError('price rooms are must be higher than zero')
      return
    }

    if (!timeSlots.length) {
      setError('appartment should have at least one slot')
      return
    }

    addAppartmentMutation({
      variables: {
        input: { name, description, image, price, rooms, timeSlots },
      },
    })
  }

  return (
    <AppartmentInput
      onAction={addAppartment}
      error={error}
      success={success}
      resetState={resetState}
    />
  )
}
