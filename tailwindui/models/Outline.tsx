interface OutlineSection {
  title: string;
  content: string[];
  detailLevel?: string;
  section_style?: string;
}

interface OutlineDataType extends Array<OutlineSection> { }