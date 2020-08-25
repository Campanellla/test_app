import React from 'react'
import { useQuery } from '@apollo/client'
import listItems from 'src/graphql/query/listItems.graphql'

import AppartmentCard from 'src/components/Cards/AppartmentCard'
import VoucherCard from 'src/components/Cards/VoucherCard'

export default function Main() {
  const { loading, data, error } = useQuery(listItems, {
    variables: { sort: `{"onlyAppartments": false}` },
  })

  if (loading) return <div>loading</div>

  const items = data?.listItems

  console.log(items)

  if (error) return <div>Get appartments error</div>

  return (
    <div>
      <select>
        <option>all</option>
        <option>appartments</option>
        <option>vouchers</option>
      </select>

      {items.map((item) => {
        if (item?.appartment)
          return <AppartmentCard appartment={item.appartment} key={item.appartment.id} />
        if (item?.voucher) return <VoucherCard voucher={item.voucher} key={item.voucher.id} />

        return null
      })}
    </div>
  )
}
