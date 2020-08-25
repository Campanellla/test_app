import React from 'react'

import EditAppartment from 'src/components/Edit/EditAppartment'
import EditVoucher from 'src/components/Edit/EditVoucher'

import Header from 'src/components/Header'

type EditPageProps = {
  appartment?: string
  voucher?: string
}

const EditPage: React.FC<EditPageProps> = ({ appartment, voucher }) => {
  if (appartment)
    return (
      <div>
        <Header />
        <EditAppartment ID={appartment} />
      </div>
    )
  if (voucher)
    return (
      <div>
        <Header />
        <EditVoucher ID={voucher} />
      </div>
    )

  return (
    <div>
      <Header />
      <div>Nothing to edit</div>
    </div>
  )
}

export default EditPage
