import '@/components/socialPost/socialPostCustomFonts.css'

// keywords
const h1Style: React.CSSProperties = {
    fontSize: '15pt',
    fontWeight: 700,
    color: '#ABBEFF',
    fontFamily: 'template1_cover_keyword',
    letterSpacing: '0.6px',
    fontStyle: 'normal',
};

// subtopic
const h2Style: React.CSSProperties = {
    fontSize: '22pt',
    fontWeight: 'bold',
    marginTop: '10px',
    color: '#FBFBFB',
    fontFamily: 'template1_cover_title',
    letterSpacing: '0.56px',
};

// cover page title
const h3Style: React.CSSProperties = {
    fontSize: '45pt',
    fontWeight: 700,
    color: '#FFF',
    fontFamily: 'template1_cover_title',
    lineHeight: '110%',
    letterSpacing: '-1.04px'
};

// cover page keywords
const h4Style: React.CSSProperties = {
    fontSize: '11pt',
    fontWeight: 600,
    color: '#FFF',
    letterSpacing: '0.36px',
    lineHeight: '133%',
    fontStyle: 'normal',
    fontFamily: 'template1_cover_keyword'
};

// template2 cover page English title
const h5Style: React.CSSProperties = {
    fontSize: '15pt',
    fontWeight: 'bold',
    color: 'rgba(27, 28, 34, 0.60)'
};

// template2 cover page Original title
const h6Style: React.CSSProperties = {
    fontSize: '40pt',
    fontWeight: 'bold',
    color: '#1B1C22'
};

// template2 content page original title
const h7Style: React.CSSProperties = {
    fontSize: '10pt',
    fontWeight: 'bold',
    color: 'rgba(27, 27, 27, 0.50)',
    fontFamily: 'template2_section_title',
};

// template2 content page section title
const h8Style: React.CSSProperties = {
    fontSize: '17pt',
    fontWeight: 'bold',
    color: '#1B1B1B',
    fontFamily: 'template2_section_title',
};

// template2 content page content and brief
const h9Style: React.CSSProperties = {
    fontSize: '9pt',
    color: '#1B1B1B',
    fontFamily: 'template2_content',
    fontWeight: 400,
    letterSpacing: '0.48px',
};


// 
const listStyle: React.CSSProperties = {
    display: 'list-item',
    listStyleType: 'disc',
    listStylePosition: 'inside',
    fontSize: '11pt',
    fontFamily: 'template1_cover_keyword',
    fontWeight: 400,
    letterSpacing: '0.36px',
}

export { h1Style, h2Style, h3Style, h4Style, h5Style, h6Style, h7Style, h8Style, h9Style, listStyle };
