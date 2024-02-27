interface OutlineSection {
  title: string;
  content: string[];
  detailLevel?: string;
  section_style?: string;
}

interface Outlines extends Array<OutlineSection> { }