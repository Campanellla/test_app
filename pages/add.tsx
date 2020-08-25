import React from 'react'
import AddPage from 'src/pages/AddItems'

type Props = {
  appartment?: string
  voucher?: string
}

type InitialProps = {
  query: { appartment?: string; voucher?: string }
}

class Book extends React.Component<Props> {
  static async getInitialProps({ query: { appartment, voucher } }: InitialProps) {
    return { appartment: appartment != null, voucher: voucher != null }
  }

  render = () => <AddPage {...this.props} />
}

export default Book
