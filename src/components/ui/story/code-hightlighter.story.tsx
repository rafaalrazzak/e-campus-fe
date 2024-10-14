import type { CodeHighlighterProps } from "@/components/ui";
import type { StoryComponent } from "@/components/ui/story/types";

import { CodeHighlighter } from "@/components/ui";
import { BaseComponentStory, BaseStory } from "@/components/ui/story/base";

const codeHighlighterStories: StoryComponent<CodeHighlighterProps>[] = [
    {
        title: "JavaScript Example",
        component: CodeHighlighter,
        props: {
            code: `const greet = (name) => {
    return \`Hello, \${name}!\`;
};`,
            language: "javascript",
            title: "JavaScript Function",
            withIcon: true,
        },
        code: `<CodeHighlighter
    code={\`const greet = (name) => {
        return \`Hello, \${name}!\`;
    };\`}
    language="javascript"
    title="JavaScript Function"
    withIcon={true}
/>`,
    },
    {
        title: "Python Example",
        component: CodeHighlighter,
        props: {
            code: `def greet(name):
    return f"Hello, {name}!"`,
            language: "python",
            title: "Python Function",
            withIcon: true,
        },
        code: `<CodeHighlighter
    code={\`def greet(name):
        return f"Hello, {name}!"
    \`}
    language="python"
    title="Python Function"
    withIcon={true}
/>`,
    },
    {
        title: "HTML Example",
        component: CodeHighlighter,
        props: {
            code: `<h1>Hello, World!</h1>`,
            language: "html",
            title: "HTML Snippet",
            withIcon: false,
        },
        code: `<CodeHighlighter
    code={\`<h1>Hello, World!</h1>\`}
    language="html"
    title="HTML Snippet"
    withIcon={false}
/>`,
    },
];

const CodeHighlighterShowcase: React.FC<{ stories: StoryComponent<CodeHighlighterProps>[] }> = ({ stories }) => (
    <>
        {stories.map((story, index) => (
            <BaseComponentStory key={index} {...story} />
        ))}
    </>
);

const CodeHighlighterDesigns: React.FC = () => <BaseStory title="Code Highlighter Showcase" tabs={[{ label: "Default", content: <CodeHighlighterShowcase stories={codeHighlighterStories} /> }]} />;

export { CodeHighlighterDesigns };
