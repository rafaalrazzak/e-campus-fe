export type StoryComponent<T> = {
    title: string;
    component: React.FC<T>;
    props?: T;
    code: string;
};
