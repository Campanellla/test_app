import React from "react";
import OrgerPage from "src/pages/Order";

type Props = {
  voucher: string;
};

type InitialProps = {
  query: { voucher?: string };
};

class Book extends React.Component<Props> {
  static async getInitialProps({ query: { voucher } }: InitialProps) {
    return { id: voucher };
  }

  render = () => <OrgerPage {...this.props} />;
}

export default Book;
