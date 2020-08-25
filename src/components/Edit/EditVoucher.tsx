import React from 'react'
import { useMutation, useQuery } from '@apollo/client'

import editVoucherSchema from 'src/graphql/mutation/editVoucher.graphql'
import getVoucherSchema from 'src/graphql/query/getVoucher.graphql'
import currentUserSchema from 'src/graphql/query/currentUser.graphql'

import type { Query } from 'src/types'

type EditAppartmentProps = {
  ID: string
}

import VoucherInput from 'src/components/Inputs/VoucherInput'

const EditVoucher: React.FC<EditAppartmentProps> = ({ ID }) => {
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState(false)

  const resetState = () => {
    setError(null)
    setSuccess(false)
  }

  const { loading, data, error: apolloError } = useQuery<Query>(getVoucherSchema, {
    variables: { id: ID || '' },
  })

  const [editVoucher] = useMutation(editVoucherSchema, {
    refetchQueries: [{ query: currentUserSchema }],
    onCompleted: () => setSuccess(true),
    onError: (e) => setError(e.message),
  })

  const onAction = ({ name, variant, price, quantity }) => {
    editVoucher({
      variables: {
        input: { id: ID, name, variant, price, quantity },
      },
    })
  }

  if (loading) return <div>Loading</div>

  const voucher = data?.getVoucher

  if (apolloError || !voucher)
    return <div>Error: {apolloError ? apolloError.message : 'server return no response'}</div>

  return (
    <VoucherInput
      key={voucher.id}
      onAction={onAction}
      error={error}
      success={success}
      resetState={resetState}
      edit
      {...voucher}
    />
  )
}

export default EditVoucher
