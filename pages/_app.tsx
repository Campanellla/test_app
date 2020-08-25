import 'semantic-ui-css/semantic.min.css'
import 'react-datepicker/dist/react-datepicker.css'

import { ApolloProvider } from '@apollo/client'
import withApollo from 'src/lib/apollo'
import { CurrentUserProvider } from 'src/lib/context'
import App from 'next/app'

import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  body{
    font-size: 20px;
    line-height: normal;
  }
`

function MyApp({ Component, pageProps, apolloClient }) {
  return (
    <ApolloProvider client={apolloClient}>
      <CurrentUserProvider>
        <GlobalStyles />
        <Component {...pageProps} />
      </CurrentUserProvider>
    </ApolloProvider>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  return { ...appProps }
}

export default withApollo(MyApp)
