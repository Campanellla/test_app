import React from "react";
import EditPage from "src/pages/Edit";

type Props = {
  appartmentID: string;
};

type InitialProps = {
  query: { appartment?: string };
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
