import React from 'react'
import { useMutation, useQuery } from '@apollo/client'

import AppartmentInput from '../Inputs/AppartmentInput'

import editAppartmentSchema from 'src/graphql/mutation/editAppartment.graphql'
import getAppartmentSchema from 'src/graphql/query/getAppartment.graphql'
import currentUserSchema from 'src/graphql/query/currentUser.graphql'

import type { Query } from 'src/types'

type EditAppartmentProps = {
  ID: string
}

const EditAppartment: React.FC<EditAppartmentProps> = ({ ID }) => {
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState(false)

  const resetState = (value?: string) => {
    setError(typeof value === 'string' ? value : null)
    setSuccess(false)
  }

  const { loading, data, error: apolloError } = useQuery<Query>(getAppartmentSchema, {
    variables: { id: ID || '' },
  })

  const [editAppartment] = useMutation(editAppartmentSchema, {
    refetchQueries: [{ query: currentUserSchema }],
    onCompleted: () => setSuccess(true),
    onError: (e) => setError(e.message),
  })

  const editApp = ({ name, image, price, rooms, timeSlots, description = '' }) => {
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

    const newTimeSlots = timeSlots.map((slot) => {
      const { __typename, booking, ...newSlot } = slot
      return newSlot
    })

    editAppartment({
      variables: {
        input: { id: ID, name, description, image, price, rooms, timeSlots: newTimeSlots },
      },
    })
  }

  if (loading) return <div>Loading</div>

  const appartment = data?.getAppartment

  if (apolloError || !appartment)
    return <div>Error: {apolloError ? apolloError.message : 'server return no response'}</div>

  return (
    <AppartmentInput
      key={appartment.id}
      onAction={editApp}
      error={error}
      success={success}
      resetState={resetState}
      edit
      {...appartment}
    />
  )
}

export default EditAppartment
