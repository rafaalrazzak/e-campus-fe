"use client";

import type { ModalProps } from "@/components/ui";
import type { StoryComponent } from "@/components/ui/story/types";

import { Modal, Button } from "@/components/ui";
import { BaseComponentStory, BaseStory } from "@/components/ui/story/base";

import { useState } from "react";

const ModalStory: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="flex flex-col items-center gap-4">
            <Button onClick={() => setShowModal(true)}>Open Modal</Button>
            <Modal showModal={showModal} setShowModal={setShowModal} title="Modal Example">
                <div className="p-6">
                    <p>This is a simple modal content!</p>
                    <Button onClick={() => setShowModal(false)}>Close</Button>
                </div>
            </Modal>
        </div>
    );
};

const modalStories: StoryComponent<ModalProps>[] = [
    {
        title: "Default Modal",
        component: ModalStory,
        props: {
            showModal: false,
            title: "Default Modal",
            children: "",
        },
        code: `<Modal
    showModal={showModal}
    setShowModal={setShowModal}
    title="Modal Example"
>
    <div className="p-6">
        <p>This is a simple modal content!</p>
        <Button onClick={() => setShowModal(false)}>Close</Button>
    </div>
</Modal>`,
    },
];

const ModalShowcase: React.FC<{ stories: StoryComponent<ModalProps>[] }> = ({ stories }) => (
    <>
        {stories.map((story, index) => (
            <BaseComponentStory key={index} {...story} />
        ))}
    </>
);

const ModalDesigns: React.FC = () => <BaseStory title="Modal Component Showcase" tabs={[{ label: "Default", content: <ModalShowcase stories={modalStories} /> }]} />;

export { ModalDesigns };
