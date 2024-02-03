type SurveySectionConfig = {
  question: string;
  itemsArr: string[];
};

const surveyObject: Record<string, SurveySectionConfig> = {
  industry: {
    question: "What industry do you work for?",
    itemsArr : [
      'Tech & Telecom',
      'Finance',
      'Consulting',
      'Health & Pharma',
      'Energy & Utilities',
      'Manufacturing & Construction',
      'Agriculture & Food',
      'Education & Research',
      'Retail & Fashion',
      'Transport & Aerospace',
      'Entertainment & Hospitality',
      'Other'
    ]
  },

  referral: {
    question: "Where did you find us?",
    itemsArr: [
      'Google', 'Newsletter', 'Yandex', 'Facebook', 'Tiktok',
      'Twitter', 'Instagram', 'Friend', 'Other'
    ]
  },

  purpose: {
    question: "What's the purpose of your output?",
    itemsArr : [
      'Educational Lecture',
      'Business Presentation',
      'Research Presentation',
      'Technical/Data-Driven',
      'Conference Talk',
      'Workshop/Training',
      'Project Proposal',
      'Information Webinar',
      'Portfolio Showcase',
      'Personal Storytelling',
      'Marketing & Sales',
      'Other Purposes'
    ]
  }

};

export default surveyObject;