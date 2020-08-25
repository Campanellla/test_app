import React from 'react'

import AddAppartment from 'src/components/Add/AddAppartment'
import AddVoucher from 'src/components/Add/AddVoucher'

import Header from 'src/components/Header'

const AddItems: React.FC<{ appartment: boolean }> = ({ appartment }) => {
  return (
    <div>
      <Header />
      {appartment ? <AddAppartment /> : <AddVoucher />}
    </div>
  )
}

export default AddItems
