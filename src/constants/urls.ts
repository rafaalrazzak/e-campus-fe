export const URLS = {
    home: "/",
    login: "/login",
    visionMission: "/vision-mission",
    curriculum: "/curriculum",
    academnic: {
        base: "/academic",
        courses: {
            list: "/academic/courses",
            detail: (courseId: string) => `/academic/courses/${courseId}`,
        },
        calendar: "/academic/calendar",
    },
    major: {
        list: "/majors",
        detail: (majorId: string) => `/majors/${majorId}`,
    },
    research: {
        list: "/research",
        detail: (researchId: string) => `/research/${researchId}`,
    },
    dashboard: {
        base: "/dashboard",
        schedule: "/dashboard/schedule",
        settings: "/dashboard/settings",
        accademic: {
            courses: {
                base: "/dashboard/academic/courses",
                detail: (courseId: string) => `/dashboard/academic/courses/${courseId}`,
                dynamicPage: (courseId: string, type: string, id: string) => `/dashboard/academic/courses/${courseId}/${type}/${id}`,
            },
            tasks: {
                base: "/dashboard/academic/tasks",
                detail: (taskId: string) => `/dashboard/academic/tasks/${taskId}`,
            },
        },
    },
};
