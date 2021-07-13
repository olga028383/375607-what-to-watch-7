import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
}).isRequired;
