import React from "react";
import BookPage from "src/pages/Book";

type Props = {
  appartmentID: string;
};

type InitialProps = {
  query: { appartment?: string };
};

class Book extends React.Component<Props> {
  static async getInitialProps({ query: { appartment } }: InitialProps) {
    return { id: appartment };
  }

  render = () => <BookPage {...this.props} />;
}

export default Book;
