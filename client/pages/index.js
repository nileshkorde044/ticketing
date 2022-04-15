import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>Landing page</h1>;
};

LandingPage.getInitialProps = async (context) => {
  // this is executed on server only, data from this can be passed to comp.
  // Comp will have access to this data on client side
  const client = buildClient(context);
  const { data } = await client
    .get('/api/users/currentUser')
    .catch((ex) => console.log(ex));
  return data;
};

export default LandingPage;
