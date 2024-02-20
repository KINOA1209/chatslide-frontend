type SurveySectionConfig = {
  question: string;
  itemsArr: string[];
};

const surveyObject: Record<string, SurveySectionConfig> = {
  industry: {
    question: "What industry do you work for?",
    itemsArr: [
      "Tech",
      "Education",
      "Entertainment",
      "Finance",
      "Consulting",
      "Health",
      "Energy",
      "Manufacturing",
      "Agriculture",
      "Retail",
      "Transport",
      "Other"
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
    itemsArr: [
      "Education",
      "Business",
      "Research",
      "Technical",
      "Conference",
      "Training",
      "Proposal",
      "Webinar",
      "Portfolio",
      "Storytelling",
      "Marketing",
      "Other"
    ]
  }

};

export default surveyObject;