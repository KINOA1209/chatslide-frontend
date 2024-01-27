type SurveySectionConfig = {
    question: string;
    itemsArr: string[];
};
  
const surveyObject: Record<string, SurveySectionConfig> = {
    industry: {
      question: "What industry do you work for?",
      itemsArr: [
        'Advertising and marketing', 'Aerospace', 'Agriculture', 'Information and technology',
        'Construction', 'Education', 'Energy', 'Entertainment', 'Fashion', 'Finance and economic',
        'Food and beverage', 'Health care', 'Hospitality', 'Manufacturing', 'Media and news',
        'Mining', 'Pharmaceutical', 'Telecommunication', 'Transportation', 'Other'
      ]
    },

    referral: {
        question: "Where did you find us?",
        itemsArr: [
            'Search Engine', 'Google Ads', 'Facebook Ads', 'Youtube Ads', 'Facebook post/group',
            'Twitter post', 'Instagram post/story', 'Referral', 'Other'
          ]
    },

    purpose: {
        question: "What's the purpose of your output?",
        itemsArr: [
            'Educational lecture', 'Conference talk', 'Portfolio', 'Technical/data-driven', 
            'Business presentation', 'Information webinar', 'Project proposal', 'Personal',
            'Workshop/training', 'Research presentation', 'Narrative', 'Other'
          ]
    }
    
};
  
export default surveyObject;