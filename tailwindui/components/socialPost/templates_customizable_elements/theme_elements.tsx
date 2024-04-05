import { casualDefault } from "./casual_topic/casual_default_template";
import { seriousDefault } from "./serious_subject/serious_default_template";
import { readingDefault } from "./reading_notes/reading_default_template";

export type ThemeElements = {
    titleCSS?: React.CSSProperties;
    quoteCSS?: React.CSSProperties;
    sourceCSS?: React.CSSProperties;
};

export type PostTypeKeys = 
    | 'casual_topic'
    | 'serious_subject'
    | 'reading_notes'

export type ThemeConfig = {
    [post_type in PostTypeKeys] : ThemeElements
}

const themeConfigData: ThemeConfig = {
    casual_topic: casualDefault,
    serious_subject: seriousDefault,
    reading_notes: readingDefault,
}

export default themeConfigData