import { Helmet } from 'react-helmet-async';

const TabTitle = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default TabTitle;
