import React from "react";
import EditPage from "src/pages/Edit";

type Props = {
  appartment?: string;
  voucher?: string;
};

type InitialProps = {
  query: { appartment?: string; voucher?: string };
};

class Book extends React.Component<Props> {
  static async getInitialProps({
    query: { appartment, voucher },
  }: InitialProps) {
    return { appartment, voucher };
  }

  render = () => <EditPage {...this.props} />;
}

export default Book;
