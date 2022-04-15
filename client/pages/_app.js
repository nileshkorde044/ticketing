import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';
const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  // this is executed on server only, data from this can be passed to comp.
  // Comp will have access to this data on client side
  // getInitialProps can not work on component if one is present on App
  // so call that func manually here

  const client = buildClient(appContext.ctx);
  const { data } = await client
    .get('/api/users/currentUser')
    .catch((ex) => console.log(ex));
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
  return { ...data, pageProps };
};

export default AppComponent;
