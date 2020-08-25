import React from 'react'
import { Input, Button, Dropdown } from 'semantic-ui-react'
import styled from 'styled-components'

////(restaurant, club, museum, cinema)

const VoucherInput: React.FC = ({
  onAction,
  error,
  success,
  resetState,

  name,
  price,
  variant,
  quantity,

  edit,
}) => {
  const [_name, setName] = React.useState(name || '')
  const [_variant, setVariant] = React.useState(variant || '')
  const [_price, setPrice] = React.useState(price || 0)
  const [_quantity, setQuantity] = React.useState(quantity || 0)

  return (
    <Container>
      <div>{edit ? 'Edit' : 'Add'} Add Voucher:</div>

      {success ? (
        <Button color="green" basic onClick={resetState}>
          Success
        </Button>
      ) : null}

      {error ? (
        <Button color="red" basic onClick={resetState}>
          {error}
        </Button>
      ) : null}

      <Input placeholder="name" value={_name} onChange={(e) => setName(e.currentTarget.value)} />

      <Dropdown
        onChange={(_, e) => setVariant(e.value)}
        value={_variant}
        placeholder="Variant"
        selection
        options={[
          {
            key: 'restaurant',
            text: 'restaurant',
            value: 'restaurant',
          },
          {
            key: 'club',
            text: 'club',
            value: 'club',
          },
          {
            key: 'museum',
            text: 'museum',
            value: 'museum',
          },
          {
            key: 'cinema',
            text: 'cinema',
            value: 'cinema',
          },
        ]}
      />

      <Input
        placeholder="price"
        value={_price}
        type="number"
        onChange={(e) => setPrice(Number(e.currentTarget.value) || 0)}
      />
      <Input
        placeholder="quantity"
        value={_quantity}
        type="number"
        onChange={(e) => setQuantity(Math.round(Number(e.currentTarget.value) || 0))}
      />
      <Button
        onClick={() => {
          onAction({ name: _name, variant: _variant, price: _price, quantity: _quantity })
        }}
      >
        {edit ? 'Edit voucher' : 'Create voucher'}
      </Button>
    </Container>
  )
}

export default VoucherInput

const Container = styled.div`
  display: grid;
  grid-auto-rows: auto;
  max-width: 45rem;
  gap: 1rem;
  width: 100%;
  margin: auto;

  &&& > button {
    margin: 0;
  }

  > .header {
    text-align: center;
  }
`
