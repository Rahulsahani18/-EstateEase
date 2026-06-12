import axios from 'axios';

export const fetchSEOData = {
  async seoData() {
    try {   
        const response = await axios.get('/api/seo');
        return response.data;
    } catch (error) {
        console.error('Error fetching SEO data:', error);
        throw error;
    }
}
};
