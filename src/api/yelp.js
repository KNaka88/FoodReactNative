import axios from 'axios';
import YELP_API from '../../api_key';

export default axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: `Bearer ${YELP_API}`
    }
});
