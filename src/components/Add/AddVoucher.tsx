import React from 'react'
import { useMutation } from '@apollo/client'

import addVoucherSchema from 'src/graphql/mutation/addVoucher.graphql'
import currentUserSchema from 'src/graphql/query/currentUser.graphql'

import VoucherInput from 'src/components/Inputs/VoucherInput'

export default function ADD() {
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState(false)

  const resetState = () => {
    setError(null)
    setSuccess(false)
  }

  const [addVoucherMutation] = useMutation(addVoucherSchema, {
    refetchQueries: [{ query: currentUserSchema }],
    onCompleted: () => setSuccess(true),
    onError: (e) => setError(e.message),
  })

  const addVoucher = ({ name, variant, price, quantity }) => {
    if (!name || !variant || !price || !quantity) {
      setError('all fields are required fields')
      return
    }

    if (price <= 0 || quantity <= 0) {
      setError('price rooms are must be higher than zero')
      return
    }

    addVoucherMutation({
      variables: {
        input: { name, variant, price, quantity },
      },
    })
  }

  return (
    <VoucherInput onAction={addVoucher} error={error} success={success} resetState={resetState} />
  )
}
